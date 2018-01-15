# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

[View English version](./README.md)

Roadhog 是一个包含 `dev`、`build` 和 `test` 的命令行工具，他基于 [react-dev-utils](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-dev-utils)，和 [create-react-app](https://github.com/facebookincubator/create-react-app) 的体验保持一致。你可以想象他为可配置版的 create-react-app。

## Docs

* [2.0 发布日志](https://github.com/sorrycc/blog/issues/55)
* [如何从 1.x 升级？](./migrate-from-1.x.md)
* [1.x 文档](https://github.com/sorrycc/roadhog/blob/1.x/README_en-us.md)

## Features
* 📦 开箱即用的 react 应用开发工具，内置 css-modules、babel、postcss、HMR 等
* 🚨 create-react-app 的体验
* 🐠 JSON 格式的 webpack 配置
* ✂️ mock
* 🔥 基于 jest 的 test，包括 UI 测试（基于 enzyme）


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
roadhog dev 支持 mock 功能，在 `.roadhogrc.mock.js` 中进行配置，支持基于 require 动态分析的实时刷新，支持 ES6 语法，以及友好的出错提示。

示例：

```js
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1,2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
```

## 使用 public 目录
我们约定 public 目录下的文件会在 dev 和 build 时被自动 copy 到输出目录（默认是 ./dist）下。所以可以在这里存放 favicon, iconfont, html, html 里引用的图片等。

## 配置
umi 的 webpack 部分功能是基于 af-webpack 实现的。如需配置，在项目根目录新建 .webpackrc 完成，格式为 JSON，比如：

```js
{
  "externals": { "react": "window.React" }
}
```

如果你偏爱 JS 的配置方式，或者需要通过编程的方式做一些判断或者抽象，可以用 .webpackrc.js配置文件，支持 ES6 语法，比如：

```js
export default {
  externals: { react: 'window.React' },
}
```

索引：

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

指定 webpack 入口文件，支持 [glob](https://github.com/isaacs/node-glob) 格式。

比如你的项目是多页类型，会希望把 src/pages 的文件作为入口。可以这样配：

```
"entry": "src/pages/*.js"
```

### theme
配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。
比如：

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

或者，

```
"theme": "./theme-config.js"
```

### define
通过 webpack 的 DefinePlugin 传递给代码，值会自动做 `JSON.stringify` 处理。
比如：

```js
"define": {
  "process.env.TEST": 1,
  "USE_COMMA": 2,
}
```

### externals
配置 webpack 的?[externals](https://webpack.js.org/configuration/externals/)?属性。
比如：

```js
// 配置 react 和 react-dom 不打入代码
"externals": {
  "react": "window.React",
  "react-dom": "window.ReactDOM"
}
```

### alias
配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性。

### browserslist
配置 [browserslist](https://github.com/ai/browserslist)，同时作用于 babel-preset-env 和 autoprefixer。
比如：

```js
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### publicPath
配置 webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性。

### outputPath
配置 webpack 的?[output.path](https://webpack.js.org/configuration/output/#output-path)?属性。

### devtool
配置 webpack 的 [devtool](https://webpack.js.org/configuration/devtool/) 属性。

### commons

配置 webpack 的 [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) 插件，格式为数组，有几项配几个 CommonsChunkPlugin 。

比如：

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

配置让构建产物文件名带 hash，通常会和 [manifest](#manifest) 配合使用。

### html

配置 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 插件。

比如：

```markup
"html": {
  "template": "./src/index.ejs"
}
```

### disableCSSModules

禁用 [CSS Modules](https://github.com/css-modules/css-modules)。

### disableCSSSourceMap

禁用 CSS 的 SourceMap 生成。

### extraBabelPresets

定义额外的 babel preset 列表，格式为数组。

### extraBabelPlugins

定义额外的 babel plugin 列表，格式为数组。

### extraBabelIncludes

定义额外需要做 babel 转换的文件匹配列表，格式为数组。

### copy

定义需要单纯做复制的文件列表，格式为数组，项的格式参考 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 的配置。

比如：

```markup
"copy": [
  {
    "from": "",
    "to": ""
  }
]
```

### proxy

配置 webpack-dev-server 的 [proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) 属性。
如果要代理请求到其他服务器，可以这样配：

```markup
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

然后访问?`/api/users`?就能访问到?[http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users)?的数据。

### sass
配置 [node-sass](https://github.com/sass/node-sass#options) 的选项。注意：使用 sass 时需在项目目录安装 node-sass 和 sass-loader 依赖。

### manifest
配置后会生成 manifest.json，option 传给 [https://www.npmjs.com/package/webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin)。
比如：

```markup
"manifest": {
  "basePath": "/app/"
}
```

### ignoreMomentLocale

忽略 moment 的 locale 文件，用于减少尺寸。

### disableDynamicImport

禁用 `import()` 按需加载，全部打包在一个文件里，通过 [babel-plugin-dynamic-import-node-sync](https://github.com/seeden/babel-plugin-dynamic-import-node-sync) 实现。

### env

针对特定的环境进行配置。dev 的环境变量是?`development`，build 的环境变量是?`production`。
比如：

```js
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

这样，开发环境下的 extraBabelPlugins 是?`["transform-runtime", "dva-hmr"]`，而生产环境下是?`["transform-runtime"]`。

## 环境变量

可环境变量临时配置一些参数，包括：

* `PORT`，端口号，默认 8000
* `HOST`，默认 localhost
* `ANALYZE`，是否在 build 时分析构建产物
* `DISABLE_ESLINT`，禁用 eslint 检测
* `NO_COMPRESS`, build 时不压缩

比如使用 3000 端口启动 dev server，

```bash
# OS X, Linux
$ PORT=3000 roadhog dev

# Windows (cmd.exe)
$ set PORT=3000&&roadhog dev

# Or use cross-env for all platforms
$ cross-env PORT=3000 roadhog dev
```

## FAQ

### 为什么叫 roadhog ?

roadhog 即路霸，和 [dva](https://github.com/dvajs/dva) 一样，是守望先锋中的另一名英雄，希望能为 dva 保驾护航。

<img src="https://gw.alipayobjects.com/zos/rmsportal/BEPYXIglOwaeUroviDQr.png" width="200" height="200" />

## LICENSE

MIT
