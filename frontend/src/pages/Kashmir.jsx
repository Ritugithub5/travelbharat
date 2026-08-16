import React from 'react';

// Image Imports from ../videos/ directory
import t8 from '../videos/t8.png';
import t76 from '../videos/t76.png';
import t77 from '../videos/t77.png';

const destinations = [
  {
    id: 1,
    tag: "PARADISE ON EARTH",
    title: "Enchanting Kashmir Valley",
    location: "Jammu & Kashmir",
    description: "Immerse yourself in the breathtaking landscapes of Kashmir, where snow-capped Himalayan peaks, lush meadows, crystal-clear streams, and rich mountain heritage create an unforgettable escape.",
    image: t8
  },
  {
    id: 2,
    tag: "LAKE LIFE & HERITAGE",
    title: "Traditional Dal Lake Houseboats",
    location: "Srinagar, Kashmir",
    description: "Experience the timeless charm of staying in handcrafted wooden houseboats floating peacefully on Dal Lake, set against the backdrop of snow-dusted Zabarwan mountain ranges.",
    image: t76
  },
  {
    id: 3,
    tag: "WINTER WONDERLAND",
    title: "Snow Trails of Gulmarg",
    location: "Gulmarg, Kashmir",
    description: "Journey through deep pine forests blanketed in pure white snow. Home to Asia's highest gondola ride and world-class skiing slopes, Gulmarg offers a fairytale winter landscape.",
    image: t77
  }
];

export default function KashmirPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-xs font-bold tracking-[6px] uppercase text-sky-600 block mb-3">
          NORTHERN INDIA EXPEDITION
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Kashmir
        </h1>
        <div className="w-16 h-1 bg-sky-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Journey through pristine alpine meadows, tranquil lake houseboats, and snow-draped pine trails in the heart of Paradise on Earth.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {destinations.map((place, index) => {
          const isEven = index % 2 === 1; // Alternates image left/right

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
                <p className="text-xs font-semibold text-sky-600 tracking-[3px] uppercase mb-2">
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