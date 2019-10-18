var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
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
app.use(methodOverride("_method"));

app.use("/", indexRoutes);

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});