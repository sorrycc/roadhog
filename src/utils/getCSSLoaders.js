
export default function getCSSLoaders(config, NODE_ENV) {
  const own = [];
  const nodeModules = [];
  const noCSSModules = [];

  let baseCSSOptions = {
    importLoaders: 1,
    sourceMap: !config.disableCSSSourceMap,
  };

  if (NODE_ENV === 'production') {
    baseCSSOptions = {
      ...baseCSSOptions,
      minimize: true,
    };
  }

  if (config.disableCSSModules) {
    own.push({
      loader: 'css',
      options: baseCSSOptions,
    });
  } else {
    own.push({
      loader: 'css',
      options: {
        ...baseCSSOptions,
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
      },
    });
  }
  nodeModules.push({
    loader: 'css',
    options: baseCSSOptions,
  });
  noCSSModules.push({
    loader: 'css',
    options: baseCSSOptions,
  });

  const postcssLoader = {
    loader: 'postcss',
  };

  noCSSModules.push(postcssLoader);
  own.push(postcssLoader);
  nodeModules.push(postcssLoader);

  return {
    own,
    nodeModules,
    noCSSModules,
  };
}
