//* middlewares/Validator.js
const createHttpError = require('http-errors')
//* Include joi to check error type 
const Joi = require('joi')
//* Include all validators
const Validators = require('../validators/validators')

const {handleJoiErrors} = require('../helpers/array.helper')

module.exports = function(validator) {
console.log(Object.keys(Validators));
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body, {  abortEarly: false})
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi){
                res.status(442).send(handleJoiErrors(err))
                //return next(createHttpError(422, {message: err.message}))
            }
            next(createHttpError(500))
        }
    }
}