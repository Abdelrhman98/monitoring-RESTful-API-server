const mongoose = require('mongoose'); // Erase if already required
const bcrypt =  require('bcrypt')

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    accessToken:{
        type:String,
        default:""
    }
},{ strict: false });
// var User =
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//Export the model
module.exports =  mongoose.model('user', userSchema);