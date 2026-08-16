// backend/seedSimple.js
const mongoose = require('mongoose');
const Experience = require('./src/models/Experience');
require('dotenv').config();

console.log('🔍 Starting seed process...');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedData();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const sampleData = [
  // Hill Stations
  { name: "Manali", category: "Hill Station", description: "Popular hill station with beautiful valleys and adventure activities.", state: "Himachal Pradesh", rating: 4.5, isVerified: true, isPopular: true },
  { name: "Shimla", category: "Hill Station", description: "The Queen of Hills, former summer capital of British India.", state: "Himachal Pradesh", rating: 4.3, isVerified: true },
  { name: "Dharamshala", category: "Hill Station", description: "Home to the Dalai Lama and Tibetan culture.", state: "Himachal Pradesh", rating: 4.4, isVerified: true },
  { name: "Leh", category: "Spiritual", description: "Capital city with historic monasteries and vibrant markets.", state: "Ladakh", rating: 4.6, isVerified: true },
  { name: "Nubra Valley", category: "Adventure", description: "Valley with sand dunes and double-humped camels.", state: "Ladakh", rating: 4.7, isVerified: true },
  
  // Wildlife
  { name: "Wildlife Safari India", category: "Wildlife", description: "India is a treasure trove for wildlife enthusiasts.", state: "India", rating: 4.8, isVerified: true, isPopular: true },
  { name: "Tiger Reserve", category: "Wildlife", description: "Home to the majestic Bengal tigers.", state: "India", rating: 4.9, isVerified: true },
  
  // Bird Watching
  { name: "Birds of India", category: "Bird Watching", description: "India is a paradise for bird watchers.", state: "India", rating: 4.9, isVerified: true, isPopular: true },
  
  // Eco Tourism
  { name: "Eco Tourism India", category: "Eco Tourism", description: "Sustainable travel experiences that conserve the environment.", state: "India", rating: 4.7, isVerified: true },
  
  // Art Gallery
  { name: "Art Gallery India", category: "Art Gallery", description: "Discover the rich artistic heritage of India.", state: "India", rating: 4.6, isVerified: true },
  
  // Spiritual
  { name: "Spiritual India", category: "Spiritual", description: "Feel the spiritual energy of sacred rivers and ancient temples.", state: "India", rating: 4.8, isVerified: true, isPopular: true },
  
  // Wellness
  { name: "Wellness Retreats", category: "Wellness", description: "Rejuvenating experiences for mind and body.", state: "India", rating: 4.7, isVerified: true },
  
  // Culinary
  { name: "Culinary Tours", category: "Culinary", description: "Experience the diverse and flavorful cuisine of India.", state: "India", rating: 4.8, isVerified: true },
  
  // Luxury
  { name: "Luxury Travel India", category: "Luxury Travel", description: "Experience the finest luxury travel experiences.", state: "India", rating: 4.9, isVerified: true, isPopular: true },
  
  // Heritage
  { name: "Hawa Mahal", category: "Heritage", description: "The Palace of Winds with 953 small windows.", state: "Rajasthan", rating: 4.5, isVerified: true },
  { name: "Meenakshi Temple", category: "Religious", description: "Historic temple with stunning architecture.", state: "Tamil Nadu", rating: 4.8, isVerified: true },
  { name: "Charminar", category: "Heritage", description: "Iconic 16th-century mosque with four grand arches.", state: "Telangana", rating: 4.7, isVerified: true },
  { name: "Gateway of India", category: "Heritage", description: "Iconic monument overlooking the Arabian Sea.", state: "Maharashtra", rating: 4.6, isVerified: true },
  { name: "Khajuraho Temples", category: "Heritage", description: "Ancient temples with intricate sculptures.", state: "Madhya Pradesh", rating: 4.8, isVerified: true },
  
  // Beaches
  { name: "Baga Beach", category: "Beach", description: "Popular beach with water sports and vibrant nightlife.", state: "Goa", rating: 4.4, isVerified: true },
  { name: "Puri Beach", category: "Beach", description: "Beautiful beach with golden sands.", state: "Odisha", rating: 4.3, isVerified: true },
  
  // Adventure
  { name: "Gulmarg", category: "Adventure", description: "Skiing paradise with stunning Himalayan views.", state: "Kashmir", rating: 4.7, isVerified: true },
  { name: "Rann of Kutch", category: "Nature", description: "White salt desert with breathtaking sunsets.", state: "Gujarat", rating: 4.8, isVerified: true }
];

async function seedData() {
  try {
    console.log('🗑️ Clearing existing experiences...');
    await Experience.deleteMany({});

    console.log(`📥 Inserting ${sampleData.length} items...`);
    const result = await Experience.insertMany(sampleData);
    
    console.log(`✅ ${result.length} items inserted successfully!`);
    
    const categories = await Experience.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Categories Summary:');
    categories.forEach(c => console.log(`   - ${c._id}: ${c.count} items`));
    
    const total = await Experience.countDocuments();
    console.log(`\n📊 Total experiences in MongoDB: ${total}`);
    console.log('\n✅ Seeding complete!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}