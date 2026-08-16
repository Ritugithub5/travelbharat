// frontend/src/components/BookingSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlane, FaTrain, FaBus, FaTaxi, FaHotel, FaSuitcase,
  FaSearch, FaCalendarAlt, FaUsers, FaCrown, FaGraduationCap,
  FaHeartbeat, FaShieldAlt, FaArrowRight, FaChevronDown
} from 'react-icons/fa';

const BookingSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('oneway');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [cabin, setCabin] = useState('economy');

  const tabs = [
    { id: 'flights', icon: <FaPlane />, label: 'Flights', route: '/flights' },
    { id: 'trains', icon: <FaTrain />, label: 'Trains', route: '/trains' },
    { id: 'buses', icon: <FaBus />, label: 'Buses', route: '/buses' },
    { id: 'cabs', icon: <FaTaxi />, label: 'Cabs', route: '/cabs' },
    { id: 'hotels', icon: <FaHotel />, label: 'Hotels', route: '/accommodations' },
    { id: 'packages', icon: <FaSuitcase />, label: 'Packages', route: '/tourpackages' },
  ];

  const fareTypes = [
    { id: 'regular', label: 'Regular Fares', icon: <FaShieldAlt /> },
    { id: 'armed', label: 'Armed Forces', icon: <FaShieldAlt /> },
    { id: 'student', label: 'Student', icon: <FaGraduationCap /> },
    { id: 'senior', label: 'Senior Citizen', icon: <FaCrown /> },
    { id: 'medical', label: 'Medical Staff', icon: <FaHeartbeat /> },
  ];

  const [selectedFare, setSelectedFare] = useState('regular');

  const handleSearch = () => {
    const activeTabData = tabs.find(t => t.id === activeTab);
    if (activeTabData) {
      navigate(activeTabData.route);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Plan Your <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Book flights, trains, buses & more with ease</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden border border-gray-100">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 px-6 pt-4 border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Booking Form */}
          <div className="p-6 md:p-8">
            {/* Trip Type */}
            <div className="flex flex-wrap gap-4 mb-6">
              {['One Way', 'Round Trip', 'Multi City'].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="trip"
                    value={type.toLowerCase().replace(' ', '')}
                    checked={tripType === type.toLowerCase().replace(' ', '')}
                    onChange={() => setTripType(type.toLowerCase().replace(' ', ''))}
                    className="w-4 h-4 text-blue-600"
                  />
                  {type}
                </label>
              ))}
            </div>

            {/* Origin & Destination */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  From
                </label>
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  To
                </label>
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                />
              </div>
            </div>

            {/* Dates & Travelers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Depart
                </label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Return
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                  disabled={tripType === 'oneway'}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Cabin
                </label>
                <select
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>

            {/* Fare Types */}
            <div className="flex flex-wrap items-center gap-2 mb-6 pt-2 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">
                Fare Type:
              </span>
              {fareTypes.map((fare) => (
                <button
                  key={fare.id}
                  onClick={() => setSelectedFare(fare.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition ${
                    selectedFare === fare.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {fare.icon}
                  {fare.label}
                </button>
              ))}
            </div>

            {/* Quick Tips */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-green-500" /> Free Cancellation
              </span>
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-blue-500" /> Zero Booking Fee
              </span>
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-purple-500" /> 24/7 Support
              </span>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <FaSearch />
              Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;