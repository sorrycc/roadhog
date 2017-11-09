import chalk from 'chalk';
import build from '../build';

build({
  cwd: process.cwd(),
})
  .catch((e) => {
    console.error(chalk.red(`Build failed: ${e.message}`));
    console.log(e);
  });
