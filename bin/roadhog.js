#!/usr/bin/env node

const chalk = require('chalk');
const spawn = require('cross-spawn');

const script = process.argv[2];
const args = process.argv.slice(3);

const nodeVersion = process.versions.node;
const versions = nodeVersion.split('.');
const major = versions[0];
const minor = versions[1];

if (major * 10 + minor * 1 < 65) {
  console.log(`Node version must >= 6.5, but got ${major}.${minor}`);
  process.exit(1);
}

var result; // eslint-disable-line

const scriptAlias = {
  server: 'dev',
};
const aliasedScript = scriptAlias[script] || script;
switch (aliasedScript) {
  case '-v':
  case '--version':
    console.log(require('../package.json').version);
    if (__dirname.indexOf('/Users/chencheng/Documents/Work/Misc') > -1) {
      console.log(chalk.cyan('@local'));
    }
    break;
  case 'build':
  case 'dev':
  case 'test':
    require('atool-monitor').emit();
    result = spawn.sync(
      'node',
      [require.resolve(`../lib/scripts/${script}`)].concat(args),
      { stdio: 'inherit' }, // eslint-disable-line
    );
    process.exit(result.status);
    break;
  default:
    console.log(`Unknown script ${chalk.cyan(script)}.`);
    break;
}
