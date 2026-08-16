import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Compass, Info, X } from 'lucide-react';

// Relative path imports for craft preview images
import matryoshkaImg from '../videos/t63.png';
import masksImg from '../videos/t64.png';
import claySculptureImg from '../videos/t65.png';
import miniaturePaintingImg from '../videos/t66.png';
import handloomImg from '../videos/t67.png';
import embroideryImg from '../videos/t68.png';
import wovenBasketsImg from '../videos/t69.png';
import potteryWheelImg from '../videos/t70.png';
import clogsImg from '../videos/t71.png';
import banglesImg from '../videos/t72.png';

const CULTURAL_ITEMS = [
  {
    id: 1,
    title: "Clay Idol & Sacred Sculpture",
    subtitle: "Ganges riverbank silt craftsmanship",
    location: "Kumartuli, Kolkata",
    category: "Clay & Pottery",
    img: claySculptureImg,
    desc: "A centuries-old sacred technique where riverbank silt from the Ganges is molded over hand-woven bamboo frames to create divine Durga Puja idols and traditional sculptures.",
    tip: "Visit between August and October to witness master artisans actively sculpting and painting for the Durga Puja festival."
  },
  {
    id: 2,
    title: "Miniature Fine Art Painting",
    subtitle: "Mineral stone pigments & single-hair brushes",
    location: "Udaipur & Kangra",
    category: "Visual Heritage",
    img: miniaturePaintingImg,
    desc: "Intricate fine-line paintings executed with natural mineral colors ground from precious lapis, gold, and ruby, applied with single-hair squirrel brushes.",
    tip: "Look for certified hand-painted pieces on handmade paper or real silk rather than mass-printed replicas."
  },
  {
    id: 3,
    title: "Handloom & Metallic Zari Weaving",
    subtitle: "Manual shuttle silk legacy",
    location: "Varanasi & Kanchipuram",
    category: "Textiles",
    img: handloomImg,
    desc: "An ancient legacy of manual shuttle weaving producing exquisite silk and fine cotton, intricately woven with pure metallic gold and silver threads.",
    tip: "Purchase directly from weaver cooperatives to support traditional artisan families directly."
  },
  {
    id: 4,
    title: "Hand-Painted Lac Bangles",
    subtitle: "Resin set with crystals & mirrors",
    location: "Jaipur & Hyderabad",
    category: "Adornments",
    img: banglesImg,
    desc: "Vibrant traditional bangles handcrafted from natural lac resin, embellished with glass crystals, tiny mirrors, and delicate decorative brushwork.",
    tip: "Local artisans can gently heat lac bangles over an open flame to custom-fit them to your exact wrist size on the spot."
  },
  {
    id: 5,
    title: "Terracotta & Wheel-Thrown Earthenware",
    subtitle: "Rustic pottery & burnished black art",
    location: "Bankura & Nizamabad",
    category: "Clay & Pottery",
    img: potteryWheelImg,
    desc: "Wheel-thrown earthenware spanning humble daily teacups to majestic Bankura terracotta horses and rare dark-burnished black pottery.",
    tip: "Experience drinking fresh Masala Chai from a traditional clay Kulhad at roadside tea stalls for an authentic taste."
  },
  {
    id: 6,
    title: "Kutch Hand Embroidery & Mirror Work",
    subtitle: "Vibrant geometric stitch patterns",
    location: "Kutch, Gujarat",
    category: "Textiles",
    img: embroideryImg,
    desc: "Traditional thread work featuring vibrant geometric patterns, silk stitches, and reflective mirror work passed down through generations of rural women weavers.",
    tip: "Check for distinct community-specific stitch patterns such as Mutwa, Rabari, and Suf styles."
  },
  {
    id: 7,
    title: "Woven Bamboo & Natural Fiber Craft",
    subtitle: "Eco-friendly natural cane weaving",
    location: "Assam & Northeast Region",
    category: "Handicrafts",
    img: wovenBasketsImg,
    desc: "Handcrafted baskets, ambient lamps, and daily utility items woven skillfully using treated indigenous bamboo and natural cane fibers.",
    tip: "Bamboo crafts are lightweight, sustainable, and naturally resistant to humidity when treated properly."
  },
  {
    id: 8,
    title: "Wooden Masks & Festive Carvings",
    subtitle: "Expressive tribal ritual art",
    location: "Purulia & Cherial",
    category: "Visual Heritage",
    img: masksImg,
    desc: "Lightwood and papier-mâché dramatic masks sculpted and painted vividly for folk dances like Chau and sacred storytelling performances.",
    tip: "Artisans use natural vegetable dyes and clay pastes to prime these traditional dance masks."
  },
  {
    id: 9,
    title: "Traditional Wooden Footwear & Clogs",
    subtitle: "Khadau carving heritage",
    location: "Varanasi & Ayodhya",
    category: "Handicrafts",
    img: clogsImg,
    desc: "Hand-carved wooden clogs historically worn by saints and scholars, decorated with brass inlay, mother-of-pearl, and floral etchings.",
    tip: "Look for polished teaku wood clogs crafted using single-block non-jointed construction."
  },
  {
    id: 10,
    title: "Handmade Wooden Nesting Figurines",
    subtitle: "Vibrant turned-wood lacquerware",
    location: "Channapatna & Kondapalli",
    category: "Adornments",
    img: matryoshkaImg,
    desc: "Eco-friendly turned wood toys and nesting dolls coated with non-toxic organic lacquer and natural turmeric or indigo vegetable dyes.",
    tip: "Authentic Channapatna crafts use soft Wrightia tinctoria wood, making them completely child-safe."
  }
];

export default function CulturalGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCraft, setSelectedCraft] = useState(null);

  const categories = ['All', 'Clay & Pottery', 'Visual Heritage', 'Textiles', 'Adornments', 'Handicrafts'];

  const filteredItems = CULTURAL_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans pt-6 pb-24 antialiased selection:bg-amber-100">
      
      {/* Editorial Content Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Page Main Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-slate-200/80 pb-8">
          <div>
            <span className="text-amber-800 font-mono text-xs uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-700" /> Cultural Heritage Archives
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 tracking-tight">
              Master Crafts <span className="italic text-amber-800 font-light">& Traditions</span>
            </h1>
          </div>

          {/* Minimalist Search Bar */}
          <div className="w-full md:w-80 space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search art form or region..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-sm transition"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-12 border-b border-slate-200/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-amber-400 shadow-md font-semibold' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EDITORIAL FLOATING STACK LIST FOR ALL ITEMS */}
        <div className="space-y-12">
          {filteredItems.map((item, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedCraft(item)}
                className={`group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden ${
                  isReverse ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Subtle Background Accent Number */}
                <span className="absolute -top-6 -right-2 text-8xl font-serif font-bold text-slate-100/70 select-none pointer-events-none group-hover:text-amber-100/70 transition duration-500">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>

                {/* Floating Image Container */}
                <div className="w-full md:w-5/12 aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition duration-500">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                  />
                  
                  {/* Category Floating Tag */}
                  <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/10">
                    {item.category}
                  </span>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-slate-900 px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                      <Info className="w-3.5 h-3.5 text-amber-800" /> View Craft Story
                    </span>
                  </div>
                </div>

                {/* Editorial Details Side */}
                <div className="w-full md:w-7/12 space-y-4 z-10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                    <MapPin className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight group-hover:text-amber-800 transition duration-300">
                    {item.title}
                  </h3>

                  <p className="text-md md:text-md text-slate-600 font-normal leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Traveler Insight Strip */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-s text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <p className="italic">
                      <strong className="not-italic font-bold text-amber-800">Insight: </strong>
                      {item.tip}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-s font-bold text-slate-900 group-hover:text-amber-800 transition">
                    <span>Explore full heritage overview</span>
                    <span className="group-hover:translate-x-1.5 transition duration-300">→</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-light text-sm bg-white rounded-3xl border border-slate-200">
              No art forms match your search query or selected filter.
            </div>
          )}
        </div>

      </section>

      {/* CRAFT DETAIL MODAL */}
      {selectedCraft && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCraft(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCraft(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-72 relative">
              <img src={selectedCraft.img} alt={selectedCraft.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">{selectedCraft.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">{selectedCraft.title}</h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> {selectedCraft.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h4 className="text-s font-bold uppercase text-slate-400 tracking-wider">Heritage Overview</h4>
                <p className="text-md text-slate-700 mt-1.5 leading-relaxed font-normal">{selectedCraft.desc}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900">
                <span className="text-xs font-bold uppercase tracking-wider block text-amber-800">💡 Traveler Insight</span>
                <p className="text-s mt-1 italic leading-relaxed">{selectedCraft.tip}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}