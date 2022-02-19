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
    password:{
        type:String,
        required:true,
    },
    accessToken:{
        type:String,
        default:""
    },
    isActive:{
        type:Boolean,
        default:false
    }
},{ strict: false });
// var User =
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.activateMail = function(){
    this.isActive = true
}
//Export the model
module.exports =  mongoose.model('user', userSchema);