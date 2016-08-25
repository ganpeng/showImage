'use strict'

module.exports = {

    list : (req, res) => {
        let user = req.session.user;
        res.render('imageList.html', {
            user : user
        });
    }
}