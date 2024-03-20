const express = require('express');
const { addListing, getAllListings, updateListing, removeListing } = require('../controllers/listingControllers');
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

// rotes for listing  
router.route("/").post(protect, addListing);
router.route("/").get(protect, getAllListings);
router.route("/").put(protect, updateListing);
router.route("/").delete(protect, removeListing);
// router.post("/login", authUser);

// routes for listing

// router.route('/').get(registerUser);
// router.route()
module.exports = router;