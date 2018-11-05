var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE Show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCcampgrounds){
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index", {campgrounds: allCcampgrounds});
       }  
    });
});

//CREATE ROUTE Add new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   // get data from form and add to campground array
  var name = req.body.name;
  var image =req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newCampground ={name: name, price: price, image: image, description: desc, author: author}
 //Create a new campground and save to DB
 Campground.create(newCampground, function(err, newlyCreated){
    if(err){
        console.log(err);
    }else{
       //redirect back to campgrounds page
       console.log(newlyCreated);
       res.redirect("/campgrounds");
    }
 });
 
});

//NEW Show form to create campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
});

//SHOW -- Show more info about one campground
router.get("/:id", function(req, res) {
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground not found");
           res.redirect("back");
       } else{
       console.log(foundCampground)    
      //render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});

       }
    });
       
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
             Campground.findById(req.params.id, function(err, foundCampground){
                 if(err){
                     req.flash("error", "That campground doesn't exist");
                     res.redirect("back");
                 }
             res.render("campgrounds/edit", {campground: foundCampground});
  });
        
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct caampground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            //redirect back to the show page of the campground
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//middleware

module.exports = router;

