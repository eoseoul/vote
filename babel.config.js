
module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env'];
  const plugins = ['@babel/transform-runtime', '@babel/transform-async-to-generator'];

  return {
    // babelrcRoots : ['.']
    presets,
    plugins
  };
};
