const joi = require('joi')

const urlCheckerSchema = joi.object({
    name        : joi.string().required().min(3).max(30),
    url         : joi.string().required(),
    type        : joi.string().valid('GET','PUT','DELETE').required(),
    protocol    : joi.string().valid('HTTP', 'HTTPS','TCP').required(),
    path        : joi.string(),
    port        : joi.number().min(1000),
    timeout     : joi.number().default(5),
    interval    : joi.number().default(10).min(1).max(1000),
    threshold   : joi.number().default(1),
    httpHeaders : joi.object().default({}),
    assert      : joi.object(),
    tags        : joi.array(),
    ignoreSSL   : joi.boolean()
}).unknown(true)

module.exports = urlCheckerSchema
