import { join } from 'path';

export default function (webpackConfig, paths, includes = []) {
  includes.forEach((include) => {
    webpackConfig.module.loaders.push({
      test: /\.(js|jsx)$/,
      include: join(paths.appDirectory, include),
      loader: 'babel',
    });
  });
  return webpackConfig;
}
