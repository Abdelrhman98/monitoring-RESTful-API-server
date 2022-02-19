var express = require('express');
var router = express.Router();

const isAuth = require('../middlewares/auth.middleware')
const Validator = require('../middlewares/validator.middleware')


router.post('/register',isAuth,Validator('urlChecker'),(req, res,next)=>{
    if(req.user){
        res.send(req.user)
    }else{
        res.status(401).send("Please login to add new url checks")
    }
    
})

module.exports = router;