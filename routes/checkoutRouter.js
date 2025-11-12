const express= require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils.js");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});
let lastAmount = 0;
router.post("/create-order",async (req,res)=>{
    try{
        let {amount} = req.body;
        amount = parseInt(amount) || 0;
        lastAmount = amount;
        const options = {
            amount:amount,
            currency:"INR",
            receipt:"receipt_"+Date.now()
        }
        const order = await razorpay.orders.create(options);
        res.json(order);
    }catch(err){
        res.status(500).send(err.message);
    }
}
);
router.post("/verify-payment",function(req,res){
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(body,razorpay_signature,secret);
        if(isValidSignature){res.status(200).send("Payment success")}else{res.status(200).send("payment was failed")}
    }catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;

