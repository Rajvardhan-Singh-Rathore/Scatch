const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/admin",isLoggedIn,function(req,res){
    res.render("createProducts");
})
if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
        let {fullname,email,password} = req.body;
        const owners = await ownerModel.find({email});
        if(owners.length>0){
            return res.status(503).send("You cannot create another owner");
        }
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.send(createdOwner);
})
}
module.exports = router;