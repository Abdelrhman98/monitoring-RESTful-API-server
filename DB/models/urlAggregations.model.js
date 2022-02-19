const mongoose = require("mongoose");
const { Schema } = mongoose;

var urlAggregations = new mongoose.Schema({
    status:{
        type:Boolean,
        default:true
    },
    availability: {
        type: Number,
    },
    outages: {
        type: Number,
    },
    downtime: {
        type: Number,
    },
    uptime: {
        type: Number,
    },
    responseTime: {
        type: Number,
    },
    requestId:{
        type:Schema.Types.ObjectId,
        ref:'urlChecks'
    }
});


module.exports = mongoose.model("urlAggregations", urlAggregations);
