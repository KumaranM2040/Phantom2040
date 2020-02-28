const express = require('express');
const path = require('path');
const users = require('../models/users');

const router = express.Router();

function isAdminUser(email, password){
    return users.isValidUser(email, password);
}
router.post('/admin',(req,res,next) => {
    console.log(req.body);
    req.session.IsAuthenticated = true;
    isAdminUser(req.body.inputEmail, req.body.inputPassword).then(([row])=>{
        console.log(row);
        if (result){
            res.render('charts',{ isAdmin: 'true'});
        }
    })
});
module.exports = router;