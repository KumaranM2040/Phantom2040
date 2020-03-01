const express = require('express');
const path = require('path');
const users = require('../models/users');

const router = express.Router();

function isAdminUser(email, password) {
    return users.isValidUser(email, password);
}
router.post('/admin', async function(req, res, next) {
    console.log(req.body);
    req.session.IsAuthenticated = true;
    const result = await isAdminUser(req.body.inputEmail, req.body.inputPassword)
    if (result) {
        res.render('index.njk', { isAdmin: 'true', user: req.body.inputEmail });
    }
});
module.exports = router;