import React, { useState } from 'react';
import { Utensils, Star, X, Sparkles, ChevronRight } from 'lucide-react';

import t56 from '../videos/t56.png';
import t57 from '../videos/t57.png';
import t58 from '../videos/t58.png';
import t59 from '../videos/t59.png';
import t60 from '../videos/t60.png';
import t61 from '../videos/t61.png';
import t62 from '../videos/t62.png';

const Culinary = () => {
  const [selectedDish, setSelectedDish] = useState(null);

  const dishes = [
    { id: 1, name: 'Sizzling Street Pav Bhaji & Dosa', image: t56, rating: 4.9, tag: 'Street Food', description: 'A rich, slow-simmered spiced vegetable mash served alongside piping hot buttered pavs and crispy golden dosas straight off the flat-top griddle.' },
    { id: 2, name: 'Artisanal Kathi Roll & Wraps', image: t57, rating: 4.8, tag: 'Chef Special', description: 'Warm handmade flatbread wrapped around succulent spiced fillings, topped with fresh crisp veggies, tangy house chutney, and signature savory sauces.' },
    { id: 3, name: 'Aromatic Whole Spice Selection', image: t58, rating: 4.95, tag: 'Heritage Spices', description: 'An essential blend of sun-dried chilis, golden turmeric, whole peppercorns, and freshly ground lentils—the heart and soul behind authentic Indian regional cooking.' },
    { id: 4, name: 'Royal Shahi Paneer & Curries', image: t59, rating: 4.97, tag: 'Signature Dining', description: 'Velvety cottage cheese cubes simmered in a rich, buttery tomato-cashew gravy, served with garlic butter naan, fragrant koftas, and Hakka noodles.' },
    { id: 5, name: 'Grand Tandoori Feast & Pani Puri', image: t60, rating: 4.99, tag: 'Feast Platter', description: 'An ultimate tasting spread featuring smoky tandoori chicken, crisp pani puris filled with tangy spiced water, Indo-Chinese lollipops, and sizzling appetizers.' },
    { id: 6, name: 'Traditional Royal Thali Meal', image: t61, rating: 4.92, tag: 'Traditional Meal', description: 'A complete balanced family feast offering slow-cooked mutton curry, crispy luchis, fragrant pilaf, fresh mint chutneys, and rich spinach raita.' },
    { id: 7, name: 'Festive Mithai & Gulab Jamun', image: t62, rating: 4.96, tag: 'Decadent Sweets', description: 'A luxurious assortment of festive Indian confections including warm syrup-soaked gulab jamuns, silver-leafed kaju katli, besan ladoos, and pistachio kheer.' },
  ];

  return (
    <div className="min-h-screen bg-[#faf6f0] text-stone-900 font-sans pb-24">

      {/* Hero */}
      <section className="py-16 px-8 max-w-5xl mx-auto text-center">
        <h1 className="font-serif text-5xl sm:text-7xl font-extralight tracking-tight mb-4">
          Culinary <span className="italic font-normal text-amber-800">Masterpieces</span>
        </h1>
        <p className="text-stone-500 text-sm sm:text-base font-light max-w-md mx-auto">
          Tap any story below to reveal full flavor notes and ingredients.
        </p>
      </section>

      {/* Editorial Grid */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {dishes.map((dish, index) => {
          // Dynamic layout classes for asymmetry
          const isLarge = index === 0 || index === 4;
          const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';

          return (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className={`${colSpan} group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3] bg-stone-200`}
            >
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/30">
                    {dish.tag}
                  </span>
                  <span className="flex items-center gap-1 text-white text-xs font-semibold bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {dish.rating}
                  </span>
                </div>
                <div>
                  <h3 className={`font-serif text-white font-normal mb-2 ${isLarge ? 'text-3xl' : 'text-xl'}`}>{dish.name}</h3>
                  <p className="text-stone-300 text-xs line-clamp-2 font-light max-w-lg mb-2">{dish.description}</p>
                  <span className="inline-flex items-center gap-1 text-amber-300 text-xs uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
                    Explore Notes <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Minimal Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#fcf9f5] border border-amber-900/10 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedDish(null)} className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 text-stone-800 shadow-md">
              <X className="w-5 h-5" />
            </button>
            <div className="h-72">
              <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <span className="text-amber-800 text-[11px] uppercase font-bold tracking-widest block mb-2">{selectedDish.tag}</span>
              <h2 className="font-serif text-3xl text-stone-900 mb-4">{selectedDish.name}</h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">{selectedDish.description}</p>
              <button onClick={() => setSelectedDish(null)} className="w-full bg-amber-900 text-amber-50 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-semibold">
                Close Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Culinary;