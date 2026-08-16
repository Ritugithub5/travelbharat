// Import Art Gallery images
import t25Img from '../videos/t25.png';
import t26Img from '../videos/t26.png';
import t27Img from '../videos/t27.png';
import t28Img from '../videos/t28.png';
import t29Img from '../videos/t29.png';
import t30Img from '../videos/t30.png';

export const ArtGallery = {
  india: {
    id: "india-art",
    name: "India's Art & Heritage Galleries",
    state: "India",
    region: "South Asia",
    category: "Arts & Culture",
    subCategory: "Art Gallery",
    description: "India's art galleries showcase a rich tapestry of cultural heritage, from royal Rajput paintings and Mughal miniatures to contemporary masterpieces. These galleries preserve centuries of artistic traditions while embracing modern creative expressions.",
    coverImage: t25Img,
    rating: 4.9,
    reviewCount: 2850,
    isPopular: true,
    bestTimeToVisit: "October to March",
    entryFee: "₹100-500 (Indian), ₹300-800 (Foreigner)",
    timings: "10:00 AM - 6:00 PM (Closed on Mondays)",
    highlights: [
      "Royal Rajput miniature paintings",
      "Mughal-era masterpieces",
      "Contemporary Indian art",
      "Traditional craft exhibitions",
      "Interactive art workshops",
      "Architectural heritage tours"
    ],
    weather: {
      summer: "25-40°C",
      monsoon: "25-35°C",
      winter: "10-25°C"
    },
    howToReach: {
      byAir: "Major international airports: Delhi, Mumbai, Bengaluru, Chennai",
      byTrain: "Well-connected railway network across all states",
      byRoad: "Extensive national highway network"
    },
    emergencyContacts: {
      police: "100",
      ambulance: "108",
      tourism: "+91-11-12345678"
    },
    travelTips: [
      "Book guided tours in advance",
      "Photography allowed in designated areas",
      "Wear comfortable shoes for gallery walks",
      "Check for special exhibitions",
      "Purchase tickets online to avoid queues"
    ],
    accommodations: [
      { name: "The Taj Mahal Palace", type: "Luxury", location: "Mumbai" },
      { name: "ITC Grand Chola", type: "Luxury", location: "Chennai" },
      { name: "The Lalit", type: "Mid-range", location: "New Delhi" },
      { name: "Boutique Heritage Hotels", type: "Boutique", location: "Various cities" }
    ],
    // ===== ART GALLERY SPECIFIC DATA =====
    artCategories: [
      { emoji: "🏛️", name: "Royal Heritage", description: "Rajput & Mughal paintings" },
      { emoji: "🎨", name: "Contemporary", description: "Modern Indian art" },
      { emoji: "🖼️", name: "Sculptures", description: "Stone & bronze works" },
      { emoji: "🌿", name: "Folk Art", description: "Traditional crafts" },
      { emoji: "📸", name: "Photography", description: "Vintage & modern" },
      { emoji: "🪷", name: "Religious Art", description: "Temple & spiritual art" }
    ],
    topGalleries: [
      {
        name: "National Gallery of Modern Art",
        description: "One of India's premier art institutions showcasing modern and contemporary Indian art.",
        bestTime: "October to March",
        highlights: ["Modern Indian masters", "Raja Ravi Varma", "Contemporary exhibitions"]
      },
      {
        name: "Jawahar Kala Kendra",
        description: "A cultural center in Jaipur celebrating Rajasthani art, craft, and performing arts.",
        bestTime: "October to February",
        highlights: ["Rajasthani miniature paintings", "Craft workshops", "Cultural performances"]
      },
      {
        name: "Kolkata Victoria Memorial Gallery",
        description: "Houses a stunning collection of British-era paintings, sculptures, and historical artifacts.",
        bestTime: "November to March",
        highlights: ["British colonial art", "Historical portraits", "Victorian-era exhibits"]
      },
      {
        name: "India Habitat Centre Art Gallery",
        description: "A dynamic space in Delhi hosting rotating exhibitions of contemporary Indian artists.",
        bestTime: "Year-round",
        highlights: ["Contemporary art", "Artist talks", "Cultural events"]
      }
    ],
    artExperiences: [
      {
        name: "Guided Gallery Tour",
        description: "Expert-led walks through India's finest art collections",
        duration: "2-3 hours",
        price: "₹500-1500"
      },
      {
        name: "Art Workshop",
        description: "Learn traditional Indian painting techniques from master artists",
        duration: "3-4 hours",
        price: "₹1500-3000"
      },
      {
        name: "Private Viewing",
        description: "Exclusive after-hours access to premium collections",
        duration: "2 hours",
        price: "₹3000-5000"
      },
      {
        name: "Art & Architecture Walk",
        description: "Combine art appreciation with architectural heritage tours",
        duration: "4-5 hours",
        price: "₹2000-4000"
      }
    ]
  }
};