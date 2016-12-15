# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

一个 cli 工具，提供 server 和 build 功能，在 create-react-app 的基础上进行扩展，提供 [JSON 级别的简单配置](https://github.com/sorrycc/roadhog#配置)。

---

<p align="center">
  <img src="https://zos.alipayobjects.com/rmsportal/vpkwOtXNukXpeQBNToEb.gif" width="926" height="521" />
</p>

## Why roadhog

由于 [create-react-app](https://github.com/facebookincubator/create-react-app) 的默认配置不能满足需求，而他又不提供定制的功能，所以我们基于他实现了一个可配置版的。

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

## 配置

关于配置的一些基本概念：

- 配置存于 `.roadhogrc` 文件中
- 格式为 `JSON`，允许注释
- 布尔类型的配置项默认值均为 `false`

默认配置：

```json
{
  "entry": "src/index.js",
  "disableCSSModules": false,
  "less": false,
  "publicPath": "/",
  "extraBabelPlugins": [],
  "autoprefixer": null,
  "proxy": null,
  "env": null,
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

### less

开启 less 。

### publicPath

配置生产环境的 [publicPath](http://webpack.github.io/docs/configuration.html#output-publicpath)，开发环境下永远为 `/`。

### extraBabelPlugins

配置额外的 babel plugin。babel plugin 只能添加，不允许覆盖和删除。

比如，同时使用 antd, dva 时，通常需要这么配：

```
"extraBabelPlugins": [
  "transform-runtime",
  "dva-hmr",
  ["import", { "libraryName": "antd", "libarayDirectory": "lib", "style": "css" }]
]
```

同时安装相关依赖：

```bash
$ npm i babel-plugin-transform-runtime babel-plugin-import babel-plugin-dva-hmr --save-dev
$ npm i babel-runtime --save
```

注意：这么配还有个问题，`dva-hmr` 是开发环境的插件，如果 build 时也用上就会打出冗余代码。解决方案详见 [#env](#env)。

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

配置代理，详见 [webpack-dev-server#proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy)。(注意：仅支持 JSON 格式的配置，不支持 `bypass`。)

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

## 环境变量

可环境变量临时配置一些参数，包括：

- `PORT`, 端口号，默认 8000
- `HOST`, 默认 localhost
- `HTTPS`，是否开启 https，默认关闭

比如，使用 3000 端口开启服务器可以这样：

```bash
$ PORT=3000 roadhog server
```

## FAQ

### 那么为什么提供 JSON 级别的约定型配置，而非类似 webpack.config.js 的编码型配置?

首先是 JSON 的方式比较简单，`true`/`false` 或是一些简单的字符串就可完成配置；另外，JSON 方式能有效控制使用场景，而编程式的非常不可控，roadhog 的一个简单改动都可能导致之前的配置不可用。

### 为什么叫 roadhog

roadhog 即路霸，和 [dva](https://github.com/dvajs/dva) 一样，是守望先锋中的另一名英雄，希望能为 dva 保驾护航。

## LICENSE

MIT
