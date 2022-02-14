var express = require('express');
var router = express.Router();
const Validator = require('../middlewares/validator.middleware')
const {auth_signUp} = require('../controllers/auth/signup.controller')
const {auth_login} = require('../controllers/auth/login.controller')

const isAuth = require('../middlewares/auth.middleware')
router.post('/login', auth_login);


router.post('/signup',Validator('user') ,async(req, res, next)=>{
  res.send( await auth_signUp(req.body))
})

router.get('/test',isAuth, (req, res, next)=>{
  res.send(req.user)
})
module.exports = router;
