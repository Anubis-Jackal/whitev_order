var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var Price = require("../models/price");
var User = require("../models/user");
var middleware = require("../middleware");

//order routes
//new route
router.get("/orders/new", function(req, res){
    Order.find({}, function(err, allOrders){
        if(err){
            res.render("/");
        } else{
            Price.findOne({},function(err, price){
                if(err){
                    res.redirect("/");
                } else{
                    res.render("orders/new", {price: price, orders: allOrders});
                }
            }); 
        }
    });
});

//get data from form and redirect to order success page
//create route
router.post("/orders", function(req, res){
    Price.findOne({},function(err, foundPrice){
        if(err){
            req.flash("error", "Prices not found");
            res.redirect("/orders/new");
        } else{
            req.body.order.body = req.sanitize(req.body.order.body);
            Order.create(req.body.order, function(err, newlyCreated){
                if(err){
                    req.flash("error", "Order not created");
                    res.redirect("/orders/new");
                } else{
                //redirect to order confirmation page
                res.render("orders/orderconfirmation", {order: newlyCreated, price: foundPrice});
                }
            });
        }
    });
});

//get total cost data 
router.put("/orders/:id/orderconfirmation", function(req, res){
    req.body.order.body = req.sanitize(req.body.order.body);
    Order.findByIdAndUpdate(req.params.id, req.body.order, {new: true}, function(err, updatedOrder){
        if(err){
            req.flash("error", "Order Confirmation Error");
            res.redirect("/");
        } else{
            req.flash("success", "Successfully confirmed order!");
            res.redirect("/");
        }
    });
});

//route for admin page (list of all orders)
//Index routes
router.get("/orders", middleware.isLoggedIn, function(req, res){
    //get all orders from DB
    Order.find({}, function(err, allOrders){
        if(err){
            req.flash("error", "Orders not found");
        } else{
            res.render("orders/index", {orders:allOrders});
        }
    });
});

router.get("/orders/orderinfo", middleware.isLoggedIn, function(req, res){
    //get all orders from DB
    Order.find({}, function(err, allOrders){
        if(err){
            req.flash("error", "Orders not found");
        } else{
            res.render("orders/orderinfo", {orders:allOrders});
        }
    });
});

router.get("/orders/flowerinfo", middleware.isLoggedIn, function(req, res){
    //get all orders from DB
    Order.find({}, function(err, allOrders){
        if(err){
            req.flash("error", "Orders not found");
        } else{
            res.render("orders/flowerinfo", {orders:allOrders});
        }
    });
});

//show route
router.get("/orders/:id", middleware.isLoggedIn, function(req, res){
    Order.findById(req.params.id, function(err, foundOrder){
        if(err){
            req.flash("error", "Order not found");
            res.redirect("/orders");
        } else{
            res.render("orders/show", {order: foundOrder});
        }
    });
});

//edit route
router.get("/orders/:id/edit", middleware.isLoggedIn, function(req, res){
    Price.findOne({},function(err, foundPrice){
        if(err){
            req.flash("error", "Prices not found");
            res.redirect("/orders");
        } else{
            Order.findById(req.params.id, function(err, foundOrder){
                if(err){
                    req.flash("error", "Order not found");
                    res.redirect("/orders");
                } else{
                    res.render("orders/edit", {order: foundOrder, price: foundPrice});
                }
            });
        }
    });
});



//update route
router.put("/orders/:id", middleware.isLoggedIn, function(req, res){
    Price.findOne({},function(err, foundPrice){
        if(err){
            req.flash("error", "Prices not found");
            res.redirect("/orders/:id");
        } else{
            req.body.order.body = req.sanitize(req.body.order.body);
            Order.findByIdAndUpdate(req.params.id, req.body.order, {new: true}, function(err, updatedOrder){
                if(err){
                    req.flash("error", "Order not found");
                    res.redirect("/orders");
                } else{
                    req.flash("success", "Successfully updated order!");
                    res.render("orders/editconfirmation", {order: updatedOrder, price: foundPrice});
                }
            });
        }
    });
});

//get total cost data 
router.put("/orders/:id/editconfirmation", function(req, res){
    req.body.order.body = req.sanitize(req.body.order.body);
    Order.findByIdAndUpdate(req.params.id, req.body.order, function(err, updatedOrder){
        if(err){
            req.flash("error", "Edit Error");
            res.redirect("/");
        } else{
            req.flash("success", "Successfully edited order!");
            res.redirect("/orders/" + req.params.id);
        }
    });
});

//delete route
router.delete("/orders/:id", middleware.isLoggedIn, function(req, res){
    Order.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Order not found");
            res.redirect("/orders");
        } else{
            req.flash("success", "Successfully deleted order!");
            res.redirect("/orders");
        }
    });
});

//others
router.get("*", function(req, res){
    res.send("Sorry...page does not exist");
});

module.exports = router;