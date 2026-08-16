import React from 'react';

// Image Imports from ../videos/ directory
import t9 from '../videos/t9.png';
import t78 from '../videos/t78.png';
import t79 from '../videos/t79.png';
import t80 from '../videos/t80.png';

const Telangana = [
  {
    id: 1,
    tag: "ISLAND GATEWAY",
    title: "Experience the Crystal-Clear Waters of Port Blair",
    place: "Port Blair, Andaman and Nicobar",
    description: "Dive into tropical paradise at the capital of the Andaman Islands. Famous for turquoise ocean waters, rich coral reefs, white sand beaches, and historic colonial landmarks set against deep forest backdrops.",
    image: t9
  },
  {
    id: 2,
    tag: "NATURAL WATERFALL",
    title: "Kuntala Waterfalls",
    place: "Adilabad District, Telangana",
    description: "The highest waterfall in Telangana, where the Khasipura River cascades down 147 feet of rugged rocky terrain. Surrounded by dense teak forests, it offers a dramatic natural spectacle during monsoon season.",
    image: t79
  },
  {
    id: 3,
    tag: "ARCHITECTURAL MARVEL",
    title: "Historic Charminar",
    place: "Hyderabad, Telangana",
    description: "Dive into tropical paradise at the capital of the Andaman Islands. Famous for turquoise ocean waters, rich coral reefs, white sand beaches, and historic colonial landmarks set against deep forest backdrops.",
    image: t78
  },
  {
    id: 4,
    tag: "ISLAND RESORT & LAKE",
    title: "Laknavaram Lake & Hanging Bridge",
    place: "Mulugu District, Telangana",
    description: "A serene eco-tourism paradise featuring expansive green waters dotted with 13 lush islands. Walk across its iconic yellow suspension bridge connecting small islands surrounded by scenic hill ranges.",
    image: t80
  }
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-xs font-bold tracking-[6px] uppercase text-emerald-600 block mb-3">
          EXPLORE INDIA'S HIDDEN TREASURES
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Telangana & Beyond
        </h1>
        <div className="w-16 h-1 bg-emerald-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          From grand medieval minarets and cascading forest waterfalls to island suspension bridges and crystal-clear tropical ocean waters.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {Telangana.map((place, index) => {
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
                <div className="absolute top-6 left-6 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase">
                  {place.tag}
                </div>
              </div>

              {/* Description Side */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <p className="text-xs font-semibold text-emerald-600 tracking-[3px] uppercase mb-2">
                  📍 {place.place}
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