var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Inventory = require("../models/inventory");
var Message = require("../models/message");
var middleware = require("../middleware");


//show members page
router.get("/",middleware.isLoggedIn, function(req, res){
   
    res.render("./landing/members");
       
   
});
//show messages
router.get("/messages",middleware.isLoggedIn, function(req, res){
   Message.find({}, function(err, allMessages){
       if(err){
           console.log(err);
       } else {
          res.render("./landing/messages",{messages:allMessages });
       }
    });
});

//Delete Messages
router.delete("/messages/:id",middleware.isLoggedIn, function(req, res){
   Message.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/members/messages");
      } else {
          res.redirect("/members/messages");
      }
   });
});

//show inventory
router.get("/inventory",middleware.isLoggedIn, function(req, res){
	Inventory.find({}, function(err, allInventory){
       if(err){
           console.log(err);
       } else {
          res.render("./landing/inventory",{inventory:allInventory });
       }
    });
   // res.render("./landing/inventory");
});

//show form
router.get("/inventory/new",middleware.isLoggedIn, function(req, res){
   res.render("./landing/new");
});

//CREATE - add new inventory to DB
router.post("/inventory", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var quant = req.body.quantity;

    var newInventory = {name: name, image: image, quantity: quant}
    // Create a new campground and save to DB
    Inventory.create(newInventory, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/members/inventory");
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/members/inventory");
        }
    });
});

// EDIT Inventory ROUTE
router.get("/inventory/:id/edit", middleware.isLoggedIn, function(req, res){
    Inventory.findById(req.params.id, function(err, foundInventory){
        res.render("./landing/edit", {inventory: foundInventory});
    });
});

// UPDATE Inventory ROUTE
router.put("/inventory/:id",middleware.isLoggedIn, function(req, res){
    // find and update the correct campground
    Inventory.findByIdAndUpdate(req.params.id, req.body.inventory, function(err, updatedCampground){
       if(err){
           res.redirect("/members/inventory");
       } else {
           //redirect somewhere(show page)
           res.redirect("/members/inventory");
       }
    });
});
//Delete inventory
router.delete("/inventory/:id",middleware.isLoggedIn, function(req, res){
   Inventory.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/members/inventory");
      } else {
          res.redirect("/members/inventory");
      }
   });
});


module.exports = router;