import createSagaElement from '../utils/createSagaElement';
import createActionCreator from '../utils/createActionCreator';

export const loginScatter = createSagaElement('EOS_LOGIN_SCATTER');
export const logoutScatter = createSagaElement('EOS_LOGOUT_SCATTER');

export const getInfo = createSagaElement('EOS_GET_INFO');
export const getGState = createSagaElement('EOS_GET_GSTATE');

export const newAccount = createSagaElement('EOS_NEW_ACCOUNT');

export const getAccount = createSagaElement('EOS_GET_ACCOUNT');
export const getBalance = createSagaElement('EOS_GET_BALANCE');
export const getVoter = createSagaElement('EOS_GET_VOTER');
export const getProducers = createSagaElement('EOS_GET_PRODUCERS');

export const stake = createSagaElement('EOS_STAKE');
export const unstake = createSagaElement('EOS_UNSTAKE');

export const vote = createSagaElement('EOS_VOTE');

export const RESET_EOS_ERROR = 'RESET_EOS_ERROR';
export const RESET_EOS_STATE = 'RESET_EOS_STATE';
export const resetEOSError = (req, requiredFields = []) => createActionCreator(RESET_EOS_ERROR, {req, requiredFields});
export const resetEOSState = (req, requiredFields = []) => createActionCreator(RESET_EOS_STATE, {req, requiredFields});
