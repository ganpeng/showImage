'use strict'

module.exports = (app) => {


    app.get('/', (req, res) => {
        req.session.name = 'louis';

        res.render('index.html', {
            name: req.session.name
        })
    })


    app.get('/to', (req, res) => {
        let name = req.session.name;
        res.render('user.html', {
            name: name
        })
    })

    app.get('/dongdong', (req, res) => {
        res.send('I love dongdong!!!');
    })

}