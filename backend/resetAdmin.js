// backend/resetAdmin.js
const mongoose = require('mongoose');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

console.log('🔍 Starting admin reset...');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const resetAdmin = async () => {
  try {
    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@travelbharat.com' });
    console.log('🗑️ Removed existing admin');

    // Create new admin
    const admin = new User({
      username: 'admin',
      email: 'admin@travelbharat.com',
      password: 'admin123',
      role: 'admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@travelbharat.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: admin');

    // Verify
    const verify = await User.findOne({ email: 'admin@travelbharat.com' });
    console.log('✅ Verified:', {
      username: verify.username,
      email: verify.email,
      role: verify.role,
      isActive: verify.isActive
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

resetAdmin();