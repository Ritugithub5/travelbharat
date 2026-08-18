// backend/seedAllExperiences.js
const mongoose = require('mongoose');
const Experience = require('./src/models/Experience');
require('dotenv').config();

// Import clean data
const {
  wildlifeData,
  birdsData,
  ecoData,
  artData,
  waterData,
  spiritualData,
  wellnessData,
  culinaryData,
  luxuryData
} = require('./data/cleanData');

console.log('🔍 Starting seed process...');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedAllExperiences();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const extractData = (data, sourceType) => {
  if (!data) return [];
  
  let items = [];
  
  // If it's an array
  if (Array.isArray(data)) {
    items = data;
  }
  // If it has an 'india' property (most common pattern)
  else if (data.india) {
    items = [data.india];
  }
  // If it's an object with multiple entries
  else if (typeof data === 'object') {
    const values = Object.values(data);
    if (values.some(v => Array.isArray(v))) {
      values.forEach(v => {
        if (Array.isArray(v)) items = items.concat(v);
      });
    } else {
      items = values;
    }
  }
  
  return items.map(item => ({
    name: item.name || item.title || 'Unknown',
    category: item.category || item.subCategory || sourceType,
    description: item.description || item.desc || '',
    state: item.state || 'India',
    image: item.image || item.coverImage || '',
    images: item.images || [],
    rating: item.rating || 0,
    reviewCount: item.reviewCount || 0,
    bestTimeToVisit: item.bestTimeToVisit || '',
    entryFee: item.entryFee || 'Free',
    timings: item.timings || 'Open all days',
    highlights: item.highlights || [],
    isPopular: item.isPopular || false,
    isVerified: true
  }));
};

const seedAllExperiences = async () => {
  try {
    console.log('🗑️ Clearing existing experiences...');
    await Experience.deleteMany({});

    console.log('📥 Seeding all experience data...');
    
    let allData = [];

    // Wildlife
    console.log('📥 Processing Wildlife...');
    const wildlife = extractData(wildlifeData, 'Wildlife');
    allData = allData.concat(wildlife);
    console.log(`   ✅ ${wildlife.length} wildlife items`);

    // Birds
    console.log('📥 Processing Bird Watching...');
    const birds = extractData(birdsData, 'Bird Watching');
    allData = allData.concat(birds);
    console.log(`   ✅ ${birds.length} bird watching items`);

    // Eco Tourism
    console.log('📥 Processing Eco Tourism...');
    const eco = extractData(ecoData, 'Eco Tourism');
    allData = allData.concat(eco);
    console.log(`   ✅ ${eco.length} eco tourism items`);

    // Art Gallery
    console.log('📥 Processing Art Gallery...');
    const art = extractData(artData, 'Art Gallery');
    allData = allData.concat(art);
    console.log(`   ✅ ${art.length} art gallery items`);

    // Water & Mountain
    console.log('📥 Processing Water & Mountain...');
    const water = extractData(waterData, 'Water & Mountain');
    allData = allData.concat(water);
    console.log(`   ✅ ${water.length} water & mountain items`);

    // Spiritual
    console.log('📥 Processing Spiritual...');
    const spiritual = extractData(spiritualData, 'Spiritual');
    allData = allData.concat(spiritual);
    console.log(`   ✅ ${spiritual.length} spiritual items`);

    // Wellness
    console.log('📥 Processing Wellness...');
    const wellness = extractData(wellnessData, 'Wellness');
    allData = allData.concat(wellness);
    console.log(`   ✅ ${wellness.length} wellness items`);

    // Culinary
    console.log('📥 Processing Culinary...');
    const culinary = extractData(culinaryData, 'Culinary');
    allData = allData.concat(culinary);
    console.log(`   ✅ ${culinary.length} culinary items`);

    // Luxury Travel
    console.log('📥 Processing Luxury Travel...');
    const luxury = extractData(luxuryData, 'Luxury Travel');
    allData = allData.concat(luxury);
    console.log(`   ✅ ${luxury.length} luxury items`);

    // Remove duplicates by name
    const seen = new Set();
    const uniqueData = allData.filter(item => {
      if (item.name && !seen.has(item.name.toLowerCase())) {
        seen.add(item.name.toLowerCase());
        return true;
      }
      return false;
    });

    console.log(`📦 Inserting ${uniqueData.length} unique items into MongoDB...`);
    
    if (uniqueData.length > 0) {
      const result = await Experience.insertMany(uniqueData);
      console.log(`✅ ${result.length} items inserted successfully!`);
    } else {
      console.log('⚠️ No data to insert');
    }

    // Show categories summary
    const categories = await Experience.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Categories Summary:');
    categories.forEach(c => {
      console.log(`   - ${c._id}: ${c.count} items`);
    });

    const total = await Experience.countDocuments();
    console.log(`\n📊 Total experiences in MongoDB: ${total}`);
    console.log('\n✅ Seeding complete!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding:', error);
    process.exit(1);
  }
};