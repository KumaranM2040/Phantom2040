const express = require('express');
const path = require('path');
const users = require('../models/users');

const router = express.Router();
router.get('/login', (req, res, next) => {
    res.render('login.njk', { isInvalidUsernamePassword: req.session.invalidUsernamePasswordCombination });
});

router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;