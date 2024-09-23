const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true,
  },
  image: {
   url:String,
   filename:String,

  },
 
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country:  {type: String,
  required: true,},
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"  // Reference to User model
},
reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
    }
]
   
  
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
await Review.deleteMany({_id:{$in: listing.reviews}});}
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;