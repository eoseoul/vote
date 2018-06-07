import * as actionTypes from '../actions/stats';
import createReducer from '../utils/createReducer';
import update from 'immutability-helper';
import _ from 'lodash';

const initialState = {
  chainInfo : {},
  roundStats : [],
  nodes : [],
  latency : null,
  localLatency : null
};

const actionHandlers = {
  [actionTypes.INIT_STATS] : (state, action) => {
    const data = action.data;
    return Object.assign({}, state, {roundStats : data.roundsStats, nodes : data.nodes});
  },
  [actionTypes.UPDATE_CHAIN_INFO] : (state, action) => (Object.assign({}, state, {chainInfo : action.data})),
  // [actionTypes.UPDATE_BLOCK] : (state, action) => Object.assign({}, state, {...action, error : null}),
  // [actionTypes.UPDATE_TRX] : (state, action) => Object.assign({}, state, {...action, error : null}),
  [actionTypes.UPDATE_ROUND_STATS] : (state, action) => {
    // console.log(action.data);
    const idx = _.findIndex(state.roundStats, {round_num : action.data.round_num});
    let roundStats = null;
    if (idx >= 0) {
      roundStats = update(state.roundStats, {[idx] : {$set : action.data}});
      return Object.assign({}, state, {roundStats});
    }
    if (state.roundStats.length > 20) {
      roundStats = state.roundStats.slice(1);
      //roundStats = update(state.roundStats, {$splice : [[0, 1]]});
    } else {
      roundStats = state.roundStats;
    }
    roundStats = update(roundStats, {$push : [action.data]});
    return Object.assign({}, state, {roundStats});
  },
  [actionTypes.UPDATE_NODE] : (state, action) => {
    const idx = _.findIndex(state.nodes, {prod_name : action.data.prod_name});
    if (idx >= 0) {
      const nodes = update(state.nodes, {[idx] : {$merge : action.data}});
      return Object.assign({}, state, {nodes});
    }
    return state;
  },
  [actionTypes.UPDATE_LATENCY] : (state, action) => {
    const idx = _.findIndex(state.nodes, {prod_name : action.data.prod_name});
    if (idx >= 0) {
      const nodes = update(state.nodes, {[idx] : {$merge : {latency : action.data.latency}}});
      return Object.assign({}, state, {nodes, latency : action.data.latency});
    }
    return state;
  },
  [actionTypes.ADD_NEW_NODE] : (state, action) => {
    // console.log(action.data);
    const nodes = update(state.nodes, {$push : [action.data]});
    return Object.assign({}, state, {nodes});
  },
  [actionTypes.CHECK_LOCAL_LATENCY.SUCCESS] : (state, action) => {
    const idx = _.findIndex(state.nodes, {prod_name : action.data.prod_name});
    if (idx >= 0) {
      const nodes = update(state.nodes, {[idx] : {$merge : {localLatency : action.data.latency}}});
      return Object.assign({}, state, {nodes, localLatency : action.data.Llatency});
    }
    return state;
  }
};

export default createReducer(initialState, actionHandlers);
