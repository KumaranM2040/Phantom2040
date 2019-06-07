const path = require('path');

const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const products = [];
router.get('/add-product',(req, res, next)=> {
  //console.log('In the middleware');
  res.sendFile(path.join(rootDir,'views', 'add-product.html'));
});

router.post('/add-product',(req, res, next)=> {
  console.log('In the product', req.body);
  products.push({title: req.body.Product})
  res.redirect('/');
});

module.exports.routes = router;
module.exports.products = products;
