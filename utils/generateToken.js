const jwt = require("jsonwebtoken");
function generateToken(user){
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY,{expiresIn:"5h"});
}

module.exports.generateToken = generateToken;