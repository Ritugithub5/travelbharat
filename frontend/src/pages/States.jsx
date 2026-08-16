// frontend/src/pages/States.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaCompass, 
  FaChevronRight,
  FaTimes,
  FaClock,
  FaRegHeart,
  FaHeart,
  FaUtensils,
  FaCamera,
  FaInfoCircle
} from 'react-icons/fa';
import { regionsData } from '../data/statesData';
import api from '../services/api';

const States = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, compact
  const [sortBy, setSortBy] = useState('name'); // name, popularity, destinations
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredState, setHoveredState] = useState(null);
  const searchRef = useRef(null);

  // NEW: State for MongoDB data
  const [dbStates, setDbStates] = useState([]);
  const [loading, setLoading] = useState(false);

  // NEW: Fetch states from MongoDB
  useEffect(() => {
    fetchStatesFromMongoDB();
  }, []);

  const fetchStatesFromMongoDB = async () => {
    setLoading(true);
    try {
      const response = await api.get('/states');
      if (response.data && response.data.success) {
        const states = response.data.states || [];
        setDbStates(states);
        console.log('✅ Loaded states from MongoDB:', states.length);
      }
    } catch (error) {
      console.error('❌ Error fetching states from MongoDB:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique regions for filter
  const regions = ['All', ...new Set(regionsData.map(r => r.name))];

  // Toggle favorite
  const toggleFavorite = (stateId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(stateId) 
        ? prev.filter(id => id !== stateId)
        : [...prev, stateId]
    );
  };

  // Filter and sort states - COMBINE static + MongoDB data
  const getFilteredStates = () => {
    let allStates = [];
    
    // 1. Static states from regionsData
    regionsData.forEach(region => {
      if (selectedRegion !== 'All' && region.name !== selectedRegion) return;
      
      const states = region.states.filter(state =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.famousFor.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
        state.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      states.forEach(state => {
        allStates.push({
          ...state,
          regionName: region.name,
          regionIcon: region.icon,
          regionColor: region.color,
          source: 'static'
        });
      });
    });

    // 2. MongoDB states
    dbStates.forEach(state => {
      // Check if state already exists in static data (by name)
      const exists = allStates.some(s => s.name === state.name);
      if (!exists) {
        const region = regionsData.find(r => r.states.some(s => s.name === state.name));
        allStates.push({
          id: state._id || state.id,
          name: state.name,
          capital: state.capital || 'N/A',
          description: state.description || '',
          famousFor: state.famousFor || [],
          language: state.language || [],
          population: state.population || 'N/A',
          area: state.area || 'N/A',
          stateCode: state.stateCode || '',
          image: state.imageUrl || 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=State',
          regionName: state.region || region?.name || 'Other',
          regionIcon: region?.icon || '📍',
          regionColor: region?.color || 'from-gray-400 to-gray-500',
          destinationCount: state.destinationCount || 0,
          bestTimeToVisit: state.bestTimeToVisit || 'All year',
          source: 'mongodb'
        });
      }
    });

    // Sort states
    switch(sortBy) {
      case 'popularity':
        allStates.sort((a, b) => (b.destinations?.length || b.destinationCount || 0) - (a.destinations?.length || a.destinationCount || 0));
        break;
      case 'destinations':
        allStates.sort((a, b) => (b.destinations?.length || b.destinationCount || 0) - (a.destinations?.length || a.destinationCount || 0));
        break;
      case 'name':
      default:
        allStates.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return allStates;
  };

  const filteredStates = getFilteredStates();

  // Get categories and their counts
  const getCategoryStats = () => {
    const stats = {};
    filteredStates.forEach(state => {
      state.famousFor?.forEach(category => {
        stats[category] = (stats[category] || 0) + 1;
      });
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 8);
  };

  const categoryStats = getCategoryStats();

  // State to page mapping
  const statePageMap = {
    'Himachal Pradesh': '/HimachalPradesh',
    'Ladakh': '/Ladakh',
    'West Bengal': '/WestBengal',
    'Tamil Nadu': '/TamilNadu',
    'Kashmir': '/Kashmir',
    'Telangana': '/Telangana',
    'Odisha': '/Odisha',
    'Meghalaya': '/Meghalaya',
    'Madhya Pradesh': '/MadhyaPradesh',
    'Maharashtra': '/Maharashtra',
    'Gujarat': '/Gujarat'
  };

  // Get region color for state
  const getStateColor = (state) => {
    const region = regionsData.find(r => r.states.some(s => s.id === state.id));
    return region?.color || 'from-gray-500 to-gray-600';
  };

  // Render state card based on view mode
  const renderStateCard = (state) => {
    const isFavorite = favorites.includes(state.id);
    const pagePath = statePageMap[state.name] || `/state/${state.id}`;

    // Default: Grid view
    return (
      <Link
        key={state.id || state.name}
        to={pagePath}
        className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
        onMouseEnter={() => setHoveredState(state.id)}
        onMouseLeave={() => setHoveredState(null)}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={state.image}
            alt={state.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* State Code Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-lg">
            {state.stateCode || state.code}
          </div>
          
          {/* Region Badge */}
          <div className="absolute top-3 left-3">
            <span className="text-2xl">{state.regionIcon || '📍'}</span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => toggleFavorite(state.id, e)}
            className="absolute top-3 right-14 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition shadow-lg"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-sm" />
            ) : (
              <FaRegHeart className="text-gray-600 text-sm" />
            )}
          </button>

          {/* Destination Count Badge */}
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-orange-400" />
            {state.destinations?.length || state.destinationCount || 0} Destinations
          </div>

          {/* Quick Stats - Hover Effect */}
          <div className={`absolute bottom-3 right-3 transition-all duration-500 ${
            hoveredState === state.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-3">
              <span className="flex items-center gap-1">
                <FaClock className="text-green-400" />
                {state.bestTimeToVisit?.split(',')[0] || 'All year'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition line-clamp-1">
                {state.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <FaMapMarkerAlt className="text-orange-400 text-xs" />
                {state.capital}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${state.regionColor || 'from-gray-400 to-gray-500'} text-white`}>
              {state.regionName || 'India'}
            </span>
          </div>
          
          {/* Famous For Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {state.famousFor?.slice(0, 3).map((item, idx) => (
              <span 
                key={idx}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {item}
              </span>
            ))}
            {state.famousFor?.length > 3 && (
              <span className="text-xs text-gray-400">+{state.famousFor.length - 3}</span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {state.language?.slice(0, 2).join(', ')}
              {state.language?.length > 2 && '...'}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-500 group-hover:gap-2 transition-all">
              Explore
              <FaChevronRight className="text-xs group-hover:translate-x-1 transition" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-400 to-red-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FaCompass className="text-xl animate-spin-slow" />
                <span className="text-sm font-medium tracking-wider">EXPLORE INDIA</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
                Discover <br className="hidden sm:block" />
                <span className="text-red-600">Incredible</span> India
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-xl">
                Explore tourist destinations across all 28 states and 8 union territories
              </p>
              {dbStates.length > 0 && (
                <p className="text-sm opacity-70 mt-2">
                  ✨ {dbStates.length} states loaded from database
                </p>
              )}
            </div>
            <div className="hidden md:grid grid-cols-3 gap-3">
              {regionsData.slice(0, 6).map((region, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center text-white border border-white/10">
                  <div className="text-2xl">{region.icon}</div>
                  <div className="text-xs font-medium mt-1">{region.name}</div>
                  <div className="text-[10px] opacity-70">{region.states.length} States</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search states by name, capital, famous places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition text-gray-800 bg-gray-50 hover:bg-white"
              />
              <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer min-w-[160px] transition"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'All' ? '🌍 All Regions' : region}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer min-w-[150px] transition"
            >
              <option value="name">📝 By Name</option>
              <option value="popularity">🔥 Most Popular</option>
              <option value="destinations">📍 Most Destinations</option>
            </select>
          </div>

          {/* Stats & Quick Filters */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-semibold text-gray-700 text-base">{filteredStates.length}</span>
              {filteredStates.length === 1 ? 'state' : 'states'} found
              {selectedRegion !== 'All' && (
                <span className="text-gray-400">in <span className="text-gray-600 font-medium">{selectedRegion}</span></span>
              )}
            </div>
            
            {/* Category Quick Filters */}
            {categoryStats.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {categoryStats.slice(0, 5).map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() => setSearchTerm(category)}
                    className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1 rounded-full transition"
                  >
                    {category} ({count})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* States Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredStates.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600">No States Found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRegion('All'); setSortBy('name'); }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-2"
            >
              <FaTimes /> Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStates.map(state => renderStateCard(state))}
          </div>
        )}
      </div>
    </div>
  );
};

export default States;