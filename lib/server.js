#!/usr/bin/env node
'use strict';

var _child_process = require('child_process');

function start() {
  var p = (0, _child_process.fork)(__dirname + '/server', process.argv.slice(2));
  p.on('message', function (data) {
    if (data === 'RESTART') {
      p.kill('SIGINT');
      start();
    }
  });
}

if (!process.send) {
  start();
} else {
  require('./runServer');
}