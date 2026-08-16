import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaTrain, FaStar, FaRupeeSign } from 'react-icons/fa';

const Trains = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('All');

  const trains = [
    { id: 1, name: 'Rajdhani Express', number: '12301', from: 'DEL', to: 'BOM', depart: '16:30', arrive: '08:15', duration: '15h 45m', class: '1A', price: '₹4,520', available: 23 },
    { id: 2, name: 'Shatabdi Express', number: '12002', from: 'DEL', to: 'BOM', depart: '06:00', arrive: '20:30', duration: '14h 30m', class: 'CC', price: '₹2,850', available: 45 },
    { id: 3, name: 'Duronto Express', number: '12259', from: 'DEL', to: 'BOM', depart: '22:00', arrive: '12:15', duration: '14h 15m', class: '3A', price: '₹1,820', available: 12 },
    { id: 4, name: 'Garib Rath', number: '12909', from: 'DEL', to: 'BOM', depart: '19:45', arrive: '10:30', duration: '14h 45m', class: '3A', price: '₹1,250', available: 67 },
    { id: 5, name: 'Tejas Express', number: '22659', from: 'DEL', to: 'BOM', depart: '07:15', arrive: '21:45', duration: '14h 30m', class: '2A', price: '₹2,450', available: 8 },
  ];

  const classes = ['All', '1A', '2A', '3A', 'SL', 'CC'];

  const filteredTrains = trains.filter(t => {
    if (selectedClass !== 'All' && t.class !== selectedClass) return false;
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
              <h1 className="text-xl font-bold text-gray-900">🚂 Train Results</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">New Delhi → Mumbai</span>
              <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">2 Aug 2026</span>
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
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Class</h4>
                {classes.map((cls) => (
                  <label key={cls} className="flex items-center gap-3 py-1.5 cursor-pointer">
                    <input type="radio" name="class" checked={selectedClass === cls} onChange={() => setSelectedClass(cls)} className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{cls === 'All' ? 'All Classes' : cls}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">{filteredTrains.length} trains found</span>
              <div className="flex gap-2">
                {['Earliest', 'Cheapest', 'Fastest'].map((sort) => (
                  <button key={sort} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition">
                    {sort}
                  </button>
                ))}
              </div>
            </div>

            {filteredTrains.map((train) => (
              <div key={train.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="md:w-40 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚂</span>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{train.name}</p>
                        <p className="text-xs text-gray-400">{train.number}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="text-center min-w-[60px]">
                      <p className="text-xl font-bold text-gray-900">{train.depart}</p>
                      <p className="text-xs text-gray-500">{train.from}</p>
                    </div>
                    <div className="flex-1 min-w-[80px] text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-16 h-px bg-gray-300"></span>
                        <span className="text-xs text-gray-500">{train.duration}</span>
                        <span className="w-16 h-px bg-gray-300"></span>
                      </div>
                      <p className="text-xs text-gray-500">Train {train.number}</p>
                    </div>
                    <div className="text-center min-w-[60px]">
                      <p className="text-xl font-bold text-gray-900">{train.arrive}</p>
                      <p className="text-xs text-gray-500">{train.to}</p>
                    </div>
                  </div>

                  <div className="md:w-40 flex-shrink-0 text-right">
                    <p className="text-2xl font-bold text-blue-600">{train.price}</p>
                    <p className="text-xs text-gray-400">{train.class} · {train.available} seats</p>
                    <button onClick={() => navigate('/booking-details', { state: { flight: { airline: train.name, from: train.from, to: train.to, 
                      depart: train.depart, arrive: train.arrive, duration: train.duration, price: train.price,date: '02 Aug 2026'} } })}
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-sm transition">
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

export default Trains;