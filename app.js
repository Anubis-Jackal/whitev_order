//initiate express
var express = require("express"),
    app = express(),

//initiate body-parser
    bodyParser = require("body-parser"),

//initiate method-override
    methodOverride = require("method-override"),
    
//initiate express-sanitizer to remove scripts
    expressSanitizer = require("express-sanitizer"),
    
//initiate passport
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    
//initiate flash
    flash = require("connect-flash"),

//initiate schemas
    Order = require("./models/order"),
    Price = require("./models/price"),
    User = require("./models/user");
    
//initiate route files
var orderRoutes = require("./routes/orders"),
    authRoutes = require("./routes/auth"),
    priceRoutes = require("./routes/prices");
    
//initiate mongoose, replace username and password with your own
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://username:password@cluster0-cwzxu.mongodb.net/order_app?retryWrites=true", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost/order_app", {useNewUrlParser: true});

//app config
//tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));


//set view engine to ejs so ejs files can be referred to without typing their file type
app.set("view engine", "ejs");

//for css
app.use(express.static(__dirname + "/public"));

//tell express to use method-override
app.use(methodOverride("_method"));

//tell app to use express-sanitizer
app.use(expressSanitizer());

//tell app to use flash
app.use(flash());

//initiate and tell app to use express-session (passport configuration)
app.use(require("express-session")({
    secret: "This can be anything at all",
    resave: false,
    saveUninitialized: false
}));

//tell app to use passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//passes user information to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//the following routes follow RESTful conventions
app.use(authRoutes);
app.use(priceRoutes);
app.use(orderRoutes);

//start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The WhiteV Order server has started.");
});