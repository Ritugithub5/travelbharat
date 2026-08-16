import React from 'react';

// Image Imports from ../videos/ directory (t104 to t106)
import t104 from '../videos/t104.png'; 
import t105 from '../videos/t105.png'; 
import t106 from '../videos/t106.png'; 

const MadhyaPradesh = [
  {
    id: 1,
    tag: "UNESCO HERITAGE MONUMENT",
    title: "Sanchi Stupa",
    location: "Sanchi, Raisen, Madhya Pradesh",
    description: "One of India's oldest stone structures, commissioned by Emperor Ashoka in the 3rd century BCE. Famous for its massive hemispherical dome and four intricately carved Toranas (gateways) depicting scenes from Buddha's life and Jataka tales.",
    image: t104
  },
  {
    id: 2,
    tag: "GEOLOGICAL MARVEL",
    title: "Bhedaghat Marble Rocks",
    location: "Jabalpur, Madhya Pradesh",
    description: "A dramatic 100-foot-tall gorge carved out by the sacred Narmada River through soaring white marble cliffs. Offering magical boat rides—especially on full moon nights—it showcases nature's raw sculpting power right below the roaring Dhuandhar Falls.",
    image: t105
  },
  {
    id: 3,
    tag: "MEDIEVAL BUNDELA HERITAGE",
    title: "Orchha Fort Complex",
    location: "Orchha, Niwari, Madhya Pradesh",
    description: "Situated on an island in the Betwa River, this magnificent 16th-century fortress complex was built by Bundela Rajput rulers. It features architectural masterpieces including the multi-storeyed Jahangir Mahal, Raja Mahal, and Sheesh Mahal.",
    image: t106
  }
];

export default function MadhyaPradeshPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Madhya Pradesh
        </h1>
        <div className="w-16 h-1 bg-orange-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Immerse yourself in ancient Buddhist stupas, towering river-carved marble gorges, and majestic medieval fortresses frozen in time.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {MadhyaPradesh.map((place, index) => {
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
                <p className="text-xs font-semibold text-orange-600 tracking-[3px] uppercase mb-2">
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