const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:[3,"Name should be minimum 3 chacracters long"]
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:true
    },
    housename:String,
    housenumber:String,
    landmark:String,
    country:{
        type:String,
        enum:["India"],
        required:true
    },
    state:{
        type:String,
        enum:["Madhya pradesh","Jammu&Kashmir","Uttar pradesh","Maharashtra","Himachal Pradesh","GOA","Kerala","Karnataka","Delhi","Bihar","West Bengal","Rajasthan","Chattisgarh","Tamil Nadu"],
        required:true
    },
    pincode:Number,
    mobile:Number,
    size:Number,
    notes:String,
});
module.exports = mongoose.model("addres",addressSchema);

