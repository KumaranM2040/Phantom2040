const express = require('express');
const path = require('path');

const router = express.Router();
router.get('/login',(req,res,next) => {
    res.sendfile(path.join(__dirname, '../../public/login.html'));
});
module.exports = router;