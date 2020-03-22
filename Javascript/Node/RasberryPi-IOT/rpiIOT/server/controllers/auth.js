const users = require('../models/users');

function getLogin(req, res, next) {
    res.render('login.njk', { isInvalidUsernamePassword: req.session.invalidUsernamePasswordCombination });
}

function postLogout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
}


function isAdminUser(email, password) {
    return users.isValidUser(email, password);
}

async function postLogin(req, res, next) {
    console.log(req.body);
    const result = await isAdminUser(req.body.inputEmail, req.body.inputPassword)
    if (result.length > 0) {
        req.session.IsAuthenticated = true;
        req.session.invalidUsernamePasswordCombination = false;
        req.session.User = req.body.inputEmail;
        res.redirect('/');
    } else {
        req.session.invalidUsernamePasswordCombination = true;
        res.redirect('back');
    }
}
module.exports = { getLogin, postLogin, postLogout };