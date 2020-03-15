function getLogin(req, res, next) {
    res.render('login.njk', { isInvalidUsernamePassword: req.session.invalidUsernamePasswordCombination });
}

function postLogout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
}
module.exports = { getLogin, postLogout };