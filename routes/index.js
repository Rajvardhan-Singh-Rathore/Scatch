const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productmodel");
const userModel = require("../models/usermodel");
const mongoose = require("mongoose");

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
    if (!req.user) {
        return res.redirect("/");
    }
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    Sum=0;
    for(i=0;i<user.cart.length;i++){
        Sum+=parseInt((user.cart[i].price+0.18*user.cart[i].price));
    }
    req.session.Sum = Sum;
    console.log("CART ROUTE:", req.sessionID, req.user && req.user.email);
    res.render("cart",{user,Sum});
});

router.post("/cart/remove",isLoggedIn, async (req, res) => {
  //console.log("REMOVE ROUTE:", req.sessionID, req.user && req.user.email);
  if (!req.user) {
    return res.status(401).json({ error: "User not logged in" });
  }
  const { productId } = req.body;
  const user = await userModel.findOne({ email: req.user.email });
  user.cart = user.cart.filter(id => id.toString() !== productId);
  await user.save();
  res.sendStatus(200);
});
router.post("/cart/add",isLoggedIn, async (req, res) => {
  //console.log("REMOVE ROUTE:", req.sessionID, req.user && req.user.email);
  const { productId } = req.body;
  console.log("Received productId:", productId);
  if (!req.user) {
    return res.status(401).json({ error: "User not logged in" });
  }
  const objId = new mongoose.Types.ObjectId(productId);
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(objId);
  await user.save();
  console.log(user.cart);
  res.sendStatus(200);
});

router.get("/address",isLoggedIn,function(req,res){
    if (!req.user) {
        return res.redirect("/login");
    }
    const Sum = Number(req.session.Sum)||0;
    if (!Sum) {
        req.flash("error", "Please review your cart before checkout.");
        return res.redirect("/cart");
    }
    res.render("address", { Sum: Sum });
})

module.exports = router;