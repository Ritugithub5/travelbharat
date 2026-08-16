import React from 'react';

// Image Imports
import t7 from '../videos/t7.png';
import t73 from '../videos/t73.png';
import t74 from '../videos/t74.png';
import t75 from '../videos/t75.png';

const destinations = [
  {
    id: 1,
    tag: "CULTURAL HERITAGE",
    title: "Historic Temple Legacy",
    location: "Shore Temple, Mahabalipuram",
    description: "Built in the 8th century, the Shore Temple showcases remarkable Dravidian architecture beside the Bay of Bengal. This UNESCO World Heritage Site is one of Tamil Nadu's most treasured monuments.",
    image: t7
  },
  {
    id: 2,
    tag: "NATURAL WONDERS",
    title: "Hogenakkal Falls",
    location: "Dharmapuri District",
    description: "Known as the 'Niagara Falls of India,' where the Kaveri River surges through ancient carbonatite rock gorges. Experience famous coracle boat rides and therapeutic river mist amidst dramatic cliff formations.",
    image: t73
  },
  {
    id: 3,
    tag: "HISTORIC MONUMENT",
    title: "Vivekananda Rock Memorial",
    location: "Kanyakumari",
    description: "Perched gracefully on a rocky island off India's southernmost tip. This iconic sanctuary marks the exact convergence of the Arabian Sea, the Bay of Bengal, and the Indian Ocean.",
    image: t74
  },
  {
    id: 4,
    tag: "MOUNTAIN ESCAPES",
    title: "Valparai Tea Plantations",
    location: "Western Ghats",
    description: "A serene paradise elevated deep in the hills of Tamil Nadu. Marvel at sweeping aerial vistas of emerald tea carpeted valleys, winding hairpin curves, and pristine high-altitude rainforests.",
    image: t75
  }
];

export default function TamilNaduPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Tamil Nadu
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Immerse yourself in timeless temple heritage, mist-shrouded river waterfalls, sacred coastal monuments, and sweeping mountain tea estates.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {destinations.map((place, index) => {
          const isEven = index % 2 === 1; // Checks order to flip image/text placement

          return (
            <div 
              key={place.id}
              className={`flex flex-col lg:flex-row ${
                isEven ? 'lg:flex-row-reverse' : ''
              } items-center bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 transition-all duration-500 hover:shadow-2xl`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-72 sm:h-96 lg:h-[420px] relative overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-6 bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                  {place.tag}
                </div>
              </div>

              {/* Description Side */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <p className="text-xs font-semibold text-amber-600 tracking-[3px] uppercase mb-2">
                  📍 {place.location}
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold font-baloo text-slate-900 mb-4 leading-snug">
                  {place.title}
                </h2>

                <p className="text-slate-600 leading-relaxed text-base font-normal">
                  {place.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}