function homePage(req, res, next) {
    console.log(req.session.User);
    res.render('index.njk', { isAdmin: req.session.IsAuthenticated, User: req.session.User });
}

module.exports = { homePage };