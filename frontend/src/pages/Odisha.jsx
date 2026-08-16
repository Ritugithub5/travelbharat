import React from 'react';

// Image Imports from ../videos/ directory (t94 to t100)
import t94 from '../videos/t94.png'; // Duduma Waterfall
import t95 from '../videos/t95.png'; // Jagannath Temple
import t96 from '../videos/t96.png'; // Konark Sun Temple
import t97 from '../videos/t97.png'; // Red Mud Pond
import t98 from '../videos/t98.png'; // Aapkhol Waterfall
import t99 from '../videos/t99.png'; // Chilika Lake
import t100 from '../videos/t100.png'; // Deomali

const Odisha = [
  {
    id: 1,
    tag: "MAJESTIC CASCADE",
    title: "Duduma Waterfall",
    location: "Koraput, Odisha",
    description: "Formed by the Machkund River, Duduma is one of India's highest waterfalls, plunging over 157 meters down rugged, forested cliffs. Located in the Eastern Ghats near Koraput, it is surrounded by lush green valleys and rich tribal heritage.",
    image: t94
  },
  {
    id: 2,
    tag: "SACRED HERITAGE",
    title: "Jagannath Temple",
    location: "Puri, Odisha",
    description: "A world-renowned 12th-century Kalinga-style temple dedicated to Lord Jagannath, Balabhadra, and Subhadra. As one of the holy Char Dham pilgrimage sites, its soaring shikhara and annual Rath Yatra draw millions of devotees globally.",
    image: t95
  },
  {
    id: 3,
    tag: "ARCHITECTURAL MARVEL",
    title: "Konark Sun Temple",
    location: "Konark, Puri, Odisha",
    description: "A 13th-century UNESCO World Heritage Site designed as a colossal stone chariot with 24 intricately carved wheels drawn by seven horses. Built by King Narasimhadeva I, it stands as a pinnacle of ancient Kalinga stone artistry.",
    image: t96
  },
  {
    id: 4,
    tag: "SURREAL LANDSCAPE",
    title: "Red Mud Pond",
    location: "Damanjodi, Koraput, Odisha",
    description: "A striking industrial landscape located near the NALCO bauxite processing area in Koraput. The rich terrace-like red earth formations contrasting sharply against surrounding green hills create an uncanny, otherworldly visual phenomenon.",
    image: t97
  },
  {
    id: 5,
    tag: "HIDDEN OASIS",
    title: "Aapkhol Waterfall",
    location: "Bargad, Odisha",
    description: "Nestled deep inside the forested rocky ravines near Gandhamardan Hills, Aapkhol Waterfall cascades into a tranquil natural pool framed by vertical rock faces. It is a peaceful, offbeat haven for nature lovers and trekkers.",
    image: t98
  },
  {
    id: 6,
    tag: "BRACKISH LAGOON",
    title: "Chilika Lake",
    location: "Puri / Khordha / Ganjam, Odisha",
    description: "Asia's largest brackish water lagoon, famous as a winter sanctuary for migratory birds from as far as Siberia. Chilika is also celebrated for its serene island vistas, local fishing culture, and rare Irrawaddy dolphin sightings.",
    image: t99
  },
  {
    id: 7,
    tag: "HIGHEST PEAK",
    title: "Deomali Peak",
    location: "Koraput, Odisha",
    description: "Standing at an elevation of 1,672 meters, Deomali is the highest peak in Odisha. Featuring rolling green ridges, winding mountain paths, and breathtaking valley vistas, it is a premier destination for hiking and cloud-watching.",
    image: t100
  }
];

export default function OdishaPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover Odisha
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          Journey through ancient coastal temples, vast migratory lagoons, hidden forest cascades, and the dramatic highland peaks of the Eastern Ghats.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {Odisha.map((place, index) => {
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