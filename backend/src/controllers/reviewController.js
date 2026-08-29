// backend/src/controllers/reviewController.js
const Review = require('../models/Review');
const Experience = require('../models/Experience');

// ===== Get all reviews for an experience =====
const getExperienceReviews = async (req, res) => {
  try {
    const { experienceId } = req.params;
    
    console.log(`📊 Fetching reviews for experience: ${experienceId}`);

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Get all reviews for this experience
    const reviews = await Review.find({ experienceId })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${reviews.length} reviews`);

    // Calculate stats
    const total = reviews.length;
    const average = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total 
      : 0;

    // Rating distribution
    const ratingCounts = {};
    reviews.forEach(r => {
      const key = Math.round(r.rating);
      ratingCounts[key] = (ratingCounts[key] || 0) + 1;
    });

    res.json({
      success: true,
      reviews,
      stats: {
        total,
        average: Math.round(average * 10) / 10,
        ratingCounts
      }
    });
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// ===== Create a new review =====
const createReview = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { 
      rating, 
      title, 
      comment, 
      pros, 
      cons, 
      visitDate, 
      images,
      userId,
      username,
      userImage 
    } = req.body;

    console.log(`📝 Creating review for experience: ${experienceId}`);
    console.log('📝 Review data:', { rating, title, comment, pros, cons });

    // Validate required fields
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating between 1 and 5 is required'
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Review comment is required'
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

    // Create review
    const review = new Review({
      experienceId,
      userId: userId || req.user?.id || null,
      username: username || req.user?.username || 'Anonymous',
      userImage: userImage || '',
      rating: parseInt(rating),
      title: title.trim(),
      comment: comment.trim(),
      pros: pros || [],
      cons: cons || [],
      visitDate: visitDate || null,
      images: images || [],
      isVerified: req.user?.isAdmin || false,
      createdAt: new Date()
    });

    await review.save();
    console.log(`✅ Review created: ${review._id}`);

    // Update experience rating
    await updateExperienceRating(experienceId);

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    console.error('❌ Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
};

// ===== Delete a review =====
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🗑️ Deleting review: ${id}`);

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const experienceId = review.experienceId;
    await review.deleteOne();

    // Update experience rating
    await updateExperienceRating(experienceId);

    console.log(`✅ Review deleted: ${id}`);
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};

// ===== Verify a review =====
const verifyReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`✅ Verifying review: ${id}`);

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.isVerified = !review.isVerified;
    await review.save();

    console.log(`✅ Review ${review.isVerified ? 'verified' : 'unverified'}: ${id}`);
    res.json({
      success: true,
      message: `Review ${review.isVerified ? 'verified' : 'unverified'} successfully`,
      review
    });
  } catch (error) {
    console.error('❌ Error verifying review:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying review',
      error: error.message
    });
  }
};

// ===== Mark review as helpful =====
const markHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user already marked as helpful
    if (review.helpfulUsers && review.helpfulUsers.includes(userId)) {
      // Remove helpful
      review.helpfulUsers = review.helpfulUsers.filter(id => id.toString() !== userId);
      review.helpfulCount = review.helpfulUsers.length;
    } else {
      // Add helpful
      if (!review.helpfulUsers) review.helpfulUsers = [];
      review.helpfulUsers.push(userId);
      review.helpfulCount = review.helpfulUsers.length;
    }

    await review.save();

    res.json({
      success: true,
      message: 'Helpful status updated',
      helpfulCount: review.helpfulCount,
      isHelpful: review.helpfulUsers.includes(userId)
    });
  } catch (error) {
    console.error('❌ Error marking helpful:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking helpful',
      error: error.message
    });
  }
};

// ===== Report a review =====
const reportReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.reported = true;
    review.reportReason = reason || 'No reason provided';
    await review.save();

    res.json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    console.error('❌ Error reporting review:', error);
    res.status(500).json({
      success: false,
      message: 'Error reporting review',
      error: error.message
    });
  }
};

// ===== Helper: Update experience rating =====
async function updateExperienceRating(experienceId) {
  try {
    const reviews = await Review.find({ experienceId });
    const total = reviews.length;
    const average = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total 
      : 0;

    await Experience.findByIdAndUpdate(experienceId, {
      rating: Math.round(average * 10) / 10,
      reviewCount: total
    });

    console.log(`✅ Updated experience ${experienceId}: rating=${average.toFixed(1)}, count=${total}`);
  } catch (error) {
    console.error('❌ Error updating experience rating:', error);
  }
}

module.exports = {
  getExperienceReviews,
  createReview,
  deleteReview,
  verifyReview,
  markHelpful,
  reportReview
};
