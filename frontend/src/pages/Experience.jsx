// frontend/src/pages/Experience.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaStar, FaMapMarkerAlt, FaArrowLeft, FaHeart, 
  FaCalendar, FaClock, FaDollarSign, FaPhone, FaWhatsapp, 
  FaShare, FaBookmark, FaPlane, FaChevronRight,
  FaTimes, FaCompass, FaGlobeAsia, FaCamera, FaTree,
  FaMountain, FaUmbrellaBeach, FaLandmark, FaUtensils,
  FaSpa, FaPalette, FaDharmachakra, FaShip,
  FaPaw, FaLeaf, FaFeather, FaWater, FaSun, FaMoon,
  FaCloudSun, FaWind, FaSnowflake
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
 
import { wildlifeDestinations } from '../data/wildlifeDestinations';
import { birdsDestinations } from '../data/birdsDestinations';
import { EcoTourismPage } from '../data/ecoData'; 
import { ArtGallery } from '../data/artGalleryData';
import { waterMountainSection } from '../data/waterMountainData';
import { Spiritual } from '../data/Spiritual';
import { Wellness } from '../data/wellnessDestinations'; 
import { LuxuryTravel, allLuxuryDestinations } from '../data/luxuryDestinations';
import { Culinary } from '../data/culinaryDestinations';

// ===== IMPORT ALL IMAGES =====
import t11 from '../videos/t11.png';
import t12 from '../videos/t12.png';
import t13 from '../videos/t13.png';
import t14 from '../videos/t14.png';
import t15 from '../videos/t15.png';
import t16 from '../videos/t16.png';
import t17 from '../videos/t17.png';
import t18 from '../videos/t18.png';
import t19 from '../videos/t19.png';
import t20 from '../videos/t20.png';
import t21 from '../videos/t21.png';

const Experience = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState({});
  const [isBookmarked, setIsBookmarked] = useState({});

  // ===== ALL DESTINATIONS =====
  const allDestinations = [
    { 
      ...wildlifeDestinations.india, key: 'wildlife', subCategory: 'Wildlife Safari', page: 'wildlife',
      icon: <FaPaw className="text-emerald-500" />, gradient: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-600'
    },
    { 
      ...birdsDestinations.india, key: 'birds', subCategory: 'Bird Watching', page: 'birds',
      icon: <FaFeather className="text-blue-500" />, gradient: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-600'
    },
    { 
      ...EcoTourismPage.india, key: 'eco', subCategory: 'Eco Tourism', page: 'EcoTourismPage',
      icon: <FaLeaf className="text-green-500" />, gradient: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50', borderColor: 'border-green-200', textColor: 'text-green-600'
    },
    { 
      ...ArtGallery.india, key: 'art', subCategory: 'Art Gallery', page: 'ArtGallery',
      icon: <FaPalette className="text-purple-500" />, gradient: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-50', borderColor: 'border-purple-200', textColor: 'text-purple-600'
    },
    { 
      ...waterMountainSection.india, key: 'water-mountain', subCategory: 'Water & Mountain', page: 'WaterMountainSection',
      icon: <FaMountain className="text-indigo-500" />, gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', textColor: 'text-indigo-600'
    },
    { 
      ...Spiritual.india, key: 'Spiritual', subCategory: 'Spiritual', page: 'Spiritual',
      icon: <FaDharmachakra className="text-orange-500" />, gradient: 'from-orange-400 to-red-600',
      bgColor: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-600'
    },
    {
      ...Wellness.india, key: 'Wellness', subCategory: 'Wellness', page: 'Wellness',
      icon: <FaSpa className="text-teal-500" />, gradient: 'from-teal-400 to-green-600',
      bgColor: 'bg-teal-50', borderColor: 'border-teal-200', textColor: 'text-teal-600'
    },
    ...allLuxuryDestinations.map(d => ({ 
      ...d, key: d.key, subCategory: 'Luxury Travel', page: d.page || 'LuxuryTravel',
      icon: <FaShip className="text-amber-500" />, gradient: 'from-amber-400 to-orange-600',
      bgColor: 'bg-amber-50', borderColor: 'border-amber-200', textColor: 'text-amber-600'
    })),
    {
      ...Culinary.india, key: 'Culinary', subCategory: 'Culinary', page: 'Culinary',
      icon: <FaUtensils className="text-red-500" />, gradient: 'from-red-400 to-orange-600',
      bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600'
    },
  ];

  useEffect(() => {
    if (location.state?.selected) {
      const selected = location.state.selected;
      
      const routeMap = {
        'Bird Watching': '/birds',
        'Birds': '/birds',
        'Wildlife Safari': '/wildlife',
        'Wildlife': '/wildlife',
        'Eco Tourism': '/EcoTourismPage',
        'Eco': '/EcoTourismPage',
        'Art Gallery': '/ArtGallery',
        'Art': '/ArtGallery',
        'Water & Mountain': '/WaterMountainSection',
        'Water': '/WaterMountainSection',
        'Adventure': '/WaterMountainSection',
        'Spiritual': '/Spiritual',
        'Temple Tours': '/Spiritual',
        'Wellness': '/Wellness',
        'Yoga Retreats': '/Wellness',
        'Luxury Travel': '/LuxuryTravel',
        'Lifestyle Escapes': '/LuxuryTravel',
        'Culinary': '/Culinary',
        'Taste of India': '/Culinary'
      };

      for (const [key, route] of Object.entries(routeMap)) {
        if (selected.some(item => item.includes(key))) {
          navigate(route, { state: { selected } });
          return;
        }
      }
    }
  }, [location, navigate]);

  const toggleLike = (key) => {
    setIsLiked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBookmark = (key) => {
    setIsBookmarked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredDestinations = allDestinations.filter(dest => {
    const matchesSearch = dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.state?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.subCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'All', label: 'All', icon: <FaCompass className="text-gray-600" /> },
    { id: 'Wildlife Safari', label: 'Wildlife', icon: <FaPaw className="text-emerald-500" /> },
    { id: 'Bird Watching', label: 'Birding', icon: <FaFeather className="text-blue-500" /> },
    { id: 'Eco Tourism', label: 'Eco', icon: <FaLeaf className="text-green-500" /> },
    { id: 'Art Gallery', label: 'Art', icon: <FaPalette className="text-purple-500" /> },
    { id: 'Water & Mountain', label: 'Adventure', icon: <FaMountain className="text-indigo-500" /> },
    { id: 'Spiritual', label: 'Spiritual', icon: <FaDharmachakra className="text-orange-500" /> },
    { id: 'Wellness', label: 'Wellness', icon: <FaSpa className="text-teal-500" /> },
    { id: 'Luxury Travel', label: 'Luxury', icon: <FaShip className="text-amber-500" /> },
    { id: 'Culinary', label: 'Culinary', icon: <FaUtensils className="text-red-500" /> },
  ];

  const handleDestinationClick = (dest) => {
    if (dest.page && dest.page !== 'experience') {
      navigate(`/${dest.page}`, { state: { selected: [dest.subCategory] } });
      return;
    }
    setSelectedDestination(dest);
    setShowDetails(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedDestination(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== DETAILS VIEW =====
  if (showDetails && selectedDestination) {
    const dest = selectedDestination;
    const isBird = dest.subCategory === 'Bird Watching';
    const isEco = dest.subCategory === 'Eco Tourism';
    const color = isBird ? 'blue' : isEco ? 'emerald' : 'red';
    
    let heroImage, overviewImage, bestTimeImage, galleryImage;
    
    if (isEco) {
      heroImage = t18;
      overviewImage = t19;
      bestTimeImage = t20;
      galleryImage = t21;
    } else if (isBird) {
      heroImage = t14;
      overviewImage = t15;
      bestTimeImage = t16;
      galleryImage = t17;
    } else {
      heroImage = t11;
      overviewImage = t12;
      bestTimeImage = t13;
      galleryImage = t11;
    }
    
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition group font-medium"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition" /> 
              <span>Back to Experiences</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
            <img src={heroImage} alt={dest.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
              <div className="max-w-4xl mx-auto">
                <span className={`inline-block bg-${color}-500/30 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-white/20 mb-4`}>
                  ✦ {dest.subCategory} ✦
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  {dest.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-400" /> {dest.state}
                  </span>
                  <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {dest.rating} · {dest.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 flex gap-3">
            <button 
              onClick={() => toggleLike(dest.key)}
              className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition border border-white/20"
            >
              <FaHeart className={`text-xl ${isLiked[dest.key] ? 'text-red-500' : 'text-white'}`} />
            </button>
            <button 
              onClick={() => toggleBookmark(dest.key)}
              className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition border border-white/20"
            >
              <FaBookmark className={`text-xl ${isBookmarked[dest.key] ? 'text-yellow-400' : 'text-white'}`} />
            </button>
            <button className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition border border-white/20">
              <FaShare className="text-white text-xl" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div className="border-l-4 border-orange-500 pl-6">
                <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
                  {dest.description}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Discovering {dest.state}'s {isEco ? 'Sustainable' : isBird ? 'Avian' : 'Wild'} Side
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {dest.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {dest.highlights?.slice(0, 4).map((highlight, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-orange-400">✦</span> {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img src={overviewImage} alt={dest.name} className="w-full h-64 object-cover hover:scale-105 transition duration-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      When to Visit
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      The best time is during 
                      <span className="font-bold text-orange-600"> {dest.bestTimeToVisit}</span>.
                    </p>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {dest.weather && Object.entries(dest.weather).map(([season, temp]) => (
                        <div key={season} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                          <p className="text-2xl">{season === 'summer' ? '☀️' : season === 'monsoon' ? '🌧️' : '❄️'}</p>
                          <p className="text-xs font-bold capitalize">{season}</p>
                          <p className="text-[10px] text-gray-500">{temp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img src={bestTimeImage} alt={dest.name} className="w-full h-48 object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {isEco ? '🌱 Sustainable Practices' : isBird ? '🐦 Bird Species' : '🦁 Wildlife Species'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(isEco ? dest.ecoPractices : isBird ? dest.birdSpecies : dest.wildlifeSpecies)?.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition hover:-translate-y-1">
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  📸 Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[heroImage, overviewImage, bestTimeImage, galleryImage].map((img, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden shadow-md aspect-square group cursor-pointer">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <FaCalendar className="text-orange-500" /> Quick Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Entry Fee</span>
                      <span className="font-semibold text-sm">{dest.entryFee}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Timings</span>
                      <span className="font-semibold text-sm">{dest.timings}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500 text-sm">Best Time</span>
                      <span className="font-semibold text-sm">{dest.bestTimeToVisit}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <FaPlane className="text-orange-400" /> Getting There
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-gray-400">✈️</span> {dest.howToReach?.byAir}</div>
                    <div><span className="text-gray-400">🚂</span> {dest.howToReach?.byTrain}</div>
                    <div><span className="text-gray-400">🚗</span> {dest.howToReach?.byRoad}</div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <FaPhone className="text-red-500" /> Emergency
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Police</span>
                      <span className="font-bold text-red-600">{dest.emergencyContacts?.police}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ambulance</span>
                      <span className="font-bold text-red-600">{dest.emergencyContacts?.ambulance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Forest Dept</span>
                      <span className="font-bold text-red-600">{dest.emergencyContacts?.forestDepartment}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== GRID VIEW - PREMIUM DESIGN =====
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-400 to-red-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 bg-whitea/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaCompass className="text-xl animate-spin-slow" />
              <span className="text-sm font-medium tracking-wider">EXPLORE EXPERIENCES</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Discover Your <span className="text-amber-500">Next Adventure</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Curated experiences for every passion and destination across India
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search destinations by name or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition"
              />
              <FaSearch className="absolute left-4 top-4 text-gray-400 text-lg" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200'
                      : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 font-medium">
            Showing <span className="text-orange-500 font-bold">{filteredDestinations.length}</span> experiences
          </p>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700">No experiences found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear Filters →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => {
              const color = dest.subCategory === 'Bird Watching' ? 'blue' 
                : dest.subCategory === 'Eco Tourism' ? 'emerald' 
                : dest.subCategory === 'Wellness' ? 'teal'
                : dest.subCategory === 'Spiritual' ? 'orange'
                : dest.subCategory === 'Luxury Travel' ? 'amber'
                : dest.subCategory === 'Culinary' ? 'red'
                : dest.subCategory === 'Art Gallery' ? 'purple'
                : 'red';
              
              return (
                <div
                  key={dest.key}
                  onClick={() => handleDestinationClick(dest)}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={dest.coverImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {dest.isPopular && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        ⭐ Featured
                      </span>
                    )}
                    
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className={`bg-${color}-500/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full font-medium`}>
                        {dest.subCategory}
                      </span>
                      {dest.page && dest.page !== 'experience' && (
                        <span className="bg-black/60 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                          🚀 Explore
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition line-clamp-1">
                        {dest.name}
                      </h3>
                      <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                        <FaStar className="text-yellow-400" />
                        {dest.rating}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                      <FaMapMarkerAlt className="text-orange-400" /> {dest.state}
                    </p>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {dest.description?.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FaClock className="text-orange-400" /> {dest.bestTimeToVisit}
                      </span>
                      <span className="text-xs font-medium text-orange-500 group-hover:gap-2 transition-all flex items-center gap-1">
                        View <FaChevronRight className="text-[10px]" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
