import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import fs from 'fs';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import SystemBellWebpackPlugin from 'system-bell-webpack-plugin';
import { join } from 'path';
import getPaths from './paths';
import getEntry from '../utils/getEntry';
import getTheme from '../utils/getTheme';
import getCSSLoaders from '../utils/getCSSLoaders';
import normalizeDefine from '../utils/normalizeDefine';
import addExtraBabelIncludes from '../utils/addExtraBabelIncludes';

const baseSvgLoader = {
  test: /\.svg$/,
  loader: 'file',
  options: {
    name: 'static/[name].[hash:8].[ext]',
  },
};

const spriteSvgLoader = {
  test: /\.(svg)$/i,
  loader: 'svg-sprite',
};

export default function (config, cwd) {
  const publicPath = '/';
  const {
    library = null,
    libraryTarget = 'var',
    devtool = '#cheap-module-eval-source-map',
  } = config;

  const cssLoaders = getCSSLoaders(config);
  const theme = JSON.stringify(getTheme(process.cwd(), config));
  const paths = getPaths(cwd);

  const babelOptions = {
    babelrc: false,
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ].concat(config.extraBabelPresets || []),
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-react-require'),
    ].concat(config.extraBabelPlugins || []),
    cacheDirectory: true,
  };

  const output = {
    path: paths.appBuild,
    filename: '[name].js',
    publicPath,
    libraryTarget,
    chunkFilename: '[name].async.js',
  };

  if (library) output.library = library;

  const dllPlugins = config.dllPlugin ? [
    new webpack.DllReferencePlugin({
      context: paths.appSrc,
      manifest: require(paths.dllManifest),  // eslint-disable-line
    }),
    new CopyWebpackPlugin([
      {
        from: join(paths.dllNodeModule, 'roadhog.dll.js'),
        to: join(paths.appBuild, 'roadhog.dll.js'),
      },
    ]),
  ] : [];

  const finalWebpackConfig = {
    devtool,
    entry: getEntry(config, paths.appDirectory),
    output,
    resolve: {
      modules: [
        paths.ownNodeModules,
        paths.appNodeModules,
      ],
      extensions: [
        '.web.js', '.web.jsx', '.web.ts', '.web.tsx',
        '.js', '.json', '.jsx', '.ts', '.tsx',
      ],
    },
    resolveLoader: {
      modules: [
        paths.ownNodeModules,
        paths.appNodeModules,
      ],
      moduleExtensions: ['-loader'],
    },
    module: {
      rules: [
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.(css|less)$/,
            /\.json$/,
            /\.svg$/,
            /\.tsx?$/,
          ],
          loader: 'url',
          options: {
            limit: 10000,
            name: 'static/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(js|jsx)$/,
          include: paths.appSrc,
          loader: 'babel',
          options: babelOptions,
        },
        {
          test: /\.css$/,
          include: paths.appSrc,
          use: [
            'style',
            ...cssLoaders.own,
          ],
        },
        {
          test: /\.less$/,
          include: paths.appSrc,
          use: [
            'style',
            ...cssLoaders.own,
            {
              loader: 'less',
              options: {
                modifyVars: theme,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: paths.appNodeModules,
          use: [
            'style',
            ...cssLoaders.nodeModules,
          ],
        },
        {
          test: /\.less$/,
          include: paths.appNodeModules,
          use: [
            'style',
            ...cssLoaders.nodeModules,
            {
              loader: 'less',
              options: {
                modifyVars: theme,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'file',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          test: /\.tsx?$/,
          include: paths.appSrc,
          use: [
            {
              loader: 'babel',
              options: babelOptions,
            },
            'awesome-typescript',
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new SystemBellWebpackPlugin(),
    ].concat(
      dllPlugins,
    ).concat(
      !fs.existsSync(paths.appPublic) ? [] :
        new CopyWebpackPlugin([
          {
            from: paths.appPublic,
            to: paths.appBuild,
          },
        ]),
    ).concat(
      !config.multipage ? [] :
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    ).concat(
      !config.define ? [] :
        new webpack.DefinePlugin(normalizeDefine(config.define)),
    ),
    externals: config.externals,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
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
