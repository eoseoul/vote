/*
const config = {
  apiServer : 'https://portal.eoseoul.io',
  fileServer : '',
  publicPath : '../',
  socketServer : 'https://portal.eoseoul.io/stats',
  endpoint : 'https://user-api.eoseoul.io',
  eosHost : 'user-api.eoseoul.io',
  eosProtocol : 'https',
  eosPort : 433,
  eosHttpPort : 80,
  eosHttpsPort : 443,
  // publicPath : 'https://d1z72svldqoia2.cloudfront.net/front_end/deploy/0.1.0',
  chainId : 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  symbol : 'EOS',
  proxyName : 'eoseouldotio',
  NODE_ENV : 'developer',
  STANDALONE : true,
  relativePath : '..',
  latestVersion : '1.0.0'
};
*/

const config = {
  apiServer : 'http://localhost:3002',
  fileServer : '',
  publicPath : '../',
  socketServer : 'http://localhost:3002/stats',
  endpoint : 'http://127.0.0.1:8888',
  eosHost : '127.0.0.1',
  eosProtocol : 'http',
  eosPort : 8888,
  eosHttpPort : 8888,
  eosHttpsPort : 443,
  chainId : 'a4fe43c897279a677025624555f3835b949f995f87923c97f0392dcff835bfd0',
  symbol : 'EOS',
  proxyName : 'eoseouldotio',
  NODE_ENV : 'developer',
  STANDALONE : true,
  relativePath : '..',
  latestVersion : '1.0.0'
};

// initialize...
if (typeof window.STATS_CONFIG === 'undefined') {
  window.STATS_CONFIG = config;
}
