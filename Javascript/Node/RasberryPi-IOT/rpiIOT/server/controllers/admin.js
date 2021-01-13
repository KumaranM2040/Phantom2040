const users = require('../models/users');

function getAdmin(req, res, next) {
    console.log('getAdmin in admin.js');
    if (req.session.IsAuthenticated) {
        res.render('html-templates/index.html', { isAdmin: req.session.IsAuthenticated, User: req.session.User });
    }
}
module.exports = { getAdmin };