# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

[以中文查看](./README.md)

roadhog ia a cli tool with `server` and `build` command. It has the same experience of create-react-app, slightly different configuration, and also **provide [JSON format configuration](https://github.com/sorrycc/roadhog#Configuration)**。

---

<p align="center">
  <img src="https://zos.alipayobjects.com/rmsportal/vpkwOtXNukXpeQBNToEb.gif" width="926" height="521" />
</p>

## Why roadhog

[create-react-app](https://github.com/facebookincubator/create-react-app) can not be configured, but we have different configuration requirements. I believe more than I will have this idea.

## Getting Started

### Installation

```bash
$ npm i roadhog -g
```

### Usage

Local development.

```bash
$ roadhog server
```

Build for production.

```bash
$ roadhog build
```

## Configuration

Some basic concepts about configuration:

- Configuration is stored in the `.roadhogrc` file
- `JSON` format, comments allowed
- Default value of boolean configuration item is always `false`

Default configuration:

```json
{
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  "extraBabelPlugins": [],
  "autoprefixer": null,
  "proxy": null,
  "env": null,
}
```

[More issues and feature requests](https://github.com/sorrycc/roadhog/issues?q=is%3Aissue+is%3Aopen+label%3Aconfig) about configuration.

### entry

Specify entry files for webpack, support [glob](https://github.com/isaacs/node-glob).

e.g.

```
// src/index.js only
"entry": "src/index.js"

// all files in src/pages/
"entry": "src/pages/*.js"
```

### disableCSSModules

CSS Modules is enabled by default.

### publicPath

Specify [publicPath](http://webpack.github.io/docs/configuration.html#output-publicpath) for webpack.

### extraBabelPlugins

Specify extra babel plugins. Babel plugins can only be added, not allowed to overwrite and delete.

### autoprefixer

Specify autoprefixer arguments, view [autoprefixer](https://github.com/postcss/autoprefixer) and [browserslist](https://github.com/ai/browserslist#queries) for details.

e.g. If you are making mobile app:

```
"autoprefixer": {
  "browsers": [
    "iOS >= 8", "Android >= 4"
  ]
}
```

### proxy

Specify proxy for webpack-dev-server, view [webpack-dev-server#proxy](https://webpack.github.io/docs/webpack-dev-server.html#proxy) for details。(Notice: only support JSON pattern configuration, `bypass` is not supported.)

e.g.

```
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

Then, when accessing `/api/users`, you will get the content of http://jsonplaceholder.typicode.com/users .

### env

Set specific options for certain environment. `development` is for server, and `production` is for build.

e.g.

```
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

## Environment Variables

You can temporarily configure some parameters for environment variables, including:

- `PORT`, default 8000
- `HOST`, default localhost
- `HTTPS`，use https or not，default false

e.g. start server in 3000 port:

```bash
$ PORT=3000 roadhog server
```

## Cli arguments

### server

```bash
Usage: roadhog server [options]

Options:
  --open  Open url in browser after started            [boolean] [default: true]
  -h      Show help                                                    [boolean]
```

## FAQ

### 为什么叫 roadhog ?

roadhog is a hero from overwatch.

<img src="https://zos.alipayobjects.com/rmsportal/guCnwwMItoLOTmcdbaEZ.png" width="200" height="200" />

## LICENSE

MIT

