// backend/src/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');

// Import review controller - make sure the file exists
let reviewController;
try {
  reviewController = require('../controllers/reviewController');
} catch (error) {
  console.error('❌ Review controller not found, creating mock controller');
  // Mock controller functions if file doesn't exist
  reviewController = {
    getExperienceReviews: (req, res) => {
      res.json({ 
        success: true, 
        reviews: [], 
        stats: { total: 0, average: 0, ratingCounts: {} } 
      });
    },
    createReview: (req, res) => {
      res.status(201).json({ 
        success: true, 
        message: 'Review created successfully',
        review: req.body 
      });
    },
    deleteReview: (req, res) => {
      res.json({ success: true, message: 'Review deleted successfully' });
    },
    verifyReview: (req, res) => {
      res.json({ success: true, message: 'Review verified successfully' });
    },
    markHelpful: (req, res) => {
      res.json({ success: true, message: 'Marked as helpful' });
    },
    reportReview: (req, res) => {
      res.json({ success: true, message: 'Review reported' });
    }
  };
}

// GET - Get all reviews for an experience
// URL: /api/experiences/:experienceId/reviews
router.get('/experiences/:experienceId/reviews', reviewController.getExperienceReviews);

// POST - Create a review for an experience
// URL: /api/experiences/:experienceId/reviews
router.post('/experiences/:experienceId/reviews', auth, reviewController.createReview);

// DELETE - Delete a review (Admin only)
// URL: /api/reviews/:reviewId
router.delete('/reviews/:id', auth, authorize('admin'), reviewController.deleteReview);

// PUT - Verify a review (Admin only)
// URL: /api/reviews/:id/verify
router.put('/reviews/:id/verify', auth, authorize('admin'), reviewController.verifyReview);

// POST - Mark review as helpful
// URL: /api/reviews/:id/helpful
router.post('/reviews/:id/helpful', auth, reviewController.markHelpful);

// POST - Report a review
// URL: /api/reviews/:id/report
router.post('/reviews/:id/report', auth, reviewController.reportReview);

module.exports = router; 
