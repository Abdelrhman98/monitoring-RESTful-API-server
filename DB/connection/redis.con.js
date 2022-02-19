// const redisConfigs = require('./redisCredentials')
const redis = require("redis")

class redisDB {

    constructor(configs) {
        this.name = "redisDB";
        this.configs = configs;
        if (!this.configs) throw new Error("add valid redis connection config  { host: 'x.x.x.x', port: xxxx, db: xx }")
        this.client = redis.createClient(this.configs);
        this.connect()

    }
    async connect(){
        await this.client.connect();
        console.log(await this.client.ping());
    }

    async getAllHash(hashname) {
        
        return await this.client.hGetAll(hashname);
    }

    async setHash(hashname, hashData) {
        return await this.hmset(hashname, hashData);
    }

    async deleteKey(keyName) {
        return await this.del(keyName);
    }

    async isExist(keyName) {
        return await this.EXISTS(keyName);
    }

    async getFromHash(hashName, fields = [], elementFormatter = null) {
        if (!Array.isArray(fields)) throw new Error("Please provide fields param as a list or pass empty list [] to retreive all")

        // Retreive some fields, or retreive all
        let { result, error } = fields.length ? await this.hmget(hashName, fields) : await this.hgetall(hashName);

        // Format resulted array in case of hmget
        if (result && Array.isArray(result)) {
            let formattedResult = {};
            result.forEach((value, index) => formattedResult[fields[index]] = elementFormatter ? elementFormatter(value) : value);
            result = formattedResult;
        }
        return { result, error }
    }

    async hashCreate(hashName, hashdata) {
        try {
            let multRes = await new Promise((resolve, reject) =>

                this.client.multi().del(hashName).hmset(hashName, hashdata).exec((err, replies) => {
                    if (err) return reject(err)
                    return resolve(replies);
                }));

            console.log("hashCreate", multRes)
            return multRes[1];

        } catch (e) {
            return { result, error }
        }
    }

    HSET(hashName, key, val){
        try{
            this.client.HSET(hashName, key, val)
        }catch(err){
            return err 
        }
    }

    HMSET(hashName, key, val){
        try{
            this.client.HMSET(hashName, key, val)
        }catch(err){
            return err 
        }
    }

    async HGET(hashname, key=""){
        if(key.length){
            return await this.client.hGet(hashname,key)
        }else{
            return await this.client.HGETALL(hashname)
        }
    }
    async HDEL(hashName, key){
        return await this.client.HDEL(hashName,key)
    }

    
    stop() {
        this.client.quit();
    }
}
module.exports = redisDB;