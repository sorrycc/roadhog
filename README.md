# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

[View README in English](./README_en-us.md)

roadhog 是一个 cli 工具，提供 `server`、 `build` 和 `test` 三个命令，分别用于本地调试和构建，并且提供了特别易用的 [mock 功能](#mock)。命令行体验和 create-react-app 一致，配置略有不同，比如默认开启 [css modules](https://github.com/css-modules/css-modules)，**然后还提供了 [JSON 格式的配置方式](https://github.com/sorrycc/roadhog#配置)**。

* [介绍 roadhog —— 让 create-react-app 可配的命令行工具](https://github.com/sorrycc/blog/issues/15)
* [从 atool-build + dora 到 roadhog](https://github.com/sorrycc/blog/issues/17)

---

<p align="center">
  <img src="https://zos.alipayobjects.com/rmsportal/vpkwOtXNukXpeQBNToEb.gif" width="926" height="521" />
</p>

## Why roadhog

由于 [create-react-app](https://github.com/facebookincubator/create-react-app) 的默认配置不能满足需求，而他又不提供定制的功能，于是基于他实现了一个可配置版。所以如果既要 create-react-app 的优雅体验，又想定制配置，那么可以试试 roadhog 。

## Getting Started

### 安装

```bash
$ npm i roadhog -g
```

### 使用

本地开发

```bash
$ roadhog server
```

打包发布

```bash
$ roadhog build
```

测试，默认会跑 `./test` 目录下的所有文件

```bash
$ roadhog test
```

## 特性

### 错误处理

感谢 create-react-app，roadhog 在错误处理上有着良好的体验。此外，roadhog 针对 `.roadhogrc` 的解析错误也做了优化。

#### .roadhogrc 解析错误

<img src="https://zos.alipayobjects.com/rmsportal/wPGMQwhZmFhGddMZKFci.png" width="809" height="585" />

#### 语法错误

控制台

<img src="https://zos.alipayobjects.com/rmsportal/BWnfDJQqlnGvHSZxOVuY.png" width="809" height="585" />

浏览器

<img src="https://zos.alipayobjects.com/rmsportal/onzXGetQRKGmWQXmICDC.png" width="893" height="751" />

#### 运行时错误

没有捕获，在浏览器的控制台查看。

#### .roadhogrc.mock.js 解析错误

<img src="https://zos.alipayobjects.com/rmsportal/awkFmHoxLWdRgbTlCzDF.png" width="745" height="551" />

### HMR (热替换)

CSS 在开发模式下会走 style-loader (被内嵌在 JavaScript 文件中)，所以只要保证 JavaScript 的热更新，即可实现 CSS 的热更新。

如果大家使用 [dva](https://github.com/dvajs/dva) ，配上 [babel-plugin-dva-hmr](https://github.com/dvajs/babel-plugin-dva-hmr) 即可实现 routes 和 components 以及相关 CSS 修改的热更新，其他修改会自动刷新页面。

```json
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

### Mock

roadhog server 支持 mock 功能，类似 [dora-plugin-proxy](https://github.com/dora-js/dora-plugin-proxy)，在 `.roadhogrc.mock.js` 中进行配置，支持基于 require 动态分析的实时刷新，支持 ES6 语法，以及友好的出错提示。

比如：

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

### 智能重启

配置文件修改的修改会触发 roadhog server 的自动重启，会触发重启的文件有：

* `.roadhogrc`
* `.roadhogrc.js`
* `.roadhogrc.mock.js`
* theme 配置指定的文件

## 配置

关于配置的一些基本概念：

* 配置存于 `.roadhogrc` 文件中（如果你不喜欢 JSON 配置，可以用 `.roadhogrc.js` 以 JS 的方式编写，支持 ES6）
* 格式为 `JSON`，允许注释
* 布尔类型的配置项默认值均为 `false`
* 支持通过 `webpack.config.js` 以编码的方式进行配置，但不推荐，因为 roadhog 本身的 major 或 minor 升级可能会引起兼容问题。使用时会给予警告⚠️⚠️⚠️，详见 [#36](https://github.com/sorrycc/roadhog/issues/36) 。（`webpack.config.js` 本身的编写支持 ES6，会通过 babal-register 做一层转换。）

默认配置：

```json
{
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  "outputPath": "./dist",
  "extraBabelPlugins": [],
  "extraPostCSSPlugins": [],
  "autoprefixer": null,
  "proxy": null,
  "externals": null,
  "multipage": false,
  "define": null,
  "env": null,
  "theme": null,
}
```

查看更多[配置相关问题和改进](https://github.com/sorrycc/roadhog/issues?q=is%3Aissue+is%3Aopen+label%3Aconfig)。

### entry

指定 webpack 入口文件，支持 [glob](https://github.com/isaacs/node-glob) 格式。

如果你的项目是多页类型，会希望把 `src/pages` 的文件作为入口。可以这样配：

```
"entry": "src/pages/*.js"
```

### disableCSSModules

禁用 [CSS Modules](https://github.com/css-modules/css-modules)。最好别关，熟悉并使用他后，你会发现写样式简单了很多。

### publicPath

配置生产环境的 [publicPath](http://webpack.github.io/docs/configuration.html#output-publicpath)，开发环境下永远为 `/`。

### outputPath

配置[输出路径](http://webpack.github.io/docs/configuration.html#output-path)，默认是 `./dist`。

### extraBabelPlugins

配置额外的 babel plugin。babel plugin 只能添加，不允许覆盖和删除。

比如，同时使用 antd, dva 时，通常需要这么配：

```
"extraBabelPlugins": [
  "transform-runtime",
  "dva-hmr",
  ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
]
```

同时安装相关依赖：

```bash
$ npm i babel-plugin-transform-runtime babel-plugin-import babel-plugin-dva-hmr --save-dev
$ npm i babel-runtime --save
```

注意：这么配还有个问题，`dva-hmr` 是开发环境的插件，如果 build 时也用上就会打出冗余代码。解决方案详见 [#env](#env)。

### extraPostCSSPlugins

配置额外的 postcss 插件。

注意：由于 postcss 的插件是以函数的方式进行配置的，所以这个配置只能在 `.roadhogrc.js` 里使用。

比如：

```
extraPostCSSPlugins: [
  pxtorem({
    rootValue: 100,
    propWhiteList: [],
  }),
],
```

### autoprefixer

配置 autoprefixer 参数，详见 [autoprefixer](https://github.com/postcss/autoprefixer) 和 [browserslist](https://github.com/ai/browserslist#queries)。

比如，如果是做移动端的开发，可以配成：

```
"autoprefixer": {
  "browsers": [
    "iOS >= 8", "Android >= 4"
  ]
}
```

### proxy

配置代理，详见 [webpack-dev-server#proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy)。

如果要代理请求到其他服务器，可以这样配：

```
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

然后访问 `/api/users` 就能访问到 http://jsonplaceholder.typicode.com/users 的数据。

如果要做数据 mock，可以考虑和 [json-server](https://github.com/typicode/json-server) 结合使用，把 `/api` 代理到 json-server 启动的端口。

### externals

配置 webpack 的 [externals](http://webpack.github.io/docs/configuration.html#externals) 属性。

### multipage

配置是否多页应用。多页应用会自动提取公共部分为 common.js 和 common.css 。

### define

配置 webpack 的 [DefinePlugin](http://webpack.github.io/docs/list-of-plugins.html#defineplugin) 插件，define 的值会自动做 `JSON.stringify` 处理。

### env

针对特定的环境进行配置。server 的环境变量是 `development`，build 的环境变量是 `production`。

比如：

```
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

这样，开发环境下的 extraBabelPlugins 是 `["transform-runtime", "dva-hmr"]`，而生产环境下是 `["transform-runtime"]`。

### theme

配置主题，实际上是配 less 的 `modifyVars`。支持 Object 和文件路径两种方式的配置。

比如：

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

或者，

```
"theme": "./node_modules/abc/theme-config.js"
```

这里有 [如何配置 antd theme 的例子](https://github.com/dvajs/dva-example-user-dashboard/commit/d6da33b3a6e18eb7f003752a4b00b5a660747c31) 。

### svgSpriteLoaderDirs

配置一个路径数组, 该路径下的 svg 文件会全部交给 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) 处理

比如，使用 antd-mobile 的 [自定义 svg icon](https://mobile.ant.design/components/icon) 功能的用户，可以在 `.roadhogrc.js` 文件中做如下配置

```js
// npm i antd-mobile -S
const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/my-project-svg-foler'),  // 业务代码本地私有 svg 存放目录
];

export default {
  // ...
  svgSpriteLoaderDirs: svgSpriteDirs,
  //...
}

```


## 环境变量

可环境变量临时配置一些参数，包括：

* `PORT`, 端口号，默认 8000
* `HOST`, 默认 localhost
* `HTTPS`，是否开启 https，默认关闭

比如，使用 3000 端口开启服务器可以这样：

```bash
// OS X, Linux
$ PORT=3000 roadhog server

// Windows (cmd.exe)
$ set PORT=3000&&roadhog server
```

## 命令行参数

### roadhog server

```bash
$ roadhog server -h
Usage: roadhog server [options]

Options:
  --open  Open url in browser after started            [boolean] [default: true]
  -h      Show help                                                    [boolean]
```

### roadhog build

```bash
$ roadhog build -h
Usage: roadhog build [options]

Options:
  --debug            Build without compress           [boolean] [default: false]
  --watch, -w        Watch file changes and rebuild   [boolean] [default: false]
  --output-path, -o  Specify output path                [string] [default: null]
  --analyze          Visualize and analyze your Webpack bundle.
                                                      [boolean] [default: false]
  -h                 Show help                                         [boolean]
```

### roadhog test

```bash
$ roadhog test -h
Usage: roadhog test [options] [mocha-options]

Options:
  --coverage  Output coverage                         [boolean] [default: false]
  -h          Show help                                                [boolean]
```

## 使用 `public` 目录
我们约定 `public` 目录下的文件会在 server 和 build 时被自动 copy 到输出目录（默认是 `./dist`）下。所以可以在这里存放 favicon, iconfont, html, html 里引用的图片等。

## FAQ

### 那么为什么提供 JSON 级别的约定型配置，而非类似 webpack.config.js 的编码型配置?

首先是 JSON 的方式比较简单，`true`/`false` 或是一些简单的字符串就可完成配置；另外，JSON 方式能有效控制使用场景，而编程式的非常不可控，roadhog 的一个简单改动都可能导致之前的配置不可用。

### 为什么叫 roadhog ?

roadhog 即路霸，和 [dva](https://github.com/dvajs/dva) 一样，是守望先锋中的另一名英雄，希望能为 dva 保驾护航。

<img src="https://zos.alipayobjects.com/rmsportal/guCnwwMItoLOTmcdbaEZ.png" width="200" height="200" />

### 报 `Unexpected token` 错误，类似下面这样

```
Error in ./index.js
Module parse failed: /Users/chencheng/Documents/Work/Misc/dva-cli/boilerplates/demo/index.js Unexpected token (15:23)
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token (15:23)
 @ multi index
```

把源码放到 src 目录下，因为非 src 目录下的文件不会走 babel 编译。

### Windows/Ubuntu 下每次启动后打开新 Tab 比较烦

```bash
$ roadhog server --no-open
```

## LICENSE

MIT
