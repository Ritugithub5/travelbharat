import React from 'react';

// Image Imports from ../videos/ directory (t107 to t110)
import t107 from '../videos/t107.png'; // Sindhudurg Fort
import t108 from '../videos/t108.png'; // Ajanta Caves
import t109 from '../videos/t109.png'; // Bhimashankar Temple
import t110 from '../videos/t110.png'; // Gateway of India

const Maharashtra = [
  {
    id: 1,
    tag: "MARITIME FORTRESS",
    title: "Sindhudurg Fort",
    location: "Malvan, Sindhudurg, Maharashtra",
    description: "A monumental sea fort constructed in the 17th century by Chhatrapati Shivaji Maharaj off the Konkan coast. Engineered to withstand ocean waves and naval invasions, its massive stone ramparts encircle an islet surrounded by the Arabian Sea.",
    image: t107
  },
  {
    id: 2,
    tag: "UNESCO WORLD HERITAGE",
    title: "Ajanta Caves",
    location: "Chhatrapati Sambhajinagar (Aurangabad), Maharashtra",
    description: "A horseshoe-shaped gorge containing 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to the 5th century CE. Renowned worldwide for masterly frescoes, mural paintings, and intricate stone carvings depicting Jataka stories.",
    image: t108
  },
  {
    id: 3,
    tag: "SACRED JYOTIRLINGA",
    title: "Bhimashankar Temple",
    location: "Pune District, Maharashtra",
    description: "Nestled deep in the Western Ghats (Sahyadri range), Bhimashankar is one of the 12 revered Jyotirlinga shrines of Lord Shiva. Built in the Nagara architectural style, the temple is surrounded by a rich wildlife sanctuary.",
    image: t109
  },
  {
    id: 4,
    tag: "COLONIAL WATERFRONT MONUMENT",
    title: "Gateway of India",
    location: "Mumbai, Maharashtra",
    description: "Erected in the Indo-Saracenic style along Apollo Bunder overlooking the Arabian Sea, this grand basalt arch was built to commemorate the 1911 royal visit of King George V. Today, it stands as the iconic symbol of Mumbai.",
    image: t110
  }
];

export default function MaharashtraPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Maharashtra
        </h1>
        <div className="w-16 h-1 bg-indigo-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          From island sea fortresses and ancient rock-cut cave art to sacred mountain shrines and iconic coastal monuments.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {Maharashtra.map((place, index) => {
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