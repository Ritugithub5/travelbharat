// Import all 9 images
import t31 from "../videos/t31.png";
import t32 from "../videos/t32.png";
import t33 from "../videos/t33.png";
import t34 from "../videos/t34.png";
import t35 from "../videos/t35.png";
import t36 from "../videos/t36.png";
import t37 from "../videos/t37.png";
import t38 from "../videos/t38.png";
import t39 from "../videos/t39.png";

export const waterMountainSection = {
  india: {
    id: "india-water-mountain",
    name: "Water & Mountain Adventures",
    state: "India",
    region: "South Asia",
    subCategory: "Water & Mountain",
    description: "From crystal-clear islands and thrilling river rafting to snow-covered peaks and misty green valleys, discover India's most breathtaking destinations for water and mountain adventures.",
    coverImage: t31,
    highlights: [
      "Andaman Islands - Crystal-clear turquoise waters",
      "Udaipur - City of Lakes with majestic palaces",
      "Rishikesh - White-water rafting through Himalayan rapids",
      "Gulmarg - Snow-covered mountains and gondola rides",
      "Meghalaya - Floating clouds and lush valleys",
      "Athirappilly Falls - Kerala's largest waterfall"
    ],
    bestTimeToVisit: "October to March",
    entryFee: "Varies by destination",
    timings: "6:00 AM - 6:00 PM",
    howToReach: {
      byAir: "Major airports: Port Blair, Srinagar, Bengaluru, Kochi",
      byTrain: "Well-connected railway network",
      byRoad: "Extensive national highway network"
    },
    activities: [
      { emoji: "🏊", name: "Scuba Diving", description: "Andaman Islands" },
      { emoji: "🚣", name: "River Rafting", description: "Rishikesh" },
      { emoji: "🏄", name: "Surfing", description: "Kovalam" },
      { emoji: "⛷️", name: "Skiing", description: "Gulmarg" },
      { emoji: "🏔️", name: "Trekking", description: "Chikmagalur" },
      { emoji: "🌊", name: "Boating", description: "Udaipur" },
      { emoji: "⛰️", name: "Mountain Biking", description: "Meghalaya" },
      { emoji: "🌿", name: "Nature Walks", description: "Athirappilly" }
    ],
    topDestinations: [
      {
        name: "Andaman Islands",
        description: "Crystal-clear turquoise waters, white sand beaches and hidden lagoons.",
        bestTime: "October to May",
        highlights: ["Scuba Diving", "Beach Hopping", "Coral Reefs"]
      },
      {
        name: "Gulmarg",
        description: "Snow-covered mountains, gondola rides and breathtaking landscapes.",
        bestTime: "December to February",
        highlights: ["Skiing", "Gondola Ride", "Snow Activities"]
      },
      {
        name: "Rishikesh",
        description: "Feel the thrill of white-water rafting through Himalayan rapids.",
        bestTime: "September to June",
        highlights: ["River Rafting", "Bungee Jumping", "Yoga"]
      },
      {
        name: "Meghalaya",
        description: "Floating clouds, waterfalls and lush valleys unlike anywhere else.",
        bestTime: "October to May",
        highlights: ["Living Root Bridges", "Waterfalls", "Clouds"]
      }
    ],
    travelTips: [
      "Carry appropriate gear for adventure activities",
      "Check weather conditions before planning",
      "Book activities in advance",
      "Stay hydrated during treks",
      "Respect local environment and culture"
    ],
    accommodations: [
      { name: "Beach Resorts", type: "Luxury", location: "Andaman" },
      { name: "Mountain Lodges", type: "Mid-range", location: "Gulmarg" },
      { name: "Eco Camps", type: "Boutique", location: "Meghalaya" }
    ],
    rating: 4.8,
    reviewCount: 2100,
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