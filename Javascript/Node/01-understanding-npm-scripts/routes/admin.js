const path = require('path');

const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const products = [];
router.get('/add-product',(req, res, next)=> {
  res.render('add-product', {pageTitle: 'Add Product', path:'/admin/add-product'});
});

router.post('/add-product',(req, res, next)=> {
  console.log('In the product', req.body);
  products.push({title: req.body.Product})
  res.redirect('/');
});

module.exports.routes = router;
module.exports.products = products;
