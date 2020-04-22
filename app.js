const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      flash      = require("connect-flash"),
      passport   = require("passport"),
      LocalStrategy = require("passport-local"), 
      methodOverride = require("method-override"),
      Record     = require("./models/record"),
      Comment    = require("./models/comment"),
      User       = require("./models/user"),
      seedDB     = require("./seeds");

//REQUIRING ROUTES
const commentRoutes  = require("./routes/comments"),
      recordRoutes   = require("./routes/records"),
      indexRoutes    = require("./routes/index");
      
// mongoose.connect("mongodb://localhost/vinyl_camp");
mongoose.connect("mongodb+srv://wouter:dCMsQTzvTV9JY77SgqBv@yelpvinylcluster-qfnbc.mongodb.net/yelp_vinyl?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true
   }).then(() => {
      console.log("connected to DB");
   }).catch(err => {
      console.log("ERROR:", err.message);
   });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
   secret: "Walbe wolla goeds denkao",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/records", recordRoutes);
app.use("/records/:id/comments", commentRoutes);

app.listen("3000", () => {console.log("server is up!");});