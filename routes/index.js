const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productmodel");
const userModel = require("../models/usermodel");

var Mode = true;
router.get("/",function(req,res){
    res.render("index",{Mode});
});
router.get("/products",isLoggedIn,async function(req,res){
    let products = await productModel.find();
    res.render("products",{products});
});
router.get("/addtocart/:productid",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/products");
});
router.get("/cart",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email})
    .populate("cart");
    Sum=0;
    for(i=0;i<user.cart.length;i++){
        Sum+=parseInt((user.cart[i].price+0.18*user.cart[i].price));
    }
    res.render("cart",{user,Sum});
});

router.get("/address",isLoggedIn,function(req,res){
    res.render("address");
})

module.exports = router;