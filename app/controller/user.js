'use strict'

const co = require('co');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const genSalt = Promise.promisify(bcrypt.genSalt);
const hash = Promise.promisify(bcrypt.hash);
const compare = Promise.promisify(bcrypt.compare);

const _ = require('lodash');


module.exports = {
    login: (req, res) => {
        res.render('login.html');
    },
    signup : (req, res) => {
        res.render('register.html');        
    },
    createUser: (req, res) => {
        co(function*() {

                let user = req.body,
                    username = user.username,
                    email = user.email,
                    usernameExist = yield User.findOne({
                        username: username
                    }).exec(),
                    emailExist = yield User.findOne({
                        email: email
                    }).exec(),
                    passSalt = yield genSalt(10),
                    hashedPassword = yield hash(user.password, passSalt),
                    newUser = new User({
                        username: user.username,
                        email: user.email,
                        hashedPassword: hashedPassword
                    }),
                    userInfo = null;
                    
                if (!_.isEmpty(usernameExist) || !_.isEmpty(emailExist)) {
                    res.send('用户名或者邮箱已经被注册了');
                } else {
                    userInfo = yield newUser.save();
                    console.log(userInfo);
                    if (userInfo) {
                        req.session.user = userInfo;
                        res.redirect('/');
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    },

    loadUser: (req, res) => {
        co(function*() {
                let user = req.body,
                    userExist = yield User.findOne({
                        username: user.username,
                    }).exec(),
                    matched;
                    
                
                if (_.isEmpty(userExist)) {
                    res.send('用户名不存在');
                }

                matched = yield compare(user.password, userExist.hashedPassword);
                console.log(matched);
                if (!matched) {
                    res.send('密码错误');
                }
                
                req.session.user = userExist;
                res.redirect('/'); 
            })
            .catch((err) => {
                console.log(err);
            })
    },

    logout: (req, res) => {
        req.session.user = null;
        res.redirect('/');
    },

    profile: (req, res) => {
        let user = req.session.user;

        res.render('profile.html', {
            user : user
        })
    },
    userList : (req,res) => {
        co(function*() {
            let user,
                users;
            
            user = req.session.user;
            users = yield User.find({}).exec();
            
            res.render('userList.html', {
                user : user,
                users : users
            });
        })
        .catch((err) => {
            console.log(err);
        })
    },

    delete : (req, res) => {
        co(function* () {
            let id = req.query.id;
            yield User.findByIdAndRemove(id).exec();
            res.redirect('/user/list');
        })
        .catch((err) => {
            console.log(err);
        })
    }

}