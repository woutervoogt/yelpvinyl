const mongoose = require("mongoose");
const Record = require("./models/record");
const Comment = require("./models/comment");

const data = [
   {
      title: "Kraan Live", 
      artist: "Kraan", 
      description: "Donec dictum nisi eget neque fermentum, sed porttitor elit lobortis. Nunc vitae odio euismod, ullamcorper justo nec, dapibus odio. Suspendisse diam urna, bibendum in ante non, tristique lobortis erat. Aenean nec massa laoreet, iaculis sem id, dictum leo. Donec ullamcorper nisi odio, vel dignissim dolor ullamcorper ac. Maecenas in mauris nec ipsum viverra viverra eget eu nisi. Quisque quis tempor sapien. Maecenas id urna maximus, accumsan risus et, ultricies turpis. Nullam in luctus est, quis elementum turpis. Fusce ut aliquam arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent nunc nunc, rhoncus accumsan posuere non, placerat id orci. Aenean volutpat magna ipsum, et condimentum lacus fermentum non. Proin et tincidunt ipsum.", 
      image: "https://img.discogs.com/_hIwgI4aJCUmTB2kFdIhtk9dqsc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-552928-1517839344-1082.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Gentle Giant", 
      artist: "Gentle Giant", 
      description: "Morbi at ante sed sapien rhoncus mattis. In fringilla tellus lectus, eu efficitur dolor ornare sed. Cras mauris leo, laoreet vitae risus in, pharetra malesuada leo. Sed non venenatis enim. Morbi pharetra odio a dictum fringilla. Aenean vestibulum dictum urna a placerat. Ut quis nibh et leo posuere vehicula. Praesent molestie mattis vulputate.", 
      image: "https://img.discogs.com/JoBXRYDaCyF83-Aq6cGScd98sTw=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1048171-1456393209-1045.jpeg.jpg"
   },
   {
      title: "Emerson, Lake & Palmer", 
      artist: "Emerson, Lake & Palmer", 
      description: "Proin scelerisque nisl elit, eget molestie leo rutrum quis. Fusce ut lorem aliquam, ullamcorper ex nec, porttitor orci. Vivamus ac enim turpis. In blandit fermentum faucibus. Etiam vitae felis at nunc interdum iaculis. Morbi malesuada sed magna sed convallis. Integer sed sem ligula. Aliquam iaculis gravida neque, a blandit nisi fermentum quis. Etiam vel porttitor massa, gravida finibus augue.",
      image: "https://img.discogs.com/nzMZ-KD06yadnEy-85H1z38nSwc=/fit-in/598x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-489629-1278655029.jpeg.jpg"
   }
];


function seedDB(){
   //Remove all records
   Record.remove({}, function(err){
      if(err){
         console.log(err);
      }
      console.log("removed records");
      Comment.remove({}, function(err){
         if(err){
            console.log(err);
         }
         console.log("removed comments");
      //add records
         // data.forEach(function(seed){
         //    Record.create(seed, function(err, record) {
         //       if(err){
         //          console.log(err);
         //       } else{
         //          console.log("created record")
         //          //create a comment
         //          Comment.create(
         //             {
         //                text: "This song is great, but I wished it was longer",
         //                author: "Homer"
         //             }, function(err, comment){
         //                   if(err){
         //                      console.log(err);
         //                   } else{ 
         //                   record.comments.push(comment);
         //                   record.save();
         //                   console.log("create a new comment");
         //                   }
         //             });
         //       }
         //    });
         // });
      });
   });
}

module.exports = seedDB;