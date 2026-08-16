// backend/src/models/State.js
const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'State name is required'],
    unique: true,
    trim: true
  },
  capital: {
    type: String,
    required: [true, 'Capital is required']
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    enum: ['North', 'South', 'East', 'West', 'Central', 'North-East']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  language: [{
    type: String
  }],
  population: {
    type: String,
    default: 'N/A'
  },
  area: {
    type: String,
    default: 'N/A'
  },
  famousFor: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=State'
  },
  stateCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    minlength: 2,
    maxlength: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('State', stateSchema);