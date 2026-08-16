import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCar, FaRupeeSign, FaStar, FaUser, FaSuitcase } from 'react-icons/fa';

const Cabs = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');

  const cabs = [
    { id: 1, name: 'Economy Cab', type: 'Hatchback', capacity: '4', luggage: '2', price: '₹850', perKm: '₹12', rating: 4.3, available: 12 },
    { id: 2, name: 'Standard Cab', type: 'Sedan', capacity: '4', luggage: '3', price: '₹1,200', perKm: '₹16', rating: 4.5, available: 8 },
    { id: 3, name: 'Premium SUV', type: 'SUV', capacity: '6', luggage: '4', price: '₹1,800', perKm: '₹22', rating: 4.7, available: 5 },
    { id: 4, name: 'Luxury Sedan', type: 'Luxury', capacity: '4', luggage: '3', price: '₹2,500', perKm: '₹30', rating: 4.8, available: 3 },
    { id: 5, name: 'Mini Cab', type: 'Compact', capacity: '3', luggage: '1', price: '₹650', perKm: '₹10', rating: 4.0, available: 15 },
  ];

  const types = ['All', 'Hatchback', 'Sedan', 'SUV', 'Luxury', 'Compact'];

  const filteredCabs = cabs.filter(c => {
    if (selectedType !== 'All' && c.type !== selectedType) return false;
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
              <h1 className="text-xl font-bold text-gray-900">🚕 Cab Results</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Delhi → Mumbai</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6">🚘 Filters</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Cab Type</h4>
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
              <span className="text-sm text-gray-600">{filteredCabs.length} cabs available</span>
            </div>

            {filteredCabs.map((cab) => (
              <div key={cab.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚕</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{cab.name}</p>
                        <p className="text-xs text-gray-400">{cab.type}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs flex items-center gap-1"><FaUser /> {cab.capacity}</span>
                          <span className="text-xs flex items-center gap-1"><FaSuitcase /> {cab.luggage}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-500">Base Fare</p>
                        <p className="font-bold text-gray-900">{cab.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Per KM</p>
                        <p className="font-bold text-gray-900">{cab.perKm}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="font-bold text-gray-900 flex items-center gap-1"><FaStar className="text-yellow-500" /> {cab.rating}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-40 flex-shrink-0 text-right">
                    <p className="text-xs text-gray-400">{cab.available} available</p>
                    <button onClick={() => navigate('/booking-details', { state: { flight: { airline: cab.name, from: 'Pickup', to: 'Dropoff', depart: 'Now', 
                      arrive: '2hrs', duration: '2 hrs',price: cab.price,date: 'Today'} } })} className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl text-sm transition">
                      Book Cab
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

export default Cabs;