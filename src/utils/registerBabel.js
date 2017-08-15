import { join } from 'path';
import winPath from './winPath';

const cwd = process.cwd();
const files = [
  'webpack.config.js',
  '.roadhogrc.js',
  '.roadhogrc.mock.js',
  winPath(join(cwd, 'mock')),
  winPath(join(cwd, 'src')),
];

if (process.env.NODE_ENV !== 'test') {
  require('babel-register')({
    only: new RegExp(`(${files.join('|')})`),
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins: [
      require.resolve('babel-plugin-add-module-exports'),
    ],
    babelrc: false,
  });
}
