'use strict'
const compression = require('compression');
const express = require('express');
const nunjucks = require('nunjucks');
const join = require('path').join;
const config = require('./');


module.exports = (app) => {

    // 静态资源压缩
    app.use(compression());

    // 静态资源管理

    app.use(express.static(join('..', 'public')));

    nunjucks.configure(join(config.root, 'view'), { // 设置模板文件的目录，为views
        autoescape: true,
        express: app
    });
    app.set('view engine', 'html');

}