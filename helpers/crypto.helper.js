var crypto = require("crypto");

const generateNewRandomWithLength = (len = 30)=>{
    return  crypto.randomBytes(len).toString('hex');
}
module.exports = generateNewRandomWithLength