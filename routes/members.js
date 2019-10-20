var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Message = require("../models/message");
var middleware = require("../middleware");


//show members page
router.get("/",middleware.isLoggedIn, function(req, res){
   
    res.render("./landing/members");
       
   
});
//show members page
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

module.exports = router;