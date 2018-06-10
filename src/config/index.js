const config = {
  //apiServer : 'http://localhost:3002',
  apiServer : 'https://portal.eoseoul.io',
  fileServer : '',
  publicPath : '../',
  //socketServer : 'http://localhost:3002/stats',
  socketServer : 'https://portal.eoseoul.io/stats',
  //endpoint : 'http://localhost:3330',
  endpoint : 'https://user-api.eoseoul.io',
  //eosHost : '127.0.0.1',
  eosHost : 'user-api.eoseoul.io',
  eosProtocol : 'https',
  eosPort : 80,
  eosHttpPort : 80,
  eosHttpsPort : 443,
  //eosProtocol : 'http',
  //eosHttpPort : 3330,
  // publicPath : 'https://d1z72svldqoia2.cloudfront.net/front_end/deploy/0.1.0',
  //chainId : 'a4fe43c897279a677025624555f3835b949f995f87923c97f0392dcff835bfd0',
  chainId : 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  symbol : 'EOS',
  NODE_ENV : 'developer',
  relativePath : '..',
  latestVersion : '1.0.0'
};

// initialize...
if (typeof window.STATS_CONFIG === 'undefined') {
  window.STATS_CONFIG = config;
}
