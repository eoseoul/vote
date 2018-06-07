import createActionTypes from '../utils/createActionTypes';
import createActionCreator, {createSagaAction} from '../utils/createActionCreator';

export const INIT_STATS = 'INIT_STATS';
export const UPDATE_CHAIN_INFO = 'UPDATE_CHAIN_INFO';
export const UPDATE_BLOCK = 'UPDATE_BLOCK';
export const UPDATE_TRX = 'UPDATE_TRX';
export const UPDATE_ROUND_STATS = 'UPDATE_ROUND_STATS';
export const UPDATE_NODE = 'UPDATE_NODE';
export const UPDATE_LATENCY = 'UPDATE_LATENCY';
export const ADD_NEW_NODE = 'ADD_NEW_NODE';

export const CHECK_LOCAL_LATENCY = createActionTypes('CHECK_LOCAL_LATENCY');

// saga에서 사용
export const initStats = (data) => createActionCreator('INIT_STATS', {data});
export const updateChainInfo = (data) => createActionCreator('UPDATE_CHAIN_INFO', {data});
export const updateBlock = (data) => createActionCreator('UPDATE_BLOCK', {data});
export const updateTrx = (data) => createActionCreator('UPDATE_TRX', {data});
export const updateRoundStats = (data) => createActionCreator('UPDATE_ROUND_STATS', {data});
export const updateNode = (data) => createActionCreator('UPDATE_NODE', {data});
export const updateLatency = (data) => createActionCreator('UPDATE_LATENCY', {data});
export const addNewNode = (data) => createActionCreator('ADD_NEW_NODE', {data});

export const checkLocalLatencySagaAction = createSagaAction(CHECK_LOCAL_LATENCY);

// saga의 watcher에서 사용
export const STATS_SAGA_TRIGGER = 'STATS_SAGA_TRIGGER';
export const CHECK_LOCAL_LATENCY_SAGA_TRIGGER = 'CHECK_LOCAL_LATENCY_SAGA_TRIGGER';
export const startStats = (req, requiredFields = []) => createActionCreator(STATS_SAGA_TRIGGER, {req, requiredFields});
export const checkLocalLatency = (req, requiredFields = []) => createActionCreator(CHECK_LOCAL_LATENCY_SAGA_TRIGGER, {req, requiredFields});
