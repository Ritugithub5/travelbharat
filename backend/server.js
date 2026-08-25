// backend/server.js
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

console.log('🟢 Starting server...');
console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('📊 MONGODB_URI exists:', !!process.env.MONGODB_URI);

// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('💡 Please check your MONGODB_URI environment variable');
});

// ============================================
// USER SCHEMA
// ============================================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// ============================================
// AUTH ROUTES WITH BETTER LOGGING
// ============================================

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('📝 Register attempt:', { email, username });
    
    // Validation
    if (!email || !password || !username) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔒 Password hashed successfully');
    
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log('✅ User saved to database:', user._id);
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generated');
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, username, email, role: user.role } 
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// LOGIN - WITH DETAILED LOGGING
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔑 Login attempt:', email);
    console.log('📝 Request body:', req.body);
    
    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    console.log('🔍 Finding user...');
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log('👤 User found:', { 
      id: user._id, 
      email: user.email, 
      username: user.username,
      hasPassword: !!user.password
    });
    
    console.log('🔒 Comparing passwords...');
    console.log('📝 Stored hash length:', user.password.length);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log('🎫 Generating JWT token...');
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );
    
    console.log('✅ Login successful for:', email);
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, username: user.username, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('📊 Error details:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
    console.error('❌ Error fetching states:', error);
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
    console.error('❌ Error fetching experiences:', error);
    res.json({ success: false, experiences: [] });
  }
});

// ============================================
// TEST & HEALTH ROUTES
// ============================================
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    status: 'success',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: {
      jwt_secret_set: !!process.env.JWT_SECRET,
      mongodb_uri_set: !!process.env.MONGODB_URI
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    database: mongoose.connection.name || 'unknown'
  });
});

// ============================================
// ROOT ROUTE
// ============================================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🌏 Welcome to TravelBharat API',
    version: '1.0.0',
    status: '🟢 Online',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      data: {
        states: 'GET /api/states',
        experiences: 'GET /api/experiences'
      },
      utilities: {
        test: 'GET /api/test',
        health: 'GET /api/health'
      }
    }
  });
});

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`✅ POST /api/auth/login`);
  console.log(`✅ POST /api/auth/register`);
  console.log(`✅ GET  /api/states`);
  console.log(`✅ GET  /api/experiences`);
  console.log(`✅ GET  /api/test`);
  console.log(`✅ GET  /api/health`);
  console.log(`✅ GET  /`);
  console.log(`\n✅ Ready for requests!\n`);
});