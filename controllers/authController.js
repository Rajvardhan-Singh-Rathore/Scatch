const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const productModel = require("../models/productmodel");

module.exports.registerUser = async function(req,res){
    let {fullname,email,password} = req.body;
    try{
        let createdUser = await userModel.findOne({email});
        if(createdUser){req.flash("error","You already have an account, please login.");return res.redirect("/")}
        bcrypt.genSalt(10,function(err,salt){
            if(err){return res.send(err.message)}
            bcrypt.hash(password,salt,async function(err,hash){
                    if(err){return res.send(err.message)}
                    else{
                        let user = await userModel.create({
                            fullname,
                            password:hash,
                            email
                        })
                        let token = generateToken(user);
                        res.cookie("token",token);
                        let products = await productModel.find();
                        res.render("products",{products});
                    }
            })
        })
    }catch(err){
        res.send(err.message);
    }
}
module.exports.loginUser = async function name(req,res){
    try{
        let {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){req.flash("error","email or password incorrect");return res.redirect("/")}
        //password check
        bcrypt.compare(password,user.password,async function(err,result){
            if(result){
                let token = generateToken(user);
                res.cookie("token",token);
                let products = await productModel.find();
                res.render("products",{products});
            }
            else{
                req.flash("error","email or password incorrect");
                return res.redirect("/");
            }
        });
        
    }catch(err){
        res.send(err.message);
    }
}
module.exports.logout = function(req,res){
    res.cookie("token","");
    res.redirect("/");
}