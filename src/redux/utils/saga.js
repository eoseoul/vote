import {take, put, call, fork} from 'redux-saga/effects';

export function createWorker(sagaAction, api) {
  return function* (req, requiredFields) {
    try {
      yield put(sagaAction.request(req));
      const data = yield call(api, req);
      yield put(sagaAction.success(req, data));
    } catch (err) {
      yield put(sagaAction.failure(req, err));
    }
  };
}

export function createWatcher(actionType, worker) {
  return function* () {
    while (true) {
      const {req, requiredFields = []} = yield take(actionType);
      yield fork(worker, req, requiredFields);
    }
  };
}
