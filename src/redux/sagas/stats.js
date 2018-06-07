import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';
import {fork, take, call, put} from 'redux-saga/effects';
import {
  initStats, updateChainInfo, updateRoundStats, updateNode, updateLatency, addNewNode, checkLocalLatencySagaAction,
  STATS_SAGA_TRIGGER, CHECK_LOCAL_LATENCY_SAGA_TRIGGER
} from '../actions/stats';

import {createWatcher} from '../utils/saga';

import {getChainInfoApi} from '../services/stats';
import Latency from '../../utils/latency';


export function createWorker(sagaAction, api) {
  return function* (req, requiredFields) {
    try {
      yield put(sagaAction.request(req));
      const latency = new Latency();
      latency.start();
      yield call(api, req);
      yield put(sagaAction.success(req, {prod_name : req.params.prod_name, latency : latency.end()}));
    } catch (err) {
      yield put(sagaAction.failure(req, err));
    }
  };
}
const checkLatency = createWorker(checkLocalLatencySagaAction, getChainInfoApi);
const watchUpdate = createWatcher(CHECK_LOCAL_LATENCY_SAGA_TRIGGER, checkLatency);

function connect() {
  const options = {
    transports : ['websocket'],
    'force new connection' : true
  };
  const socket = io(window.STATS_CONFIG.socketServer, options);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on('init_stats', (stats) => {
      emit(initStats(stats));
    });

    socket.on('update_chain_info', (chainInfo) => {
      emit(updateChainInfo(chainInfo));
    });

    socket.on('update_round_stats', (stats) => {
      emit(updateRoundStats(stats));
    });

    socket.on('update_node', (node) => {
      emit(updateNode(node));
    });

    socket.on('update_latency', (latency) => {
      emit(updateLatency(latency));
    });

    socket.on('add_new_node', (node) => {
      emit(addNewNode(node));
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
}

function* watchSocket() {
  while (true) {
    yield take(STATS_SAGA_TRIGGER);
    const socket = yield call(connect);
    yield fork(handleIO, socket);
  }
}

export default [watchSocket, watchUpdate];
