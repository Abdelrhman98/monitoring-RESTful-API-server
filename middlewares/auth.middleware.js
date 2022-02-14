const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if (req?.headers && req.headers?.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY, function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
    });
    } else {
        req.user = undefined;
        next();
    }
}