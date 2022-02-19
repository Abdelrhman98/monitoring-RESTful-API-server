const cron = require('node-cron');
const axios = require('axios')
const instance = axios.create()
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
        this.checkerConfigs = JSON.parse(oneChecker)
    }
    async _run(){
        
        console.log(this.checkerConfigs.interval);
        cron.schedule('*/1 * * * *',async ()=>{
            await this.__testCheckerAPI()
        });
    }

    async __testCheckerAPI(){
        console.log(this.checkerConfigs.type);
        var totalTime;
        var start = performance.now()
        switch(this.checkerConfigs.type){
            case "GET":
                console.log("OKKKKKKKKKKKKKKKKKK");
                totalTime = await instance.get(this.checkerConfigs.url)
                .then((response)=>{
                    console.log(response.headers['request-duration'])
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
        }
        console.log("keys",this.checkerConfigs.type,reqest);
    }

    __appendNewRequest(){

    }

    __applyLogic(response){
        console.log(response.headers['request-duration'])
        return response.headers['request-duration']
    }
}