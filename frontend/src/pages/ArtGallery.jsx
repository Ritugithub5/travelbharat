import React, { useState } from "react";

// Method 3: ES6 Imports for local assets
import t25Img from "../videos/t25.png";
import t26Img from "../videos/t26.png";
import t27Img from "../videos/t27.png";
import t28Img from "../videos/t28.png";
import t29Img from "../videos/t29.png";
import t30Img from "../videos/t30.png";

export default function TravelIndiaPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const categories = [
    "All",
    "Heritage & Architecture",
    "Cultural Arts",
    "Spiritual & Sculptures",
    "Modern Galleries",
  ];

  const destinations = [
    {
      id: "t25",
      title: "Grand Royal Gallery Experience",
      category: "Heritage & Architecture",
      image: t25Img,
      location: "Udaipur, Rajasthan",
      tag: "Royal Heritage",
      description:
        "Explore majestic royal portrait galleries and gold-leaf architectural wonders of Rajasthan.",
      highlights: [
        "Guided Palace Walkthrough",
        "Traditional Mewari Art Viewing",
        "Private Sunset Court Access",
      ],
      duration: "Full Day (8 hrs)",
    },
    {
      id: "t26",
      title: "Victoria Memorial Hall & Reflection Lake",
      category: "Heritage & Architecture",
      image: t26Img,
      location: "Kolkata, West Bengal",
      tag: "Colonial Landmark",
      description:
        "Iconic Indo-Saracenic marble monument surrounded by lush gardens and tranquil reflecting pools.",
      highlights: [
        "Light & Sound Evening Show",
        "Imperial Museum Wing",
        "Botanical Garden Stroll",
      ],
      duration: "3 - 4 Hours",
    },
    {
      id: "t27",
      title: "Ancient Sculptures & Mosaic Halls",
      category: "Spiritual & Sculptures",
      image: t27Img,
      location: "National Museum, New Delhi",
      tag: "Ancient History",
      description:
        "Walk through arched marble corridors featuring stone busts, classical reliefs, and ancient floor mosaics.",
      highlights: [
        "Archeological Wing Tour",
        "Audio Guide in 6 Languages",
        "Sculpture Preservation Lab",
      ],
      duration: "Half Day",
    },
    {
      id: "t28",
      title: "Contemporary Indian Art Pavilion",
      category: "Modern Galleries",
      image: t28Img,
      location: "Mumbai, Maharashtra",
      tag: "Modern Art",
      description:
        "Dynamic urban art display showcasing vibrant expressionist portraits, impasto canvas works, and neon installations.",
      highlights: [
        "Artist Q&A Sessions",
        "Live Canvas Painting",
        "Rooftop Espresso Lounge",
      ],
      duration: "2 - 3 Hours",
    },
    {
      id: "t29",
      title: "Eco-Friendly Woven Bamboo Ganesha",
      category: "Cultural Arts",
      image: t29Img,
      location: "Kolkata & Odisha Eco-Craft Centers",
      tag: "Traditional Craft",
      description:
        "A masterpiece of sustainable Indian craft made entirely from hand-woven straw and natural bamboo mats.",
      highlights: [
        "Artisan Interaction Workshop",
        "Sustainable Craft Buying",
        "Pottery & Weaving Demo",
      ],
      duration: "2 Hours",
    },
    {
      id: "t30",
      title: "Terracotta & Clay Artisan Exhibition",
      category: "Cultural Arts",
      image: t30Img,
      location: "Bishnupur & Rural Craft Villages",
      tag: "Handicraft Special",
      description:
        "Intricate ceramic figurines, miniature clay sculptures, and traditional handcrafted pottery.",
      highlights: [
        "Hands-on Clay Molding",
        "Village Artisan Tour",
        "Souvenir Gift Pack",
      ],
      duration: "Half Day",
    },
  ];

  const filteredDestinations =
    activeFilter === "All"
      ? destinations
      : destinations.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-white  font-sans">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-300 to-gray-600 py-20 border-b border-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-16 items-center relative z-10">
          <div className="md:col-span-3 space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-rose-500/60"></span>
              <span className="text-s uppercase tracking-[0.25em] text-rose-600 font-medium">
                Incredible India Tourism Special
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mt-4 leading-[1.1]">
              <span className="bg-gradient-to-r from-gray-500 to-rose-700 bg-clip-text text-transparent">
                Journey Deep Into{" "}
              </span>
              <br />
              <span className="italic font-light relative inline-block bg-gradient-to-r from-gray-500 to-rose-700 bg-clip-text text-transparent">
                India’s Living Heritage{" "}
                <span className="absolute -bottom-2 left-0 w-1/3 h-px bg-gradient-to-r from-rose-600 to-transparent"></span>
              </span>
            </h1>

            <p className="max-w-2xl text-black text-base md:text-lg leading-relaxed font-light pt-2">
              A curated odyssey connecting the architectural grandeur of marble
              monuments, centuries-old artisan traditions, and evocative modern
              fine art.
            </p>
            <div className="pt-6">
              <a
                href="#destinations"
                className="inline-block bg-rose-500 text-stone-950 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-amber-500 transition-colors shadow-lg shadow-amber-950/30"
              >
                Begin Your Odyssey
              </a>
            </div>
          </div>
          <div className="md:col-span-2 relative flex justify-end md:justify-center group">
            <div className="absolute -inset-8 bg-amber-950/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            {/* Skewed Portrait Card Container */}
            <div
              className="relative w-full max-w-sm aspect-[3/4] rotate-[-2deg] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl shadow-amber-500/10 group-hover:rotate-0 group-hover:-translate-x-2 transition-all duration-500 ease-out cursor-pointer"
              onClick={() => setSelectedDestination(destinations[0])}
            >
              <img
                src={t25Img}
                alt="India Royal Heritage - Udaipur"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <h3 className="text-2xl font-serif text-white leading-snug">
                  Royal Gallery & Heritage Walk
                </h3>
                <p className="text-sm text-stone-200 font-light flex items-center gap-1.5">
                  <span className="text-amber-700 text-lg">⊙</span> Udaipur,
                  Rajasthan
                </p>
                <p className="text-s text-amber-600 group-hover:underline pt-1">
                  Explore Itinerary Details →
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Destination Grid */}
      <section id="destinations" className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-serif text-stone-600">
              Explore Travel Destinations
            </h2>
            <p className="text-stone-500 text-md mt-1">
              Select an experience to view detailed itineraries and tour options
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  activeFilter === cat
                    ? "bg-rose-500 text-stone-950 font-semibold"
                    : "bg-stone-800 text-stone-400 hover:text-stone-200"
                }`}
              >
                {" "}
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-amber-700/50 transition duration-300 shadow-xl flex flex-col group cursor-pointer"
              onClick={() => setSelectedDestination(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-stone-950/80 text-amber-300 text-[10px] font-semibold px-2.5 py-1 rounded border border-amber-900/50">
                  {item.tag}{" "}
                </span>
                <span className="absolute bottom-3 right-3 bg-stone-950/80 text-stone-300 text-[11px] px-2 py-0.5 rounded">
                  {item.duration}{" "}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs text-amber-400 font-medium">
                    <span>{item.category}</span>
                    <span className="text-stone-400">{item.location}</span>
                  </div>
                  <h3 className="text-lg font-serif text-stone-100 mt-2 group-hover:text-amber-300 transition">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-xs mt-2 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button className="text-xs text-amber-300 font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                    View Package &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedDestination && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-800/60 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-4 right-4 bg-stone-950/80 text-stone-300 hover:text-white w-8 h-8 rounded-full flex items-center justify-center z-10"
            >
              {" "}
              ✕{" "}
            </button>
            <div className="relative aspect-[16/9] bg-stone-950">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                {selectedDestination.location}
              </span>
              <h3 className="text-2xl font-serif text-stone-100 mt-1">
                {selectedDestination.title}
              </h3>
              <p className="text-stone-300 text-xs mt-3 leading-relaxed">
                {selectedDestination.description}
              </p>

              <div className="mt-4">
                <h4 className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Tour Highlights:
                </h4>
                <ul className="mt-2 space-y-1">
                  {selectedDestination.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-stone-400 flex items-center gap-2"
                    >
                      <span className="text-amber-400">✓</span> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex justify-between items-center border-t border-stone-800 pt-4">
                <div>
                  <p className="text-[10px] text-stone-500 uppercase">
                    Estimated Duration
                  </p>
                  <p className="text-xs text-stone-200 font-medium">
                    {selectedDestination.duration}
                  </p>
                </div>
                <button
                  onClick={() =>
                    alert(`Inquiry sent for ${selectedDestination.title}!`)
                  }
                  className="bg-amber-400 text-stone-950 text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-amber-300 transition"
                >
                  Book Tour Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
