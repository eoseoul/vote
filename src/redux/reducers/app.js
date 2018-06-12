import * as actionTypes from '../actions/app';
import createReducer from '../utils/createReducer';
import FileSaver from 'file-saver';

function downloadFile(data, name, type) {
  type = type || 'text/plain';
  const blob = new Blob([data], {type : type});
  FileSaver.saveAs(blob, name);
}

function downloadZipFile(data, name, type) {
  FileSaver.saveAs(data.file, name);
}


let login = null;
try {
  login = JSON.parse(localStorage.getItem('loginProd'));
} catch (err) {
  localStorage.removeItem('loginProd');
  login = null;
}

const initialState = {
  login : login,
  producer : null,
  error : null
};

const actionHandlers = {
  [actionTypes.LOGIN.SUCCESS] : (state, action) => {
    const producer = action.login.prod;
    return Object.assign({}, state, {...action, producer : producer, error : null});
  },
  [actionTypes.LOGIN.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),
  [actionTypes.REGISTER.SUCCESS] : (state, action) => {
    const producer = action.login.prod;
    return Object.assign({}, state, {...action, producer : producer, error : null});
  },
  [actionTypes.REGISTER.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),

  [actionTypes.VALIDATE.SUCCESS] : (state, action) => {
    const producer = action.data.node.producer;
    return Object.assign({}, state, {producer : producer, error : null});
  },
  [actionTypes.VALIDATE.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),

  [actionTypes.GET.SUCCESS] : (state, action) => Object.assign({}, state, {producer : action.data.producer, error : null}),
  [actionTypes.GET.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),

  [actionTypes.UPDATE.SUCCESS] : (state, action) => Object.assign({}, state, {producer : action.data.producer, error : null}),
  [actionTypes.UPDATE.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),

  [actionTypes.DOWNLOAD.SUCCESS] : (state, action) => {
    downloadFile(action.data, action.req.params.name);
    return state;
  },
  [actionTypes.DOWNLOAD.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),

  [actionTypes.DOWNLOAD_SCRIPT.SUCCESS] : (state, action) => {
    downloadZipFile(action.data, action.req.params.name, {type : 'application/x-zip-compressed'});
    return state;
  },
  [actionTypes.DOWNLOAD_SCRIPT.FAILURE] : (state, action) => Object.assign({}, state, {error : action.error}),

  [actionTypes.RESET_LOGIN] : (state, action) => {
    return Object.assign({}, state, {login : null, error : null});
  },
  [actionTypes.RESET_APP_ERROR] : (state, action) => {
    return Object.assign({}, state, {error : null});
  }
};

export default createReducer(initialState, actionHandlers);
