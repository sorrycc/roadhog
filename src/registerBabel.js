import { join } from 'path';
import registerBabel from 'af-webpack/registerBabel';
import winPath from './utils/winPath';

export default function(babelPreset, opts) {
  const { configOnly, disablePreventTest, ignore, cwd } = opts;
  const files = [
    'webpack.config.js',
    '.roadhogrc.js',
    '.roadhogrc.mock.js',
    winPath(join(cwd, 'mock')),
    winPath(join(cwd, 'src')),
  ];
  const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;

  registerBabel({
    only,
    ignore,
    babelPreset,
    disablePreventTest,
  });
}
