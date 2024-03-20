// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }, // Reference to the listing
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
    comment: { type: String, default: '' }, // Review comment (optional)
    reply: { type: String, default: '' } // Owner or admin reply to the review
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
