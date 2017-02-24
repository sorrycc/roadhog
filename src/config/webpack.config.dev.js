import autoprefixer from 'autoprefixer';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import fs from 'fs';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import SystemBellWebpackPlugin from 'system-bell-webpack-plugin';
import getPaths from './paths';
import getEntry from '../utils/getEntry';
import getTheme from '../utils/getTheme';
import getCSSLoaders from '../utils/getCSSLoaders';
import normalizeDefine from '../utils/normalizeDefine';

const baseSvgLoader = {
  test: /\.svg$/,
  loader: 'file',
  query: {
    name: 'static/[name].[hash:8].[ext]',
  },
};

const spriteSvgLoader = {
  test: /\.(svg)$/i,
  loader: 'svg-sprite',
};

export default function (config, cwd) {
  const publicPath = '/';
  const cssLoaders = getCSSLoaders(config);
  const theme = JSON.stringify(getTheme(process.cwd(), config));
  const paths = getPaths(cwd);

  const finalWebpackConfig = {
    devtool: 'cheap-module-source-map',
    entry: getEntry(config, paths.appDirectory),
    output: {
      path: paths.appBuild,
      filename: '[name].js',
      pathinfo: true,
      publicPath,
    },
    resolve: {
      extensions: [
        '.web.js', '.web.jsx', '.web.ts', '.web.tsx',
        '.js', '.json', '.jsx', '.ts', '.tsx', '',
      ],
    },
    resolveLoader: {
      root: [
        paths.ownNodeModules,
        paths.appNodeModules,
      ],
      moduleTemplates: ['*-loader'],
    },
    module: {
      loaders: [
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
          test: /\.css$/,
          include: paths.appSrc,
          loader: `style!${cssLoaders.own.join('!')}`,
        },
        {
          test: /\.less$/,
          include: paths.appSrc,
          loader: `style!${cssLoaders.own.join('!')}!less?{"modifyVars":${theme}}`,
        },
        {
          test: /\.css$/,
          include: paths.appNodeModules,
          loader: `style!${cssLoaders.nodeModules.join('!')}`,
        },
        {
          test: /\.less$/,
          include: paths.appNodeModules,
          loader: `style!${cssLoaders.nodeModules.join('!')}!less?{"modifyVars":${theme}}`,
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
          test: /\.tsx?$/,
          include: paths.appSrc,
          loader: 'babel!awesome-typescript',
        },
      ],
    },
    babel: {
      babelrc: false,
      presets: [
        require.resolve('babel-preset-es2015'),
        require.resolve('babel-preset-react'),
        require.resolve('babel-preset-stage-0'),
      ],
      plugins: [
        require.resolve('babel-plugin-add-module-exports'),
        require.resolve('babel-plugin-react-require'),
      ].concat(config.extraBabelPlugins || []),
      cacheDirectory: true,
    },
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
    finalWebpackConfig.module.loaders = finalWebpackConfig.module.loaders.concat([
      baseSvgLoader,
      spriteSvgLoader,
    ]);
  } else {
    finalWebpackConfig.module.loaders.push(baseSvgLoader);
  }
  return finalWebpackConfig;
}
