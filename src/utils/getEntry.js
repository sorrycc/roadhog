import { basename, sep } from 'path';
import assert from 'assert';
import glob from 'glob';

const DEFAULT_ENTRY = './src/index.js';

function getEntry(filePath, isBuild) {
  const key = basename(filePath, '.js');
  const value = isBuild
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

export function getEntries(files, isBuild) {
  return files.reduce((memo, file) => {
    return Object.assign(memo, getEntry(file, isBuild));
  }, {});
}

export default function (config, appDirectory, isBuild) {
  const entry = config.entry;
  const files = entry ? getFiles(entry, appDirectory) : [DEFAULT_ENTRY];
  return getEntries(files, isBuild);
}
