import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaClock, FaPlane, FaStar, FaRupeeSign, FaChevronDown } from 'react-icons/fa';

const Flights = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState('All');
  const [selectedStops, setSelectedStops] = useState('All');

  const flights = [
    { id: 1, airline: 'SpiceJet', logo: '✈️', from: 'DEL', to: 'BOM', depart: '22:30', arrive: '00:50', duration: '02h 20m', stops: 'Direct', price: '₹5,920', originalPrice: '₹7,400', discount: '20%' },
    { id: 2, airline: 'SpiceJet', logo: '✈️', from: 'DEL', to: 'BOM', depart: '09:15', arrive: '11:25', duration: '02h 10m', stops: 'Direct', price: '₹5,920', originalPrice: '₹7,400', discount: '20%' },
    { id: 3, airline: 'Air India', logo: '✈️', from: 'DEL', to: 'BOM', depart: '04:00', arrive: '06:15', duration: '02h 15m', stops: 'Direct', price: '₹6,002', originalPrice: '₹7,800', discount: '23%' },
    { id: 4, airline: 'IndiGo', logo: '✈️', from: 'DEL', to: 'BOM', depart: '19:15', arrive: '21:40', duration: '02h 25m', stops: 'Direct', price: '₹6,500', originalPrice: '₹8,200', discount: '21%' },
    { id: 5, airline: 'Akasa Air', logo: '✈️', from: 'DEL', to: 'BOM', depart: '14:30', arrive: '16:45', duration: '02h 15m', stops: 'Direct', price: '₹6,800', originalPrice: '₹8,500', discount: '20%' },
    { id: 6, airline: 'SpiceJet', logo: '✈️', from: 'DEL', to: 'BOM', depart: '21:00', arrive: '23:10', duration: '02h 10m', stops: 'Direct', price: '₹5,920', originalPrice: '₹7,400', discount: '20%' },
  ];

  const airlines = ['All', 'Air India', 'Air India Express', 'Akasa Air', 'IndiGo', 'SpiceJet'];

  const filteredFlights = flights.filter(f => {
    if (selectedAirline !== 'All' && f.airline !== selectedAirline) return false;
    if (selectedStops !== 'All' && f.stops !== selectedStops) return false;
    return true;
  });

  const handleBookNow = (flight) => {
    navigate('/booking-details', { 
      state: { 
        flight: {
          ...flight,
          date: '02 Aug 2026',
          passengers: 1,
          cabin: 'Economy'
        } 
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
              <h1 className="text-xl font-bold text-gray-900">✈️ Flight Results</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">New Delhi → Mumbai</span>
              <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">2 Aug 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FaFilter className="text-blue-600" /> Filters
                </h3>
                <button 
                  onClick={() => {
                    setSelectedAirline('All');
                    setSelectedStops('All');
                  }} 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Stops */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Stops</h4>
                {['All', 'Direct', '1 Stop', '2+ Stops'].map((stop) => (
                  <label key={stop} className="flex items-center gap-3 py-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="stops"
                      checked={selectedStops === stop}
                      onChange={() => setSelectedStops(stop)}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <span className="text-sm text-gray-600">{stop}</span>
                  </label>
                ))}
              </div>

              {/* Airlines */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Airlines</h4>
                {airlines.map((airline) => (
                  <label key={airline} className="flex items-center gap-3 py-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="airline" 
                      checked={selectedAirline === airline}
                      onChange={() => setSelectedAirline(airline)}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <span className="text-sm text-gray-600">{airline}</span>
                  </label>
                ))}
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Price</h4>
                <div className="flex items-center gap-3">
                  <input type="range" min="5000" max="10000" className="w-full accent-blue-600" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹5,920</span>
                  <span>₹52,312</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-gray-600">{filteredFlights.length} flights found</span>
              <div className="flex gap-2">
                {['Cheapest', 'Fastest', 'Earliest', 'Latest'].map((sort) => (
                  <button key={sort} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition">
                    {sort}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Cards */}
            {filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition group">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  {/* Airline */}
                  <div className="md:w-32 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{flight.logo}</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{flight.airline}</p>
                        <p className="text-xs text-gray-400">Flight</p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flex-1 flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="text-center min-w-[60px]">
                      <p className="text-xl font-bold text-gray-900">{flight.depart}</p>
                      <p className="text-xs text-gray-500">{flight.from}</p>
                    </div>
                    <div className="flex-1 min-w-[80px] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-16 h-px bg-gray-300"></span>
                        <span className="text-xs text-gray-500">{flight.duration}</span>
                        <span className="w-16 h-px bg-gray-300"></span>
                      </div>
                      <p className="text-xs text-green-600 font-semibold">{flight.stops}</p>
                    </div>
                    <div className="text-center min-w-[60px]">
                      <p className="text-xl font-bold text-gray-900">{flight.arrive}</p>
                      <p className="text-xs text-gray-500">{flight.to}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="md:w-40 flex-shrink-0 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm line-through text-gray-400">{flight.originalPrice}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{flight.discount}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{flight.price}</p>
                    <p className="text-xs text-gray-400">per person</p>
                    <button 
                      onClick={() => handleBookNow(flight)}
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Quick Details Toggle */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaClock className="text-blue-400" /> {flight.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaPlane className="text-blue-400" /> {flight.stops}
                  </span>
                  <button className="text-blue-600 hover:underline">View Details</button>
                </div>
              </div>
            ))}

            {/* Footer Note */}
            <div className="text-center py-4 text-xs text-gray-400 border-t border-gray-200 mt-6">
              Provided through API integration from various Online Travel Aggregators
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;