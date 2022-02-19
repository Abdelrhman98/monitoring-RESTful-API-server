const mongoose = require("mongoose");
const { Schema } = mongoose;

var checksSchema = new mongoose.Schema({
    isUp: {
        type: Boolean,
    },
    responseTime: {
        type: Number,
    }
});

var urlCheck = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ["GET", "DELETE", "PUT"],
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    sendConfigs: {
        type: Object,
    },
    timeout: {
        type: Number,
        default: 5,
    },
    interval: {
        type: String
    },
    threshold: {
        type: Number,
        default: 1,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    httpHeaders: {
        type: Object,
    },
    asserts: {
        type: Object,
    },
    tags: {
        type: String,
    },
    ignoreSSL: {
        type: Boolean,
    },
    currentStatus: {
        type: Boolean,
        default:true
    },
    allChecks:{
        type:[checksSchema],
        default:[]
    }
});

//Export the model
module.exports = mongoose.model("urlChecks", urlCheck);
