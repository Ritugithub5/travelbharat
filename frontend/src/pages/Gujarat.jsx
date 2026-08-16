import React from 'react';

// Image Imports from ../videos/ directory (t111 to t113)
import t111 from '../videos/t111.png'; // Statue of Unity
import t112 from '../videos/t112.png'; // Atal Bridge, Ahmedabad
import t113 from '../videos/t113.png'; // Somnath Temple

const Gujarat = [
  {
    id: 1,
    tag: "WORLD'S TALLEST STATUE",
    title: "Statue of Unity",
    location: "Ekta Nagar (Kevadia), Narmada, Gujarat",
    description: "Standing at a colossal height of 182 meters overlooking the Narmada River and Sardar Sarovar Dam, this iconic monument honors Sardar Vallabhbhai Patel. It features a high-speed elevator leading to a viewing gallery at 153 meters with sweeping views of the Vindhya and Satpura ranges.",
    image: t111
  },
  {
    id: 2,
    tag: "MODERN ARCHITECTURAL MARVEL",
    title: "Atal Bridge",
    location: "Sabarmati Riverfront, Ahmedabad, Gujarat",
    description: "An innovative 300-meter footbridge spanning the Sabarmati River, inspired by the vibrant colors and geometry of Gujarat's famous Uttarayan kite festival. Designed exclusively for pedestrians and cyclists, it offers stunning riverfront vistas and dynamic night lighting.",
    image: t112
  },
  {
    id: 3,
    tag: "FIRST AMONG THE JYOTIRLINGAS",
    title: "Somnath Temple",
    location: "Prabhas Patan, Veraval, Gujarat",
    description: "Perched dramatically on the coast of the Arabian Sea, Somnath is revered as the first of the twelve sacred Jyotirlinga shrines of Lord Shiva. Built in the intricate Kailash Mahameru Prasad style, the golden-hued temple stands as a eternal symbol of faith and resilience.",
    image: t113
  }
];

export default function GujaratPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-xs font-bold tracking-[6px] uppercase text-amber-600 block mb-3">
          LAND OF HERITAGE & PROGRESS
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Gujarat
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          From colossal modern engineering feats along pristine rivers to ancient coastal temples echoing centuries of devotion.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {Gujarat.map((place, index) => {
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