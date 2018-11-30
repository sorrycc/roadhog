
export default function getCSSLoaders(config) {
  const isDev = process.env.NODE_ENV === 'development';
  const own = [];
  const nodeModules = [];
  const noCSSModules = [];

  const baseCSSOptions = {
    importLoaders: 1,
    sourceMap: !config.disableCSSSourceMap,
    ...(isDev ? {} : {
      minimize: process.env.CSS_COMPRESS
        ? {
          // ref: https://github.com/umijs/umi/issues/164
          minifyFontValues: false,
        }
        : false,
    }),
  };

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
