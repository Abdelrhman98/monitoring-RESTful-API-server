module.exports = {
    "local":{
        mongoURI:"mongodb://localhost:27017/MAZAD"
    },
    "production":{
        mongoURI:"mongodb://localhost:27017/MAZAD"
    }
}[process.env.NODE_ENV || 'local']