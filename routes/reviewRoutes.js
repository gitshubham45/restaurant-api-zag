const express = require('express');
const { addReview, getAllReviews, updateReview,removeReview , replyToReview } = require('../controllers/reviewControllers');
const {protect} = require("../middleware/authMiddleware");


const router = express.Router();

// routes for reviews
router.route("/").post(protect, addReview);
router.route("/").get(protect, getAllReviews);
router.route("/").put(protect, updateReview);
router.route("/").delete(protect, removeReview);

// reply to a review 
router.route("/reply").put(protect, replyToReview);

module.exports = router;