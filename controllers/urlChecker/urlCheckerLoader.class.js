const redis = require('../../DB/connection/redisCredentials')
const RedisDB = require('../../DB/connection/redis.con')
const redisCl = new RedisDB(redis.urlRequests)
const urlChecksModel = require('../../DB/models/urlChecks.schema')
module.exports = 
class urlCheckerLoader{
    constructor(){
        this.urlChecksName = "urlChecks"
        this.hashname = "urlRequests"
        this.allConfigs = {}
        this.loadAllUlrs()
    }

    async loadAllUlrs(){ 
        this.allUlrs = await redisCl.getAllHash(this.urlChecksName)
        // redisCl.HSET("test", "name","shaker")
        Object.keys(this.allUlrs).forEach(url=>{
            // console.log(this.allUlrs[url]);
            this.allConfigs[url] = this.allUlrs[url]
        })
        return this.allConfigs
        console.log(this.allConfigs);
    }

    async getCheckers(){
        return await this.loadAllUlrs()
    }

    async getCheckerByName( appName ){
        return await urlChecksModel.findOne({name:appName}).exec()
    }
}