
function handleJoiErrors( errors ){
    const joiErrors = errors?.details
    let errorsObject = {}

    joiErrors.forEach(err => {
        errorsObject[err?.context?.key] = err.message
    });
    return errorsObject
}


module.exports = {
    handleJoiErrors
}