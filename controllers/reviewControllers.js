const asyncHandler = require('express-async-handler');
const Review = require("../models/reviewModel");
const Listing = require("../models/listingModel");

const addReview = asyncHandler( async(req, res) => {
    try {
        const { listingId,rating, comment } = req.body;
        const userId = req.user._id; // Extracted from the JWT token

        console.log(userId);

        // Check if the listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        const role = req.user.role;

        if(role=== "owner"){
            return res.status(400).json({ message: "Owners can't add reviews" });
        }

        // Create a new review
        const newReview = new Review({
            userId,
            listingId,
            rating,
            comment
        });

        // Save the review to the database
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})



const getAllReviews = asyncHandler( async(req, res) => {
    try {
        const { listingId } = req.body;

        // Find all reviews with the given listing ID
        const reviews = await Review.find({ listingId });

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

const updateReview = asyncHandler( async(req, res) => {
    try {
        const { reviewId,rating, comment } = req.body;
        const userId = req.user._id; // Extracted from the JWT token

        // Find the review
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }


        // Check if the user is updating his/her own review
        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }


        // Update the review
        review.rating = rating;
        review.comment = comment;

        await review.save();

        res.json({ message: 'Review updated successfully', review });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const removeReview = asyncHandler(async(req,res)=>{
    try {
        const { reviewId } = req.body;
        const userId = req.user.userId; // Extracted from the JWT token
        const role = req.user.role; // Extracted from the JWT token

        // Find the review
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        console.log(review);

        // Check if the user is the owner or an admin
        if (role !== 'admin' && review.userId.toString() !== userId) {
            return res.status(403).json({ message: "can not delete other user's review" });
        }

        // Delete the review
        await Review.findByIdAndDelete(reviewId);

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const replyToReview = asyncHandler(async(req,res)=>{
    try {
        const { reviewId,reply } = req.body;
        const userId = req.user._id; // Extracted from the JWT token
        const role = req.user.role;

        // Find the review
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        console.log(role,review);


        // Check if the owner/admin is replying or not
        if(role!=="admin" && role!=="owner" || userId.toString() != review.userId.toString()){
            return res.status(403).json({ message: 'Forbidden' });
        } 

        // add the reply
        review.reply = reply;

        await review.save();

        res.json({ message: 'Reply added successfully', review });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { addReview , getAllReviews , updateReview , removeReview, replyToReview };