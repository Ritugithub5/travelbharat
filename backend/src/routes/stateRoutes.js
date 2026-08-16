// backend/src/routes/stateRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const State = require('../models/State');
const { auth, authorize } = require('../middleware/auth');

// GET all states
router.get('/', async (req, res) => {
  try {
    const { region, search, limit = 50, page = 1 } = req.query;
    
    let query = {};
    if (region) query.region = region;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { capital: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { stateCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const states = await State.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await State.countDocuments(query);
    
    res.json({
      success: true,
      count: states.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      states
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single state by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid ID format' 
      });
    }
    
    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }
    
    res.json({ 
      success: true, 
      state
    });
  } catch (error) {
    console.error('Error fetching state:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST - Create new state (Admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json({ success: true, state });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'State with this name or code already exists' 
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT - Update state (Admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    
    const state = await State.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!state) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }
    res.json({ success: true, state });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE - Delete state (Admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    
    const state = await State.findByIdAndDelete(id);
    if (!state) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }
    res.json({ success: true, message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;