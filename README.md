# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

roadhog 是一个 cli 工具，提供 server 和 build 功能，在 create-react-app 的基础上进行扩展，提供 JSON 级别的简单配置。

---

## Why roadhog

由于 dva-cli 有不同于 create-react-app 的 webpack.config.js 配置需求，而 create-react-app 并不提供定制功能。

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

配置代理。

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

## LICENSE

MIT
