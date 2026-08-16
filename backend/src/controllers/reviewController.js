// backend/src/controllers/reviewController.js
const Review = require('../models/Review');
const Experience = require('../models/Experience');
const mongoose = require('mongoose');

// @desc    Get reviews for an experience
// @route   GET /api/reviews/experience/:experienceId
// @access  Public
exports.getDestinationReviews = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { page = 1, limit = 10, sort = 'newest' } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience ID format'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let sortOption = {};
    switch(sort) {
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'oldest': sortOption = { createdAt: 1 }; break;
      case 'highest': sortOption = { rating: -1 }; break;
      case 'lowest': sortOption = { rating: 1 }; break;
      case 'helpful': sortOption = { helpfulCount: -1 }; break;
      default: sortOption = { createdAt: -1 };
    }

    const reviews = await Review.find({ experienceId })  // Changed from destinationId
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Review.countDocuments({ experienceId });  // Changed from destinationId

    // Get rating summary
    const ratingSummary = await Review.aggregate([
      { $match: { experienceId: new mongoose.Types.ObjectId(experienceId) } },  // Changed from destinationId
      { $group: { 
        _id: '$rating',
        count: { $sum: 1 }
      }},
      { $sort: { _id: -1 } }
    ]);

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratingSummary.forEach(item => {
      ratingCounts[item._id] = item.count;
    });

    const avgRating = await Review.aggregate([
      { $match: { experienceId: new mongoose.Types.ObjectId(experienceId) } },  // Changed from destinationId
      { $group: { 
        _id: null,
        average: { $avg: '$rating' },
        total: { $sum: 1 }
      }}
    ]);

    res.json({
      success: true,
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      },
      stats: {
        average: avgRating[0]?.average || 0,
        total: avgRating[0]?.total || 0,
        ratingCounts
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { 
      experienceId,  // Changed from destinationId
      rating, 
      title, 
      comment, 
      pros, 
      cons, 
      visitDate, 
      images 
    } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience ID format'
      });
    }

    // Check if user already reviewed this experience
    const existingReview = await Review.findOne({
      experienceId,  // Changed from destinationId
      userId: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this experience'
      });
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    const review = new Review({
      experienceId,  // Changed from destinationId
      userId: req.user.id,
      username: req.user.username,
      userImage: req.user.profilePicture || '',
      rating,
      title,
      comment,
      pros: pros || [],
      cons: cons || [],
      visitDate: visitDate || null,
      images: images || [],
      isVerified: req.user.role === 'admin' || req.user.role === 'editor'
    });

    await review.save();

    // Update experience rating
    await Review.updateExperienceRating(experienceId);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a review (Admin only)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const experienceId = review.experienceId;  // Changed from destinationId
    await review.deleteOne();

    // Update experience rating
    await Review.updateExperienceRating(experienceId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Verify a review (Admin only)
// @route   PUT /api/reviews/:id/verify
// @access  Private/Admin
exports.verifyReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.isVerified = true;
    await review.save();

    res.json({
      success: true,
      message: 'Review verified successfully',
      review
    });
  } catch (error) {
    console.error('Error verifying review:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark review as helpful
// @route   POST /api/reviews/:id/helpful
// @access  Private
exports.markHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const userId = req.user.id;
    const alreadyHelped = review.helpfulUsers?.includes(userId) || false;

    if (alreadyHelped) {
      review.helpfulUsers = review.helpfulUsers.filter(
        id => id.toString() !== userId
      );
      review.helpfulCount = Math.max(0, (review.helpfulCount || 0) - 1);
    } else {
      if (!review.helpfulUsers) review.helpfulUsers = [];
      review.helpfulUsers.push(userId);
      review.helpfulCount = (review.helpfulCount || 0) + 1;
    }

    await review.save();

    res.json({
      success: true,
      message: alreadyHelped ? 'Removed helpful mark' : 'Marked as helpful',
      helpfulCount: review.helpfulCount,
      isHelpful: !alreadyHelped
    });
  } catch (error) {
    console.error('Error marking helpful:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Report a review
// @route   POST /api/reviews/:id/report
// @access  Private
exports.reportReview = async (req, res) => {
  try {
    const { reason } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.reported = true;
    review.reportReason = reason || 'Inappropriate content';
    await review.save();

    res.json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    console.error('Error reporting review:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};