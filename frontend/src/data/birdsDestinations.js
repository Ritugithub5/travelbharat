import t14 from '../videos/t14.png';
import t15 from '../videos/t15.png';
import t16 from '../videos/t16.png';
import t17 from '../videos/t17.png';

export const birdsDestinations = {
  india: {
    id: "india-birds",
    name: "Birds of India",
    state: "India",
    region: "South Asia",
    category: "Nature & Wildlife",
    type: "Bird Watching",
    description: "India is a paradise for bird watchers, home to over 1,300 species of birds — more than 13% of the world's avian population. From the majestic Himalayan peaks to the coastal wetlands of the south, the country offers incredible opportunities to observe rare and exotic birds in their natural habitats.",
    coverImage: t14,
    gallery: [t14, t15, t16, t17],
    highlights: [
      "Indian Peacock - National bird of India",
      "Himalayan Monal - State bird of Uttarakhand",
      "Sarus Crane - World's tallest flying bird",
      "Bengal Florican - Critically endangered",
      "Great Indian Bustard - Near threatened",
      "Siberian Cranes - Migratory visitors"
    ],
    bestTimeToVisit: "November to March",
    entryFee: "₹50-100 (Indian), ₹200-400 (Foreigner)",
    timings: "6:00 AM - 6:00 PM",
    howToReach: {
      byAir: "Major international airports: Delhi, Mumbai, Bengaluru, Chennai",
      byTrain: "Well-connected railway network",
      byRoad: "Extensive national highway network"
    },
    birdSpecies: [
      { name: "Indian Peacock", emoji: "🦚", description: "National bird" },
      { name: "Himalayan Monal", emoji: "🦃", description: "Himalayan forests" },
      { name: "Sarus Crane", emoji: "🦢", description: "World's tallest flying bird" },
      { name: "Bengal Florican", emoji: "🐦", description: "Critically endangered" },
      { name: "Siberian Crane", emoji: "🕊️", description: "Winter visitor" },
      { name: "Kingfisher", emoji: "🐧", description: "Found near water" },
      { name: "Hornbill", emoji: "🦜", description: "Western Ghats" },
      { name: "Flamingo", emoji: "🦩", description: "Coastal wetlands" }
    ],
    topBirdSanctuaries: [
      {
        name: "Bharatpur Bird Sanctuary",
        description: "UNESCO World Heritage Site with 370+ bird species.",
        bestTime: "October to March",
        highlights: ["Siberian Cranes", "Sarus Crane", "Migrant birds"]
      },
      {
        name: "Kumarakom Bird Sanctuary",
        description: "Located on Vembanad Lake, Kerala.",
        bestTime: "November to February",
        highlights: ["Siberian Cranes", "Kingfishers", "Darters"]
      },
      {
        name: "Sultanpur National Park",
        description: "Haryana, 250+ species near Delhi.",
        bestTime: "October to March",
        highlights: ["Migrant ducks", "Painted Storks", "Flamingos"]
      },
      {
        name: "Ranganathittu Bird Sanctuary",
        description: "Karnataka, nesting colonies on islands.",
        bestTime: "November to February",
        highlights: ["Painted Storks", "Herons", "Cormorants"]
      }
    ],
    nearbyAttractions: [
      { name: "Taj Mahal", distance: "Various", description: "UNESCO World Heritage" },
      { name: "Backwaters of Kerala", distance: "Various", description: "Serene waterways" }
    ],
    travelTips: [
      "Carry good binoculars",
      "Wear neutral-colored clothing",
      "Bring a bird guide book",
      "Start early morning",
      "Maintain silence while observing"
    ],
    accommodations: [
      { name: "Forest Lodges", type: "Mid-range", location: "Various sanctuaries" },
      { name: "Eco Resorts", type: "Boutique", location: "Near bird sanctuaries" }
    ],
    rating: 4.9,
    reviewCount: 3120,
    isPopular: true,
    weather: {
      summer: "25-40°C",
      monsoon: "25-35°C",
      winter: "10-25°C"
    },
    emergencyContacts: {
      forestDepartment: "+91-11-12345678",
      police: "100",
      ambulance: "108",
      tourism: "+91-11-98765432"
    }
  }
};