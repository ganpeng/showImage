'use strict'
const config = require('./')
const join = require('path').join;
const index = require(join(config.root, 'app/controller/index'));
const user = require(join(config.root, 'app/controller/user'));


module.exports = (app) => {

    app.route('/')
        .get(index)

}