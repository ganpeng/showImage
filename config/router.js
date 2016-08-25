'use strict'
const config = require('./')
const join = require('path').join;
const index = require(join(config.root, 'app/controller/index'));
const user = require(join(config.root, 'app/controller/user'));
const image = require(join(config.root, 'app/controller/image'));



module.exports = (app) => {

    app.route('/')
        .get(index)

    app.route('/signin')
        .post(user.loadUser)

    app.route('/signup')
        .post(user.createUser)

    app.route('/logout')
        .get(user.logout)
        
    app.route('/profile')        
        .get(user.profile)
        
    app.route('/image/list')        
        .get(image.list)
        
}