'use strict'
const compression = require('compression');
const nunjucks = require('nunjucks');
const express = require('express');
const join = require('path').join;
const config = require('./');

const viewDir = 'app/views'; // 模板文件路径



module.exports = (app) => {

    // 静态资源压缩
    app.use(compression());

    // 静态资源管理

    app.use(express.static('public'));

    // 定义模板引擎
    nunjucks.configure(viewDir, {
        autoescape: true,
        express: app
    });

}