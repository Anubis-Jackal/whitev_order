var express = require("express");
var router = express.Router();
var Price = require("../models/price");
var middleware = require("../middleware");

//show route
router.get("/prices", middleware.isLoggedIn, function(req, res){
    //get prices from DB
    Price.findOne({}, function(err, foundPrice){
        if(err){
            req.flash("error", "Prices not found");
        } else{
            res.render("prices/show", {price: foundPrice});
        }
    });
});

//edit route
router.get("/prices/edit", middleware.isLoggedIn, function(req, res){
    Price.findOne({}, function(err, foundPrice){
        if(err){
            req.flash("error", "Prices not found");
            res.redirect("/prices");
        } else{
            res.render("prices/edit", {price: foundPrice});
        }
    });
});

//update route
router.put("/prices", middleware.isLoggedIn, function(req, res){
    req.body.price.body = req.sanitize(req.body.price.body);
    Price.updateOne({}, req.body.price, function(err, updatedPrice){
        if(err){
            req.flash("error", "Prices not found");
            res.redirect("/prices");
        } else{
            req.flash("success", "Successfully updated prices!");
            res.redirect("/prices");
        }
    });
});

module.exports = router;