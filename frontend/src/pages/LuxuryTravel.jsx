import React, { useState } from 'react';
import { 
  Compass, MapPin, Calendar, Users, Star, Search, ChevronRight, 
  ShieldCheck, Sparkles, PhoneCall, Globe, Home, Anchor, Bed, 
  Maximize, X, Check, Heart, Sun, Thermometer, UserCheck, Flame
} from 'lucide-react';

import t50 from '../videos/t50.png';
import t51 from '../videos/t51.png';
import t52 from '../videos/t52.png';
import t53 from '../videos/t53.png';
import t54 from '../videos/t54.png';
import t55 from '../videos/t55.png';

const Option1Mediterranean = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    {
      id: 1,
      title: 'The Azure Horizon Estate',
      location: 'Noonu Atoll, Maldives',
      category: 'couples',
      image: t55,
      rating: 4.98,
      price: '$4,200',
      tag: 'Ultra Secluded',
      bestFor: 'Romantic Getaways & Honeymooners',
      weather: '29°C | Clear Skies',
      bestMonths: 'Nov – April',
      guests: 'Up to 8 Guests',
      bedrooms: '4 Suites',
      size: '6,500 sq ft',
      overview: 'Suspended directly over glass-like turquoise lagoons. Designed for travelers who prioritize absolute seclusion, personal butler attentiveness, and direct sea access.',
      suitability: [
        'Best for: Couples wanting 100% private water villas with no foot traffic.',
        'Vibe: Quiet, intimate, ultra-luxurious, and peaceful.',
        'Highlight: Private pontoon dining and private sunset yacht charter.'
      ]
    },
    {
      id: 2,
      title: 'Coral Cove Yacht & Lagoon Sanctuary',
      location: 'Bora Bora, French Polynesia',
      category: 'adventure',
      image: t50,
      rating: 4.95,
      price: '$3,850',
      tag: 'Yacht Included',
      bestFor: 'Ocean Explorers & Marine Enthusiasts',
      weather: '28°C | Tropical Breeze',
      bestMonths: 'May – October',
      guests: 'Up to 6 Guests',
      bedrooms: '3 Cabins',
      size: '4,200 sq ft',
      overview: 'Includes a dedicated 50ft private catamaran anchored at your private dock. Ideal for travelers who want to sail between private coral reefs and lagoons daily.',
      suitability: [
        'Best for: Adventurous travelers who want marine exploration + luxury.',
        'Vibe: Active coastal luxury with private diving instructors on call.',
        'Highlight: Private catamaran captain available 24/7.'
      ]
    },
    {
      id: 3,
      title: 'Solstice Ocean Resort & Spa',
      location: 'Da Nang Riviera, Vietnam',
      category: 'wellness',
      image: t51,
      rating: 4.92,
      price: '$2,100',
      tag: 'Holistic Sanctuary',
      bestFor: 'Wellness Seekers & Spa Lovers',
      weather: '27°C | Warm & Humid',
      bestMonths: 'Feb – August',
      guests: 'Up to 4 Guests',
      bedrooms: '2 Suites',
      size: '3,800 sq ft',
      overview: 'Nestled between jungle hillsides and ocean waves. Offers daily customized spa regimens, thermal hydrotherapy, and organic Michelin-star dining.',
      suitability: [
        'Best for: Solo travelers or couples looking to recharge and detox.',
        'Vibe: Serene, health-focused, slow-paced, and rejuvenating.',
        'Highlight: Unlimited daily thermal spa & private yoga master.'
      ]
    },
    {
      id: 4,
      title: 'Villa Palmier Lagoon Estate',
      location: 'Baie Longue, St. Martin',
      category: 'family',
      image: t52,
      rating: 4.99,
      price: '$5,100',
      tag: 'Grand Compound',
      bestFor: 'Large Families & Group Celebrations',
      weather: '30°C | Sunny',
      bestMonths: 'Dec – May',
      guests: 'Up to 12 Guests',
      bedrooms: '6 Suites',
      size: '9,200 sq ft',
      overview: 'A sprawling cliffside multi-suite estate with a tennis court, lap pool, and full private security. Perfectly equipped for hosting multi-generational families.',
      suitability: [
        'Best for: Families or groups needing high space, entertainment, and safety.',
        'Vibe: Grand, celebratory, spacious, and family-friendly.',
        'Highlight: Full estate staff including security, private chef, and driver.'
      ]
    },
    {
      id: 5,
      title: 'Serenity Pathway Beach Villa',
      location: 'Grace Bay, Turks & Caicos',
      category: 'couples',
      image: t53,
      rating: 4.89,
      price: '$2,900',
      tag: 'Powder Sand Beach',
      bestFor: 'Relaxed Beach Loungers',
      weather: '29°C | Coastal Winds',
      bestMonths: 'Dec – April',
      guests: 'Up to 6 Guests',
      bedrooms: '3 Suites',
      size: '4,500 sq ft',
      overview: 'Direct private wooden boardwalk leading straight into Grace Bay’s world-famous soft sand. Features outdoor fire pits and sunset pavilion lounges.',
      suitability: [
        'Best for: People who want effortless beach access without walking far.',
        'Vibe: Relaxed, warm, barefoot luxury.',
        'Highlight: Private beachfront setup with dedicated beach butler.'
      ]
    },
    {
      id: 6,
      title: 'Golden Hour Chalet & Sunset Deck',
      location: 'Nungwi Peninsula, Zanzibar',
      category: 'adventure',
      image: t54,
      rating: 4.96,
      price: '$3,450',
      tag: 'Coastal Safari',
      bestFor: 'Culture & Nature Lovers',
      weather: '31°C | Sunny & Warm',
      bestMonths: 'June – October',
      guests: 'Up to 10 Guests',
      bedrooms: '5 Suites',
      size: '7,800 sq ft',
      overview: 'Combines open-air exotic wooden chalets with direct access to private jet excursions for African mainland safaris.',
      suitability: [
        'Best for: Travelers who want to mix beach relaxation with safari wildlife.',
        'Vibe: Exotic, adventurous, rich in local culture and sunset views.',
        'Highlight: Same-day private jet transfers to Serengeti reserves.'
      ]
    }
  ];

  const filteredPlaces = activeFilter === 'all' 
    ? places 
    : places.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-stone-100 text-stone-800 font-sans pb-20">

      {/* Hero Header */}
      <section className="py-16 px-6 lg:px-16 text-center max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs tracking-widest uppercase font-semibold mb-4">
          Traveler Matchmaking Guide
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 leading-tight mb-4">
          Choose Your <br />
          <span className="italic font-normal text-amber-700">Haven</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-light">
          Select a sanctuary below to find your perfect match.
        </p>

        {/* Category Suitability Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Stays' },
            { id: 'couples', label: 'Best for Couples' },
            { id: 'family', label: 'Best for Families & Groups' },
            { id: 'wellness', label: 'Best for Wellness & Spa' },
            { id: 'adventure', label: 'Best for Ocean & Safari' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-white border border-amber-200 text-stone-600 hover:border-amber-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedPlace(item)}
              className="group bg-white border border-amber-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-900/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-amber-200">{item.bestFor}</span>
                    <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.5 rounded">CLICK TO VIEW</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                    <span className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {item.rating}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-stone-900 group-hover:text-amber-700 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-stone-500 text-s leading-relaxed line-clamp-2 mb-4">
                    {item.overview}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-amber-100/80 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block font-bold">Rates starting</span>
                  <span className="text-amber-800 font-serif text-lg font-bold">{item.price} <span className="text-xs font-normal text-stone-500">/ night</span></span>
                </div>
                <span className="text-xs font-semibold text-amber-700 underline underline-offset-4">
                  Check Suitability
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traveler Detailed Suitability Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-amber-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            <button 
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-stone-700 hover:bg-stone-100 shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="relative h-60 shrink-0">
              <img src={selectedPlace.image} alt={selectedPlace.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">{selectedPlace.location}</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">{selectedPlace.title}</h2>
              </div>
            </div>

            {/* Detailed Traveler Breakdown */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-700">
              
              {/* Quick Profile */}
              <div className="grid grid-cols-3 gap-3 bg-amber-50/60 border border-amber-200/60 p-3 rounded-2xl text-center text-xs">
                <div>
                  <span className="block text-stone-400 text-[10px] uppercase font-bold">Best Weather</span>
                  <span className="font-semibold text-stone-800">{selectedPlace.weather}</span>
                </div>
                <div>
                  <span className="block text-stone-400 text-[10px] uppercase font-bold">Optimal Months</span>
                  <span className="font-semibold text-stone-800">{selectedPlace.bestMonths}</span>
                </div>
                <div>
                  <span className="block text-stone-400 text-[10px] uppercase font-bold">Capacity</span>
                  <span className="font-semibold text-stone-800">{selectedPlace.guests}</span>
                </div>
              </div>

              {/* Suitability Analysis */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-800 mb-3 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-600" /> Why Choose This Stay?
                </h4>
                <div className="space-y-2">
                  {selectedPlace.suitability.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-s text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                      <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-amber-800 mb-1">Full Sanctuary Overview</h4>
                <p className="text-s text-stone-500 leading-relaxed">{selectedPlace.overview}</p>
              </div>

              {/* Modal Action */}
              <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Nightly Rate</span>
                  <span className="text-amber-800 font-serif text-2xl font-bold">{selectedPlace.price}</span>
                </div>
                <button 
                  onClick={() => alert(`Inquiry reserved for ${selectedPlace.title}`)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-widest shadow-md hover:shadow-lg"
                >
                  Request Reservation
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Option1Mediterranean;