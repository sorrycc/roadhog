'use strict';

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _child_process = require('child_process');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = require('yargs').usage('Usage: roadhog test [options] [mocha-options]').option('coverage', {
  type: 'boolean',
  describe: 'Output coverage',
  default: false
}).help('h').argv;

var compiler = (0, _path.join)(__dirname, './test/compiler.js');
var setup = (0, _path.join)(__dirname, './test/setup.js');
var mochaArgs = process.argv.slice(2).filter(function (item) {
  return item !== '--coverage';
}).join(' ');
var mochaBin = require.resolve('mocha/bin/_mocha');
var istanbul = (0, _path.join)(require.resolve('istanbul'), '../lib/cli.js');
var cmd = argv.coverage ? 'node ' + istanbul + ' cover ' + mochaBin + ' -- --compilers .:' + compiler + ' --require ' + setup + ' ' + mochaArgs : mochaBin + ' --compilers .:' + compiler + ' --require ' + setup + ' ' + mochaArgs;

var command = _os2.default.platform() === 'win32' ? 'cmd.exe' : 'sh';
var args = _os2.default.platform() === 'win32' ? ['/s', '/c'] : ['-c'];

var cp = (0, _child_process.spawn)(command, args.concat([cmd]), {
  stdio: 'inherit'
});
cp.on('exit', function () {
  if (argv.coverage && _fs2.default.existsSync((0, _path.join)(process.cwd(), 'coverage/lcov-report/index.html'))) {
    console.log();
    console.log('You can see more detail in ' + _chalk2.default.cyan('coverage/lcov-report/index.html'));
    console.log();
  }
});