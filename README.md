# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

[查看中文版](./README_zh-cn.md)

Roadhog is a cli tool with `dev`、`build` and `test` commands. It's based on react-dev-utils and is consistent with the experience of create-react-app. You can imagine this is a configurable version of create-react-app.

## Docs

* [2.0 发布日志](https://github.com/sorrycc/blog/issues/55)
* [Migrate from 1.x](./migrate-from-1.x.md)
* [1.x docs](https://github.com/sorrycc/roadhog/blob/1.x/README_en-us.md)

## Features
* 📦 out of the box React application development tools, built-in css-modules, babel, postcss, HMR, etc.
* 🐠 create-react-app experience
* 🚨 webpack configuration in JSON format
* 🔥 mock
* ✂️ test based on jest, ui test with enzyme

## Getting started
```bash
## Install globally or locally
$ npm i roadhog -g

## Check version
$ roadhog -v
2.0.0

## Local development
$ roadhog dev

## Build
$ roadhog build
$ NO_COMPRESS=1 roadhog build

## Test
$ roadhog test
```

## Mock
roadhog dev support mock, configured in  `.roadhogrc.mock.js`.

e.g.

```js
export default {
  // Support type as Object and Array
  'GET /api/users': { users: [1,2] },

  // Method like GET or POST can be omitted
  '/api/users/1': { id: 1 },

  // Support for custom functions, the API is the same as express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
```

## Use the public directory

Files in the public directory would be copied to the output directory (by default `./dist`) on the dev and build. So favicon, iconfont, html, html quoted pictures could be stored here.

## Configuration

umi's webpack part is based on the af-webpack's implementation. For configuration, create `.webpackrc` in the project root. The format is JSON, e.g.

```js
{
  "externals": { "react": "window.React" }
}
```

If you prefer JS configuration, or need to do some programming or abstract judgment, you can use `.webpackrc.js` configuration file, support ES6 syntax, e.g.

```js
export default {
  externals: { react: 'window.React' },
}
```

Index:

* [entry](#entry)
* [theme](#theme)
* [define](#define)
* [externals](#externals)
* [alias](#alias)
* [browserslist](#browserslist)
* [publicPath](#publicpath)
* [outputPath](#outputpath)
* [devtool](#devtool)
* [commons](#commons)
* [hash](#hash)
* [html](#html)
* [disableCSSModules](#disablecssmodules)
* [disableCSSSourceMap](#disablecsssourcemap)
* [extraBabelPresets](#extrababelpresets)
* [extraBabelPlugins](#extrababelplugins)
* [extraBabelIncludes](#extrababelincludes)
* [copy](#copy)
* [proxy](#proxy)
* [sass](#sass)
* [manifest](#manifest)
* [ignoreMomentLocale](#ignoremomentlocale)
* [disableDynamicImport](#disabledynamicimport)
* [env](#env)

### entry

### theme

Configure the theme, in fact, with less variables. Support both object and string type, the string needs to point to a file which return configurations.

e.g.

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

or,

```
"theme": "./theme-config.js"
```

### define

Pass to code through the webpack's DefinePlugin plugin, the value will automatically be processed with `JSON.stringify`.

e.g.

```js
"define": {
  "process.env.TEST": 1,
  "USE_COMMA": 2,
}
```

### externals

Configure webpack's [externals] (https://webpack.js.org/configuration/externals/) property.

e.g.

```js
// Don't pack react and react-dom
"externals": {
  "react": "window.React",
  "react-dom": "window.ReactDOM"
}
```

### alias

Configure webpack's [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) property.

### browserslist

Configure [browserslist](https://github.com/ai/browserslist), works on both babel-preset-env and autoprefixer.

e.g.

```js
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### publicPath

Configure webpack's [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) property.

### outputPath

Configure webpack's [output.path](https://webpack.js.org/configuration/output/#output-path) property.

### devtool

Configure webpack's [devtool](https://webpack.js.org/configuration/devtool/) property.

### commons

Configure webpack's [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) plugin, the format is Array.

e.g.

```markup
"commons": [
  {
    async: '__common',
    children: true,
    minChunks(module, count) {
      if (pageCount <= 2) {
        return count >= pageCount;
      }
      return count >= pageCount * 0.5;
    },
  },
]
```

### hash

Configuration to build with hash file name, and it's usually used in conjunction with the [manifest](#manifest).

### html

Configure [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) plugin.

e.g.

```markup
"html": {
  "template": "./src/index.ejs"
}
```

### disableCSSModules

Disable [CSS Modules](https://github.com/css-modules/css-modules)，we do not recommend doing this.

### disableCSSSourceMap

Disable generate CSS's SourceMap.

### extraBabelPresets

Define an additional list of babel presets, the formatt is Array.

### extraBabelPlugins

Define an additional list of babel plugins, the formatt is Array.

### extraBabelIncludes

Define an additional list of file matches that need to be transformed with babel, the format is Array.

### copy

Define a list of files that need to be copied. The format is an array, and the format of the item refers to the configuration of [copy-webpack-plugin] (https://github.com/webpack-contrib/copy-webpack-plugin).

e.g.

```markup
"copy": [
  {
    "from": "",
    "to": ""
  }
]
```

### proxy

Configure the [proxy] (https://webpack.js.org/configuration/dev-server/#devserver-proxy) property of webpack-dev-server.

e.g. proxy requests to other servers,

```markup
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

Then visit `/ api / users` to access the data from [http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users].

### sass

Configure the options for [node-sass] (https://github.com/sass/node-sass#options). Note: node-sass and sass-loader dependencies must be installed in the project directory when using sass.

### manifest

Configure to generate manifest.json, it's option will pass to [https://www.npmjs.com/package/webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin).

e.g.

```markup
"manifest": {
  "basePath": "/app/"
}
```

### ignoreMomentLocale

Ignore moment locale file, used to reduce the size.

### disableDynamicImport

Disable `import ()` to load on demand, but bundle all the files in a single file, implement via [babel-plugin-dynamic-import-node-sync](https://github.com/seeden/babel-plugin-dynamic-import-node-sync).

### env

Set specific options for certain environment. `development` is for dev, and `production` is for build.

e.g.

```js
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

Thus, extraBabelPlugins in development is `['transform-runtime', 'dva-hmr']`, and `['transform-runtime']` in production.

## Environment Variables

You can temporarily configure some parameters for environment variables, including:

* `PORT`, default 8000
* `HOST`, default localhost
* `ANALYZE`, whether to analyze the output bundle in `roadhog build`
* `DISABLE_ESLINT`, disable eslint check
* `NO_COMPRESS`, don't compress file in `roadhog build`

e.g. start dev server with port 3000,

```bash
# OS X, Linux
$ PORT=3000 roadhog dev

# Windows (cmd.exe)
$ set PORT=3000&&roadhog dev

# Or use cross-env for all platforms
$ cross-env PORT=3000 roadhog dev
```

## FAQ

### Why is it called roadhog ?

roadhog is a hero from overwatch, just like [dva](https://github.com/dvajs/dva).

<img src="https://gw.alipayobjects.com/zos/rmsportal/nnuuSFhDFUOfvYSRyvBh.png" width="405" height="411" />

## LICENSE

MIT
