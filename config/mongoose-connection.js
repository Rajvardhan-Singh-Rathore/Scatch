const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

console.log("Connecting to:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB Connected Successfully");
    dbgr("connected to db");
})
.catch((err)=>{
    console.log(" MongoDB Connection Error:", err.message);
    dbgr(err.message);
})

module.exports = mongoose.connection;


