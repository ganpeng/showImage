'use strict'

module.exports = (req, res) => {
    let user = req.session.user;
    res.render('index.html', {
        user : user
    });
}