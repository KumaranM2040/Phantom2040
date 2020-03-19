const express = require('express');

const router = express.Router();

const iotController = require('../controllers/iot');

router.get('/', iotController.homePage);

module.exports = router;