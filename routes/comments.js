const express  = require("express");
const router   = express.Router({mergeParams: true});
const Record   = require("../models/record");
const Comment  = require("../models/comment");
const middleware = require("../middleware");

//COMMENTS NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
   Record.findById(req.params.id, function(err, record){
      if(err){
         console.log(err);
      } else{
         res.render("comments/new", {record: record});
      }
   });
});

//COMMENTS CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
   Record.findById(req.params.id, function(err, record){
      if(err){
         console.log(err);
         res.redirect("/records");
      } else{
         Comment.create(req.body.comment, function(err, comment){
            if(err){
               req.flash("error", "Something went wrong, please try again");
               console.log(err);
            } else{
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               record.comments.push(comment);
               record.save();
               req.flash("success", "Comment has been added");
               res.redirect("/records/" + record._id);
            }
         });
      }
   });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Record.findById(req.params.id, function(err, foundRecord){
      if(err || !foundRecord){
         req.flash("error", "Record not found");
         return res.redirect("back");
      }
      Comment.findById(req.params.comment_id, function (err, foundComment) {
         if(err){
            res.redirect("back");
         } else{
            res.render("comments/edit", { record_id: req.params.id, comment: foundComment });
         }
      });
   });   
});

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
   // res.send("YOU EDITED THE COMMENT");
      Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
            if (err) {
               res.redirect("back");
            } else {
               res.redirect("/records/" + req.params.id);
            }
         });
});

//COMMENTS DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
         res.redirect("/records/"+ req.params.id);
      } else {
         req.flash("success", "Comment has been deleted");
         res.redirect("/records/"+ req.params.id);
      }
   });
});

module.exports = router;