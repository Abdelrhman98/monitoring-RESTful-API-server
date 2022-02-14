const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var version = new mongoose.Schema({
    versionFor:{
        type:String,
        required:true,
        index:true
    },
    version:{
        type:String,
        required:true,
    }
});

const test = mongoose.model('test', version);
//Export the model
module.exports = test