import Eos from 'eosjs';

import axios from 'axios';
import _ from 'lodash';

const endpoint = window.STATS_CONFIG.endpoint;
const chainId = window.STATS_CONFIG.chainId;

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

export function getAccountApi(name) {
  const eos = getEos();
  return eos.getAccount(name)
    .catch((err) => {
      if (typeof err === 'string') {
        throw JSON.parse(err);
      }
      throw err;
    });
}

export function get(fullUrl) {
  return axios.get(fullUrl)
    .then((res) => {
      if (!_.isEmpty(res.data.error)) {
        throw res.data.error;
      }
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
