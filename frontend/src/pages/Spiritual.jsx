import React, { useState } from "react";
import {
  MapPin,
  Compass,
  X,
  Maximize2,
  Tag,
  ArrowRight,
} from "lucide-react";

// Local image imports
import t40 from "../videos/t40.png";
import t41 from "../videos/t41.png";
import t42 from "../videos/t42.png";
import t43 from "../videos/t43.png";
import t44 from "../videos/t44.png";

const spiritual = [
  {
    id: 1,
    image: t40,
    place: "Kedarnath Temple",
    state: "Uttarakhand",
    travelType: "Himalayan Shrine / Pilgrimage",
    description:
      "Nestled amidst the high Garhwal Himalayas near the Mandakini River, this iconic ancient temple is dedicated to Lord Shiva. Surrounded by snow-capped peaks, it remains one of the most revered Char Dham sites in India.",
  },
  {
    id: 2,
    image: t41,
    place: "Sri Harmandir Sahib",
    state: "Amritsar, Punjab",
    travelType: "Spiritual Sanctuary / Cultural",
    description:
      "The holiest gurdwara of Sikhism, famed for its stunning gold-gilded architecture resting in the center of the sacred Amrit Sarovar tank. It welcomes visitors from all walks of life and serves thousands through its community kitchen.",
  },
  {
    id: 3,
    image: t42,
    place: "Lotus Temple",
    state: "New Delhi",
    travelType: "Architectural Marvel / Meditation",
    description:
      "A world-famous Bahá'í House of Worship shaped like a blooming lotus flower. Made of pure white marble petals, it welcomes people of all faiths and backgrounds to meditate and pray in silence.",
  },
  {
    id: 4,
    image: t44,
    place: "Global Vipassana Pagoda",
    state: "Mumbai, Maharashtra",
    travelType: "Meditation Dome / Buddhist Heritage",
    description:
      "A massive golden dome monument built as a tribute to Gautama Buddha. It contains the world's largest stone dome built without supporting pillars and hosts silent Vipassana meditation sessions.",
  },
  {
    id: 5,
    image: t43,
    place: "Meenakshi Amman Temple",
    state: "Madurai, Tamil Nadu",
    travelType: "Dravidian Heritage / Historical Architecture",
    description:
      "A legendary historic temple complex located on the southern bank of the Vaigai River. It is world-renowned for its 14 towering Gopurams covered in thousands of vibrant, hand-carved stone sculptures.",
  },
];

export default function SpiritualBentoGallery() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-20 bg-slate-50 text-slate-900 min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-4">
            <Compass size={15} className="text-amber-600" />
            Sacred Heritage
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Sacred Landmarks of India
          </h2>
          <p className="text-slate-600 mt-3 text-sm md:text-base leading-relaxed">
            Click on any photo below to expand the full image and read the complete travel details, location, and cultural history.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {spiritual.map((item, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-3xl overflow-hidden border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-2xl hover:border-amber-400 transition-all duration-500 hover:-translate-y-1.5 ${
                  isFeatured
                    ? "md:col-span-2 md:row-span-2 h-[420px] lg:h-[520px]"
                    : "h-[250px] lg:h-[250px]"
                }`}
              >
                {/* Full Card Image */}
                <img
                  src={item.image}
                  alt={item.place}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay for Readable Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Expand Icon Badge */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full border border-white/40 text-slate-800 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-md">
                  <Maximize2 size={16} />
                </div>

                {/* Mini Overlay Title */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase mb-1 tracking-wider">
                    <MapPin size={13} className="text-amber-400" />
                    <span>{item.state}</span>
                  </div>
                  <h3
                    className={`font-bold text-white group-hover:text-amber-200 transition-colors ${
                      isFeatured ? "text-2xl md:text-3xl" : "text-lg"
                    }`}
                  >
                    {item.place}
                  </h3>
                  <p className="text-slate-300 text-xs mt-1.5 flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:text-amber-300 transition-all">
                    <span>Click to view details</span>
                    <ArrowRight size={12} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Light Modal / Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedItem(null)}
          />

          {/* Modal Card */}
          <div className="relative z-10 bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 bg-slate-100/90 hover:bg-slate-900 hover:text-white text-slate-700 p-2.5 rounded-full border border-slate-300 transition-all shadow-md"
            >
              <X size={18} />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 h-72 md:h-auto relative bg-slate-100">
              <img
                src={selectedItem.image}
                alt={selectedItem.place}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-white">
              <div>
                {/* Travel Type Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-semibold text-xs uppercase tracking-wider mb-4">
                  <Tag size={13} className="text-amber-600" />
                  <span>{selectedItem.travelType}</span>
                </div>

                {/* Place Name */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                  {selectedItem.place}
                </h3>

                {/* State / Location */}
                <div className="flex items-center gap-1.5 text-amber-600 font-semibold text-sm mb-6">
                  <MapPin size={16} />
                  <span>{selectedItem.state}</span>
                </div>

                {/* Description */}
                <div className="border-t border-slate-100 pt-5">
                  <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    About this Destination
                  </h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Close Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-3 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}