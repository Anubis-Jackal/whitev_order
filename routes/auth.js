var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//auth routes
//register routes
router.get("/register", function(req, res){
    res.render("users/register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.render("users/register");
        } else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to the White V Order Management Platform, " + user.username);
                res.redirect("/orders");
            });
        }
    });
});

//login routes
router.get("/login", function(req, res){
    res.render("users/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect:"/orders",
    failureRedirect:"/login"
}), function(req, res){
});

//logout route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/");
});

module.exports = router;