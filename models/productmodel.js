const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    discount:Number,
    bgcolor:String,
    date:String,
    stock:Number,
    image:Buffer
})
module.exports = mongoose.model("product",productSchema);