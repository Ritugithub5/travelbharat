// frontend/src/pages/Search.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaArrowRight, FaFilter, FaTimes, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../services/api';
import { regionsData } from '../data/statesData';

// Import static experience data
import { wildlifeDestinations } from '../data/wildlifeDestinations';
import { birdsDestinations } from '../data/birdsDestinations';
import { EcoTourismPage } from '../data/ecoData';
import { ArtGallery } from '../data/artGalleryData';
import { waterMountainSection } from '../data/waterMountainData';
import { Spiritual } from '../data/Spiritual';
import { Wellness } from '../data/wellnessDestinations';
import { allLuxuryDestinations } from '../data/luxuryDestinations';
import { Culinary } from '../data/culinaryDestinations';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');

  // Static pages for search
  const staticPages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'States', path: '/states' },
    { name: 'Experience', path: '/experience' },
    { name: 'Birds', path: '/birds' },
    { name: 'Wildlife', path: '/wildlife' },
    { name: 'Eco Tourism', path: '/EcoTourismPage' },
    { name: 'Art Gallery', path: '/ArtGallery' },
    { name: 'Water & Mountain', path: '/WaterMountainSection' },
    { name: 'Spiritual', path: '/Spiritual' },
    { name: 'Wellness', path: '/Wellness' },
    { name: 'Luxury Travel', path: '/LuxuryTravel' },
    { name: 'Culinary', path: '/Culinary' },
    { name: 'Cultural', path: '/Cultural' },
    { name: 'Flights', path: '/flights' },
    { name: 'Trains', path: '/trains' },
    { name: 'Buses', path: '/buses' },
    { name: 'Cabs', path: '/cabs' },
    { name: 'Accommodations', path: '/accommodations' },
    { name: 'Tour Packages', path: '/tourpackages' },
    { name: 'Booking Details', path: '/booking-details' },
    { name: 'Booking Confirmation', path: '/booking-confirmation' },
    { name: 'Profile', path: '/profile' },
    { name: 'Terms', path: '/terms' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Login', path: '/login' },
    { name: 'Admin', path: '/admin' }
  ];

  const statePageMap = {
    'Himachal Pradesh': '/HimachalPradesh',
    'Ladakh': '/Ladakh',
    'Tamil Nadu': '/TamilNadu',
    'Telangana': '/Telangana',
    'West Bengal': '/WestBengal',
    'Odisha': '/Odisha',
    'Madhya Pradesh': '/MadhyaPradesh',
    'Maharashtra': '/Maharashtra',
    'Gujarat': '/Gujarat',
    'Kashmir': '/Kashmir',
    'Meghalaya': '/Meghalaya'
  };

  // Get ALL static experience names (including categories and types)
  const getStaticExperienceNames = () => {
    const names = new Set();
    const allStaticData = [
      { data: wildlifeDestinations, label: 'Wildlife' },
      { data: birdsDestinations, label: 'Bird Watching' },
      { data: EcoTourismPage, label: 'Eco Tourism' },
      { data: ArtGallery, label: 'Art Gallery' },
      { data: waterMountainSection, label: 'Water & Mountain' },
      { data: Spiritual, label: 'Spiritual' },
      { data: Wellness, label: 'Wellness' },
      { data: Culinary, label: 'Culinary' }
    ];

    allStaticData.forEach(({ data, label }) => {
      if (!data) return;
      
      // Add the category/label name
      names.add(label.toLowerCase());
      
      // Get main entry name
      let mainName = null;
      if (data.india && data.india.name) {
        mainName = data.india.name;
      } else if (data.name) {
        mainName = data.name;
      } else if (typeof data === 'object') {
        const values = Object.values(data);
        if (values.length > 0 && values[0].name) {
          mainName = values[0].name;
        }
      }
      if (mainName) {
        names.add(mainName.toLowerCase());
      }
      
      // Also add category and type if they exist
      if (data.india) {
        if (data.india.category) {
          names.add(data.india.category.toLowerCase());
        }
        if (data.india.type) {
          names.add(data.india.type.toLowerCase());
        }
        if (data.india.subCategory) {
          names.add(data.india.subCategory.toLowerCase());
        }
      }
    });

    // Luxury destinations
    if (allLuxuryDestinations && Array.isArray(allLuxuryDestinations)) {
      allLuxuryDestinations.forEach(d => {
        if (d.name) names.add(d.name.toLowerCase());
        if (d.category) names.add(d.category.toLowerCase());
        if (d.type) names.add(d.type.toLowerCase());
      });
    }

    return names;
  };

  const staticExperienceNames = getStaticExperienceNames();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const category = params.get('category');
    
    if (q) {
      setSearchQuery(q);
      setFilterCategory(category || '');
      performSearch(q, category || '');
    } else {
      setLoading(false);
      setResults([]);
      setTotalResults(0);
    }
  }, [location.search]);

  const performSearch = async (query, category = '') => {
    setLoading(true);
    setError(null);
    let allResults = [];
    const searchLower = query.toLowerCase().trim();

    try {
      const seenNames = new Set();

      // 1. SEARCH STATIC PAGES
      staticPages.forEach(page => {
        const matches = page.name.toLowerCase().includes(searchLower);
        if (matches) {
          const nameKey = page.name.toLowerCase();
          // Check if this page name is an experience (to avoid duplicates)
          const isExperience = staticExperienceNames.has(nameKey);
          if (!isExperience && !seenNames.has(nameKey)) {
            seenNames.add(nameKey);
            allResults.push({
              _id: `page-${page.name}-${Date.now()}`,
              name: page.name,
              type: 'page',
              label: '📄 Page',
              description: `Visit the ${page.name} page`,
              pagePath: page.path,
              category: 'Page',
              state: 'India',
              image: 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Page',
              rating: 0,
              searchType: 'page'
            });
          }
        }
      });

      // 2. SEARCH STATIC EXPERIENCES (only main entry)
      const addStaticData = (data, label, pagePath) => {
        if (!data) return;
        
        // Get the main entry
        let mainItem = null;
        if (data.india) {
          mainItem = data.india;
        } else if (Array.isArray(data) && data.length > 0) {
          mainItem = data[0];
        } else if (typeof data === 'object') {
          const values = Object.values(data);
          if (values.length > 0) {
            mainItem = values.find(v => v.name && v.description) || values[0];
          }
        }
        
        if (mainItem && mainItem.name) {
          // Check if the name, category, type, or subCategory matches
          const matches = 
            mainItem.name.toLowerCase().includes(searchLower) ||
            (mainItem.description && mainItem.description.toLowerCase().includes(searchLower)) ||
            (mainItem.category && mainItem.category.toLowerCase().includes(searchLower)) ||
            (mainItem.type && mainItem.type.toLowerCase().includes(searchLower)) ||
            (mainItem.subCategory && mainItem.subCategory.toLowerCase().includes(searchLower)) ||
            label.toLowerCase().includes(searchLower);
          
          if (matches) {
            const nameKey = mainItem.name.toLowerCase();
            // Also check if this name is already seen
            if (!seenNames.has(nameKey)) {
              seenNames.add(nameKey);
              allResults.push({
                ...mainItem,
                _id: `static-${mainItem.name}-${Date.now()}`,
                type: 'experience',
                label: `✨ ${label}`,
                category: mainItem.category || label,
                state: mainItem.state || 'India',
                image: mainItem.image || mainItem.coverImage || 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Experience',
                rating: mainItem.rating || 0,
                description: mainItem.description || 'Discover this amazing experience.',
                pagePath: pagePath || '/experience',
                searchType: 'experience',
                isStatic: true
              });
            }
          }
        }
      };

      // Add all static experiences
      addStaticData(wildlifeDestinations, 'Wildlife', '/wildlife');
      addStaticData(birdsDestinations, 'Bird Watching', '/birds');
      addStaticData(EcoTourismPage, 'Eco Tourism', '/EcoTourismPage');
      addStaticData(ArtGallery, 'Art Gallery', '/ArtGallery');
      addStaticData(waterMountainSection, 'Water & Mountain', '/WaterMountainSection');
      addStaticData(Spiritual, 'Spiritual', '/Spiritual');
      addStaticData(Wellness, 'Wellness', '/Wellness');
      addStaticData(Culinary, 'Culinary', '/Culinary');
      
      // Luxury (only first item)
      if (allLuxuryDestinations && Array.isArray(allLuxuryDestinations) && allLuxuryDestinations.length > 0) {
        const mainLuxury = allLuxuryDestinations[0];
        if (mainLuxury && mainLuxury.name) {
          const matches = 
            mainLuxury.name.toLowerCase().includes(searchLower) ||
            (mainLuxury.description && mainLuxury.description.toLowerCase().includes(searchLower)) ||
            (mainLuxury.category && mainLuxury.category.toLowerCase().includes(searchLower)) ||
            (mainLuxury.type && mainLuxury.type.toLowerCase().includes(searchLower));
          
          if (matches) {
            const nameKey = mainLuxury.name.toLowerCase();
            if (!seenNames.has(nameKey)) {
              seenNames.add(nameKey);
              allResults.push({
                ...mainLuxury,
                _id: `static-luxury-${mainLuxury.name}-${Date.now()}`,
                type: 'experience',
                label: '✨ Luxury Travel',
                category: 'Luxury Travel',
                state: mainLuxury.state || 'India',
                image: mainLuxury.image || mainLuxury.coverImage || 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Experience',
                rating: mainLuxury.rating || 0,
                description: mainLuxury.description || 'Discover this amazing experience.',
                pagePath: '/LuxuryTravel',
                searchType: 'experience',
                isStatic: true
              });
            }
          }
        }
      }

      // 3. SEARCH EXPERIENCES FROM API
      const expParams = new URLSearchParams();
      expParams.append('search', query);
      if (category) expParams.append('category', category);
      expParams.append('limit', '50');
      
      try {
        const response = await api.get(`/experiences?${expParams.toString()}`);
        if (response.data && response.data.success) {
          const experiences = response.data.experiences || [];
          experiences.forEach(exp => {
            const nameKey = exp.name.toLowerCase();
            // Skip if this name is already seen (from static data)
            if (!seenNames.has(nameKey)) {
              seenNames.add(nameKey);
              allResults.push({
                ...exp,
                _id: exp._id || `exp-${Date.now()}`,
                type: 'experience',
                label: '✨ Experience',
                category: exp.category || 'Experience',
                state: exp.state || 'India',
                image: exp.image || 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Experience',
                rating: exp.rating || 0,
                description: exp.description || 'Discover this amazing experience.',
                pagePath: '/experience',
                searchType: 'experience',
                isStatic: false
              });
            }
          });
        }
      } catch (err) {
        console.log('Error fetching experiences:', err);
      }

      // 4. SEARCH STATES
      regionsData.forEach(region => {
        region.states.forEach(state => {
          const matches = 
            state.name.toLowerCase().includes(searchLower) ||
            state.capital.toLowerCase().includes(searchLower) ||
            state.description.toLowerCase().includes(searchLower) ||
            state.famousFor.some(f => f.toLowerCase().includes(searchLower));
          
          if (matches) {
            const nameKey = state.name.toLowerCase();
            if (!seenNames.has(nameKey)) {
              seenNames.add(nameKey);
              allResults.push({
                ...state,
                _id: state.id || `state-${Date.now()}`,
                type: 'state',
                label: '🏛️ State',
                state: state.name,
                image: state.image || 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=State',
                rating: 0,
                description: state.description || 'Explore this beautiful state.',
                pagePath: statePageMap[state.name] || `/state/${state.id}`,
                category: 'State',
                searchType: 'state'
              });
            }
          }
        });
      });

      // Remove any remaining duplicates by checking if multiple items have the same name
      const finalResults = [];
      const finalSeen = new Set();
      allResults.forEach(item => {
        const key = item.name.toLowerCase();
        if (!finalSeen.has(key)) {
          finalSeen.add(key);
          finalResults.push(item);
        }
      });

      // Sort: Exact matches first
      finalResults.sort((a, b) => {
        const aExact = a.name.toLowerCase() === searchLower;
        const bExact = b.name.toLowerCase() === searchLower;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return a.name.localeCompare(b.name);
      });

      setResults(finalResults);
      setTotalResults(finalResults.length);
      
      if (finalResults.length === 0) {
        setError('No results found');
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search. Please try again.');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.append('q', searchQuery.trim());
      if (filterCategory) params.append('category', filterCategory);
      navigate(`/search?${params.toString()}`);
    }
  };

  const clearFilters = () => {
    setFilterCategory('');
    const params = new URLSearchParams();
    params.append('q', searchQuery);
    navigate(`/search?${params.toString()}`);
  };

  const categories = [
    'All', 'Heritage', 'Nature', 'Adventure', 'Religious', 'Beach', 
    'Hill Station', 'Wildlife', 'Bird Watching', 'Eco Tourism', 
    'Art Gallery', 'Spiritual', 'Wellness', 'Culinary', 'Luxury Travel', 
    'Water & Mountain'
  ];

  const handleResultClick = (item) => {
    if (item.pagePath) {
      navigate(item.pagePath);
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-orange-500 transition p-2 hover:bg-orange-50 rounded-full"
            >
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1">Search Results</h1>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search experiences, states, pages..."
                className="w-full px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition text-gray-800"
              />
              <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-700 flex items-center gap-2"
            >
              <FaFilter />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition font-medium"
            >
              Search
            </button>
          </form>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">All Categories</option>
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append('q', searchQuery);
                      if (filterCategory) params.append('category', filterCategory);
                      navigate(`/search?${params.toString()}`);
                      setShowFilters(false);
                    }}
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && searchQuery && (
            <div className="mt-4">
              <p className="text-gray-600">
                Found <span className="font-bold text-orange-600">{totalResults}</span> results for 
                <span className="font-semibold ml-1">"{searchQuery}"</span>
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
          </div>
        ) : error && results.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700">No results found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find anything matching <span className="font-semibold">"{searchQuery}"</span>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/experience" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                Browse All Experiences
              </Link>
              <Link to="/states" className="px-6 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition">
                Browse All States
              </Link>
              <button
                onClick={() => {
                  setSearchQuery('');
                  navigate('/');
                }}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Search
              </button>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Try searching for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['About', 'Contact', 'Flights', 'Hotels', 'States', 'Experiences', 'Taj Mahal', 'Kerala', 'Rajasthan'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      const params = new URLSearchParams();
                      params.append('q', term);
                      navigate(`/search?${params.toString()}`);
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-orange-100 hover:text-orange-600 transition text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((item) => (
              <div
                key={item._id}
                onClick={() => handleResultClick(item)}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image || 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Result'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Result';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                      {item.category || item.type || 'General'}
                    </span>
                  </div>
                  {item.rating > 0 && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-white text-sm flex items-center gap-1">
                      <FaStar className="text-yellow-400" /> {item.rating.toFixed(1)}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white">
                      {item.label || item.type || 'Result'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt className="text-orange-400" />
                    {item.state || 'India'}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.description || 'Discover this amazing destination.'}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {item.type === 'state' ? '🏛️ State' : 
                       item.type === 'experience' ? '✨ Experience' : 
                       '📄 Page'}
                    </span>
                    <span className="text-orange-500 group-hover:translate-x-1 transition text-sm font-medium flex items-center gap-1">
                      View <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;