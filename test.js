// const newTest =require('./DB/qureyExecutors/mailVerification.exec')
// require('./DB/connection/mongoDB.con')
// const test = 
// async()=>{
//     console.log(await newTest("620fabed04ae5a64b8748f4c"));
// }

// test()
// const { createClient } = require('redis')

// const test = async () => {
//     const client = createClient();
//     client.on('error', (err) => console.log('Redis Client Error', err));
//     await client.connect();
//     await client.HSET('testNewTTL', 'working2','EXXXXXXXxx2');
//     const value = await client.HGETALL('testNewTTL');
//     console.log(value);
//   };

//   test()


const redis = require('./DB/connection/redisCredentials')
const RedisDB = require('./DB/connection/redis.con')
const redisCl = new RedisDB(redis.mailVerification)

const test= async()=>{
    console.log(await redisCl.HGET("mail_verification"));    
}
test()

// redisCl.stop()
// console.log();