import { join } from 'path';
import registerBabel from 'af-webpack/registerBabel';
import winPath from './utils/winPath';
import excapeRegExp from 'lodash.escaperegexp';

export default function(babelPreset, opts) {
  const { configOnly, disablePreventTest, ignore, cwd } = opts;
  const files = [
    '.roadhogrc.mock.js',
    'webpack.config.js',
    '.webpackrc.js',
    // 'dead-simple\\mock',
    excapeRegExp(join(cwd, 'mock')),
    excapeRegExp(join(cwd, 'src')),
  ];
  console.log('mock files', files);
  const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;

  registerBabel({
    only,
    ignore,
    babelPreset,
    disablePreventTest,
  });
}
