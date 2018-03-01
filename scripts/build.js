const vfs = require('vinyl-fs');
const babel = require('@babel/core');
const through = require('through2');
const chalk = require('chalk');
const rimraf = require('rimraf');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const chokidar = require('chokidar');

const nodeBabelConfig = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: 6,
        },
      },
    ],
    require.resolve('@babel/preset-stage-0'),
  ],
};
const browserBabelConfig = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        browsers: ['last 2 versions', 'IE 10'],
      },
    ],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-stage-0'),
  ],
};

const BROWSER_FILES = [];
const cwd = process.cwd();

function isBrowserTransform(path) {
  return BROWSER_FILES.includes(path.replace(`${cwd}/`, ''));
}

function transform(opts = {}) {
  const { content, path } = opts;
  const isBrowser = isBrowserTransform(path);
  console.log(
    chalk[isBrowser ? 'yellow' : 'blue'](
      `[TRANSFORM] ${path.replace(`${cwd}/`, '')}`,
    ),
  );
  const config = isBrowser ? browserBabelConfig : nodeBabelConfig;
  return babel.transform(content, config).code;
}

function build() {
  rimraf.sync(join(cwd, 'lib'));
  return vfs
    .src(`./src/**/*.js`)
    .pipe(
      through.obj((f, enc, cb) => {
        f.contents = new Buffer( // eslint-disable-line
          transform({
            content: f.contents,
            path: f.path,
          }),
        );
        cb(null, f);
      }),
    )
    .pipe(vfs.dest(`./lib/`));
}

function init() {
  const arg = process.argv[2];
  const isWatch = arg === '-w' || arg === '--watch';
  build();
  if (isWatch) {
    const watcher = chokidar.watch(join(cwd, 'src'), {
      ignoreInitial: true,
    });
    watcher.on('all', (event, fullPath) => {
      const relPath = fullPath.replace(`${cwd}/src/`, '');
      const content = readFileSync(fullPath, 'utf-8');
      try {
        const code = transform({
          content,
          path: fullPath,
        });
        writeFileSync(join(cwd, 'lib', relPath), code, 'utf-8');
      } catch (e) {
        console.log(chalk.red('Compiled failed.'));
        console.log(chalk.red(e.message));
      }
    });
  }
}

init();
