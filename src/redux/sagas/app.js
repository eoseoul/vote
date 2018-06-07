/* eslint-disable no-constant-condition */
import {registerApi, loginApi, validateApi, downloadConfigApi, downloadScriptApi, getApi, updateApi} from '../services/app';
import * as actions from '../actions/app';
import {createWorker, createWatcher} from '../utils/saga';

const register = createWorker(actions.registerSagaAction, registerApi);
const login = createWorker(actions.loginSagaAction, loginApi);
const validate = createWorker(actions.validateSagaAction, validateApi);
const downloadConfig = createWorker(actions.downloadSagaAction, downloadConfigApi);
const downloadScript = createWorker(actions.downloadScriptSagaAction, downloadScriptApi);
const get = createWorker(actions.getSagaAction, getApi);
const update = createWorker(actions.updateSagaAction, updateApi);

const watchRegister = createWatcher(actions.REGISTER_SAGA_TRIGGER, register);
const watchLogin = createWatcher(actions.LOGIN_SAGA_TRIGGER, login);
const watchValidate = createWatcher(actions.VALIDATE_SAGA_TRIGGER, validate);
const watchDownload = createWatcher(actions.DOWNLOAD_CONFIG_SAGA_TRIGGER, downloadConfig);
const watchDownloadScript = createWatcher(actions.DOWNLOAD_SCRIPT_SAGA_TRIGGER, downloadScript);
const watchGet = createWatcher(actions.GET_SAGA_TRIGGER, get);
const watchUpdate = createWatcher(actions.UPDATE_SAGA_TRIGGER, update);

export default [watchRegister, watchLogin, watchValidate, watchDownload, watchDownloadScript, watchGet, watchUpdate];
