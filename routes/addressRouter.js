const express = require("express");
const router = express.Router();
const addressmodel = require("../models/addressmodel")
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/create",isLoggedIn,function(req,res){
    let {fullname,address1,address2,housename,housenumber,landmark,country,state,pincode,mobile}=req.body;
    addressmodel.create({
        fullname,address1,address2,housename,housenumber,landmark,country,state,pincode,mobile
    });
    req.flash("success","Address added successfully");
    res.render("address");
})
module.exports = router;