var express = require('express');
var router = express.Router();

const isAuth = require('../middlewares/auth.middleware')
const Validator = require('../middlewares/validator.middleware')
const {createNewChecker, registerNewChecker} =require('../controllers/urlChecker/urlChecker.controller')

router.post('/register',isAuth,Validator('urlChecker'),async(req, res,next)=>{
    if(req.user){
        req.body['user'] = req.user
        let checkerConfig = await createNewChecker(req.body)
        console.log("result",checkerConfig)
        await registerNewChecker(checkerConfig)
        res.send(checkerConfig)
    }else{
        res.status(401).send("Please login to add new url checks")
    }
})

module.exports = router;