// frontend/src/pages/StateDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaStar, 
  FaUsers, 
  FaLanguage, 
  FaClock, 
  FaInfoCircle,
  FaBuilding,
  FaGlobeAsia,
  FaChevronRight,
  FaImage,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaCamera
} from 'react-icons/fa';
import { regionsData } from '../data/statesData';

const StateDetail = () => {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  // Find the state and its region
  let foundState = null;
  let foundRegion = null;

  for (const region of regionsData) {
    const state = region.states.find(s => s.id === stateId);
    if (state) {
      foundState = state;
      foundRegion = region;
      break;
    }
  }

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Show loading state if state not found
  if (!foundState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-gray-600 mb-4">State Not Found</h2>
          <p className="text-gray-400 mb-6">The state you're looking for doesn't exist or has been moved.</p>
          <Link to="/states" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition font-medium">
            <FaArrowLeft /> Back to States
          </Link>
        </div>
      </div>
    );
  }

  // Get all images (state image + destination images if any)
  const allImages = [foundState.image];
  if (foundState.destinations) {
    foundState.destinations.forEach(dest => {
      if (dest.image) allImages.push(dest.image);
    });
  }

  // Destinations to display
  const displayDestinations = showAllDestinations 
    ? foundState.destinations 
    : foundState.destinations?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button - Sticky */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/states')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition font-medium group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition" /> 
              <span className="hidden sm:inline">Back to States</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleBookmark}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                {isBookmarked ? (
                  <FaBookmark className="text-orange-500 text-xl" />
                ) : (
                  <FaRegBookmark className="text-gray-500 text-xl" />
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <FaShare className="text-gray-500 text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* State Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={foundState.image}
            alt={foundState.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          
          {/* Decorative overlay */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-3xl md:text-4xl">{foundRegion.icon}</span>
                <span className="text-xs md:text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {foundRegion.name}
                </span>
                <span className="text-xs md:text-sm bg-orange-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  State
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                {foundState.name}
              </h1>
              <p className="text-base md:text-xl opacity-90 max-w-2xl">
                Capital: {foundState.capital} • {foundState.code}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="relative -mt-6 max-w-7xl mx-auto px-4 z-10">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-xl">
                <FaUsers className="text-orange-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Population</p>
                <p className="text-sm md:text-base font-bold text-gray-800">{foundState.population}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Area</p>
                <p className="text-sm md:text-base font-bold text-gray-800">{foundState.area}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <FaLanguage className="text-purple-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Languages</p>
                <p className="text-sm md:text-base font-bold text-gray-800">{foundState.language.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <FaClock className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Best Time</p>
                <p className="text-sm md:text-base font-bold text-gray-800">{foundState.bestTimeToVisit}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <FaInfoCircle className="text-orange-500 text-2xl" />
                <h2 className="text-2xl font-bold text-gray-800">About {foundState.name}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {foundState.description}
              </p>
              
              {/* Famous For */}
              {foundState.famousFor && foundState.famousFor.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">✨ Famous For</h3>
                  <div className="flex flex-wrap gap-2">
                    {foundState.famousFor.map((item, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Gallery Section */}
            {allImages.length > 0 && (
              <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaCamera className="text-orange-500 text-2xl" />
                  <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
                </div>
                
                {/* Main Image */}
                <div className="relative rounded-xl overflow-hidden mb-3 h-64 md:h-80">
                  <img
                    src={allImages[activeImage]}
                    alt={`${foundState.name} - ${activeImage === 0 ? 'Overview' : 'Destination'}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {activeImage + 1} / {allImages.length}
                  </div>
                </div>
                
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                          activeImage === index ? 'border-orange-500 shadow-md' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-20 h-14 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Destinations Section */}
            {foundState.destinations && foundState.destinations.length > 0 && (
              <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FaGlobeAsia className="text-orange-500 text-2xl" />
                    <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {foundState.destinations.length} places
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {displayDestinations.map((dest, index) => (
                    <div 
                      key={index} 
                      className="group border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-orange-200 hover:-translate-y-1 cursor-pointer"
                      onClick={() => {
                        // Navigate to experience page with category filter
                        navigate(`/experience?category=${dest.category}`);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition">
                            {dest.name}
                          </h4>
                          <span className="inline-block mt-1 text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                            {dest.category}
                          </span>
                        </div>
                        <FaChevronRight className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{dest.description}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <FaClock className="text-orange-400" /> Best: {dest.bestTimeToVisit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Show More Button */}
                {foundState.destinations.length > 3 && (
                  <button
                    onClick={() => setShowAllDestinations(!showAllDestinations)}
                    className="mt-4 w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-800 font-medium transition flex items-center justify-center gap-2"
                  >
                    {showAllDestinations ? (
                      <>Show Less <FaChevronRight className="rotate-90" /></>
                    ) : (
                      <>Show All {foundState.destinations.length} Destinations <FaChevronRight /></>
                    )}
                  </button>
                )}
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">Capital</span>
                  <span className="font-medium text-gray-800">{foundState.capital}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">State Code</span>
                  <span className="font-medium text-gray-800">{foundState.code}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">Region</span>
                  <span className="font-medium text-gray-800">{foundRegion.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-500 text-sm">Population</span>
                  <span className="font-medium text-gray-800">{foundState.population}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Area</span>
                  <span className="font-medium text-gray-800">{foundState.area}</span>
                </div>
              </div>
            </div>

            {/* Destinations Count */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt className="text-3xl" />
                <div>
                  <p className="text-sm opacity-90">Destinations</p>
                  <p className="text-3xl font-bold">{foundState.destinations?.length || 0}</p>
                </div>
              </div>
              <p className="text-sm opacity-80 mt-2">
                Explore {foundState.destinations?.length || 0} amazing places in {foundState.name}
              </p>
            </div>

            {/* Explore Button */}
            <Link
              to="/experience"
              className="block w-full text-center py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg shadow-orange-200 hover:shadow-xl"
            >
              Explore All Experiences →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDetail;