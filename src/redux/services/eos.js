import Promise from 'bluebird';
import Eos from 'eosjs';

import {post} from './common';

const {format /*, api, ecc, json, Fcbuffer*/ } = Eos.modules

const endpoint = window.STATS_CONFIG.endpoint;
const eosHost = window.STATS_CONFIG.eosHost;
const eosHttpPort = window.STATS_CONFIG.eosHttpPort;
const symbol = window.STATS_CONFIG.symbol;
const chainId = window.STATS_CONFIG.chainId;
const eosProtocol = window.STATS_CONFIG.eosProtocol;

const systemAccount = 'eosio';
const tokenAccount = 'eosio.token';

function getEosByScatter() {
  const options = getOption(endpoint);
  const network = {
    blockchain : 'eos',
    host : eosHost,
    port : eosHttpPort,
    chainId : chainId
  };
  return window.scatter.eos(network, Eos, options, eosProtocol);
}

function getEos() {
  const options = getOption(endpoint);
  return Eos(options);
}

function getOption(httpEndPoint) {
  return {
    // keyProvider : '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', // sample key
    httpEndpoint : httpEndPoint,
    // mockTransactions : () => 'pass', // or 'fail'
    // transactionHeaders : (expireInSeconds, callback) => { callback(null/*error*/, headers)},
    expireInSeconds : 60,
    broadcast : true,
    debug : false,
    sign : true,
    chainId : chainId // Or null to fetch automatically ( takes longer )
  };
}

export function loginScatterApi(req) {
  const requiredFields = req.params.requiredFields || {};
  return window.scatter.getIdentity(requiredFields);
}

export function logoutScatterApi(req) {
  return window.scatter.forgetIdentity();
}

export function newAccountApi(req) {
  const apiServer = window.STATS_CONFIG.apiServer;
  const signinUrl = `${apiServer}/api/1/eos_accounts`;
  return post(signinUrl, req);
}

export function getInfoApi() {
  const eos = getEos();
  return eos.getInfo({})
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function getBlockApi(req) {
  const blockId = req.params.blockId;
  const eos = getEos();
  return eos.getBlock(blockId)
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function getAccountApi(req) {
  const name = req.params.name;
  const eos = getEosByScatter();
  return Promise.join(
    eos.getAccount(name),
    eos.getCurrencyBalance('eosio.token', name, symbol),
    eos.getTableRows({json : true, code : 'eosio', scope : name, table : 'refunds', talbe_key : name}),
    (account, balance, refunds) => ({account, balance, refunds})
  ).catch((err) => {
    if (typeof err === 'string') {
      throw JSON.parse(err);
    }
    throw err;
  });
}

export function getBalanceApi(req) {
  const name = req.params.name;
  const eos = getEosByScatter();
  return eos.getCurrencyBalance('eosio.token', name, symbol)
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function getVoterApi(req) {
  const name = req.params.name;
  const eos = getEos();
  let lowerBound = 0;
  if (req.params.lowerBound) {
    lowerBound = format.encodeName(req.params.lowerBound, false);
  }
  const params = {
    json : true, // {type : "bool", "default": false},
    code : systemAccount,
    scope : 'eosio',
    table : 'voters',
    table_key : name, // req.params.tableKey,
    lower_bound : lowerBound,
    // upper_bound: {type : "string", default: '-1'},
    limit : req.params.limit
  };
  return eos.getTableRows(params)
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function getProducersApi(req) {
  const eos = getEos();
  const params = {
    json : true, // {type : "bool", "default": false},
    limit : 10000 // req.params.limit
  };
  return eos.getProducers(params)
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

// code, scope, table, tableKey, limit
export function getTableRowsApi(req) {
  const eos = getEos();
  const params = {
    json : true, // {type : "bool", "default": false},
    code : req.params.code,
    scope : req.params.scope,
    table : req.params.table,
    table_key : req.params.tableKey,
    // lower_bound: {type : string, default: '0'},
    // upper_bound: {type : "string", default: '-1'},
    limit : req.params.limit
  };
  return eos.getTableRows(params)
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function delegatebwApi(req) {
  const delegate = req.params.stake;
  const eos = getEosByScatter();
  return eos.contract(systemAccount)
    .then((contract) => {
      return contract.delegatebw(delegate, {authorization : `${delegate.from}`});
    })
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function undelegatebwApi(req) {
  const undelegate = req.params.unstake;
  const eos = getEosByScatter();
  return eos.contract(systemAccount)
    .then((contract) => contract.undelegatebw(undelegate, {authorization : `${undelegate.from}`}))
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function voteApi(req) {
  const vote = req.params.vote;
  const eos = getEosByScatter();
  return eos.contract(systemAccount)
    .then((contract) => contract.voteproducer(vote, {authorization : `${vote.voter}`}))
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

// {from: 'inita', to: 'initb', quantity: '1 EOS', memo: ''}
export function buyRamApi(req) {
  const ram = req.params.ram;
  const eos = getEosByScatter();
  return eos.contract(systemAccount)
    .then((contract) => contract.buyram(ram, {authorization : `${ram.payer}`}))
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function regProducerApi(req) {
  const prod = req.params.prod;
  const eos = getEosByScatter();
  return eos.contract(systemAccount)
    .then((contract) => contract.regproducer(prod, {authorization : `${prod.producer}`}))
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function unRegProducerApi(req) {
  const name = req.params.name;
  const eos = getEosByScatter();
  return eos.contract(systemAccount)
    .then((contract) => contract.unregprod(name, {authorization : `${name}`}))
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

// {from: 'inita', to: 'initb', quantity: '1 EOS', memo: ''}
export function transferApi(req) {
  const transfer = req.params.transfer;
  const options = getOption(endpoint);
  const eos = getEosByScatter(options);
  return eos.contract(tokenAccount)
    .then((contract) => contract.transfer(transfer, {authorization : `${transfer.from}`}))
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}
