'use strict'
const compression = require('compression');
const express = require('express');
const join = require('path').join;
const config = require('./');

const viewDir = join(config.root, '/app/view');
console.log(viewDir);

module.exports = (app) => {

    // 静态资源压缩
    app.use(compression());

    // 静态资源管理

    // app.use(express.static(join('..', 'public')));



}