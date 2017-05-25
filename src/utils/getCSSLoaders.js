import autoprefixer from 'autoprefixer';

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
    options: {
      postcss() {
        return [
          autoprefixer(config.autoprefixer || {
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
          }),
        ]
          .concat(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []);
      },
    },
  };

  own.push(postcssLoader);
  nodeModules.push(postcssLoader);

  return {
    own,
    nodeModules,
  };
}
