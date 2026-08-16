import React from 'react';

// Image Imports from ../videos/ directory (t81 to t85)
import t81 from '../videos/t81.png'; 
import t82 from '../videos/t82.png'; 
import t83 from '../videos/t83.png'; 
import t84 from '../videos/t84.png'; 
import t85 from '../videos/t85.png'; 

const HimachalPradesh = [
  {
    id: 1,
    tag: "COLD DESERT VALLEY",
    title: "Spiti Valley",
    location: "Himachal Pradesh",
    description: "A high-altitude cold desert nestled deep in the Himalayas. Famous for stark snow-capped mountain terrains, ancient cliffside monasteries, rugged off-road winter expeditions, and breathtaking alpine landscapes.",
    image: t81
  },
  {
    id: 2,
    tag: "MINI SWITZERLAND OF INDIA",
    title: "Khajjiar",
    location: "Chamba District, Himachal Pradesh",
    description: "A magical hill station featuring a lush green saucer-shaped meadow surrounded by dense deodar forests and a central lake, offering panoramic views of the Dhauladhar mountain range.",
    image: t82
  },
  {
    id: 3,
    tag: "VALLEY OF THE GODS",
    title: "Kullu Valley",
    location: "Himachal Pradesh",
    description: "Known for its majestic snow-draped bridges, roaring river streams, timbered mountain valleys, and pine forests that serve as a gateway to adventure sports and rich Himalayan culture.",
    image: t83
  },
  {
    id: 4,
    tag: "SNOW & ADVENTURE HAVEN",
    title: "Manali",
    location: "Kullu District, Himachal Pradesh",
    description: "A high-altitude resort town perched along the Beas River. Featuring charming mountain settlements blanketed in winter snow, colorful alpine cottages, and access to Solang Valley and Atal Tunnel.",
    image: t84
  },
  {
    id: 5,
    tag: "QUEEN OF HILLS",
    title: "Shimla",
    location: "Himachal Pradesh",
    description: "Tucked amidst serene snow-covered pine forests, frozen lakes, and traditional mountain shrines. Shimla captures the quintessential beauty of colonial heritage blended with quiet Himalayan tranquility.",
    image: t85
  }
];

export default function HimachalPradeshPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Himachal Pradesh
        </h1>
        <div className="w-16 h-1 bg-cyan-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Traverse through high-altitude cold deserts, emerald cedar meadows, river valleys, and snow-draped pine havens in Land of the Gods.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {HimachalPradesh.map((place, index) => {
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
                <p className="text-xs font-semibold text-cyan-600 tracking-[3px] uppercase mb-2">
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