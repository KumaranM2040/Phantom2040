const express = require('express');
const path = require('path');

const router = express.Router();
router.post('/admin',(req,res,next) => {
    console.log(req.body);
    req.session.IsAuthenticated = true;
    res.sendfile(path.join(__dirname, '../../public/charts.html'));
});
module.exports = router;