'use strict'
const config = require('./')
const path = require('path');
const join = path.join;
const uuid = require('node-uuid');
const index = require(join(config.root, 'app/controller/index'));
const user = require(join(config.root, 'app/controller/user'));
const image = require(join(config.root, 'app/controller/image'));
// const uploadctrl = require(join(config.root, 'app/controller/upload'));

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload');
  },
  filename: function (req, file, cb) {
      let ext = path.extname(file.originalname),
          newName = uuid() + ext;
    cb(null, newName);
  }
});
const upload = multer({ storage: storage });

module.exports = (app) => {

    app.route('/')
        .get(index)

    app.route('/login')
        .get(user.login)
        .post(user.loadUser)

    app.route('/signup')
        .get(user.signup)
        .post(user.createUser)

    app.route('/logout')
        .get(user.logout)
        
    app.route('/profile')        
        .get(user.profile)
        
    app.route('/image/list')        
        .get(image.list)
        
    app.route('/user/list')
        .get(user.userList)
        
    app.route('/user/delete')
        .get(user.delete)
        
        
    //  image    
    app.route('/createImage')  
        .post(upload.single('imagefile'), image.createImage)
    
    app.route('/image/delete')
        .get(image.delete)
        
}