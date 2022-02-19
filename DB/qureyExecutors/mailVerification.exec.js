const mailV = require('../models/mailVerification.model')
const generateHash = require('../../helpers/crypto.helper')
const addNewMailVer = async function(userId) {
    const hash = generateHash()
    const newMailV = mailV({userId,hash})
    console.log(await newMailV.save());
    return hash
};

module.exports = addNewMailVer