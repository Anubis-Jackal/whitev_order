var mongoose = require("mongoose");

//mongoose/model config/schema setup
var priceSchema = new mongoose.Schema({
    rosePrice: Number,
    daisyPrice: Number,
    sunflowerPrice: Number,
    succulentPrice: Number,
    rose11Price: Number,
    roseboxPrice: Number,
    rose52Price: Number,
    rose99Price: Number
});

module.exports = mongoose.model("Price", priceSchema);