import { join } from 'path';

export default function (webpackConfig, paths, includes = [], babelOptions) {
  includes.forEach((include) => {
    webpackConfig.module.rules.push({
      test: /\.(js|jsx)$/,
      include: join(paths.appDirectory, include),
      loader: 'babel',
      options: babelOptions,
    });
  });
  return webpackConfig;
}
