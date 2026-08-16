import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaCalendar, FaMapMarkerAlt, FaRupeeSign, FaStar, FaClock, FaUsers } from 'react-icons/fa';

const TourPackages = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');

  const packages = [
    { id: 1, name: 'Golden Triangle Tour', location: 'Delhi-Agra-Jaipur', duration: '5 Days', price: '₹35,000', rating: 4.8, type: 'Group', image: '🗺️' },
    { id: 2, name: 'Kerala Backwaters', location: 'Kerala', duration: '4 Days', price: '₹28,000', rating: 4.7, type: 'Luxury', image: '🌴' },
    { id: 3, name: 'Himalayan Trekking', location: 'Himachal Pradesh', duration: '7 Days', price: '₹42,000', rating: 4.9, type: 'Adventure', image: '⛰️' },
    { id: 4, name: 'Goa Beach Getaway', location: 'Goa', duration: '3 Days', price: '₹18,000', rating: 4.5, type: 'Group', image: '🏖️' },
    { id: 5, name: 'Rajasthan Heritage Tour', location: 'Rajasthan', duration: '6 Days', price: '₹38,000', rating: 4.8, type: 'Luxury', image: '🏰' },
    { id: 6, name: 'South India Temple Tour', location: 'Tamil Nadu', duration: '5 Days', price: '₹25,000', rating: 4.3, type: 'Group', image: '🛕' },
  ];

  const types = ['All', 'Group', 'Luxury', 'Adventure'];

  const filteredPackages = packages.filter(p => {
    if (selectedType !== 'All' && p.type !== selectedType) return false;
    return true;
  });

  const handleBookNow = (pkg) => {
    navigate('/booking-details', { 
      state: { 
        flight: {
          airline: pkg.name,
          from: 'Start',
          to: 'End',
          depart: 'Day 1',
          arrive: `Day ${pkg.duration.split(' ')[0]}`,
          duration: pkg.duration,
          price: pkg.price,
          date: new Date().toLocaleDateString(),
          type: 'Tour Package'
        },
        isTour: true
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="text-gray-600 hover:text-blue-600 transition">
                <FaArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">🧳 Tour Packages</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full">12 Packages</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6">
                <FaFilter className="text-blue-600" /> Filters
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Package Type</h4>
                {types.map((type) => (
                  <label key={type} className="flex items-center gap-3 py-1.5 cursor-pointer">
                    <input type="radio" name="type" checked={selectedType === type} onChange={() => setSelectedType(type)} className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">{filteredPackages.length} packages found</span>
            </div>

            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{pkg.image}</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{pkg.name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1"><FaMapMarkerAlt /> {pkg.location}</p>
                        <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1">
                          <FaStar /> {pkg.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-gray-400" /> {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaUsers className="text-gray-400" /> {pkg.type}
                    </div>
                    <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">{pkg.type}</span>
                  </div>

                  <div className="md:w-40 flex-shrink-0 text-right">
                    <p className="text-2xl font-bold text-blue-600">{pkg.price}</p>
                    <p className="text-xs text-gray-400">per person</p>
                    <button 
                      onClick={() => handleBookNow(pkg)}
                      className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;