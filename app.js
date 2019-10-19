var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash"),
    Message  = require("./models/message")
    // bodyParser  = require("body-parser"),
    // mongoose    = require("mongoose"),
    // flash       = require("connect-flash"),
    // passport    = require("passport"),
    // LocalStrategy = require("passport-local"),
    // methodOverride = require("method-override"),
    // User        = require("./models/user"),
    // Campground  = require("./models/campground")

var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/ariesv1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));



app.use(function(req, res, next){
   
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/", indexRoutes);

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});