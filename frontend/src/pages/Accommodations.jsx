import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaHotel, FaStar, FaRupeeSign, FaBed, FaWifi, FaUtensils } from 'react-icons/fa';

const Accommodations = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');

  const hotels = [
    { id: 1, name: 'The Taj Mahal Palace', location: 'Mumbai', type: '5 Star', price: '₹15,000', rating: 4.9, amenities: ['Pool', 'Spa', 'Restaurant'], image: '🏨' },
    { id: 2, name: 'ITC Grand Chola', location: 'Chennai', type: '5 Star', price: '₹12,500', rating: 4.8, amenities: ['Pool', 'Gym', 'Restaurant'], image: '🏨' },
    { id: 3, name: 'The Oberoi Amarvilas', location: 'Agra', type: '5 Star', price: '₹22,000', rating: 4.9, amenities: ['Pool', 'Spa', 'Garden'], image: '🏨' },
    { id: 4, name: 'Le Meridien', location: 'Delhi', type: '4 Star', price: '₹8,500', rating: 4.3, amenities: ['Pool', 'Restaurant'], image: '🏨' },
    { id: 5, name: 'Holiday Inn', location: 'Delhi', type: '4 Star', price: '₹6,800', rating: 4.2, amenities: ['Gym', 'Restaurant', 'Wifi'], image: '🏨' },
    { id: 6, name: 'Zostel Hostel', location: 'Delhi', type: 'Budget', price: '₹1,200', rating: 4.0, amenities: ['Wifi', 'Common Area'], image: '🏨' },
  ];

  const types = ['All', '5 Star', '4 Star', '3 Star', 'Budget'];

  const filteredHotels = hotels.filter(h => {
    if (selectedType !== 'All' && h.type !== selectedType) return false;
    return true;
  });

  const handleBookNow = (hotel) => {
    navigate('/booking-details', { 
      state: { 
        flight: {
          airline: hotel.name,
          from: 'Check-in',
          to: 'Check-out',
          depart: '12:00 PM',
          arrive: '11:00 AM',
          duration: '1 Night',
          price: hotel.price,
          date: new Date().toLocaleDateString(),
          type: 'Hotel'
        },
        isHotel: true
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
              <h1 className="text-xl font-bold text-gray-900">🏨 Accommodations</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Delhi</span>
              <span className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full">2 Guests</span>
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
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Hotel Type</h4>
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
              <span className="text-sm text-gray-600">{filteredHotels.length} hotels found</span>
            </div>

            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{hotel.image}</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{hotel.name}</p>
                        <p className="text-xs text-gray-400">{hotel.location}</p>
                        <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1">
                          <FaStar /> {hotel.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{hotel.type}</span>
                      {hotel.amenities.map((amenity, i) => (
                        <span key={i} className="text-xs text-gray-500 flex items-center gap-1">
                          {amenity === 'Pool' ? '🏊' : amenity === 'Spa' ? '💆' : amenity === 'Restaurant' ? '🍽️' : amenity === 'Gym' ? '💪' : amenity === 'Wifi' ? '📶' : '🌿'} {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-40 flex-shrink-0 text-right">
                    <p className="text-2xl font-bold text-blue-600">{hotel.price}</p>
                    <p className="text-xs text-gray-400">per night</p>
                    <button 
                      onClick={() => handleBookNow(hotel)}
                      className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-md hover:shadow-lg"
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

export default Accommodations;