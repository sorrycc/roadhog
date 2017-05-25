
export default function getCSSLoaders(config) {
  const own = [];
  const nodeModules = [];

  if (config.disableCSSModules) {
    own.push({
      loader: 'css',
      options: {
        importLoaders: 1,
      },
    });
  } else {
    own.push({
      loader: 'css',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[local]___[hash:base64:5]',
      },
    });
  }
  nodeModules.push({
    loader: 'css',
    options: {
      importLoaders: 1,
    },
  });

  const postcssLoader = {
    loader: 'postcss',
  };

  own.push(postcssLoader);
  nodeModules.push(postcssLoader);

  return {
    own,
    nodeModules,
  };
}
