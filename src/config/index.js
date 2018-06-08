const config = {
  //apiServer : 'http://localhost:3002',
  apiServer : 'https://portal.eoseoul.io',
  //socketServer : 'http://localhost:3002/stats',
  socketServer : 'https://portal.eoseoul.io/stats',
  relativePath : '..',
  //endpoint : 'http://localhost:3330',
  endpoint : 'https://portal.eoseoul.io',
  //eosHost : '127.0.0.1',
  eosHost : 'eosnet.eoseoul.io',
  eosProtocol : 'https',
  eosHttpPort : 443,
  //eosHttpPort : 3330,
  // publicPath : 'https://d1z72svldqoia2.cloudfront.net/front_end/deploy/0.1.0',
  publicPath : '../',
  symbol : 'EOS',
  fileServer : '',
  NODE_ENV : 'development',
  //chainId : 'a4fe43c897279a677025624555f3835b949f995f87923c97f0392dcff835bfd0',
  chainId : 'dc705acc12c68b0c3e996526389395ad28de05829e8dead9da918289f3b70ccd',
  latestVersion : '1.0.0'
};

// initialize...
if (typeof window.STATS_CONFIG === 'undefined') {
  window.STATS_CONFIG = config;
}
