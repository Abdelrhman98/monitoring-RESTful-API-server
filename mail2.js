const axios =  require('axios') 

const url = 'https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=spiderman'

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

instance.get(url).then((response) => {
    console.log(response.headers['request-duration'])
}).catch((error) => {
    console.error(`Error`)
})