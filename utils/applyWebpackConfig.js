const fs = require('fs');
const path = require('path');

require('babel-register')({
  only: /webpack.config.js/,
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0'),
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
  ],
  babelrc: false,
});

module.exports = function(config, env) {
  const filePath = path.resolve('webpack.config.js');
  if (fs.existsSync(filePath)) {
    return require(filePath)(config, env);
  } else {
    return config;
  }
};
