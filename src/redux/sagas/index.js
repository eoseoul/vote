import {fork, all} from 'redux-saga/effects';
import _ from 'lodash';

import appSagas from './app';
import statsSagas from './stats';
import eosSagas from './eos';

export default function* root() {
  const sagas = appSagas
    .concat(statsSagas)
    .concat(eosSagas);

  yield all(_.map(sagas, (saga) => fork(saga)));
}
