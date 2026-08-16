// backend/extractData.js
// This script extracts data from frontend files without importing images

const fs = require('fs');
const path = require('path');

// Helper to extract data from JS files without executing image imports
const extractDataFromFile = (filePath) => {
  try {
    // Resolve the full path
    const fullPath = path.resolve(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Find the export object - handles multiple export patterns
    let exportMatch = content.match(/export\s+const\s+(\w+)\s*=\s*({[\s\S]*?});/);
    
    // If not found, try other patterns
    if (!exportMatch) {
      exportMatch = content.match(/export\s+const\s+(\w+)\s*=\s*(\[[\s\S]*?\]);/);
    }
    
    if (!exportMatch) {
      console.log('⚠️ No export found in:', filePath);
      return null;
    }
    
    const varName = exportMatch[1];
    let dataStr = exportMatch[2];
    
    // Clean the content - remove image imports
    // Remove import statements
    dataStr = dataStr.replace(/import\s+.*?;?/g, '');
    // Remove any remaining image variable references
    dataStr = dataStr.replace(/t\d+/g, '""');
    // Remove coverImage references
    dataStr = dataStr.replace(/coverImage:\s*t\d+/g, 'coverImage: ""');
    // Remove image references
    dataStr = dataStr.replace(/image:\s*t\d+/g, 'image: ""');
    
    try {
      // Use Function constructor instead of eval for better safety
      const result = new Function(`return (${dataStr})`)();
      return result;
    } catch (e) {
      console.log('❌ Could not parse:', filePath, e.message);
      return null;
    }
  } catch (error) {
    console.error('❌ Error reading file:', filePath, error.message);
    return null;
  }
};

// Extract all data
console.log('📥 Extracting data from frontend files...');

const wildlifeData = extractDataFromFile('../frontend/src/data/wildlifeDestinations.js');
const birdsData = extractDataFromFile('../frontend/src/data/birdsDestinations.js');
const ecoData = extractDataFromFile('../frontend/src/data/ecoData.js');
const artData = extractDataFromFile('../frontend/src/data/artGalleryData.js');
const waterData = extractDataFromFile('../frontend/src/data/waterMountainData.js');
const spiritualData = extractDataFromFile('../frontend/src/data/Spiritual.js');
const wellnessData = extractDataFromFile('../frontend/src/data/wellnessDestinations.js');
const luxuryData = extractDataFromFile('../frontend/src/data/luxuryDestinations.js');
const culinaryData = extractDataFromFile('../frontend/src/data/culinaryDestinations.js');

// Log results
console.log('📊 Extraction Results:');
console.log(`   Wildlife: ${wildlifeData ? '✅' : '❌'}`);
console.log(`   Birds: ${birdsData ? '✅' : '❌'}`);
console.log(`   Eco: ${ecoData ? '✅' : '❌'}`);
console.log(`   Art: ${artData ? '✅' : '❌'}`);
console.log(`   Water: ${waterData ? '✅' : '❌'}`);
console.log(`   Spiritual: ${spiritualData ? '✅' : '❌'}`);
console.log(`   Wellness: ${wellnessData ? '✅' : '❌'}`);
console.log(`   Luxury: ${luxuryData ? '✅' : '❌'}`);
console.log(`   Culinary: ${culinaryData ? '✅' : '❌'}`);

module.exports = {
  wildlifeData,
  birdsData,
  ecoData,
  artData,
  waterData,
  spiritualData,
  wellnessData,
  luxuryData,
  culinaryData
};