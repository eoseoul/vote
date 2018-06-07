import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware, {END} from 'redux-saga';
// import createHistory from 'history/createHashHistory';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import * as rootReducer from '../reducers';

const history = createHistory();
const routingMiddleware = routerMiddleware(history);
const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing : routerReducer
}));

function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    routingMiddleware,
    sagaMiddleware
  ];

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middlewares)
  )
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return {store, history};
}

function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    reduxImmutableStateInvariant(),
    routingMiddleware,
    sagaMiddleware
    // createLogger(),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return {store, history};
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
