const express = require('express');

const relaysController = require('../controllers/relays');

const router = express.Router();

router.get('/relays', relaysController.getRelays);
router.post('/relays', relaysController.setRelays);

module.exports = router;