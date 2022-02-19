
const {checkEmailUser} = require('../../DB/qureyExecutors/user.exec')
const jwt = require("jsonwebtoken");
// const { verify } = require('crypto');
//https://www.loginradius.com/blog/async/Nodejs-and-MongoDb-application-authentication-by-JWT/
async function auth_login(req, res, next){
    try{
        const user = await checkEmailUser(req.body?.email)
            if(!user || !user.comparePassword(req.body?.password)){
                res.status(401).json({message:"Authentication failed. Invalid user or password."})
            }
            if(user.isActive)
                res.json({token: jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY)})
            else{
                res.send("please verify your mail!")
                // verifyAgain
            }
        
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    auth_login   
}