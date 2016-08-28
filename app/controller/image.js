'use strict'
const co = require('co');
const Image = require('../model/image');
const _ = require('lodash');


module.exports = {

    list : (req, res) => {
        co(function*() {
            let user = req.session.user,
                id = user._id,
                images = yield Image.find({ creator : id }).exec();
            
            res.render('imageList.html', {
                user : user,
                images : images
            });
        })
        .catch((err) => {
            console.log(err);
        })
    },

    createImage : (req, res) => {
        co(function*() {
            let _image = new Image({
                creator : req.body.creator,
                title : req.body.title,
                desc : req.body.desc,
                url : req.file.filename
            });
            
            console.log(_image);

            if (!_.isEmpty(yield _image.save())) {
                res.redirect('/image/list');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}