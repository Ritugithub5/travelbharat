import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaSearch, FaStar, FaMapMarkerAlt, FaArrowLeft, FaHeart, 
  FaCalendar, FaClock, FaDollarSign, FaPhone, FaPlane,
  FaShare, FaBookmark
} from 'react-icons/fa';
import { wildlifeDestinations } from '../data/wildlifeDestinations';
import t11 from '../videos/t11.png';
import t12 from '../videos/t12.png';
import t13 from '../videos/t13.png';
import t14 from '../videos/t14.png';

const Wildlife = () => {
  const location = useLocation();
  const [dest, setDest] = useState(null);
  const [search, setSearch] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (location.state?.selected?.some(i => i === 'Wildlife Safari' || i === 'Wildlife')) {
      setDest(wildlifeDestinations.india);
      setShowDetails(true);
    }
  }, [location]);

  const d = wildlifeDestinations.india;

  // ===== DETAILS VIEW =====
  if (showDetails && dest) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => { setShowDetails(false); setDest(null); }} 
            className="text-gray-400 hover:text-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
            <FaArrowLeft /> Back
          </button>

          {/* Hero */}
          <div className="relative h-[70vh] min-h-[500px] rounded-3xl overflow-hidden mb-12">
            <img src={dest.coverImage} alt={dest.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-center text-white">
              <span className="inline-block bg-red-500/30 backdrop-blur px-6 py-2 rounded-full text-xs tracking-widest uppercase border border-white/20 mb-4">
                ✦ {dest.type || 'Wildlife Safari'} ✦
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-wide">{dest.name}</h1>
              <p className="text-white/70 mt-2 flex items-center justify-center gap-3">
                <FaMapMarkerAlt className="text-red-400" /> {dest.state} · ⭐ {dest.rating} ({dest.reviewCount} reviews)
              </p>
            </div>
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="bg-white/10 backdrop-blur p-3 rounded-full border border-white/20 hover:bg-white/30">
                <FaHeart className="text-white text-xl" />
              </button>
              <button className="bg-white/10 backdrop-blur p-3 rounded-full border border-white/20 hover:bg-white/30">
                <FaShare className="text-white text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div className="border-l-4 border-red-600 pl-6">
                <p className="text-xl font-light text-gray-700">{dest.description}</p>
              </div>

              {/* Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-light mb-3">Wildlife in India</h2>
                  <p className="text-gray-600 font-light">{dest.description}</p>
                  <div className="grid grid-cols-2 gap-1 mt-4">
                    {dest.highlights?.slice(0, 4).map((h, i) => (
                      <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-red-500">◆</span> {h}
                      </div>
                    ))}
                  </div>
                </div>
                <img src={t12} alt="Wildlife" className="rounded-2xl shadow-xl h-60 object-cover" />
              </div>

              {/* Best Time */}
              <div className="grid md:grid-cols-2 gap-6 bg-red-50 rounded-3xl p-6">
                <div>
                  <h2 className="text-2xl font-light mb-3">Best Time to Visit</h2>
                  <p className="text-gray-600 font-light">
                    <span className="font-semibold text-red-600">October to March</span> is ideal for wildlife sightings.
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {dest.weather && Object.entries(dest.weather).map(([season, temp]) => (
                      <div key={season} className="bg-white rounded-xl p-2 text-center shadow-sm">
                        <p className="text-xl">{season === 'summer' ? '☀️' : season === 'monsoon' ? '🌧️' : '❄️'}</p>
                        <p className="text-[10px] font-semibold capitalize">{season}</p>
                        <p className="text-[10px] text-gray-500">{temp}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <img src={t13} alt="Wildlife" className="rounded-2xl shadow-xl h-48 object-cover" />
              </div>
              
              {/* Top Wildlife Sanctuaries */}
              <div className="py-10">
                <h2 className="text-4xl font-light text-center mb-10">
                  Top Wildlife Sanctuaries
                </h2>
                <div className="max-w-5xl mx-auto relative">
                  <div className="absolute left-7 top-4 bottom-4 w-1 bg-gradient-to-b from-rose-400 to-rose-600 rounded-full"></div>
                  {dest.topSanctuaries?.slice(0, 4).map((s, i) => (
                    <div key={i} className="relative flex items-center gap-5 mb-8 group" >
                      <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-b from-amber-700 via-orange-600 to-yellow-500 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition">
                        {["🐅", "🦏", "🦌", "🐊"][i]}
                      </div>
                      <div className="flex-1 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h3 className="text-xl font-semibold">{s.name}</h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {s.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            {s.bestTime} </span>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {s.highlights?.slice(0, 2).map((h, index) => (
                              <span key={index} className="px-3 py-1 bg-lime-100 text-green-800 rounded-full text-xs" >
                                {h} </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Quick Details</h3>
                {[
                  ['Entry Fee', dest.entryFee],
                  ['Timings', dest.timings],
                  ['Best Time', dest.bestTimeToVisit]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-red-100 last:border-0">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className="font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-black text-white rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Getting There</h3>
                {dest.howToReach && Object.entries(dest.howToReach).map(([key, value]) => (
                  <div key={key} className="text-sm py-1">
                    {key === 'byAir' ? '✈️' : key === 'byTrain' ? '🚂' : '🚗'} {value}
                  </div>
                ))}
              </div>

              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 className="font-semibold mb-3">🆘 Emergency</h3>
                {dest.emergencyContacts && Object.entries(dest.emergencyContacts).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-red-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== GRID VIEW =====
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">
            Wildlife <span className="text-red-600">Safari</span>
          </h1>
          <p className="text-gray-500">Discover India's incredible wildlife sanctuaries and national parks</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input type="text" placeholder="Search wildlife sanctuaries..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full px-5 py-3 pl-12 border-2 rounded-xl focus:border-red-400 outline-none" />
              <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        <div onClick={() => { setDest(d); setShowDetails(true); window.scrollTo(0, 0); }}
          className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition cursor-pointer overflow-hidden group max-w-sm">
          <div className="relative h-56 overflow-hidden">
            <img src={d.coverImage} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
            {d.isPopular && <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">⭐ Featured</span>}
          </div>
          <div className="p-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold group-hover:text-red-600 transition">{d.name}</h3>
              <span className="flex items-center gap-1 text-sm"><FaStar className="text-yellow-400" /> {d.rating}</span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1"><FaMapMarkerAlt className="text-red-400" /> {d.state}</p>
            <p className="text-gray-600 text-sm line-clamp-2 my-2">{d.description?.substring(0, 100)}...</p>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">{d.type || 'Wildlife Safari'}</span>
              <span className="text-xs text-gray-400">{d.bestTimeToVisit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wildlife;