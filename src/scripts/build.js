import chalk from 'chalk';
import yargs from 'yargs';
import build from '../build';

const argv = yargs.option('watch', {
  alias: 'w',
  default: false,
}).argv;

build({
  cwd: process.cwd(),
  watch: argv.watch,
}).catch(e => {
  console.error(chalk.red(`Build failed: ${e.message}`));
  console.log(e);
});
