const mongoose = require("mongoose");
const productmodel = require("./productmodel");

const userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart: [{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    }],
    orders: {
        type:Array,
        default:[]
    },
    contact:Number,
    image:Buffer
})
module.exports = mongoose.model("user",userSchema);