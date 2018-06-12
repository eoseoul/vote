import _ from 'lodash';
import update from 'immutability-helper';
import createReducer from '../utils/createReducer';

import {getInfo, getGState, loginScatter, logoutScatter, newAccount, getAccount, getBalance,
  getVoter, getProducers, stake, unstake, vote, RESET_EOS_ERROR, RESET_EOS_STATE} from '../actions/eos';

const symbol = window.STATS_CONFIG.symbol;

const initBalance = `0.0000 ${symbol}`;
const initialState = {
  identity : {},
  chainInfo : {},
  gState : {},
  account : {balance : initBalance},
  newAccountTr : {},
  producers : [],
  totalVoteWeight : 1,
  forceUpdateAccount : {is : false},
  error : null
};

function modifyEosMessage(error) {
  const eosError = error.extra || error.error || error; // eos error
  if (!_.isEmpty(eosError) && !_.isEmpty(eosError.details)) {
    const message = eosError.details[0].message || '';
    const messageParse = message.split(':');
    if (messageParse.length >= 2) {
      error.eosMessage = messageParse[1];
    } else {
      error.eosMessage = message;
    }
  }
  return error;
}

const actionHandlers = {
  [loginScatter.actionType.SUCCESS] : (state, action) => {
    const identity = action.data;
    return Object.assign({}, state, {identity : identity, error : null});
  },

  [logoutScatter.actionType.SUCCESS] : (state, action) => {
    return Object.assign({}, initialState);
  },

  [getInfo.actionType.SUCCESS] : (state, action) => {
    return Object.assign({}, state, {chainInfo : action.data, error : null});
  },
  [getInfo.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [getGState.actionType.SUCCESS] : (state, action) => {
    return Object.assign({}, state, {gState : action.data, error : null});
  },
  [getGState.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [newAccount.actionType.SUCCESS] : (state, action) => {
    return Object.assign({}, state, {newAccountTr : action.data, error : null});
  },
  [newAccount.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [getAccount.actionType.REQUEST] : (state, action) => {
    const forceUpdateAccount = {is : false};
    return Object.assign({}, state, {forceUpdateAccount, error : null});
  },
  [getAccount.actionType.SUCCESS] : (state, action) => {
    const account = action.data.account;
    let balance = initBalance;
    if (!_.isEmpty(action.data.balance)) {
      balance = action.data.balance[0];
    }
    account.balance = balance;
    if (!_.isEmpty(action.data.refunds) && !_.isEmpty(action.data.refunds.rows)) {
      account.refund = action.data.refunds.rows[0];
    }
    return Object.assign({}, state, {account : account, error : null});
  },
  [getAccount.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [getBalance.actionType.SUCCESS] : (state, action) => {
    let balance = initBalance;
    if (!_.isEmpty(action.data)) {
      balance = action.data[0];
    }
    const account = update(state.account, {$merge : {balance : balance}});
    return Object.assign({}, state, {account : account, error : null});
  },
  [getBalance.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [getVoter.actionType.SUCCESS] : (state, action) => {
    const voter = action.data;
    return Object.assign({}, state, {voter : voter, error : null});
  },
  [getVoter.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [getProducers.actionType.SUCCESS] : (state, action) => {
    if (!_.isEmpty(action.data) && !_.isEmpty(action.data.rows)) {
      const producers = [];
      _.forEach(action.data.rows, (row, index) => {
        if (row.is_active === 1) {
          row.ranking = index + 1;
          producers.push(row);
        }
      });
      const totalVoteWeight = action.data.total_producer_vote_weight || 1;
      return Object.assign({}, state, {producers, totalVoteWeight, error : null});
    }
    return state;
  },
  [getProducers.actionType.FAILURE] : (state, action) => {
    modifyEosMessage(action.error);
    return Object.assign({}, state, {error : action.error});
  },

  [stake.actionType.SUCCESS] : (state, action) => {
    const forceUpdateAccount = {is : true};
    const _state = Object.assign({}, state, {forceUpdateAccount, error : null});
    return _state;
  },
  [stake.actionType.FAILURE] : (state, action) => {
    const forceUpdateAccount = {is : true};
    modifyEosMessage(action.error);
    return Object.assign({}, state, {forceUpdateAccount, error : action.error});
  },

  [unstake.actionType.SUCCESS] : (state, action) => {
    const forceUpdateAccount = {is : true};
    return Object.assign({}, state, {forceUpdateAccount, error : null});
  },
  [unstake.actionType.FAILURE] : (state, action) => {
    const forceUpdateAccount = {is : true};
    modifyEosMessage(action.error);
    return Object.assign({}, state, {forceUpdateAccount, error : action.error});
  },

  [vote.actionType.SUCCESS] : (state, action) => {
    const forceUpdateAccount = {is : true};
    return Object.assign({}, state, {forceUpdateAccount, error : null});
  },
  [vote.actionType.FAILURE] : (state, action) => {
    const forceUpdateAccount = {is : true};
    modifyEosMessage(action.error);
    return Object.assign({}, state, {forceUpdateAccount, error : action.error});
  },
  [RESET_EOS_ERROR] : (state, action) => Object.assign({}, state, {error : null}),
  [RESET_EOS_STATE] : (state, action) => Object.assign({}, initialState)
};

export default createReducer(initialState, actionHandlers);
