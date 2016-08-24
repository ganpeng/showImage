'use strict'

const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');

const port = process.env.PORT || 1314;
const env = process.env.NODE_ENV || 'production';
const config = require('./config');


const app = express();

require('./config/express')(app);
require('./config/router')(app);


connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen)



function listen() {
    app.listen(port, function() {
        console.log('Server started on port ' + port);
    })
}


function connect() {
    let dbUrl;

    if (env === 'dev') {
        dbUrl = 'mongodb://' + config.db.dev.host + ':' + config.db.dev.port + '/' + config.db.dev.dbName;
    } else if (env === 'production') {
        dbUrl = 'mongodb://' + config.db.dev.host + ':' + config.db.dev.port + '/' + config.db.dev.dbName;
    }

    console.log(dbUrl);

    return mongoose.connect(dbUrl).connection;
}