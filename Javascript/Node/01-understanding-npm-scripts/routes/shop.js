const path = require('path');

const express = require('express');

const router = express.Router();
const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/', (req, res, next)=> {
    console.log('shop.js %o', adminData.products);
    res.render('shop', {prods: adminData.products, docTitle:'Shop'});
});

module.exports = router;
