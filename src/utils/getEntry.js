import { join, basename, sep } from 'path';
import { existsSync } from 'fs';
import glob from 'glob';
import isPlainObject from 'is-plain-object';
import { webpackHotDevClientPath } from 'af-webpack/react-dev-utils';

// entry 支持 4 种格式：
//
// 1. 什么都没配，取 src/index.(j|t)sx?
// 2. 对象
// 3. 字符串
// 4. 数组
export default function(opts = {}) {
  const { cwd, entry, isBuild } = opts;

  let entryObj = null;
  if (!entry) {
    entryObj = {
      index: getExistsDefaultEntry(cwd),
    };
  } else if (typeof entry === 'string') {
    const files = getFiles(entry, cwd);
    entryObj = getEntries(files);
  } else if (Array.isArray(entry)) {
    const files = entry.reduce((memo, entryItem) => {
      return memo.concat(getFiles(entryItem, cwd));
    }, []);
    entryObj = getEntries(files);
  } else if (isPlainObject(entry)) {
    entryObj = entry;
  } else {
    throw new Error(
      `entry should be String, Array or Plain Object, but got ${entry}`,
    );
  }

  // Add HotDevClient
  if (isBuild) {
    return entryObj;
  } else {
    return Object.keys(entryObj).reduce(
      (memo, key) =>
        !Array.isArray(entryObj[key])
          ? {
              ...memo,
              [key]: [webpackHotDevClientPath, entryObj[key]],
            }
          : {
              ...memo,
              [key]: entryObj[key],
            },
      {},
    );
  }
}

function getEntry(filePath) {
  const key = basename(filePath).replace(/\.(j|t)sx?$/, '');
  return {
    [key]: filePath,
  };
}

function getFiles(entry, cwd) {
  const files = glob.sync(entry, {
    cwd,
  });
  return files.map(file => {
    return file.charAt(0) === '.' ? file : `.${sep}${file}`;
  });
}

function getEntries(files) {
  return files.reduce((memo, file) => {
    return {
      ...memo,
      ...getEntry(file),
    };
  }, {});
}

function getExistsDefaultEntry(cwd) {
  if (existsSync(join(cwd, './src/index.js'))) {
    return './src/index.js';
  }
  if (existsSync(join(cwd, './src/index.jsx'))) {
    return './src/index.jsx';
  }
  if (existsSync(join(cwd, './src/index.ts'))) {
    return './src/index.ts';
  }
  if (existsSync(join(cwd, './src/index.tsx'))) {
    return './src/index.tsx';
  }
  // default
  return './src/index.js';
}
