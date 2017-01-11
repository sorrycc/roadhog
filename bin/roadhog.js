#!/usr/bin/env node

const chalk = require('chalk');
const spawn = require('cross-spawn');
const os = require('os');

const script = process.argv[2];
const args = process.argv.slice(3);

const nodeVersion = process.versions.node;
const versions = nodeVersion.split('.');
const major = versions[0];
const minor = versions[1];
const platform = os.platform();

if (((major * 10) + (minor * 1)) < 65) {
  console.log(chalk.red(`Node version (${major}.${minor}) is not compatibile, ${chalk.cyan('must >= 6.5')}.`));
  console.log(chalk.red(`你的 Node 版本是 ${chalk.yellow(`${major}.${minor}`)}，请升级到${chalk.cyan(' 6.5 或以上')}.`));
  console.log();
  if (platform === 'darwin') {
    console.log(`推荐用 ${chalk.cyan('https://github.com/creationix/nvm')} 管理和升级你的 node 版本。`);
  } else if (platform === 'win32') {
    console.log(`推荐到 ${chalk.cyan('https://nodejs.org/')} 下载最新的 node 版本。`);
  }
  process.exit(1);
}

require('atool-monitor').emit();

var result; // eslint-disable-line

switch (script) {
  case '-v':
  case '--version':
    console.log(require('../package.json').version);
    break;
  case 'build':
  case 'server':
  case 'test':
    result = spawn.sync(
      'node',
      [require.resolve(`../lib/${script}`)].concat(args),
      { stdio: 'inherit' }  // eslint-disable-line
    );
    process.exit(result.status);
    break;
  default:
    console.log(`Unknown script ${chalk.cyan(script)}.`);
    break;
}
