import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import { existsSync } from 'fs';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import normalizeDefine from '../utils/normalizeDefine';

export function getBabelOptions(config) {
  return {
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
}

export const baseSvgLoader = {
  test: /\.svg$/,
  loader: 'file',
  options: {
    name: 'static/[name].[hash:8].[ext]',
  },
};

export const spriteSvgLoader = {
  test: /\.(svg)$/i,
  loader: 'svg-sprite',
};

export const defaultDevtool = '#cheap-module-eval-source-map';

export function getResolve(config, paths) {
  return {
    resolve: {
      modules: [
        paths.ownNodeModules,
        paths.appNodeModules,
      ],
      extensions: [
        ...(config.extraResolveExtensions || []),
        '.web.js', '.web.jsx', '.web.ts', '.web.tsx',
        '.js', '.json', '.jsx', '.ts', '.tsx',
      ],
      alias: {
        '@': paths.appSrc, // eslint-disable-line
        components: path.join(paths.appSrc, 'components'),
        models: path.join(paths.appSrc, 'models'),
        routes: path.join(paths.appSrc, 'routes'),
        services: path.join(paths.appSrc, 'services'),
        assets: path.join(paths.appSrc, 'assets'),
        utils: path.join(paths.appSrc, 'utils'),
        ...(config.alias || {}),
      },
    },
    resolveLoader: {
      modules: [
        paths.ownNodeModules,
        paths.appNodeModules,
      ],
      moduleExtensions: ['-loader'],
    },
  };
}

export function getFirstRules({ paths, babelOptions }) {
  return [
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.(css|less|scss|sass)$/,
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
  ];
}

export function getLastRules({ paths, babelOptions }) {
  return [
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
        {
          loader: 'awesome-typescript',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
  ];
}

export function getCSSRules(env, { paths, cssLoaders, theme }) {
  const rules = [
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
      test: /\.scss$/,
      include: paths.appSrc,
      use: [
        'style',
        ...cssLoaders.own,
        {
          loader: 'sass',
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
      test: /\.scss$/,
      include: paths.appNodeModules,
      use: [
        'style',
        ...cssLoaders.nodeModules,
        {
          loader: 'sass',
        },
      ],
    },
  ];
  if (env === 'production') {
    rules.forEach((rule) => {
      rule.use = ExtractTextPlugin.extract({
        fallback: 'style',
        use: rule.use.slice(1),
      });
    });
  }
  return rules;
}

export const node = {
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
};

export function getCommonPlugins({ config, paths, appBuild, NODE_ENV }) {
  const ret = [];

  let defineObj = {
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  };
  if (config.define) {
    defineObj = {
      ...defineObj,
      ...normalizeDefine(config.define),
    };
  }
  ret.push(new webpack.DefinePlugin(defineObj));

  if (existsSync(paths.appPublic)) {
    ret.push(new CopyWebpackPlugin([
      {
        from: paths.appPublic,
        to: appBuild,
      },
    ]));
  }
  if (config.multipage) {
    ret.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
    }));
  }

  ret.push(new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [
        autoprefixer(config.autoprefixer || {
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
        }),
        ...(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []),
      ],
    },
  }));

  if (config.provide) {
    ret.push(new webpack.ProvidePlugin(config.provide));
  }

  return ret;
}

