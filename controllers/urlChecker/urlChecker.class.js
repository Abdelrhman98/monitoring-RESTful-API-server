module.exports = 
class urlChecker{
    constructor(configs={}){
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

    createNewUrlCheck( configs ){
        
    }
}