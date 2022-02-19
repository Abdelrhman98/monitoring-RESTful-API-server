const mongoose = require('mongoose'); 
const generateHash =  require('../../helpers/crypto.helper')
const Schema = mongoose.Schema
var mailVerification = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'users'
    },
    hash:{
        type:String,
        required:true
    }
});



const mailV = mongoose.model('mailVerification', mailVerification);

module.exports = mailV