// frontend/src/components/Map.jsx
import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

const Map = ({ experiences = [], title = "Explore Experiences" }) => {
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Function to open Google Maps with experience location
  const openGoogleMaps = (experience) => {
    const name = experience?.name || '';
    const state = experience?.state || 'India';
    const query = encodeURIComponent(`${name} ${state}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  // Get unique categories
  const categories = [...new Set(experiences.map(e => e.category).filter(Boolean))];

  if (!experiences || experiences.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-400 mt-2">No experiences to show</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{experiences.length} experiences found</p>
        </div>
        {categories.length > 0 && (
          <div className="flex gap-1">
            {categories.slice(0, 3).map((cat, i) => (
              <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {experiences.map((exp, index) => {
            const name = exp?.name || 'Unknown';
            const state = exp?.state || 'India';
            const rating = exp?.rating || 0;
            const image = exp?.image || 'https://via.placeholder.com/100/FFA500/FFFFFF?text=Experience';
            
            return (
              <div
                key={exp._id || index}
                onClick={() => openGoogleMaps(exp)}
                className="bg-gray-50 hover:bg-orange-50 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border border-gray-100 hover:border-orange-300 hover:shadow-md group"
              >
                <div className="relative h-24 overflow-hidden">
                  <img 
                    src={image} 
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100/FFA500/FFFFFF?text=Experience';
                    }}
                  />
                  {rating > 0 && (
                    <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-xs text-white flex items-center gap-0.5">
                      <FaStar className="text-yellow-400 text-[10px]" />
                      {rating.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition truncate">
                    {name}
                  </p>
                  <p className="text-xs text-gray-400 truncate flex items-center gap-0.5">
                    <FaMapMarkerAlt className="text-orange-400 text-[10px]" />
                    {state}
                  </p>
                  {exp.category && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full inline-block mt-0.5">
                      {exp.category}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 border-t border-gray-100 text-center flex justify-between items-center">
        <p className="text-xs text-gray-400">
          💡 Click any experience to open in Google Maps
        </p>
        <span className="text-xs text-orange-500 font-medium">
          {experiences.length} locations
        </span>
      </div>
    </div>
  );
};

export default Map;