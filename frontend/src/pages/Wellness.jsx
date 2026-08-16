import React, { useState } from "react";
import {
  MapPin,
  Sparkles,
  X,
  Maximize2,
  Tag,
  ArrowRight,
  HeartPulse,
} from "lucide-react";

// Local image imports
import t45 from "../videos/t45.png";
import t46 from "../videos/t46.png";
import t47 from "../videos/t47.png";
import t48 from "../videos/t48.png";
import t49 from '../videos/t49.png';

const Wellness = [
  {
    id: 1,
    image: t45,
    place: "Rishikesh Yoga & Meditation Sanctuary",
    state: "Uttarakhand",
    travelType: "Yoga & Spiritual Retreat",
    description:
      "Recognized as the Yoga Capital of the World, Rishikesh offers tranquil ashrams situated along the banks of the holy Ganges River. Visitors undergo holistic body detoxification, Vedic meditation, and traditional hatha yoga sessions under master gurus against the Himalayan foothills.",
  },
  {
    id: 2,
    image: t46,
    place: "Ayurvedic Healing Village of Somatheeram",
    state: "Kovalam, Kerala",
    travelType: "Traditional Ayurveda & Panchakarma",
    description:
      "Overlooking the Arabian Sea, Kerala’s premier beachside Ayurvedic resort provides tailored Panchakarma treatments, herbal steam baths, and organic vegetarian dining under certified Ayurvedic physicians.",
  },
  {
    id: 3,
    image: t47,
    place: "Ananda in the Himalayas",
    state: "Tehri Garhwal, Uttarakhand",
    travelType: "Luxury Wellness & Spa Sanctuary",
    description:
      "A world-renowned luxury wellness retreat set within a royal Maharaja's estate. It integrates classical Indian Ayurveda, Vedanta philosophy, and international wellness therapies designed for mental rejuvenate and stress relief.",
  },
  {
    id: 4,
    image: t48,
    place: "Vana Retreat & Forest Haven",
    state: "Dehradun, Uttarakhand",
    travelType: "Forest Bathing & Holistic Healing",
    description:
      "Nestled inside a lush Sal forest near the Shivalik foothills, Vana offers immersive wellness journeys combining Sowa Rigpa (Tibetan healing), sound therapy, hydrotherapy, and custom nutritional programs.",
  },
  {
  id: 5,
  image: t49,
  place: "Serenity Wellness Retreat",
  state: "Dehradun, Uttarakhand",
  travelType: "Acupuncture & Holistic Therapy",
  description:
    "Rejuvenate your mind and body with personalized acupuncture sessions, cupping therapy, and traditional healing treatments designed to relieve tension, enhance energy flow, and promote deep relaxation in a serene wellness environment.",
},

];

export default function WellnessDestination() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 font-semibold text-xs tracking-wider uppercase mb-4">
            <HeartPulse size={15} className="text-emerald-600" />
            Holistic Rejuvenation
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Wellness & Healing Retreats
          </h2>
          <p className="text-slate-600 mt-3 text-sm md:text-base leading-relaxed">
            Recharge your mind, body, and spirit across India’s premier Ayurvedic sanctuaries, forest healing retreats, and Himalayan yoga sanctuaries.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Wellness.map((item, idx) => {
            // First item gets a prominent featured slot
            const isFeatured = idx === 0;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-3xl overflow-hidden border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-2xl hover:border-emerald-400 transition-all duration-500 hover:-translate-y-1.5 ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 h-[380px] lg:h-[480px]"
                    : "h-[300px] lg:h-[480px]"
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
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full border border-white/40 text-slate-800 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md">
                  <Maximize2 size={16} />
                </div>

                {/* Overlay Details */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-10">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                    <MapPin size={13} className="text-emerald-400" />
                    <span>{item.state}</span>
                  </div>
                  <h3
                    className={`font-bold text-white group-hover:text-emerald-200 transition-colors ${
                      isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {item.place}
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:text-emerald-300 transition-all">
                    <span>Click to view treatment details</span>
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

          {/* Modal Content */}
          <div className="relative z-10 bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 bg-slate-100/90 hover:bg-slate-900 hover:text-white text-slate-700 p-2.5 rounded-full border border-slate-300 transition-all shadow-md"
            >
              <X size={18} />
            </button>

            {/* Image Preview */}
            <div className="md:w-1/2 h-72 md:h-auto relative bg-slate-100">
              <img
                src={selectedItem.image}
                alt={selectedItem.place}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Details Side */}
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-white">
              <div>
                
                {/* Travel Type Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs uppercase tracking-wider mb-4">
                  <Tag size={13} className="text-emerald-600" />
                  <span>{selectedItem.travelType}</span>
                </div>

                {/* Place Title */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                  {selectedItem.place}
                </h3>

                {/* State Location */}
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm mb-6">
                  <MapPin size={16} />
                  <span>{selectedItem.state}</span>
                </div>

                {/* Detailed Description */}
                <div className="border-t border-slate-100 pt-5">
                  <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    About this Retreat
                  </h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}