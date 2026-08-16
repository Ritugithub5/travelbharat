// frontend/src/data/exportAllData.js
// This file exports only the data without image imports

import { wildlifeDestinations } from './wildlifeDestinations';
import { birdsDestinations } from './birdsDestinations';
import { EcoTourismPage } from './ecoData';
import { ArtGallery } from './artGalleryData';
import { waterMountainSection } from './waterMountainData';
import { Spiritual } from './Spiritual';
import { Wellness } from './wellnessDestinations';
import { allLuxuryDestinations } from './luxuryDestinations';
import { Culinary } from './culinaryDestinations';

// Helper to clean data (remove image imports)
const cleanData = (data) => {
  if (!data) return null;
  
  // If it's an array
  if (Array.isArray(data)) {
    return data.map(item => {
      const { coverImage, image, images, ...rest } = item;
      return {
        ...rest,
        image: typeof image === 'string' ? image : '',
        images: Array.isArray(images) ? images.filter(img => typeof img === 'string') : [],
        coverImage: typeof coverImage === 'string' ? coverImage : ''
      };
    });
  }
  
  // If it's an object with india property
  if (data.india) {
    const { coverImage, image, images, ...rest } = data.india;
    return {
      india: {
        ...rest,
        image: typeof image === 'string' ? image : '',
        images: Array.isArray(images) ? images.filter(img => typeof img === 'string') : [],
        coverImage: typeof coverImage === 'string' ? coverImage : ''
      }
    };
  }
  
  // If it's a simple object
  if (typeof data === 'object') {
    const { coverImage, image, images, ...rest } = data;
    return {
      ...rest,
      image: typeof image === 'string' ? image : '',
      images: Array.isArray(images) ? images.filter(img => typeof img === 'string') : [],
      coverImage: typeof coverImage === 'string' ? coverImage : ''
    };
  }
  
  return data;
};

// Clean all data
export const cleanWildlife = cleanData(wildlifeDestinations);
export const cleanBirds = cleanData(birdsDestinations);
export const cleanEco = cleanData(EcoTourismPage);
export const cleanArt = cleanData(ArtGallery);
export const cleanWater = cleanData(waterMountainSection);
export const cleanSpiritual = cleanData(Spiritual);
export const cleanWellness = cleanData(Wellness);
export const cleanLuxury = cleanData(allLuxuryDestinations);
export const cleanCulinary = cleanData(Culinary);

// Export all cleaned data as named exports
export const allExperienceData = {
  wildlife: cleanWildlife,
  birds: cleanBirds,
  eco: cleanEco,
  art: cleanArt,
  water: cleanWater,
  spiritual: cleanSpiritual,
  wellness: cleanWellness,
  luxury: cleanLuxury,
  culinary: cleanCulinary
};

// Default export
export default allExperienceData;

// Also export individual items for convenience
export {
  cleanWildlife as wildlifeData,
  cleanBirds as birdsData,
  cleanEco as ecoData,
  cleanArt as artData,
  cleanWater as waterData,
  cleanSpiritual as spiritualData,
  cleanWellness as wellnessData,
  cleanLuxury as luxuryData,
  cleanCulinary as culinaryData
};