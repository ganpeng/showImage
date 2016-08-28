'use strict'

module.exports = (req, res, next) => {

    console.log(req.file);
    
    res.redirect('/image/list');
}