const hash = require('../../helpers/crypto.helper')
const redis = require('../../DB/connection/redisCredentials')
const RedisDB = require('../../DB/connection/redis.con')
const redisCl = new RedisDB(redis.mailVerification)
const sendMail = require('../mailer/mail_main.controller')
const {activateUser} =require('../../DB/qureyExecutors/user.exec')

module.exports = class mailVerification{
    constructor(userObject={}){
        const{email, _id} = userObject
        if(_id)
            this.id = _id?.toString()
        this.email = email
        this.hashName = "mail_verification"
    }

    async createMailVerification(){
        const generatedHash = hash(30)
        redisCl.HSET(this.hashName,generatedHash,this.id)
        sendMail({
            to:this.email,
            subject:"Monitoring System email verification",
            html:`
            <h1>activate your account</h1>
            <br>
            <a href='${process.env.HOST}:${process.env.PORT}/auth/verify/${generatedHash}'> click </a>
            `
        })
    }

    async verifyMail(hash){
        const userId = await redisCl.HGET(this.hashName, hash)
        // console.log(userId);
        const updateObj = await activateUser(userId);
        if(updateObj.modifiedCount)
            redisCl.HDEL(this.hashName, hash)
        // console.log( updateObj.modifiedCount);
        return updateObj.modifiedCount
    }

    
}