// backend/src/routes/experienceRoutes.js
const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { auth, authorize } = require('../middleware/auth');

// GET all experiences with filters (Public)
router.get('/', async (req, res) => {
  try {
    const { category, search, state, limit = 50, page = 1 } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (state) query.state = state;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const experiences = await Experience.find(query)
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Experience.countDocuments(query);
    
    res.json({
      success: true,
      count: experiences.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      experiences
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET featured experiences (Public)
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    const experiences = await Experience.find({ isVerified: true, isPopular: true })
      .sort({ rating: -1 })
      .limit(parseInt(limit));
    
    res.json({ 
      success: true, 
      count: experiences.length,
      experiences 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single experience by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== NEW: SYNC STATIC DATA TO MONGODB =====
// POST - Sync static data to MongoDB (Admin only)
router.post('/sync', auth, authorize('admin'), async (req, res) => {
  try {
    const { experiences } = req.body;
    
    if (!experiences || !Array.isArray(experiences) || experiences.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format. Expected array of experiences.'
      });
    }
    
    // Check if data already exists
    const existingCount = await Experience.countDocuments();
    if (existingCount > 0) {
      return res.status(200).json({
        success: true,
        message: `Data already exists in MongoDB (${existingCount} items). Skipping sync.`,
        alreadySynced: true,
        count: existingCount
      });
    }
    
    // Insert new data
    const result = await Experience.insertMany(experiences);
    
    console.log(`✅ Synced ${result.length} static items to MongoDB`);
    
    res.json({
      success: true,
      message: `${result.length} items synced successfully!`,
      count: result.length,
      synced: true
    });
    
  } catch (error) {
    console.error('❌ Sync error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to sync data'
    });
  }
});

// POST - Create new experience (Admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json({ success: true, experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT - Update experience (Admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE - Delete experience (Admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
