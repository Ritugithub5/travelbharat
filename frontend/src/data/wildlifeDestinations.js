// Import images
import t11 from '../videos/t11.png';
import t12 from '../videos/t12.png';
import t13 from '../videos/t13.png';

export const wildlifeDestinations = {
  india: {
    id: "india-wildlife",
    name: "India Wildlife Sanctuaries",
    state: "India",
    region: "South Asia",
    category: "Nature & Wildlife",
    subCategory: "Wildlife Safari",
    description: "India is a treasure trove for wildlife enthusiasts, offering pristine forests, mangrove ecosystems, and diverse wildlife across its vast landscape. The country is home to famous wildlife destinations like the Sundarbans, the largest mangrove forest in the world, and several national parks that protect endangered species like the Royal Bengal Tigers, Indian Elephants, and One-Horned Rhinoceros.",
    coverImage: t11,
    highlights: [
      "Sundarbans - World's largest mangrove forest",
      "Jim Corbett National Park - India's oldest national park",
      "Kaziranga National Park - Home to one-horned rhinoceros",
      "Ranthambore National Park - Famous for tiger sightings",
      "Periyar Wildlife Sanctuary - Elephant and tiger reserve",
      "Bandhavgarh National Park - High tiger density"
    ],
    bestTimeToVisit: "October to March (Winter season)",
    entryFee: "₹50-300 (Indian), ₹200-600 (Foreigner)",
    timings: "6:00 AM - 6:00 PM",
    howToReach: {
      byAir: "Major international airports: Delhi, Mumbai, Bengaluru, Chennai",
      byTrain: "Well-connected railway network across all states",
      byRoad: "Extensive national highway network connecting all major cities"
    },
    wildlifeSpecies: [
      { name: "Royal Bengal Tiger", emoji: "🐅", description: "Found in various national parks across India" },
      { name: "Indian Elephant", emoji: "🐘", description: "Roams in forests of South and North-East India" },
      { name: "One-Horned Rhinoceros", emoji: "🦏", description: "Found in Kaziranga National Park, Assam" },
      { name: "Indian Leopard", emoji: "🐆", description: "Found in forests across India" },
      { name: "Sloth Bear", emoji: "🐻", description: "Found in dry forests of India" },
      { name: "Indian Peacock", emoji: "🦚", description: "National bird of India" },
      { name: "Gharial", emoji: "🐊", description: "Found in rivers of North India" },
      { name: "Snow Leopard", emoji: "🐾", description: "Found in Himalayan region" }
    ],
    topSanctuaries: [
      {
        name: "Jim Corbett National Park",
        description: "India's oldest national park, famous for its Bengal tigers and diverse wildlife. Located in Uttarakhand, it offers thrilling jeep safaris and elephant rides.",
        bestTime: "October to June",
        highlights: ["Tiger sightings", "Elephant safaris", "Bird watching", "Scenic landscapes"]
      },
      {
        name: "Kaziranga National Park",
        description: "A UNESCO World Heritage Site, home to the world's largest population of one-horned rhinoceros. Located in Assam, it also hosts tigers, elephants, and water buffaloes.",
        bestTime: "November to April",
        highlights: ["One-horned rhinos", "Wild elephants", "Tiger reserve", "Grassland ecosystem"]
      },
      {
        name: "Ranthambore National Park",
        description: "One of the best places in India to see tigers in their natural habitat. Located in Rajasthan, it features ancient ruins and a picturesque lake.",
        bestTime: "October to March",
        highlights: ["Tiger sightings", "Ancient ruins", "Bird watching", "Scenic lake"]
      },
      {
        name: "Sundarbans National Park",
        description: "The largest mangrove forest in the world and a UNESCO World Heritage Site. Home to the Royal Bengal Tiger and saltwater crocodiles.",
        bestTime: "October to March",
        highlights: ["Royal Bengal Tiger", "Mangrove ecosystem", "Crocodiles", "Bird watching"]
      },
      {
        name: "Bandhavgarh National Park",
        description: "Known for having the highest density of tigers in India. Located in Madhya Pradesh, it also features the ancient Bandhavgarh Fort.",
        bestTime: "October to June",
        highlights: ["Highest tiger density", "Bandhavgarh Fort", "Deer species", "Exotic birds"]
      },
      {
        name: "Periyar Wildlife Sanctuary",
        description: "A beautiful wildlife sanctuary in Kerala, known for its elephant and tiger populations. Located around the Periyar Lake.",
        bestTime: "October to February",
        highlights: ["Elephant sightings", "Boat safaris", "Tiger reserve", "Pristine forests"]
      }
    ],
    nearbyAttractions: [
      { name: "Taj Mahal", distance: "Various", description: "UNESCO World Heritage site in Agra" },
      { name: "Jaipur City Palace", distance: "Various", description: "Royal palace in Rajasthan" },
      { name: "Kerala Backwaters", distance: "Various", description: "Serene waterways in South India" },
      { name: "Himalayan Peaks", distance: "Various", description: "Mountain range in North India" }
    ],
    travelTips: [
      "Carry binoculars for bird watching",
      "Wear neutral-colored clothing for safaris",
      "Book safari permits in advance",
      "Stay in eco-friendly resorts",
      "Respect wildlife and maintain safe distance",
      "Carry insect repellent and sunscreen"
    ],
    accommodations: [
      { name: "The Oberoi Hotels", type: "Luxury", location: "Various cities" },
      { name: "Taj Hotels", type: "Luxury", location: "Various cities" },
      { name: "ITC Hotels", type: "Luxury", location: "Various cities" },
      { name: "Eco Retreats", type: "Eco-lodge", location: "Various wildlife destinations" }
    ],
    rating: 4.8,
    reviewCount: 2560,
    isPopular: true,
    weather: {
      summer: "25-45°C (March to June)",
      monsoon: "25-35°C (July to September)",
      winter: "10-30°C (October to February)"
    },
    emergencyContacts: {
      forestDepartment: "+91-11-12345678",
      police: "100",
      ambulance: "108",
      tourism: "+91-11-98765432"
    }
  }
};