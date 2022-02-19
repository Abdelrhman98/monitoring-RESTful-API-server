const ports = {
    local: 6379
};

module.exports = {
    local: {
        mailVerification: {
            host: '127.0.0.1',
            port: ports.local,
            db: 0
        }
    }
}[process.env.ENV|| 'local']