const getConfig = require('./getConfig');

module.exports = function() {
  const config = getConfig();

  const own = [];
  const nodeModules = [];

  if (config.disableCSSModules) {
    own.push('css?importLoaders=1');
  } else {
    own.push('css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]');
  }
  nodeModules.push('css?importLoaders=1');

  own.push('postcss');
  nodeModules.push('postcss');

  if (config.less) {
    own.push('less');
    nodeModules.push('less');
  }

  return {
    own: own.join('!'),
    nodeModules: nodeModules.join('!'),
  };
};
