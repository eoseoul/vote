import axios from 'axios';
import _ from 'lodash';
// import qs from 'qs';

import createHeader from '../utils/createHeader';

export const getChainInfoApi = (req) => {
  const url = `${req.params.address}:${req.params.httpPort}/v1/chain/get_info`;
  return axios.get(url, {headers : createHeader({})})
    .then((res) => {
      if (!_.isEmpty(res.data.error)) {
        throw res.data.error;
      }
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};


