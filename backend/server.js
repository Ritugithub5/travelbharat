// backend/server.js - COMPLETE WORKING SOLUTION
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err.message));

// ============================================
// USER SCHEMA & MODEL
// ============================================
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// ============================================
// AUTH ROUTES
// ============================================

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, username, email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, username: user.username, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// STATES
// ============================================
const stateSchema = new mongoose.Schema({
  name: String,
  capital: String,
  region: String,
  description: String,
  stateCode: String,
  imageUrl: String,
  famousFor: [String]
});
const State = mongoose.model('State', stateSchema);

app.get('/api/states', async (req, res) => {
  try {
    const states = await State.find();
    res.json({ success: true, states });
  } catch (error) {
    res.json({ success: false, states: [] });
  }
});

// ============================================
// EXPERIENCES
// ============================================
const experienceSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  state: String,
  rating: Number,
  image: String,
  isPopular: Boolean,
  isVerified: Boolean
});
const Experience = mongoose.model('Experience', experienceSchema);

app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json({ success: true, experiences });
  } catch (error) {
    res.json({ success: false, experiences: [] });
  }
});

// ============================================
// TEST ROUTES
// ============================================
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    status: 'success',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`✅ POST /api/auth/register`);
  console.log(`✅ POST /api/auth/login`);
  console.log(`✅ GET  /api/states`);
  console.log(`✅ GET  /api/experiences`);
  console.log(`✅ GET  /api/test`);
  console.log(`\n✅ Ready for requests!\n`);
});