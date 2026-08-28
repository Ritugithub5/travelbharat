// frontend/src/services/syncData.js
import api from './api';

// Import your static data
import { wildlifeDestinations } from '../data/wildlifeDestinations';
import { birdsDestinations } from '../data/birdsDestinations';
import { EcoTourismPage } from '../data/ecoData';
import { ArtGallery } from '../data/artGalleryData';
import { waterMountainSection } from '../data/waterMountainData';
import { Spiritual } from '../data/Spiritual';
import { Wellness } from '../data/wellnessDestinations';
import { allLuxuryDestinations } from '../data/luxuryDestinations';
import { Culinary } from '../data/culinaryDestinations';

// Helper to extract data
const extractStaticData = () => {
  const data = [];
  
  // Wildlife
  if (wildlifeDestinations?.india) {
    data.push({
      ...wildlifeDestinations.india,
      category: 'Wildlife',
      subCategory: 'Wildlife Safari',
      source: 'wildlife'
    });
  }
  
  // Birds
  if (birdsDestinations?.india) {
    data.push({
      ...birdsDestinations.india,
      category: 'Bird Watching',
      subCategory: 'Bird Watching',
      source: 'birds'
    });
  }
  
  // Eco Tourism
  if (EcoTourismPage?.india) {
    data.push({
      ...EcoTourismPage.india,
      category: 'Eco Tourism',
      subCategory: 'Eco Tourism',
      source: 'eco'
    });
  }
  
  // Art Gallery
  if (ArtGallery?.india) {
    data.push({
      ...ArtGallery.india,
      category: 'Art Gallery',
      subCategory: 'Art Gallery',
      source: 'art'
    });
  }
  
  // Water & Mountain
  if (waterMountainSection?.india) {
    data.push({
      ...waterMountainSection.india,
      category: 'Water & Mountain',
      subCategory: 'Water & Mountain',
      source: 'water'
    });
  }
  
  // Spiritual
  if (Spiritual?.india) {
    data.push({
      ...Spiritual.india,
      category: 'Spiritual',
      subCategory: 'Spiritual',
      source: 'spiritual'
    });
  }
  
  // Wellness
  if (Wellness?.india) {
    data.push({
      ...Wellness.india,
      category: 'Wellness',
      subCategory: 'Wellness',
      source: 'wellness'
    });
  }
  
  // Culinary
  if (Culinary?.india) {
    data.push({
      ...Culinary.india,
      category: 'Culinary',
      subCategory: 'Culinary',
      source: 'culinary'
    });
  }
  
  // Luxury
  if (allLuxuryDestinations && Array.isArray(allLuxuryDestinations)) {
    allLuxuryDestinations.forEach(item => {
      data.push({
        ...item,
        category: 'Luxury Travel',
        subCategory: 'Luxury Travel',
        source: 'luxury'
      });
    });
  }
  
  return data;
};

// Sync static data to MongoDB
export const syncStaticDataToMongoDB = async () => {
  try {
    console.log('🔄 Checking if sync needed...');
    
    // Check if data exists in MongoDB
    const checkResponse = await api.get('/experiences?limit=1');
    if (checkResponse.data?.experiences?.length > 0) {
      console.log('✅ Data already exists in MongoDB, skipping sync');
      return { success: true, synced: false, message: 'Data already exists' };
    }
    
    console.log('📤 Syncing static data to MongoDB...');
    
    // Get static data
    const staticData = extractStaticData();
    
    // Prepare for MongoDB
    const dataToSync = staticData.map(item => ({
      name: item.name || 'Unknown',
      category: item.category || 'Experience',
      subCategory: item.subCategory || item.category,
      description: item.description || '',
      state: item.state || 'India',
      image: item.image || item.coverImage || '',
      rating: item.rating || 0,
      reviewCount: item.reviewCount || 0,
      bestTimeToVisit: item.bestTimeToVisit || '',
      entryFee: item.entryFee || 'Free',
      timings: item.timings || 'Open all days',
      highlights: item.highlights || [],
      isPopular: item.isPopular || false,
      isVerified: true,
      page: item.page || 'experience',
      source: item.source || 'static'
    }));
    
    // Send to MongoDB
    const response = await api.post('/experiences/sync', { experiences: dataToSync });
    
    if (response.data?.success) {
      console.log(`✅ ${dataToSync.length} items synced to MongoDB successfully!`);
      return { success: true, synced: true, count: dataToSync.length };
    } else {
      console.log('⚠️ Failed to sync data to MongoDB');
      return { success: false, synced: false, message: 'Sync failed' };
    }
    
  } catch (error) {
    console.error('❌ Error syncing data to MongoDB:', error);
    return { success: false, synced: false, message: error.message };
  }
};

export default syncStaticDataToMongoDB;
