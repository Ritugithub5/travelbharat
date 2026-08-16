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
    getDestinationReviews: (req, res) => res.json({ success: true, message: 'Reviews endpoint' }),
    createReview: (req, res) => res.json({ success: true, message: 'Create review endpoint' }),
    deleteReview: (req, res) => res.json({ success: true, message: 'Delete review endpoint' }),
    verifyReview: (req, res) => res.json({ success: true, message: 'Verify review endpoint' }),
    markHelpful: (req, res) => res.json({ success: true, message: 'Mark helpful endpoint' }),
    reportReview: (req, res) => res.json({ success: true, message: 'Report review endpoint' })
  };
}

// ============================================
// IMPORTANT: Specific routes MUST come before 
// the /:id route to avoid conflicts
// ============================================

// GET reviews for an experience (Public)
router.get('/experience/:experienceId', reviewController.getDestinationReviews);

// POST - Create a review (Private)
router.post('/', auth, reviewController.createReview);

// POST - Mark review as helpful (Private)
router.post('/:id/helpful', auth, reviewController.markHelpful);

// POST - Report a review (Private)
router.post('/:id/report', auth, reviewController.reportReview);

// DELETE - Delete a review (Admin only)
router.delete('/:id', auth, authorize('admin'), reviewController.deleteReview);

// PUT - Verify a review (Admin only)
router.put('/:id/verify', auth, authorize('admin'), reviewController.verifyReview);

module.exports = router;