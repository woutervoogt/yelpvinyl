const express  = require("express");
const router   = express.Router();
const passport   = require("passport");
const User     = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing");
});

//REGISTER FORM ROUTE
router.get("/register", function(req, res){
   res.render("register");
})

//REGISTER CREATE
router.post("/register", function(req, res){
   let newUser = new User({username: req.body.username})
   User.register(newUser, req.body.password, function(err, user){
      if(err){
         req.flash("error", err.message);
         return res.redirect("register");
      }
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to YelpVinyl " + user.username);
         res.redirect("/records");
      });
   });

})

//LOGIN ROUTE
router.get("/login", function(req, res){
   res.render("login");
})

//LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
   {
      successRedirect: "/records",
      failureRedirect: "login"
   }), function(req, res){  
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged Out!");
   res.redirect("/records");
});

module.exports = router;