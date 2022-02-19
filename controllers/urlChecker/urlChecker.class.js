const urlCheckerModel = require('../../DB/models/urlChecks.schema')
const redis = require('../../DB/connection/redisCredentials')
const RedisDB = require('../../DB/connection/redis.con')
const redisCl = new RedisDB(redis.urlChecker)

module.exports = 
class urlChecker{
    constructor(configs={}){
        this.hashName = "urlChecks"
        var{
            name, 
            url,
            protocol,
            path,
            port,
            webhook,
            timeout,
            interval,
            threshold,
            ownerId,
            httpHeaders,
            assert,
            ignoreSSL
        } = configs
    }

    async createNewUrlCheck( configs ){
        configs['url']          = this.__generateUrl(configs)
        configs['sendConfigs']  = this.__generateSendConfigs(configs)
        configs['ownerId']      = configs.user?._id
        configs['interval']     = this.__generateCronExp(configs)
        let newDoc              = await this.__addToMongo(configs)
        if(newDoc){
            this.__addToRedis(newDoc)
            console.log("added new checker to mongo",newDoc);
            return true
        }
        return false
    }

    __generateUrl( urlOptions ){
        const {port, path,protocol,url} = urlOptions
        let generatedUrl = `${protocol.toLowerCase()}://${url}`;
        generatedUrl+=(port)?`:${port}/`:''
        generatedUrl+=(path)?`${path}`:''
        return generatedUrl
    }

    __generateSendConfigs( configs ){
        const { webhooks, user} = configs
        let senderConfigs = { "email":user?.email }
        if(webhooks)
            Object.keys(webhooks).forEach( webhook =>{
                senderConfigs[webhook] = webhooks[webhook]
            })
        return senderConfigs
    }

    __generateCronExp( configs ){
        return `*/${configs?.interval} * * * *`
        
    }

    async __addToMongo( checkerObj ){
        let newUrlChecker = urlCheckerModel( checkerObj )
        return await newUrlChecker.save()
        
    }

    async __addToRedis( checkerObj ){
        
        redisCl.HSET(this.hashName,checkerObj.url,JSON.stringify(checkerObj))
    }
}