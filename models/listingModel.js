// model for listings
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    images: [{ type: String }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the owner
}, {
    timestamps: true
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;