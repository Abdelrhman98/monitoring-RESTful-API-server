const res = require('express/lib/response');
const {checkEmailUser} = require('../../DB/qureyExecutors/user.exec')
const jwt = require("jsonwebtoken")
//https://www.loginradius.com/blog/async/Nodejs-and-MongoDb-application-authentication-by-JWT/
async function auth_login(req, res, next){
    try{
        // console.log(req.body?.email)
        const user = await checkEmailUser(req.body?.email)
        // console.log("AAAAAAAAAAAAAAAa",user);
            if(!user || !user.comparePassword(req.body?.password)){
                res.status(401).json({message:"Authentication failed. Invalid user or password."})
            }
            res.json({token: jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY)})
        
    }catch(err){
        console.log(err);
    }
    
}

module.exports = {
    auth_login   
}