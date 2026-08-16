import React from 'react';

// Image Imports from ../videos/ directory (t86 to t88)
import t86 from '../videos/t86.png'; // Pangong Tso / Sand Dunes
import t87 from '../videos/t87.png'; // Monasteries
import t88 from '../videos/t88.png'; // Nubra Valley (Bactrian Camels)

const Ladakh = [
  {
    id: 1,
    tag: "HIGH-ALTITUDE LAKE & DUNES",
    title: "Pangong Lake",
    location: "Ladakh",
    description: "Situated at an altitude of over 14,000 feet, Pangong Lake is famous for its shimmering, color-changing brackish waters that shift from deep blue to turquoise, set against dramatic high-altitude desert dunes and rugged barren mountains.",
    image: t86
  },
  {
    id: 2,
    tag: "SPIRITUAL HERITAGE",
    title: "Monasteries of Ladakh",
    location: "Ladakh",
    description: "Perched dramatically on sheer rock cliffs and mountain peaks, Ladakh's ancient Buddhist monasteries (Gompas) house priceless mural art, prayer wheels, and centuries-old spiritual traditions overlooking vast Himalayan valleys.",
    image: t87
  },
  {
    id: 3,
    tag: "COLD DESERT OASIS",
    title: "Nubra Valley",
    location: "Ladakh",
    description: "A high-altitude cold desert valley located along the ancient Silk Route. Famous for its sweeping sand dunes at Hunder, double-humped Bactrian camels, and breathtaking mountain vistas along the Shyok and Nubra rivers.",
    image: t88
  }
];

export default function LadakhPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Ladakh
        </h1>
        <div className="w-16 h-1 bg-indigo-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Journey through mesmerizing turquoise lakes, sacred cliffside monasteries, and sweeping cold desert valleys in the Trans-Himalayas.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {Ladakh.map((place, index) => {
          const isEven = index % 2 === 1; // Alternates image left / right

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
                <div className="absolute top-6 left-6 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                  {place.tag}
                </div>
              </div>

              {/* Description Side */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <p className="text-xs font-semibold text-indigo-600 tracking-[3px] uppercase mb-2">
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