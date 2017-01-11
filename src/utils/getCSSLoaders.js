
export default function getCSSLoaders(config) {
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

  return {
    own,
    nodeModules,
  };
}
