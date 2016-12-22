const path = require('path');
const fs = require('fs');
const os = require('os');
const child_process = require('child_process');
const chalk = require('chalk');

const argv = require('yargs')
  .usage('Usage: roadhog test [options] [mocha-options]')
  .option('coverage', {
    type: 'boolean',
    describe: 'Output coverage',
    default: false,
  })
  .help('h')
  .argv;

const compiler = path.join(__dirname, './test/compiler.js');
const setup = path.join(__dirname, './test/setup.js');
const mochaArgs = process.argv.slice(2).filter(item => item !== '--coverage').join(' ');
const mochaBin = path.join(__dirname, '../node_modules/.bin/_mocha');
const istanbul = path.join(require.resolve('istanbul'), '../lib/cli.js');
const cmd = argv.coverage ?
  `node ${istanbul} cover ${mochaBin} -- --compilers .:${compiler} --require ${setup} ${mochaArgs}` :
  `${mochaBin} --compilers .:${compiler} --require ${setup} ${mochaArgs}`;

const command = (os.platform() === 'win32' ? 'cmd.exe' : 'sh');
const args = (os.platform() === 'win32' ? ['/s', '/c'] : ['-c']);

const cp = child_process.spawn(command, args.concat([cmd]), {
  stdio: 'inherit',
});
cp.on('exit', () => {
  if (argv.coverage && fs.existsSync(path.join(process.cwd(), 'coverage/lcov-report/index.html'))) {
    console.log();
    console.log(`You can see more detail in ${chalk.cyan('coverage/lcov-report/index.html')}`);
    console.log();
  }
});
