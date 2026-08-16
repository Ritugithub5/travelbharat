// backend/seedStates.js
const mongoose = require('mongoose');
const State = require('./src/models/State');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// States data from your regionsData
const statesData = [
  // North India
  {
    name: 'Himachal Pradesh',
    capital: 'Shimla',
    region: 'North',
    description: 'Land of Gods, known for scenic hill stations and adventure sports.',
    language: ['Hindi', 'Pahari'],
    population: '6.8 million',
    area: '55,673 km²',
    famousFor: ['Hill Stations', 'Adventure Sports', 'Trekking', 'Temples'],
    stateCode: 'HP',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  {
    name: 'Ladakh',
    capital: 'Leh',
    region: 'North',
    description: 'High-altitude desert with stunning landscapes and Buddhist monasteries.',
    language: ['Ladakhi', 'Hindi', 'Urdu'],
    population: '274,000',
    area: '59,146 km²',
    famousFor: ['Buddhist Monasteries', 'Adventure Sports', 'High Altitude Passes'],
    stateCode: 'LA',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  {
    name: 'Kashmir',
    capital: 'Srinagar',
    region: 'North',
    description: 'Paradise on Earth with beautiful lakes, gardens, and mountains.',
    language: ['Kashmiri', 'Dogri', 'Urdu', 'Hindi'],
    population: '12.5 million',
    area: '222,236 km²',
    famousFor: ['Dal Lake', 'Houseboats', 'Mughal Gardens'],
    stateCode: 'JK',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  // South India
  {
    name: 'Tamil Nadu',
    capital: 'Chennai',
    region: 'South',
    description: 'Land of ancient temples, classical arts, and beautiful beaches.',
    language: ['Tamil'],
    population: '72.1 million',
    area: '130,058 km²',
    famousFor: ['Temples', 'Bharatanatyam', 'Chettinad Cuisine', 'Beaches'],
    stateCode: 'TN',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  {
    name: 'Telangana',
    capital: 'Hyderabad',
    region: 'South',
    description: 'Land of rich history, delicious cuisine, and modern IT hub.',
    language: ['Telugu', 'Urdu'],
    population: '35.0 million',
    area: '112,077 km²',
    famousFor: ['Hyderabad Biryani', 'Charminar', 'Golconda Fort'],
    stateCode: 'TS',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  // East India
  {
    name: 'West Bengal',
    capital: 'Kolkata',
    region: 'East',
    description: 'Cultural capital of India with literature, art, and sweets.',
    language: ['Bengali'],
    population: '91.3 million',
    area: '88,752 km²',
    famousFor: ['Durga Puja', 'Howrah Bridge', 'Sweets', 'Darjeeling Tea'],
    stateCode: 'WB',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  {
    name: 'Odisha',
    capital: 'Bhubaneswar',
    region: 'East',
    description: 'Land of temples, festivals, and pristine beaches.',
    language: ['Odia'],
    population: '46.2 million',
    area: '155,707 km²',
    famousFor: ['Konark Temple', 'Puri Beach', 'Rath Yatra'],
    stateCode: 'OD',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  // West India
  {
    name: 'Maharashtra',
    capital: 'Mumbai',
    region: 'West',
    description: 'Economic powerhouse with beaches, caves, and hill stations.',
    language: ['Marathi', 'Hindi'],
    population: '112.4 million',
    area: '307,713 km²',
    famousFor: ['Mumbai', 'Ajanta-Ellora Caves', 'Lonavala'],
    stateCode: 'MH',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  {
    name: 'Gujarat',
    capital: 'Gandhinagar',
    region: 'West',
    description: 'Land of vibrant festivals, wildlife, and industry.',
    language: ['Gujarati'],
    population: '60.4 million',
    area: '196,024 km²',
    famousFor: ['Rann of Kutch', 'Gir National Park', 'Navratri'],
    stateCode: 'GJ',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  // Central India
  {
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    region: 'Central',
    description: 'Heart of India with wildlife sanctuaries and historic temples.',
    language: ['Hindi'],
    population: '72.6 million',
    area: '308,245 km²',
    famousFor: ['Khajuraho Temples', 'Bandhavgarh', 'Wildlife Sanctuaries'],
    stateCode: 'MP',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  },
  // North-East India
  {
    name: 'Meghalaya',
    capital: 'Shillong',
    region: 'North-East',
    description: 'Abode of Clouds with living root bridges and waterfalls.',
    language: ['Khasi', 'Garo', 'English'],
    population: '2.9 million',
    area: '22,429 km²',
    famousFor: ['Living Root Bridges', 'Waterfalls', 'Cherrapunji'],
    stateCode: 'ML',
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400'
  }
];

const seedStates = async () => {
  try {
    console.log('🗑️ Clearing existing states...');
    await State.deleteMany({});

    console.log('📥 Seeding states...');
    const result = await State.insertMany(statesData);
    console.log(`✅ ${result.length} states inserted successfully!`);

    // Show inserted states
    console.log('\n📊 States Summary:');
    const stats = await State.aggregate([
      { $group: { _id: '$region', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    stats.forEach(s => {
      console.log(`   - ${s._id}: ${s.count} states`);
    });

    const total = await State.countDocuments();
    console.log(`\n📊 Total states in MongoDB: ${total}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding states:', error);
    process.exit(1);
  }
};

seedStates();