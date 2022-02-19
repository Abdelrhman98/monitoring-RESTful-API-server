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
        return {isAdded:false, message:"email is found!"}
    }else{
        try{
            console.log(userData);
            const newUser = new user(userData, { strict: false })
            return {isAdded:true, data:await newUser.save()}
        }catch(err){
            console.log(err);
        }
    }
}

async function activateUser(userId){
    const ver = await user.updateOne({_id:userId},{$set:{isActive:true}}).exec()
    // await ver.activateMail()
    return ver
}

module.exports = {
    checkEmailUser,
    checkUser,
    addNewUser,
    activateUser
}