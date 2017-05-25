import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import getEntry from '../utils/getEntry';
import getTheme from '../utils/getTheme';
import getCSSLoaders from '../utils/getCSSLoaders';
import addExtraBabelIncludes from '../utils/addExtraBabelIncludes';
import {
  getBabelOptions,
  baseSvgLoader,
  spriteSvgLoader,
  defaultDevtool,
  getResolve,
  getFirstRules,
  getCSSRules,
  getLastRules,
  getCommonPlugins,
  node,
} from './common';

export default function (args, appBuild, config, paths) {
  const { debug, analyze } = args;
  const NODE_ENV = debug ? 'development' : process.env.NODE_ENV;

  const {
    publicPath = '/',
    library = null,
    libraryTarget = 'var',
    devtool = debug ? defaultDevtool : null,
  } = config;

  const babelOptions = getBabelOptions(config);
  const cssLoaders = getCSSLoaders(config);
  const theme = JSON.stringify(getTheme(process.cwd(), config));

  const output = {
    path: appBuild,
    filename: '[name].js',
    publicPath,
    libraryTarget,
    chunkFilename: '[name].async.js',
  };

  if (library) output.library = library;

  const finalWebpackConfig = {
    bail: true,
    devtool,
    entry: getEntry(config, paths.appDirectory, /* isBuild */true),
    output,
    ...getResolve(paths),
    module: {
      rules: [
        ...getFirstRules({ paths, babelOptions }),
        ...getCSSRules('production', { paths, cssLoaders, theme }),
        ...getLastRules({ paths, babelOptions }),
      ],
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin('[name].css'),
      ...getCommonPlugins({
        config,
        paths,
        appBuild,
        NODE_ENV,
      }),
      ...(debug ? [] : [new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
          ascii_only: true,
        },
      })]),
      ...(analyze ? [new Visualizer()] : []),
    ],
    externals: config.externals,
    node,
  };

  if (config.svgSpriteLoaderDirs) {
    baseSvgLoader.exclude = config.svgSpriteLoaderDirs;
    spriteSvgLoader.include = config.svgSpriteLoaderDirs;
    finalWebpackConfig.module.rules.push([
      baseSvgLoader,
      spriteSvgLoader,
    ]);
  } else {
    finalWebpackConfig.module.rules.push(baseSvgLoader);
  }

  return addExtraBabelIncludes(finalWebpackConfig, paths, config.extraBabelIncludes);
}
