const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const getEntry = require('../utils/getEntry');
const getConfig = require('../utils/getConfig');
const getCSSLoaders = require('../utils/getCSSLoaders');

const config = getConfig(process.env.NODE_ENV);
const publicPath = config.publicPath || '/';
const cssLoaders = getCSSLoaders();

module.exports = {
  bail: true,
  entry: getEntry(),
  output: {
    path: paths.appBuild,
    filename: '[name].js',
    publicPath: publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', 'tsx', ''],
  },
  resolveLoader: {
    root: paths.ownNodeModules,
    moduleTemplates: ['*-loader'],
  },
  module: {
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel',
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          cssLoaders.own
        ),
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          cssLoaders.nodeModules
        ),
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  babel: {
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
    ].concat(config.extraBabelPlugins || []),
    cacheDirectory: true,
  },
  postcss: function() {
    return [
      autoprefixer(config.autoprefixer || {
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
