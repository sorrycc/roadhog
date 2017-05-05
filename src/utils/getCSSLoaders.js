
export default function getCSSLoaders(config) {
  const own = [];
  const nodeModules = [];

  let cssLoaderOption = 'css?importLoaders=1';
  if (!config.disableCSSModules) {
    cssLoaderOption += '&module&localIdentName=[local]___[hash:base64:5]';
  }
  if (!config.disableCSSSourceMap) {
    cssLoaderOption += '&sourceMap';
  }
  own.push(cssLoaderOption);
  nodeModules.push('css?importLoaders=1');

  own.push('postcss');
  nodeModules.push('postcss');

  return {
    own,
    nodeModules,
  };
}
