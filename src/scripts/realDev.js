import server from '../dev';
import { argv } from 'yargs';

// 修复 Ctrl+C 时 dev server 没有正常退出的问题
process.on('SIGINT', () => {
  process.exit(1);
});

const ops = {};
if (argv._.length > 0) {
  const entry = argv._[0];
  ops.entry = entry;
}

server(ops);
