import t50 from '../videos/t50.png';
import t51 from '../videos/t51.png';
import t52 from '../videos/t52.png';
import t53 from '../videos/t53.png';
import t54 from '../videos/t54.png';
import t55 from '../videos/t55.png';

// Main export for Luxury Travel
export const LuxuryTravel = {
  india: {
    id: "luxury-india",
    name: "Luxury Escapes India",
    state: "India",
    region: "South Asia",
    category: "Luxury Travel",
    subcategory: "Lifestyle Escapes",
    page: "LuxuryTravel",
    description: "Discover India's most exclusive luxury retreats, from the royal palaces of Rajasthan to the pristine beaches of Goa and the tranquil backwaters of Kerala.",
    coverImage: t55,
    gallery: [t55, t50, t51, t52],
    highlights: [
      "Palace stays in Rajasthan",
      "Private beachfront villas in Goa",
      "Houseboat cruises in Kerala",
      "Spa and wellness retreats",
      "Heritage hotel experiences",
      "Personalized luxury itineraries"
    ],
    bestTimeToVisit: "October to March",
    entryFee: "$2,500 - $10,000 per night",
    timings: "Flexible check-in/check-out",
    howToReach: {
      byAir: "Major international airports: Delhi, Mumbai, Bengaluru",
      byTrain: "Luxury train services like Palace on Wheels",
      byRoad: "Private chauffeur-driven luxury cars"
    },
    luxuryFeatures: [
      { name: "Personal Butler", emoji: "👨‍💼", description: "24/7 dedicated service" },
      { name: "Private Pool", emoji: "🏊", description: "Infinity pools with views" },
      { name: "Private Chef", emoji: "👨‍🍳", description: "Customized dining experiences" },
      { name: "Luxury Spa", emoji: "💆", description: "Traditional Ayurvedic treatments" },
      { name: "Yacht Charter", emoji: "⛵", description: "Private cruises available" },
      { name: "Helicopter Tours", emoji: "🚁", description: "Aerial city tours" }
    ],
    accommodations: [
      { name: "Palace Suites", type: "Ultra Luxury", location: "Rajasthan" },
      { name: "Beach Villas", type: "Premium", location: "Goa" },
      { name: "Houseboats", type: "Luxury", location: "Kerala" },
      { name: "Heritage Hotels", type: "Boutique", location: "Various cities" }
    ],
    rating: 4.9,
    reviewCount: 2150,
    isPopular: true,
    weather: {
      summer: "30-45°C (April to June)",
      monsoon: "25-35°C (July to September)",
      winter: "10-30°C (October to March)"
    },
    emergencyContacts: {
      resortConcierge: "+91-11-12345678",
      police: "100",
      ambulance: "108",
      tourism: "+91-11-98765432"
    }
  }
};

// Export all luxury destinations as an array
export const allLuxuryDestinations = [
  { ...LuxuryTravel.india, key: 'luxury-india' }
];