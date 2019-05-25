const path = require('path');

const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

router.use('/add-product',(req, res, next)=> {
  //console.log('In the middleware');
  res.sendFile(path.join(rootDir,'views', 'add-product.html'));
});

router.post('/product',(req, res, next)=> {
  console.log('In the product', req.body);
  res.redirect('/');
});

module.exports = router;
