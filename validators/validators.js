const userSchemaValidator = require('./schema_validators/user.validator')
const urlCheckerSchemaValidator = require('./schema_validators/urlChecker.validator')
module.exports = {
    user:userSchemaValidator,
    urlChecker:urlCheckerSchemaValidator
}