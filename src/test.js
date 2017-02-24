import { join } from 'path';
import fs from 'fs';
import os from 'os';
import { spawn } from 'child_process';
import chalk from 'chalk';

const argv = require('yargs')
  .usage('Usage: roadhog test [options] [mocha-options]')
  .option('coverage', {
    type: 'boolean',
    describe: 'Output coverage',
    default: false,
  })
  .help('h')
  .argv;

const compiler = join(__dirname, './test/compiler.js');
const setup = join(__dirname, './test/setup.js');
const mochaArgs = process.argv.slice(2).filter(item => item !== '--coverage').join(' ');
const mochaBin = require.resolve('mocha/bin/_mocha');
const istanbul = join(require.resolve('istanbul'), '../lib/cli.js');
const cmd = argv.coverage ?
  `node ${istanbul} cover ${mochaBin} -- --compilers .:${compiler} --require ${setup} ${mochaArgs}` :
  `${mochaBin} --compilers .:${compiler} --require ${setup} ${mochaArgs}`;

const command = (os.platform() === 'win32' ? 'cmd.exe' : 'sh');
const args = (os.platform() === 'win32' ? ['/s', '/c'] : ['-c']);

const cp = spawn(command, args.concat([cmd]), {
  stdio: 'inherit',
});
cp.on('exit', () => {
  if (argv.coverage && fs.existsSync(join(process.cwd(), 'coverage/lcov-report/index.html'))) {
    console.log();
    console.log(`You can see more detail in ${chalk.cyan('coverage/lcov-report/index.html')}`);
    console.log();
  }
});
