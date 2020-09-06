var mongoose = require("mongoose");

//mongoose/model config/schema setup
var orderSchema = new mongoose.Schema({
    sName: String,
    sClass: String,
    rName: String,
    rClass: String,
    anonymous: String,
    roseNum: Number,
    daisyNum: Number,
    sunflowerNum: Number,
    succulentNum: Number,
    rose11Num: Number,
    roseboxNum: Number,
    rose52Num: Number,
    rose99Num: Number,
    totalPrice: Number,
    paymentStatus: String
});

module.exports = mongoose.model("Order", orderSchema);