module.exports = {
    apps : [{
        name   : `MAZAD_NODE_${process.env.ENV}`,
        script : "../app.js",
        env:{
            NODE_ENV: "local",
            PORT:3000,
            MONGO_PATH: "mongodb://localhost:27017/MAZAD"
        },
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {

            NODE_ENV: "development"
        }
}]
}