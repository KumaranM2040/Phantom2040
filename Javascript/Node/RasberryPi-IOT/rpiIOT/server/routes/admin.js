const express = require('express');
const path = require('path');
const users = require('../models/users');

const router = express.Router();

function isAdminUser(email, password) {
    return users.isValidUser(email, password);
}
router.post('/admin', async function(req, res, next) {
    console.log(req.body);
    const result = await isAdminUser(req.body.inputEmail, req.body.inputPassword)
    if (result) {
        req.session.IsAuthenticated = true;
        req.session.invalidUsernamePasswordCombination = false;
        req.session.User = req.body.inputEmail;
        res.redirect('/');
    } else {
        req.session.invalidUsernamePasswordCombination = true;
        res.redirect('back');
    }
});
module.exports = router;