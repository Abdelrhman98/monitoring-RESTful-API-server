const urlCheckerClass= require('./urlChecker.class')
const urlCheckLoader = require('./urlCheckerLoader.class')
async function createNewChecker( configs ){
    const urlCreator = new urlCheckerClass()
    // let result = await urlCreator.createNewUrlCheck(configs)
    return await urlCreator.createNewUrlCheck(configs)
}

const checker = require('./checker.class')
var allCheckers = []

async function loadAllCheckers(){
    const loader = new urlCheckLoader()
    const configs = await loader.getCheckers()
    Object.keys(configs).forEach( url =>{
        let newChecker = new checker(configs[url])
        allCheckers.push(newChecker)
        newChecker._run()
    })
    
    return true
}
async function registerNewChecker( checkerConfigs ){
    let newChecker = new checker(checkerConfigs)
    await newChecker.redisNewChecker()
    newChecker._run()
}

module.exports = {
    createNewChecker,
    loadAllCheckers,
    registerNewChecker
}