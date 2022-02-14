const mongoose = require('mongoose'); // Erase if already required
const tests = require('./version.schema')
// Declare the Schema of the Mongo model
var test = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
        default:0
    }
});


test.pre('save',async function (){
    
    if(this.isNew){
        const x = await User.find().sort({'mobile':-1}).limit(1).exec()
        this.mobile = x[0].mobile+1
        
        console.log(await tests.findOneAndUpdate({'versionFor':'serviceRepo'}, {'version':"300"},{upsert:true}))
    }
})
const User = mongoose.model('User', test);

//Export the model
module.exports = User