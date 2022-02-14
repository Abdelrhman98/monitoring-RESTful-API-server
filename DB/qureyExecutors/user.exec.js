const user = require('../models/users.schema')

async function checkEmailUser( email ){
    return await user.findOne({ email: email }).exec()
}

async function checkUser( email ){
    return await user.findOne({ email:email }).exec()
}

async function addNewUser( userData ){
    const isFound =  await checkEmailUser(userData?.email)
    if(isFound){
        return "email is found!"
    }else{
        try{
            console.log(userData);
            const newUser = new user(userData, { strict: false })
            return await newUser.save()
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {
    checkEmailUser,
    checkUser,
    addNewUser
}