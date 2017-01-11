import { basename, sep } from 'path';
import assert from 'assert';
import glob from 'glob';

const DEFAULT_ENTRY = './src/index.js';

function getEntry(filePath, isProduction) {
  const key = basename(filePath, '.js');
  const value = isProduction
    ? [filePath]
    : [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      filePath,
    ];
  return {
    [key]: value,
  };
}

export function getFiles(entry, cwd) {
  if (Array.isArray(entry)) {
    return entry.reduce((memo, entryItem) => {
      return memo.concat(getFiles(entryItem, cwd));
    }, []);
  } else {
    assert(
      typeof entry === 'string',
      `getEntry/getFiles: entry type should be string, but got ${typeof entry}`,
    );
    const files = glob.sync(entry, {
      cwd,
    });
    return files.map((file) => {
      return (file.charAt(0) === '.') ? file : `.${sep}${file}`;
    });
  }
}

export function getEntries(files, isProduction) {
  return files.reduce((memo, file) => {
    return Object.assign(memo, getEntry(file, isProduction));
  }, {});
}

export default function (config, appDirectory) {
  const entry = config.entry;
  const isProduction = process.env.NODE_ENV === 'production';
  const files = entry ? getFiles(entry, appDirectory) : [DEFAULT_ENTRY];
  return getEntries(files, isProduction);
}
