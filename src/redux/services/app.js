import {post, put, get, download} from './common';

export const registerApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const signupUrl = `${apiServer}/api/1/prods/signup`;
  return post(signupUrl, req);
};

export const loginApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const signinUrl = `${apiServer}/api/1/prods/login`;
  return post(signinUrl, req);
};

export const validateApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const prodId = req.params._id;
  const signinUrl = `${apiServer}/api/1/prods/${prodId}/validate`;
  return put(signinUrl, req);
};

export const getApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const prodId = req.params._id;
  const signinUrl = `${apiServer}/api/1/prods/${prodId}`;
  return get(signinUrl, req);
};

export const updateApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const prodId = req.params._id;
  const signinUrl = `${apiServer}/api/1/prods/${prodId}`;
  return put(signinUrl, req);
};

export const downloadConfigApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const prodId = req.params._id;
  const signinUrl = `${apiServer}/api/1/prods/${prodId}/config`;
  return get(signinUrl, req);
};

export const downloadScriptApi = (req) => {
  const apiServer = window.STATS_CONFIG.apiServer;
  const prodId = req.params._id;
  const signinUrl = `${apiServer}/api/1/prods/${prodId}/script`;
  return download(signinUrl, req);
};
