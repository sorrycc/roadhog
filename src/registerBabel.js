import { join } from 'path';
import registerBabel from 'af-webpack/registerBabel';
import excapeRegExp from 'lodash.escaperegexp';

export default function(babelPreset, opts) {
  const { configOnly, disablePreventTest, ignore, cwd } = opts;
  const files = [
    '.roadhogrc.mock.js',
    '.webpackrc.js',
    'webpack.config.js',
    'mock',
    'src',
  ].map(file => {
    return excapeRegExp(join(cwd, file));
  });
  const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;

  registerBabel({
    only,
    ignore,
    babelPreset,
    disablePreventTest,
  });
}
