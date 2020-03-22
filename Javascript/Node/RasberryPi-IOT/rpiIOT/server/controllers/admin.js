const users = require('../models/users');

function getAdmin(req, res, next) {
    if (req.session.IsAuthenticated) {
        res.render('html-templates/scheduler.html', { isAdmin: req.session.IsAuthenticated, User: req.session.User });
    }
}
module.exports = { getAdmin };