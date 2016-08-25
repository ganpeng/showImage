'use strict'
const compression = require('compression');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const errorHandle = require('errorhandler');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const fs = require('fs');
const express = require('express');
const join = require('path').join;
const config = require('./');

const viewDir = 'app/views'; // 模板文件路径

const log = 'dev';

const accessLogStream = fs.createWriteStream('logs/access.log', {
    flags: 'a'
})

const noCache = true; // 是否缓存模板引擎



module.exports = (app) => {

    const env = app.get('env');

    // 静态资源压缩
    app.use(compression());

    // 静态资源管理

    app.use(express.static('public'));

    // 定义模板引擎
    nunjucks.configure(viewDir, {
        autoescape: true,
        express: app,
        noCache: noCache,
        watch: true
    });


    //  访问日志, 开发环境下调试用，生产环境下记录日志文件
    if (env === 'dev') {
        app.use(morgan(log));
    } else if (env === 'production') {
        app.use(morgan('combined', {
            stream: accessLogStream
        }))
    }


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser());

    app.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    }));

    app.use(session({
        secret: 'dongdong dr',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: 10 * 60 * 60 * 1000
        },
        store: new MongoStore({
            url: 'mongodb://' + config.db.dev.host + ':' + config.db.dev.port + '/' + config.db.dev.dbName,
            collection: 'session'
        })
    }));


    if (env === 'dev') {
        app.use(errorHandle());
        app.locals.pretty = true;
    }
}