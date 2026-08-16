// backend/data/cleanData.js
// Simplified data - only essential fields

const wildlifeData = {
  india: {
    name: "India Wildlife Sanctuaries",
    state: "India",
    category: "Wildlife",
    description: "India is a treasure trove for wildlife enthusiasts, offering pristine forests, mangrove ecosystems, and diverse wildlife across its vast landscape.",
    highlights: [
      "Sundarbans - World's largest mangrove forest",
      "Jim Corbett - India's oldest national park",
      "Kaziranga - Home to one-horned rhinoceros",
      "Ranthambore - Famous for tiger sightings"
    ],
    bestTimeToVisit: "October to March",
    entryFee: "₹50-300",
    timings: "6:00 AM - 6:00 PM",
    rating: 4.8,
    reviewCount: 2560,
    isPopular: true
  }
};

const birdsData = {
  india: {
    name: "Birds of India",
    state: "India",
    category: "Bird Watching",
    description: "India is a paradise for bird watchers, home to over 1,300 species of birds.",
    highlights: [
      "Keoladeo National Park",
      "Sunderbans - Various bird species",
      "Kerala Backwaters - Rich in birdlife"
    ],
    bestTimeToVisit: "November to March",
    entryFee: "₹50-200",
    timings: "6:00 AM - 6:00 PM",
    rating: 4.9,
    reviewCount: 1230,
    isPopular: true
  }
};

const ecoData = {
  india: {
    name: "Eco Tourism India",
    state: "India",
    category: "Eco Tourism",
    description: "Eco tourism in India offers sustainable travel experiences that conserve the environment.",
    highlights: [
      "Sustainable tourism practices",
      "Community-based tourism",
      "Conservation efforts"
    ],
    bestTimeToVisit: "October to March",
    rating: 4.7,
    reviewCount: 890,
    isPopular: true
  }
};

const artData = {
  india: {
    name: "Art Gallery India",
    state: "India",
    category: "Art Gallery",
    description: "Discover India's rich artistic heritage through its vibrant art galleries.",
    highlights: [
      "Traditional Indian art",
      "Contemporary exhibitions",
      "Cultural workshops"
    ],
    bestTimeToVisit: "Throughout the year",
    rating: 4.6,
    reviewCount: 750,
    isPopular: false
  }
};

const waterData = {
  india: {
    name: "Water & Mountain Adventures",
    state: "India",
    category: "Water & Mountain",
    description: "Experience thrilling water and mountain adventures across India.",
    highlights: [
      "River rafting",
      "Mountain trekking",
      "Water sports",
      "Camping"
    ],
    bestTimeToVisit: "April to October",
    rating: 4.8,
    reviewCount: 1500,
    isPopular: true
  }
};

const spiritualData = {
  india: {
    name: "Spiritual India",
    state: "India",
    category: "Spiritual",
    description: "India is a land of spirituality, home to ancient temples and sacred rivers.",
    highlights: [
      "Ancient temples",
      "Sacred rivers",
      "Spiritual retreats",
      "Yoga and meditation"
    ],
    bestTimeToVisit: "October to March",
    rating: 4.9,
    reviewCount: 3200,
    isPopular: true
  }
};

const wellnessData = {
  india: {
    name: "Wellness Retreats India",
    state: "India",
    category: "Wellness",
    description: "India is a premier wellness destination, offering Ayurvedic treatments and yoga retreats.",
    highlights: [
      "Ayurvedic treatments",
      "Yoga retreats",
      "Meditation centers",
      "Spa experiences"
    ],
    bestTimeToVisit: "October to March",
    rating: 4.7,
    reviewCount: 980,
    isPopular: false
  }
};

const culinaryData = {
  india: {
    name: "Culinary Experiences India",
    state: "India",
    category: "Culinary",
    description: "India's culinary landscape is a vibrant tapestry of flavors and spices.",
    highlights: [
      "Regional cuisines",
      "Street food tours",
      "Cooking classes",
      "Spice markets"
    ],
    bestTimeToVisit: "Throughout the year",
    rating: 4.8,
    reviewCount: 2100,
    isPopular: true
  }
};

const luxuryData = [
  {
    name: "Luxury Palace Stays",
    state: "Rajasthan",
    category: "Luxury Travel",
    description: "Experience the royal lifestyle by staying in converted palaces and heritage hotels.",
    highlights: [
      "Royal palaces",
      "Heritage hotels",
      "Luxury amenities"
    ],
    bestTimeToVisit: "October to March",
    rating: 4.9,
    reviewCount: 850,
    isPopular: true
  },
  {
    name: "Luxury Safari Experiences",
    state: "Various",
    category: "Luxury Travel",
    description: "Experience wildlife in luxury with premium safari camps.",
    highlights: [
      "Premium safari camps",
      "Exclusive wildlife viewing",
      "Luxury amenities"
    ],
    bestTimeToVisit: "October to June",
    rating: 4.8,
    reviewCount: 620,
    isPopular: false
  }
];

module.exports = {
  wildlifeData,
  birdsData,
  ecoData,
  artData,
  waterData,
  spiritualData,
  wellnessData,
  culinaryData,
  luxuryData
};