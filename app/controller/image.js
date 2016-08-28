'use strict'
const co = require('co');
const Image = require('../model/image');
const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const unlink = Promise.promisify(fs.unlink);
const exists = Promise.promisify(fs.exists);


const IMAGEDIR = '../../public/upload/';

console.log(IMAGEDIR);

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
    },
    delete : (req, res) => {
        co(function*() {
            let id = req.query.id,
                image = yield Image.findOne({ _id : id}).exec(),
                imageUrl = image.url,
                fileExists = yield exists(IMAGEDIR + imageUrl);

            console.log(id);
            console.log(imageUrl);

            if (fileExists) {
                yield unlink(IMAGEDIR + imageUrl);
            }
            yield Image.findByIdAndRemove({ _id : id }).exec();

            res.redirect('/image/list');

        })
        .catch((err) => {
            console.log(err);
        })
    }
}