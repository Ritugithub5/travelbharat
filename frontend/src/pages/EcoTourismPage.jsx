import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import {
  FaLeaf,
  FaMountain,
  FaTree,
  FaCampground,
  FaHiking,
  FaMapMarkedAlt,
} from "react-icons/fa";

// ===== ALL 7 IMAGES =====
import t18 from "../videos/t18.png";
import t19 from "../videos/t19.png";
import t20 from "../videos/t20.png";
import t21 from "../videos/t21.png";
import t22 from "../videos/t22.png";
import t23 from "../videos/t23.png";
import t24 from "../videos/t24.png";

const places = [
  {
    title: "Kanthalloor",
    subtitle: "Kashmir of Kerala",
    location: "Kerala",
    image: t21,
  },
  {
    title: "Snow Camp",
    subtitle: "Himachal Pradesh",
    location: "India",
    image: t18,
  },
  {
    title: "Forest Trail",
    subtitle: "Nature Walk",
    location: "Uttarakhand",
    image: t20,
  },
  {
    title: "Tea Garden",
    subtitle: "Munnar",
    location: "Kerala",
    image: t22,
  },
  {
    title: "Qutub Minar",
    subtitle: "UNESCO World Heritage Site",
    location: "New Delhi, Delhi",
    image: t19,
  },
  {
    title: "Murudeshwar",
    subtitle: "Home to the World's Second Tallest Shiva Statue",
    location: "Karnataka",
    image: t23,
  },
  {
    title: "Mumbai Heritage",
    subtitle: "The City of Dreams",
    location: "Mumbai, Maharashtra",
    image: t24, // ← Fixed: t24 is now used
  },
];

export default function EcoTourism() {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src={t24}
                alt="Mumbai Heritage"
                className="rounded-2xl h-[450px] w-full object-cover shadow-lg"
              />
            </div>
            <div>
              <span className="inline-block bg-amber-100 text-amber-600 px-4 py-1 rounded-full text-sm font-medium">
                Mumbai Heritage
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight">
                Experience Mumbai
              </h2>
              <p className="mt-4 text-gray-600 text-base leading-7">
                Explore India's financial capital with iconic landmarks, rich
                history, delicious street food, and vibrant culture.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="text-2xl">🏛️</div>
                  <h4 className="font-semibold mt-2 text-base">Heritage</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Historic landmarks.
                  </p>
                </div>
                <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="text-2xl">📸</div>
                  <h4 className="font-semibold mt-2 text-base">Photography</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Scenic city views.
                  </p>
                </div>
                <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="text-2xl">🍛</div>
                  <h4 className="font-semibold mt-2 text-base">Street Food</h4>
                  <p className="text-sm text-gray-500 mt-1">Local flavors.</p>
                </div>
                <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="text-2xl">🚶</div>
                  <h4 className="font-semibold mt-2 text-base">Walking Tours</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Guided exploration.
                  </p>
                </div>
              </div>
              <button className="mt-8 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-sm font-medium transition">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SWIPER SLIDER SECTION ===== */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore India
            </h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">
              Discover India's breathtaking destinations.
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              stretch: -20,
              depth: 140,
              modifier: 1.6,
              scale: 0.9,
              slideShadows: false,
            }}
            className="pb-12"
          >
            {places.map((item, i) => (
              <SwiperSlide
                key={i}
                className="!w-[290px] sm:!w-[360px] md:!w-[460px] lg:!w-[540px]"
              >
                <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  <div className="absolute left-6 bottom-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-orange-400">
                      {item.title}
                    </h2>
                    <p className="text-white text-base md:text-lg mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="absolute right-6 bottom-6">
                    <div className="bg-white/20 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
                      <p className="text-white text-sm font-medium">
                        📍 {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}