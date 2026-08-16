import React from 'react';

// Image Imports from ../videos/ directory (t101 to t103)
import t101 from '../videos/t101.png'; // Umngot River
import t102 from '../videos/t102.png'; // Double Decker Living Root Bridge
import t103 from '../videos/t103.png'; // Mawsmai Cave

const Meghalaya = [
  {
    id: 1,
    tag: "CRYSTAL CLEAR WATERS",
    title: "Umngot River",
    location: "Dawki, Meghalaya",
    description: "Famous worldwide for its emerald-green, crystal-clear waters so transparent that boats appear to float on air. Located at Dawki near the India-Bangladesh border, the river is a paradise for country boat rides, kayaking, and camping.",
    image: t101
  },
  {
    id: 2,
    tag: "BIO-ENGINEERING WONDER",
    title: "Double Decker Living Root Bridge",
    location: "Nongriat, Sohra (Cherrapunji), Meghalaya",
    description: "A 150-year-old architectural marvel hand-woven by the Indigenous Khasi people using the aerial roots of Ficus elastica trees. Tucked deep in the rainforests of Nongriat village, this two-tiered living bridge stands as a testament to sustainable eco-engineering.",
    image: t102
  },
  {
    id: 3,
    tag: "LIMESTONE CAVERN",
    title: "Mawsmai Cave",
    location: "Cherrapunji (Sohra), Meghalaya",
    description: "A well-lit natural limestone cave system near Cherrapunji featuring dramatic stalactites and stalagmites formed over millions of years. Its accessible pathways and squeezed rock passages make it one of Meghalaya's most thrilling subterranean experiences.",
    image: t103
  }
];

export default function MeghalayaPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Meghalaya
        </h1>
        <div className="w-16 h-1 bg-emerald-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Explore crystal-clear glass rivers, ancient living root architecture hidden in mist-shrouded valleys, and fascinating underground limestone caverns.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {Meghalaya.map((place, index) => {
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
                <p className="text-xs font-semibold text-emerald-600 tracking-[3px] uppercase mb-2">
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