var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment  = require("./models/comment");

var data = [
      
      {
       name: "Cloud Rest",
       image: "https://images.unsplash.com/photo-1528175009830-02c7d2c4a461?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a92bdb8a4ada581df19c90a9a50e641d&auto=format&fit=crop&w=1001&q=80",
       description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structur"
      },
      
      {
       name: "Sky Power",
       image: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=47863721b85245e8153d06c1a47649a0&auto=format&fit=crop&w=500&q=60",
       description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structur"
      }, 
      
      {
       name: "Lovers Hill",
       image: "https://images.unsplash.com/photo-1481246516418-7250f352b06f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b473645ef95f1e1beddf63add5aea907&auto=format&fit=crop&w=500&q=60",
       description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structur"
      }
    
    ]

function seedDB(){
        //Remove All Campgrounds
        Campground.remove({}, function(err){
            if(err){
            console.log(err);
           } 
         
            console.log("removed campgrounds!")
            
            //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground ){
                    if(err){
                        console.log(err);
                        
                    }else {
                     console.log("Added a campground")
                    //Create Comments on each campground
                        Comment.create({
                            text: "This Place is great but i wish there was internet",
                            author: "Ade ife"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else{
                                 campground.comments.push(comment);
                                 campground.save();
                                 console.log("New COmment Created")
                            }
                           
                        });
                    }
                })
            });
    });
    
    //Add a few comments

}

module.exports = seedDB

 