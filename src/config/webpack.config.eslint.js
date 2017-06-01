import applyWebpackConfig from '../utils/applyWebpackConfig';
import getConfig from '../utils/getConfig';
import getPaths from './paths';

export default function () {
  const paths = getPaths(process.cwd());
  const argv = {
    debug: false,
    watch: false,
    'output-path': null,
    outputPath: null,
    analyze: false,
    h: false,
  };

  const rcConfig = getConfig('production', process.cwd());
  const outputPath = argv.outputPath || rcConfig.outputPath || 'dist';
  const appBuild = paths.resolveApp(outputPath);

  return applyWebpackConfig(
    require('./webpack.config.prod')(argv, appBuild, rcConfig, paths),
    process.env.NODE_ENV,
  );
}
