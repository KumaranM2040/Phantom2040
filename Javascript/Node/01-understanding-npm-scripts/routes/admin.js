const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/add-product',(req, res, next)=> {
  //console.log('In the middleware');
  res.sendFile(path.join(__dirname, '../','views', 'add-product.html'));
});

router.post('/product',(req, res, next)=> {
  console.log('In the product', req.body);
  res.redirect('/');
});

module.exports = router;
