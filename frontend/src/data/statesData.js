// frontend/src/data/statesData.js

// Import images
import himachalImg from '../videos/t81.png';
import ladakhImg from '../videos/t86.png';
import tamilImg from '../videos/t7.png';
import telanganaImg from '../videos/t78.png';
import westBengalImg from '../videos/t89.png';
import odishaImg from '../videos/t111.png';
import maharashtraImg from '../videos/t89.png';
import gujaratImg from '../videos/t111.png';
import madhyaPradeshImg from '../videos/t104.png';
import meghalayaImg from '../videos/t101.png';
import kashmirImg from '../videos/t76.png';

export const regionsData = [
  {
    id: 'north',
    name: 'North India',
    icon: '🏔️',
    description: 'Snow-capped mountains, spiritual towns, and royal heritage',
    color: 'from-blue-500 to-indigo-600',
    states: [
      {
        id: 'himachal-pradesh',
        name: 'Himachal Pradesh',
        capital: 'Shimla',
        code: 'HP',
        image: himachalImg,
        description: 'Land of Gods, known for scenic hill stations and adventure sports.',
        famousFor: ['Hill Stations', 'Adventure Sports', 'Trekking', 'Temples'],
        bestTimeToVisit: 'March to June, September to November',
        language: ['Hindi', 'Pahari'],
        population: '6.8 million',
        area: '55,673 km²',
        destinations: [
          {
            name: 'Manali',
            category: 'Hill Station',
            description: 'Popular hill station with beautiful valleys and adventure activities.',
            bestTimeToVisit: 'October to June'
          },
          {
            name: 'Shimla',
            category: 'Hill Station',
            description: 'The Queen of Hills, former summer capital of British India.',
            bestTimeToVisit: 'April to June, December to January'
          },
          {
            name: 'Dharamshala',
            category: 'Spiritual',
            description: 'Home to the Dalai Lama and Tibetan culture.',
            bestTimeToVisit: 'March to June, September to November'
          }
        ]
      },
      {
        id: 'ladakh',
        name: 'Ladakh',
        capital: 'Leh',
        code: 'LA',
        image: ladakhImg,
        description: 'High-altitude desert with stunning landscapes and Buddhist monasteries.',
        famousFor: ['Buddhist Monasteries', 'Adventure Sports', 'High Altitude Passes'],
        bestTimeToVisit: 'June to September',
        language: ['Ladakhi', 'Hindi', 'Urdu'],
        population: '274,000',
        area: '59,146 km²',
        destinations: [
          {
            name: 'Leh',
            category: 'Spiritual',
            description: 'Capital city with historic monasteries and vibrant markets.',
            bestTimeToVisit: 'June to September'
          },
          {
            name: 'Nubra Valley',
            category: 'Adventure',
            description: 'Valley with sand dunes and double-humped camels.',
            bestTimeToVisit: 'June to September'
          }
        ]
      },
      {
        id: 'kashmir',
        name: 'Kashmir',
        capital: 'Srinagar',
        code: 'JK',
        image: kashmirImg,
        description: 'Paradise on Earth with beautiful lakes, gardens, and mountains.',
        famousFor: ['Dal Lake', 'Houseboats', 'Mughal Gardens', 'Trekking'],
        bestTimeToVisit: 'April to October',
        language: ['Kashmiri', 'Dogri', 'Urdu', 'Hindi'],
        population: '12.5 million',
        area: '222,236 km²',
        destinations: [
          {
            name: 'Dal Lake',
            category: 'Nature',
            description: 'Iconic lake with houseboats and floating gardens.',
            bestTimeToVisit: 'April to October'
          },
          {
            name: 'Gulmarg',
            category: 'Adventure',
            description: 'Skiing paradise with stunning Himalayan views.',
            bestTimeToVisit: 'December to March (Snow), April to June (Green)'
          }
        ]
      }
    ]
  },
  {
    id: 'south',
    name: 'South India',
    icon: '🌴',
    description: 'Tropical paradise with temples, beaches, and rich Dravidian culture',
    color: 'from-green-400 to-emerald-600',
    states: [
      {
        id: 'tamil-nadu',
        name: 'Tamil Nadu',
        capital: 'Chennai',
        code: 'TN',
        image: tamilImg,
        description: 'Land of ancient temples, classical arts, and beautiful beaches.',
        famousFor: ['Temples', 'Bharatanatyam', 'Chettinad Cuisine', 'Beaches'],
        bestTimeToVisit: 'October to March',
        language: ['Tamil'],
        population: '72.1 million',
        area: '130,058 km²',
        destinations: [
          {
            name: 'Meenakshi Temple',
            category: 'Religious',
            description: 'Historic temple with stunning architecture and vibrant festivals.',
            bestTimeToVisit: 'October to March'
          },
          {
            name: 'Mahabalipuram',
            category: 'Heritage',
            description: 'Ancient rock-cut temples and sculptures by the sea.',
            bestTimeToVisit: 'November to February'
          }
        ]
      },
      {
        id: 'telangana',
        name: 'Telangana',
        capital: 'Hyderabad',
        code: 'TS',
        image: telanganaImg,
        description: 'Land of rich history, delicious cuisine, and modern IT hub.',
        famousFor: ['Hyderabad Biryani', 'Charminar', 'Golconda Fort', 'IT Industry'],
        bestTimeToVisit: 'October to March',
        language: ['Telugu', 'Urdu'],
        population: '35.0 million',
        area: '112,077 km²',
        destinations: [
          {
            name: 'Charminar',
            category: 'Heritage',
            description: 'Iconic 16th-century mosque with four grand arches.',
            bestTimeToVisit: 'October to March'
          },
          {
            name: 'Golconda Fort',
            category: 'Heritage',
            description: 'Massive fortress with acoustic wonders and light show.',
            bestTimeToVisit: 'November to February'
          }
        ]
      }
    ]
  },
  {
    id: 'east',
    name: 'East India',
    icon: '🌅',
    description: 'Land of the rising sun, tribal culture, and natural wonders',
    color: 'from-amber-500 to-orange-600',
    states: [
      {
        id: 'west-bengal',
        name: 'West Bengal',
        capital: 'Kolkata',
        code: 'WB',
        image: westBengalImg,
        description: 'Cultural capital of India with literature, art, and sweets.',
        famousFor: ['Durga Puja', 'Howrah Bridge', 'Sweets', 'Darjeeling Tea'],
        bestTimeToVisit: 'October to March',
        language: ['Bengali'],
        population: '91.3 million',
        area: '88,752 km²',
        destinations: [
          {
            name: 'Darjeeling',
            category: 'Hill Station',
            description: 'Queen of Hills with tea gardens and Himalayan views.',
            bestTimeToVisit: 'April to June, September to November'
          },
          {
            name: 'Kolkata',
            category: 'Cultural',
            description: 'City of Joy with colonial architecture and cultural heritage.',
            bestTimeToVisit: 'October to March'
          }
        ]
      },
      {
        id: 'odisha',
        name: 'Odisha',
        capital: 'Bhubaneswar',
        code: 'OD',
        image: odishaImg,
        description: 'Land of temples, festivals, and pristine beaches.',
        famousFor: ['Konark Temple', 'Puri Beach', 'Rath Yatra', 'Tribal Culture'],
        bestTimeToVisit: 'October to March',
        language: ['Odia'],
        population: '46.2 million',
        area: '155,707 km²',
        destinations: [
          {
            name: 'Konark Sun Temple',
            category: 'Heritage',
            description: 'UNESCO site with chariot-shaped temple architecture.',
            bestTimeToVisit: 'October to March'
          },
          {
            name: 'Puri Beach',
            category: 'Beach',
            description: 'Beautiful beach with golden sands and famous Jagannath Temple.',
            bestTimeToVisit: 'November to February'
          }
        ]
      }
    ]
  },
  {
    id: 'west',
    name: 'West India',
    icon: '🏜️',
    description: 'Land of deserts, palaces, beaches, and vibrant culture',
    color: 'from-red-500 to-orange-600',
    states: [
      {
        id: 'maharashtra',
        name: 'Maharashtra',
        capital: 'Mumbai',
        code: 'MH',
        image: maharashtraImg,
        description: 'Economic powerhouse with beaches, caves, and hill stations.',
        famousFor: ['Mumbai', 'Ajanta-Ellora Caves', 'Lonavala', 'Maharashtra Cuisine'],
        bestTimeToVisit: 'October to February',
        language: ['Marathi', 'Hindi'],
        population: '112.4 million',
        area: '307,713 km²',
        destinations: [
          {
            name: 'Mumbai',
            category: 'City',
            description: 'City of Dreams with iconic landmarks and Bollywood.',
            bestTimeToVisit: 'October to March'
          },
          {
            name: 'Ajanta Caves',
            category: 'Heritage',
            description: 'Ancient Buddhist cave paintings and rock-cut architecture.',
            bestTimeToVisit: 'June to March'
          }
        ]
      },
      {
        id: 'gujarat',
        name: 'Gujarat',
        capital: 'Gandhinagar',
        code: 'GJ',
        image: gujaratImg,
        description: 'Land of vibrant festivals, wildlife, and industry.',
        famousFor: ['Rann of Kutch', 'Gir National Park', 'Navratri', 'Dhokla'],
        bestTimeToVisit: 'November to February',
        language: ['Gujarati'],
        population: '60.4 million',
        area: '196,024 km²',
        destinations: [
          {
            name: 'Rann of Kutch',
            category: 'Nature',
            description: 'White salt desert with breathtaking sunsets and festivals.',
            bestTimeToVisit: 'October to March'
          },
          {
            name: 'Gir National Park',
            category: 'Wildlife',
            description: 'Home to the majestic Asiatic lions.',
            bestTimeToVisit: 'December to April'
          }
        ]
      }
    ]
  },
  {
    id: 'central',
    name: 'Central India',
    icon: '🌳',
    description: 'Heart of India with dense forests, rivers, and tribal culture',
    color: 'from-green-600 to-teal-600',
    states: [
      {
        id: 'madhya-pradesh',
        name: 'Madhya Pradesh',
        capital: 'Bhopal',
        code: 'MP',
        image: madhyaPradeshImg,
        description: 'Heart of India with wildlife sanctuaries and historic temples.',
        famousFor: ['Khajuraho Temples', 'Bandhavgarh', 'Wildlife Sanctuaries'],
        bestTimeToVisit: 'October to March',
        language: ['Hindi'],
        population: '72.6 million',
        area: '308,245 km²',
        destinations: [
          {
            name: 'Khajuraho Temples',
            category: 'Heritage',
            description: 'Ancient temples with intricate erotic sculptures.',
            bestTimeToVisit: 'October to March'
          },
          {
            name: 'Bandhavgarh National Park',
            category: 'Wildlife',
            description: 'Best place to spot Bengal tigers in India.',
            bestTimeToVisit: 'November to June'
          }
        ]
      }
    ]
  },
  {
    id: 'north-east',
    name: 'North East India',
    icon: '🌄',
    description: 'Seven sisters with pristine beauty, tribes, and biodiversity',
    color: 'from-purple-500 to-pink-600',
    states: [
      {
        id: 'meghalaya',
        name: 'Meghalaya',
        capital: 'Shillong',
        code: 'ML',
        image: meghalayaImg,
        description: 'Abode of Clouds with living root bridges and waterfalls.',
        famousFor: ['Living Root Bridges', 'Waterfalls', 'Cherrapunji', 'Shillong'],
        bestTimeToVisit: 'September to May',
        language: ['Khasi', 'Garo', 'English'],
        population: '2.9 million',
        area: '22,429 km²',
        destinations: [
          {
            name: 'Living Root Bridges',
            category: 'Nature',
            description: 'Unique living bridges made from rubber trees.',
            bestTimeToVisit: 'October to April'
          },
          {
            name: 'Cherrapunji',
            category: 'Nature',
            description: 'One of the wettest places on Earth with stunning waterfalls.',
            bestTimeToVisit: 'September to May'
          }
        ]
      },
      
    ]
  }
];
