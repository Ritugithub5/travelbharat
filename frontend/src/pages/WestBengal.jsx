import React from 'react';

// Image Imports from ../videos/ directory (t89 to t93)
import t89 from '../videos/t89.png'; // Victoria Memorial
import t90 from '../videos/t90.png'; // Deolo Hill, Kalimpong
import t91 from '../videos/t91.png'; // Howrah Bridge
import t92 from '../videos/t92.png'; // Princep Ghat, Kolkata
import t93 from '../videos/t93.png'; // Tiger Hill Sunrise

const WestBengal = [
  {
    id: 1,
    tag: "COLONIAL ARCHITECTURE",
    title: "Victoria Memorial",
    location: "Kolkata, West Bengal",
    description: "A grand white Makrana marble building constructed between 1906 and 1921 in the heart of Kolkata. Surrounded by sprawling manicured gardens, it serves as a museum housing vast collections of Indo-British historical art and artifacts.",
    image: t89
  },
  {
    id: 2,
    tag: "HILLTOP PANORAMA",
    title: "Deolo Hill",
    location: "Kalimpong, West Bengal",
    description: "The highest point in Kalimpong, standing at 5,590 feet. Deolo Hill offers sweeping 360-degree views of rolling Eastern Himalayan ridges, deep valleys, the Relli River, and the snow-clad peaks of Mount Kanchenjunga.",
    image: t90
  },
  {
    id: 3,
    tag: "ENGINEERING MARVEL",
    title: "Howrah Bridge",
    location: "Kolkata, West Bengal",
    description: "An iconic balanced cantilever bridge spanning the Hooghly River, connecting Kolkata and Howrah. Illuminated brilliantly at night, this historic steel structure serves as the vital lifeline and most recognizable symbol of the city.",
    image: t91
  },
  {
    id: 4,
    tag: "RIVERFRONT HERITAGE",
    title: "Princep Ghat",
    location: "Kolkata, West Bengal",
    description: "Built during the British Raj along the banks of the Hooghly River, Princep Ghat features Greek and Gothic-style white pillars. Set against the modern Vidyasagar Setu, it offers peaceful sunset views and wooden boat rides.",
    image: t92
  },
  {
    id: 5,
    tag: "GOLDEN KANCHENJUNGA VIEWS",
    title: "Tiger Hill Sunrise",
    location: "Darjeeling, West Bengal",
    description: "World-famous viewpoint located at an altitude of 8,482 feet near Darjeeling. Visitors gather before dawn to witness the first rays of sunlight illuminate the majestic, snow-capped crest of Mount Kanchenjunga in hues of gold and pink.",
    image: t93
  }
];

export default function WestBengalPlaces() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-baloo">
          Discover West Bengal
        </h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto my-6 rounded-full"></div>
        <p className="text-lg text-slate-600 leading-relaxed font-light">
          From grand marble monuments and illuminated riverfront bridges to high-altitude Himalayan summits illuminated by golden sunrise light.
        </p>
      </div>

      {/* Alternating Split Layout */}
      <div className="max-w-6xl mx-auto space-y-20">
        {WestBengal.map((place, index) => {
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