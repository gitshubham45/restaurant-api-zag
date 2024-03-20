const asyncHandler = require('express-async-handler');
const Listing = require("../models/listingModel");

const addListing = asyncHandler(async (req, res) => {

    try {
        const { name, phone, city, address, images } = req.body;
        const user = req.user; // Extracted from the JWT token
        
        const role = user.role.toLowerCase();
        // Ensure ownerId is provided
        if (role !== 'admin' && role !== 'owner') {
            return res.status(400).json({ message: 'Owner ID is required' });
        }

        const ownerId = req.body.ownerId || user._id;

        // Create a new listing with the owner's ID
        const newListing = new Listing({ name, phone, city, address, images, ownerId });
        await newListing.save();

        res.status(201).json({ message: 'Listing created successfully', listing: newListing });
    } catch (error) {
        console.error('Error creating listing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
});


const getAllListings = asyncHandler( async(req, res)=>{
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const updateListing = asyncHandler( async(req,res)=>{
    try {
        const { id,name, phone, city, address, images } = req.body;
        const { role } = req.user; // Extracted from the JWT token
        console.log(req.user,role);
        const userId = req.user._id;

        // Find the listing
        const listing = await Listing.findById(id);
       
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // console.log(listing.ownerId.toString(),userId);
        // Check if the user is the owner or admin
        if (role !== 'admin' && listing.ownerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Update the listing
        listing.name = name;
        listing.phone = phone;
        listing.city = city;
        listing.address = address;
        listing.images = images;

        await listing.save();

        res.json({ message: 'Listing updated successfully', listing });
    } catch (error) {
        console.error('Error updating listing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const removeListing = asyncHandler( async(req,res)=>{
    try {
        const { listingId } = req.body;
        const { role } = req.user; // Extracted from the JWT token

        // Check if the user is an admin
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can remove the listing' });
        }

        // Find and delete the listing
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        await Listing.findByIdAndDelete(listingId);

        res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = {addListing , getAllListings, updateListing, removeListing};