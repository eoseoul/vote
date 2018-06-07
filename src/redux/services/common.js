import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';

import createHeader from '../utils/createHeader';

export function post(fullUrl, req) {
  return axios.post(fullUrl, qs.stringify(req.params), {headers : createHeader(req.login)})
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

export function put(fullUrl, req) {
  return axios.put(fullUrl, qs.stringify(req.params), {headers : createHeader(req.login)})
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

export function get(fullUrl, req) {
  return axios.get(fullUrl, {params : req.params, headers : createHeader(req.login)})
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

export function download(fullUrl, req) {
  const fileName = req.params.name;
  return axios.get(fullUrl, {headers : createHeader(req.login), responseType : 'blob'})
    .then((res) => {
      if (!_.isEmpty(res.data.error)) {
        throw res.data.error;
      }
      return {file : res.data, name : fileName};
    })
    .catch((err) => {
      throw err;
    });
}
