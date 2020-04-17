const Record   = require("../models/record");
const Comment  = require("../models/comment");

const middlewareObj = {};


middlewareObj.checkRecordOwnership = function (req, res, next) {
   if (req.isAuthenticated()) {
      Record.findById(req.params.id, function (err, foundRecord) {
         if (err || !foundRecord) {
            req.flash("error", "Record not found");
            res.redirect("back");
         } else {
            if (foundRecord.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("error", "You don't have permission to do that");
               res.redirect("back")
            }
         }
      });
   } else {
      req.flash("error", "Please Login First!");
      res.redirect("back");
   }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
   if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function (err, foundComment) {
         if (err || !foundComment) {
            req.flash("error", "Comment not found");
            res.redirect("back");
         } else {
            if (foundComment.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("error", "You don't have permission to do that");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("error", "Please Login First!");
      res.redirect("back");
   }
}

middlewareObj.isLoggedIn = function (req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   req.flash("error", "Please Login First!");
   res.redirect("/login");
}


module.exports = middlewareObj