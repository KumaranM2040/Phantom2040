const path = require('path');

const express = require('express');

const router = express.Router();
const rootDir = require('../util/path');

router.get('/', (req, res, next)=> {
    //console.log('In the other middleware');
    res.sendFile(path.join(rootDir,'index.html'));
});

module.exports = router;
