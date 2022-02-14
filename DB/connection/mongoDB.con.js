const mongoose = require('mongoose');
const {mongoURI} = require('./mongoCredentials')

const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
}
mongoose.Promise = global.Promise;
// Connect MongoDB at default port 27017.
mongoose.connect(mongoURI, options, (err) => {
    if (!err) {
        console.log(`MongoDB Connection Succeeded. ${mongoURI}`)
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
