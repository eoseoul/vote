import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

// action과 reducer에서 사용
export const LOGIN = createActionTypes('LOGIN');
export const REGISTER = createActionTypes('REGISTER');
export const VALIDATE = createActionTypes('VALIDATE');
export const DOWNLOAD = createActionTypes('DOWNLOAD_CONFIG');
export const DOWNLOAD_SCRIPT = createActionTypes('DOWNLOAD_SCRIPT');
export const GET = createActionTypes('GET_PRODUCER');
export const UPDATE = createActionTypes('UPDATE_PRODUCER');

// saga에서 사용
export const loginSagaAction = {
  request : (req) => createActionCreator(LOGIN.REQUEST, {req}),
  success : (req, data) => {
    const loginInfo = data.login;
    localStorage.setItem('loginProd', JSON.stringify(loginInfo));
    return createActionCreator(LOGIN.SUCCESS, {req, login : loginInfo});
  },
  failure : (req, error) => {
    localStorage.removeItem('loginProd');
    return createActionCreator(LOGIN.FAILURE, {req, error});
  }
};

export const registerSagaAction = {
  request : (req) => createActionCreator(REGISTER.REQUEST, {req}),
  success : (req, data) => {
    const loginInfo = data.login;
    localStorage.setItem('loginProd', JSON.stringify(loginInfo));
    return createActionCreator(REGISTER.SUCCESS, {req, login : loginInfo});
  },
  failure : (req, error) => {
    localStorage.removeItem('loginProd');
    return createActionCreator(REGISTER.FAILURE, {req, error});
  }
};

export const validateSagaAction = createSagaAction(VALIDATE);
export const downloadSagaAction = createSagaAction(DOWNLOAD);
export const downloadScriptSagaAction = createSagaAction(DOWNLOAD_SCRIPT);
export const getSagaAction = createSagaAction(GET);
export const updateSagaAction = createSagaAction(UPDATE);

// saga의 watcher에서 사용
export const LOGIN_SAGA_TRIGGER = 'LOGIN_SAGA_TRIGGER';
export const REGISTER_SAGA_TRIGGER = 'REGISTER_SAGA_TRIGGER';
export const VALIDATE_SAGA_TRIGGER = 'VALIDATE_SAGA_TRIGGER';
export const DOWNLOAD_CONFIG_SAGA_TRIGGER = 'DOWNLOAD_CONFIG_SAGA_TRIGGER';
export const DOWNLOAD_SCRIPT_SAGA_TRIGGER = 'DOWNLOAD_SCRIPT_SAGA_TRIGGER';
export const GET_SAGA_TRIGGER = 'GET_SAGA_TRIGGER';
export const UPDATE_SAGA_TRIGGER = 'UPDATE_SAGA_TRIGGER';

// component나 container에서 사용
export const loginProducer = (req, requiredFields = []) => createActionCreator(LOGIN_SAGA_TRIGGER, {req, requiredFields});
export const registerProducer = (req, requiredFields = []) => createActionCreator(REGISTER_SAGA_TRIGGER, {req, requiredFields});
export const validateNode = (req, requiredFields = []) => createActionCreator(VALIDATE_SAGA_TRIGGER, {req, requiredFields});
export const downloadConfig = (req, requiredFields = []) => createActionCreator(DOWNLOAD_CONFIG_SAGA_TRIGGER, {req, requiredFields});
export const downloadScript = (req, requiredFields = []) => createActionCreator(DOWNLOAD_SCRIPT_SAGA_TRIGGER, {req, requiredFields});
export const getProducer = (req, requiredFields = []) => createActionCreator(GET_SAGA_TRIGGER, {req, requiredFields});
export const updateProducer = (req, requiredFields = []) => createActionCreator(UPDATE_SAGA_TRIGGER, {req, requiredFields});

// reset login data
export const RESET_LOGIN = 'RESET_LOGIN';
export const resetLogin = (req, requiredFields = []) => createActionCreator(RESET_LOGIN, {req, requiredFields});

export const RESET_APP_ERROR = 'RESET_ERROR';
export const resetAppError = (req, requiredFields = []) => createActionCreator(RESET_APP_ERROR, {req, requiredFields});

export const logoutUser = () => {
  localStorage.removeItem('loginProd');
  return resetLogin();
};
