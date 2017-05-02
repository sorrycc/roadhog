'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config, cwd) {
  var publicPath = '/';
  var _config$library = config.library,
      library = _config$library === undefined ? null : _config$library,
      _config$libraryTarget = config.libraryTarget,
      libraryTarget = _config$libraryTarget === undefined ? 'var' : _config$libraryTarget,
      _config$devtool = config.devtool,
      devtool = _config$devtool === undefined ? '#cheap-module-eval-source-map' : _config$devtool;


  var cssLoaders = (0, _getCSSLoaders2.default)(config);
  var theme = JSON.stringify((0, _getTheme2.default)(process.cwd(), config));
  var paths = (0, _paths2.default)(cwd);

  var output = {
    path: paths.appBuild,
    filename: '[name].js',
    publicPath: publicPath,
    libraryTarget: libraryTarget,
    chunkFilename: '[id].async.js'
  };

  if (library) output.library = library;

  var dllPlugins = config.dllPlugin ? [new _webpack2.default.DllReferencePlugin({
    context: paths.appSrc,
    manifest: require(paths.dllManifest) }), new _copyWebpackPlugin2.default([{
    from: (0, _path.join)(paths.dllNodeModule, 'roadhog.dll.js'),
    to: (0, _path.join)(paths.appBuild, 'roadhog.dll.js')
  }])] : [];

  var finalWebpackConfig = {
    devtool: devtool,
    entry: (0, _getEntry2.default)(config, paths.appDirectory),
    output: output,
    resolve: {
      extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.json', '.jsx', '.ts', '.tsx', '']
    },
    resolveLoader: {
      root: [paths.ownNodeModules, paths.appNodeModules],
      moduleTemplates: ['*-loader']
    },
    module: {
      loaders: [{
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.(css|less)$/, /\.json$/, /\.svg$/, /\.tsx?$/],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel'
      }, {
        test: /\.css$/,
        include: paths.appSrc,
        loader: 'style!' + cssLoaders.own.join('!')
      }, {
        test: /\.less$/,
        include: paths.appSrc,
        loader: 'style!' + cssLoaders.own.join('!') + '!less?{"modifyVars":' + theme + '}'
      }, {
        test: /\.css$/,
        include: paths.appNodeModules,
        loader: 'style!' + cssLoaders.nodeModules.join('!')
      }, {
        test: /\.less$/,
        include: paths.appNodeModules,
        loader: 'style!' + cssLoaders.nodeModules.join('!') + '!less?{"modifyVars":' + theme + '}'
      }, {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.tsx?$/,
        include: paths.appSrc,
        loader: 'babel!awesome-typescript'
      }]
    },
    babel: {
      babelrc: false,
      presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
      plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-react-require')].concat(config.extraBabelPlugins || []),
      cacheDirectory: true
    },
    postcss: function postcss() {
      return [(0, _autoprefixer2.default)(config.autoprefixer || {
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      })].concat(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []);
    },

    plugins: [new _webpack2.default.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }), new _webpack2.default.HotModuleReplacementPlugin(), new _caseSensitivePathsWebpackPlugin2.default(), new _WatchMissingNodeModulesPlugin2.default(paths.appNodeModules), new _systemBellWebpackPlugin2.default()].concat(dllPlugins).concat(!_fs2.default.existsSync(paths.appPublic) ? [] : new _copyWebpackPlugin2.default([{
      from: paths.appPublic,
      to: paths.appBuild
    }])).concat(!config.multipage ? [] : new _webpack2.default.optimize.CommonsChunkPlugin('common', 'common.js')).concat(!config.define ? [] : new _webpack2.default.DefinePlugin((0, _normalizeDefine2.default)(config.define))),
    externals: config.externals,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  };

  if (config.svgSpriteLoaderDirs) {
    baseSvgLoader.exclude = config.svgSpriteLoaderDirs;
    spriteSvgLoader.include = config.svgSpriteLoaderDirs;
    finalWebpackConfig.module.loaders = finalWebpackConfig.module.loaders.concat([baseSvgLoader, spriteSvgLoader]);
  } else {
    finalWebpackConfig.module.loaders.push(baseSvgLoader);
  }

  return (0, _addExtraBabelIncludes2.default)(finalWebpackConfig, paths, config.extraBabelIncludes);
};

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _copyWebpackPlugin = require('copy-webpack-plugin');

var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

var _WatchMissingNodeModulesPlugin2 = _interopRequireDefault(_WatchMissingNodeModulesPlugin);

var _systemBellWebpackPlugin = require('system-bell-webpack-plugin');

var _systemBellWebpackPlugin2 = _interopRequireDefault(_systemBellWebpackPlugin);

var _path = require('path');

var _paths = require('./paths');

var _paths2 = _interopRequireDefault(_paths);

var _getEntry = require('../utils/getEntry');

var _getEntry2 = _interopRequireDefault(_getEntry);

var _getTheme = require('../utils/getTheme');

var _getTheme2 = _interopRequireDefault(_getTheme);

var _getCSSLoaders = require('../utils/getCSSLoaders');

var _getCSSLoaders2 = _interopRequireDefault(_getCSSLoaders);

var _normalizeDefine = require('../utils/normalizeDefine');

var _normalizeDefine2 = _interopRequireDefault(_normalizeDefine);

var _addExtraBabelIncludes = require('../utils/addExtraBabelIncludes');

var _addExtraBabelIncludes2 = _interopRequireDefault(_addExtraBabelIncludes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseSvgLoader = {
  test: /\.svg$/,
  loader: 'file',
  query: {
    name: 'static/[name].[hash:8].[ext]'
  }
};

var spriteSvgLoader = {
  test: /\.(svg)$/i,
  loader: 'svg-sprite'
};

module.exports = exports['default'];