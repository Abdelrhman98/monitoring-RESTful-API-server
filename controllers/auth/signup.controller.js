const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const {addNewUser} = require('../../DB/qureyExecutors/user.exec')



async function auth_signUp( userData ){
    userData.password = bcrypt.hashSync(userData?.password, 10)
    return await addNewUser( userData )
}

module.exports = {
    auth_signUp
}