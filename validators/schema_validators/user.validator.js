const joi = require('joi')

const userSchemaValidator = joi.object({
    name        : joi.string().required().min(3).max(30),
    password    : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    access_token: joi.string(),
    email       : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
}).unknown(true)

module.exports = userSchemaValidator
