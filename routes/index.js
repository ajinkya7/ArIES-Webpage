var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Message = require("../models/message");

//root route
router.get("/", function(req, res){
    res.render("./landing/index");
});
router.get("/team", function(req, res){
    res.render("./landing/team");
});
//CREATE - add new message to DB
router.post("/submit-form",  function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.subject;
    var newMessage = {name: name, email: email, subject: subject, message:message}
    // Create a new message and save to DB
    Message.create(newMessage, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            //redirect back to main page
            newlyCreated.save();
            console.log(newlyCreated);
            req.flash("success", "Message sent!");
            // console.log("njn")
            res.redirect("/");
        }
    });
});

module.exports = router;