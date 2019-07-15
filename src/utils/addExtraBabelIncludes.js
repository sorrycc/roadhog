import { join } from 'path';

export default function (webpackConfig, paths, includes = [], babelOptions) {
  includes.forEach((include) => {
    webpackConfig.module.rules.push({
      test: /\.(js|jsx)$/,
      include: join(paths.appDirectory, include),
      loader: 'babel',
      options: babelOptions,
    });
    webpackConfig.module.rules.push({
      test: /\.tsx?$/,
      include: join(paths.appDirectory, include),
      use: [{
        loader: 'babel',
        options: babelOptions,
      },
      {
        loader: 'awesome-typescript',
        options: {
          transpileOnly: true,
        },
      }],
    });
  });
  return webpackConfig;
}
