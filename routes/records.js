const express = require("express");
const router = express.Router({ mergeParams: true });
const Record = require("../models/record");
const middleware = require("../middleware");

//RECORDS INDEX ROUTE
router.get("/", function (req, res) {
   Record.find({}, function (err, allRecords) {
      if (err) {
         console.log(err);
      } else {
         res.render("records/index", { records: allRecords });
      }
   });
});

//RECORDS CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
   let title = req.body.record.title;
   let artist = req.body.record.artist;
   let image = req.body.record.image;
   let desc = req.body.record.description;
   let author = {
      id: req.user._id,
      username: req.user.username
   }
   let newRecord = { title: title, artist: artist, image: image, description: desc, author: author }
   Record.create(newRecord, function (err, newlyCreated) {
      if (err) {
         console.log(err);
      } else {
         res.redirect("/records");
      }
   });
});

//RECORDS NEW ROUTE
router.get("/new", middleware.isLoggedIn, function (req, res) {
   res.render("records/new");
});

//RECORDS SHOW INFO ROUTE
router.get("/:id", function (req, res) {
   Record.findById(req.params.id).populate("comments").exec(function (err, foundRecord) {
      if (err || !foundRecord) {
         req.flash("error", "Record not found");
         res.redirect("back");
      } else {
         //console.log(foundRecord);
         res.render("records/show", { record: foundRecord });
      }
   });
});

//EDIT RECORD ROUTE
router.get("/:id/edit", middleware.checkRecordOwnership, function (req, res) {
   Record.findById(req.params.id, function (err, foundRecord) {
      res.render("records/edit", { record: foundRecord });
   });
});

//UPDATE RECORD ROUTE
router.put("/:id", middleware.checkRecordOwnership, function (req, res) {
   Record.findByIdAndUpdate(req.params.id, req.body.record, function (err, updatedRecord) {
      if (err) {
         res.redirect("/records");
      } else {
         res.redirect("/records/" + req.params.id);
      }
   });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkRecordOwnership, function (req, res) {
   Record.findById(req.params.id, function (err, record) {
      if (err) {
         res.redirect("/records");
      } else {
         record.remove();
         res.redirect("/records");
      }
   });
});

module.exports = router;