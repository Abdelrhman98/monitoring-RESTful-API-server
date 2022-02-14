const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    type:{
        type:String,
        enum:["GET","DELETE","PUT"],
        required:true
    },
    url:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);