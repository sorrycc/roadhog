import { basename, sep } from 'path';
import assert from 'assert';
import glob from 'glob';
import isPlainObject from 'is-plain-object';

const DEFAULT_ENTRY = './src/index.js';

function getEntry(filePath, isBuild) {
  const key = basename(filePath).replace(/\.(js|tsx?)$/, '');
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
  if (isPlainObject(entry)) {
    if (isBuild) {
      return entry;
    }

    return Object.keys(entry).reduce((memo, key) => (!Array.isArray(entry[key]) ? ({
      ...memo,
      [key]: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        entry[key],
      ],
    }) : ({
      ...memo,
      [key]: entry[key],
    })), {});
  }
  const files = entry ? getFiles(entry, appDirectory) : [DEFAULT_ENTRY];
  return getEntries(files, isBuild);
}
