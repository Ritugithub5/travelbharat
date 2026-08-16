const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');

// Protected admin routes
router.get('/dashboard', auth, authorize('admin'), (req, res) => {
  res.json({ 
    message: 'Admin dashboard access granted',
    user: req.user
  });
});

module.exports = router;