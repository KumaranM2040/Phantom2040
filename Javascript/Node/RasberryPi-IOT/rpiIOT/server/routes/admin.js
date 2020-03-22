const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin', adminController.getAdmin);
//router.post('/admin', adminController.postAdmin);

module.exports = router;