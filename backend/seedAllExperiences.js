// backend/seedAllExperiences.js
const mongoose = require('mongoose');
const Experience = require('./src/models/Experience');
require('dotenv').config();

// Import data
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

// Updated extractData function that handles both arrays and objects
const extractData = (data, category) => {
  if (!data) return [];
  
  let items = [];
  
  // If it's an array, use it directly
  if (Array.isArray(data)) {
    items = data;
  } 
  // If it has an 'india' property (like your data)
  else if (data.india) {
    // If data.india is an array, use it
    if (Array.isArray(data.india)) {
      items = data.india;
    } else {
      // If it's a single object, wrap it in an array
      items = [data.india];
    }
  }
  // If it's a single object without 'india' key
  else if (typeof data === 'object' && data.name) {
    items = [data];
  }
  // If it's an object with multiple entries
  else if (typeof data === 'object') {
    Object.values(data).forEach(value => {
      if (Array.isArray(value)) {
        items = items.concat(value);
      } else if (value && typeof value === 'object' && value.name) {
        items.push(value);
      }
    });
  }
  
  // Map to the format your Experience model expects
  return items.map(item => ({
    name: item.name || item.title || 'Unknown',
    category: item.category || item.subCategory || category,
    subCategory: item.subCategory || item.category || category,
    description: item.description || item.desc || '',
    state: item.state || 'India',
    region: item.region || 'India',
    coverImage: item.coverImage || item.image || '',
    images: item.images || [],
    rating: item.rating || 4.0,
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
    const deleteResult = await Experience.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} experiences`);

    console.log('📥 Seeding all experience data...');
    
    let allData = [];

    // Process each category
    console.log('📥 Processing Wildlife...');
    const wildlife = extractData(wildlifeData, 'Wildlife');
    allData = allData.concat(wildlife);
    console.log(`   ✅ ${wildlife.length} wildlife items`);

    console.log('📥 Processing Bird Watching...');
    const birds = extractData(birdsData, 'Bird Watching');
    allData = allData.concat(birds);
    console.log(`   ✅ ${birds.length} bird watching items`);

    console.log('📥 Processing Eco Tourism...');
    const eco = extractData(ecoData, 'Eco Tourism');
    allData = allData.concat(eco);
    console.log(`   ✅ ${eco.length} eco tourism items`);

    console.log('📥 Processing Art Gallery...');
    const art = extractData(artData, 'Art Gallery');
    allData = allData.concat(art);
    console.log(`   ✅ ${art.length} art gallery items`);

    console.log('📥 Processing Water & Mountain...');
    const water = extractData(waterData, 'Water & Mountain');
    allData = allData.concat(water);
    console.log(`   ✅ ${water.length} water & mountain items`);

    console.log('📥 Processing Spiritual...');
    const spiritual = extractData(spiritualData, 'Spiritual');
    allData = allData.concat(spiritual);
    console.log(`   ✅ ${spiritual.length} spiritual items`);

    console.log('📥 Processing Wellness...');
    const wellness = extractData(wellnessData, 'Wellness');
    allData = allData.concat(wellness);
    console.log(`   ✅ ${wellness.length} wellness items`);

    console.log('📥 Processing Culinary...');
    const culinary = extractData(culinaryData, 'Culinary');
    allData = allData.concat(culinary);
    console.log(`   ✅ ${culinary.length} culinary items`);

    console.log('📥 Processing Luxury Travel...');
    const luxury = extractData(luxuryData, 'Luxury Travel');
    allData = allData.concat(luxury);
    console.log(`   ✅ ${luxury.length} luxury items`);

    console.log(`📊 Total data extracted: ${allData.length} items`);

    if (allData.length === 0) {
      console.log('⚠️ No data to insert!');
      process.exit(0);
    }

    // Remove duplicates by name (case insensitive)
    const seen = new Map();
    const uniqueData = [];
    
    allData.forEach(item => {
      const key = item.name.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.set(key, true);
        uniqueData.push(item);
      }
    });

    console.log(`📊 Unique data count: ${uniqueData.length} items`);

    console.log(`📦 Inserting ${uniqueData.length} unique items into MongoDB...`);
    
    // Insert in batches to avoid memory issues
    const batchSize = 50;
    let inserted = 0;
    
    for (let i = 0; i < uniqueData.length; i += batchSize) {
      const batch = uniqueData.slice(i, i + batchSize);
      const result = await Experience.insertMany(batch, { ordered: false });
      inserted += result.length;
      console.log(`   ✅ Inserted batch ${Math.floor(i/batchSize) + 1}: ${result.length} items`);
    }
    
    console.log(`✅ Total inserted: ${inserted} items successfully!`);

    // Show categories summary
    const categories = await Experience.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Categories Summary:');
    if (categories.length > 0) {
      categories.forEach(c => {
        console.log(`   - ${c._id}: ${c.count} items`);
      });
    } else {
      console.log('   No categories found');
    }

    const total = await Experience.countDocuments();
    console.log(`\n📊 Total experiences in MongoDB: ${total}`);
    console.log('\n✅ Seeding complete!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding:', error);
    if (error.code === 11000) {
      console.log('⚠️ Some duplicate entries were skipped (this is fine)');
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};
