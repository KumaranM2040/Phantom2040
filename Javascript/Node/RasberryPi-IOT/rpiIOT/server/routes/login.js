const express = require('express');
const path = require('path');
const users = require('../models/users');

const router = express.Router();
router.get('/login', (req, res, next) => {
    res.render('login.njk');
});
module.exports = router;