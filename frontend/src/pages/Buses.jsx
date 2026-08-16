import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaBus, FaRupeeSign, FaStar } from 'react-icons/fa';

const Buses = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');

  const buses = [
    { id: 1, name: 'Volvo AC Sleeper', operator: 'KPN Travels', from: 'Delhi', to: 'Mumbai', depart: '19:00', arrive: '09:30', duration: '14h 30m', type: 'AC Sleeper', price: '₹1,800', seats: 32, rating: 4.5 },
    { id: 2, name: 'Mercedes AC Seater', operator: 'SRS Travels', from: 'Delhi', to: 'Mumbai', depart: '20:30', arrive: '10:00', duration: '13h 30m', type: 'AC Seater', price: '₹1,200', seats: 45, rating: 4.2 },
    { id: 3, name: 'Non-AC Sleeper', operator: 'VRL Travels', from: 'Delhi', to: 'Mumbai', depart: '18:00', arrive: '08:00', duration: '14h 00m', type: 'Non-AC', price: '₹850', seats: 28, rating: 3.8 },
    { id: 4, name: 'Volvo AC Sleeper', operator: 'Orange Travels', from: 'Delhi', to: 'Mumbai', depart: '21:00', arrive: '11:00', duration: '14h 00m', type: 'AC Sleeper', price: '₹1,650', seats: 40, rating: 4.3 },
    { id: 5, name: 'Bharat Benz AC', operator: 'Mani Travels', from: 'Delhi', to: 'Mumbai', depart: '22:00', arrive: '12:30', duration: '14h 30m', type: 'AC Seater', price: '₹1,100', seats: 50, rating: 4.0 },
  ];

  const types = ['All', 'AC Sleeper', 'AC Seater', 'Non-AC'];

  const filteredBuses = buses.filter(b => {
    if (selectedType !== 'All' && b.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="text-gray-600 hover:text-blue-600 transition">
                <FaArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">🚌 Bus Results</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Delhi → Mumbai</span>
              <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full">2 Aug 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6">
                <FaFilter className="text-blue-600" /> Filters
              </h3>
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Bus Type</h4>
                {types.map((type) => (
                  <label key={type} className="flex items-center gap-3 py-1.5 cursor-pointer">
                    <input type="radio" name="type" checked={selectedType === type} onChange={() => setSelectedType(type)} className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">{filteredBuses.length} buses found</span>
            </div>

            {filteredBuses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚌</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{bus.name}</p>
                        <p className="text-xs text-gray-400">{bus.operator}</p>
                        <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1">
                          <FaStar /> {bus.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="text-center min-w-[60px]">
                      <p className="text-xl font-bold text-gray-900">{bus.depart}</p>
                      <p className="text-xs text-gray-500">{bus.from}</p>
                    </div>
                    <div className="flex-1 min-w-[80px] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-16 h-px bg-gray-300"></span>
                        <span className="text-xs text-gray-500">{bus.duration}</span>
                        <span className="w-16 h-px bg-gray-300"></span>
                      </div>
                      <p className="text-xs text-gray-500">{bus.type}</p>
                    </div>
                    <div className="text-center min-w-[60px]">
                      <p className="text-xl font-bold text-gray-900">{bus.arrive}</p>
                      <p className="text-xs text-gray-500">{bus.to}</p>
                    </div>
                  </div>

                  <div className="md:w-40 flex-shrink-0 text-right">
                    <p className="text-2xl font-bold text-blue-600">{bus.price}</p>
                    <p className="text-xs text-gray-400">{bus.seats} seats left</p>
                    <button onClick={() => navigate('/booking-details', { state: { flight: { airline: bus.name, from: bus.from, to: bus.to, depart: bus.depart, 
                      arrive: bus.arrive, duration: bus.duration, price: bus.price,date: '02 Aug 2026'} } })}className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl text-sm transition">
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

export default Buses;