const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const index = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const addressRouter = require("./routes/addressRouter");
const checkoutRouter = require("./routes/checkoutRouter");
const db = require("./config/mongoose-connection");
const expressSession = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");

require("dotenv").config();  
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine",'ejs');
app.use(cookieParser());
app.use(
    expressSession({
        secret:process.env.JWT_KEY,
        resave:false,
        saveUninitialized:false,
        cookie: { secure: false }
    })
)
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",index);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/address",addressRouter);
app.use("/checkout",checkoutRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);