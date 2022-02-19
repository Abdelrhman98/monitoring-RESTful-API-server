const cron = require('node-cron');
const axios = require('axios')
const instance = axios.create()

const redis = require('../../DB/connection/redisCredentials')
const RedisDB = require('../../DB/connection/redis.con')
const redisCl = new RedisDB(redis.urlRequestsAgg)

const sendMail = require('../mailer/mail_main.controller')


instance.interceptors.request.use((config) => {
    config.headers['request-startTime'] = process.hrtime()
    return config
})
instance.interceptors.response.use((response) => {
    const start = response.config.headers['request-startTime']
    const end = process.hrtime(start)
    const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
    response.headers['request-duration'] = milliseconds
    return response
})


module.exports = class checker{
    constructor(oneChecker){
        this.aggHashName = "urlChecksAgg"
        this.checkerConfigs = JSON.parse(oneChecker)
        this.totalFailed = 0
        console.log(this.checkerConfigs.threshold);
    }
    async _run(){
        
        // console.log(this.checkerConfigs.interval);
        cron.schedule(this.checkerConfigs.interval,async ()=>{
            await this.__testCheckerAPI()
        });
    }

    async __testCheckerAPI(){
        console.log(this.checkerConfigs.type);
        var totalTime;
        var start = performance.now()
        switch(this.checkerConfigs.type){
            case "GET":
                totalTime = await instance.get(this.checkerConfigs.url)
                .then((response)=>{
                    return response.headers['request-duration']
                })
                .catch((error) => { console.error(`Error`) })
                break;
            // case "put":
            //     totalTime = await instance.put(this.url).then(this.__applyLogic())
            //     .catch((error) => {console.error(`Error`)})

            // case "delete":
            //     totalTime = await instance.delete(this.url).then((response) => {
            //         console.log(response.headers['request-duration'])
            //     }).catch((error) => {
            //         console.error(`Error`)
            //     })
            default:
                console.log("not valid request");
        }
        var end = performance.now();
        var reqest = {}
        reqest['result'] = (totalTime)?true:false
        if(reqest['result']){
            reqest['totalTime'] = totalTime
        }else{
            reqest['totalTime'] = end - start
            this.totalFailed += 1
        }
        console.log(this.checkerConfigs.url,this.checkerConfigs.type,reqest);
        this.__applyLogic(reqest)
    }

    __appendNewRequest(){

    }

    async __getCheckerAggObject(){
        return await redisCl.HGET(this.aggHashName, this.checkerConfigs.url)
    }
    async __applyLogic(reqest){
        let checkerAGG = JSON.parse(await this.__getCheckerAggObject())
        checkerAGG['no_requests'] += 1
        if(reqest.result){
            checkerAGG['no_success']+=1
            checkerAGG['upTime']+=reqest.totalTime
            
        }else{
            checkerAGG['no_faild']+=1
            checkerAGG['downTime']+=reqest.totalTime
            if(checkerAGG['no_faild'] == this.checkerConfigs.threshold){
                this.__notifyForErr(checkerAGG)
            }
        }
        redisCl.HDEL(this.aggHashName, this.checkerConfigs.url)
        redisCl.HSET(this.aggHashName, this.checkerConfigs.url, JSON.stringify(checkerAGG))
        // this.__notifyForErr(checkerAGG)
        console.log(checkerAGG);
    }

    __notifyForErr(notifyObject){
        if(this.checkerConfigs.sendConfigs.email){
            this.__sendMail(notifyObject)
        }if(this.checkerConfigs.sendConfigs.discord){
            this.__sendDiscord(notifyObject)
        }
    }

    __sendMail(notifyObject){
        sendMail({
            to:this.checkerConfigs.sendConfigs.email,
            subject:`your APP ${this.checkerConfigs.name} report`,
            html:`
            <h1>result of monitoring</h1>
            <br>
            <pre>
            ${JSON.stringify(notifyObject)}
            </pre>
            `
        })
    }
    __sendDiscord(notifyObject){
        axios.post(this.checkerConfigs.sendConfigs.discord,{'content':JSON.stringify(notifyObject)})
    }
}