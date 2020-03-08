const express = require('express');
const path = require('path');
const users = require('../models/users');

const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('index.njk', { isAdmin: req.session.IsAuthenticated });
});
module.exports = router;