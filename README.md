# roadhog

[![NPM version](https://img.shields.io/npm/v/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Build Status](https://img.shields.io/travis/sorrycc/roadhog.svg?style=flat)](https://travis-ci.org/sorrycc/roadhog)
[![NPM downloads](http://img.shields.io/npm/dm/roadhog.svg?style=flat)](https://npmjs.org/package/roadhog)
[![Dependencies](https://david-dm.org/sorrycc/roadhog/status.svg)](https://david-dm.org/sorrycc/roadhog)

roadhog 是一个 cli 工具，提供 server 和 build 功能，在 create-react-app 的基础上提供配置扩展、proxy 等功能。

---

## Why roadhog

由于 dva-cli 有不同于 create-react-app 的 webpack.config.js 配置需求，而 cra 并不提供定制功能。

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

## LICENSE

MIT
