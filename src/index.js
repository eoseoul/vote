import './config';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import configureStore from './redux/store/configureStore';
import rootSagas from './redux/sagas';

import AppComponent from './App';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();


const {store, history} = configureStore({});

store.runSaga(rootSagas);

render((
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={AppComponent}/>
        </Switch>
      </div>
    </Router>
  </Provider>
), document.getElementById('root'));
