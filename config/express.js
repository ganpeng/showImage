'use strict'
const compression = require('compression');
const express = require('express');
const join = requir('path').join;
const config = require('./');


module.exports = (app) => {

    // 静态资源压缩
    app.use(compression());

    // 静态资源管理

    app.use(express.static(join(config.root, 'public')));
}