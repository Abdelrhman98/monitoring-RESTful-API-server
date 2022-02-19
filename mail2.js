const axios =  require('axios') 

const url = 'http://localhost:3001/test_monitpor'

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
async function lol (){
    var start = performance.now()
    var test=await 
    instance.get(url).then((response) => {
        test = response.headers['request-duration']
        console.log(response.headers['request-duration'])
        return response.headers['request-duration']
    }).catch((error) => {
        console.error(`Error`)
    
    })
    var end = performance.now();
    
    
    console.log(`Execution time: ${end - start} ms ${test}`);
    
}
lol()