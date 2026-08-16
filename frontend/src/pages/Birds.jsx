import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaCalendar,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { birdsDestinations } from "../data/birdsDestinations";
import t14 from "../videos/t14.png";
import t15 from "../videos/t15.png";
import t16 from "../videos/t16.png";
import t17 from "../videos/t17.png";

const Birds = () => {
  const location = useLocation();
  const [dest, setDest] = useState(null);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      location.state?.selected?.some(
        (i) => i === "Bird Watching" || i === "Birds",
      )
    ) {
      setDest(birdsDestinations.india);
      setShow(true);
    }
  }, [location]);

  const d = birdsDestinations.india;

  // ===== DETAILS VIEW =====
  if (show && dest) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => {
              setShow(false);
              setDest(null);
            }}
            className="text-gray-400 hover:text-black text-sm tracking-widest flex items-center gap-2 mb-8"
          >
            <FaArrowLeft /> Back
          </button>

          {/* ===== PREMIUM SPLIT LAYOUT ===== */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={t14}
                alt="Birds of India"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 flex gap-2">
                <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-white text-xs font-semibold">
                  🦚 1300+ Species
                </span>
                <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-white text-xs font-semibold">
                  ⭐ 4.9 Rating
                </span>
              </div>
            </div>

            {/* Right Side - Description */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">
                  ✦ BIRD WATCHING ✦
                </span>
                <h1 className="text-5xl md:text-6xl font-light text-gray-900 tracking-tight">
                  Birds of <span className="text-green-600">India</span>
                </h1>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg font-light border-l-4 border-green-500 pl-6">
                {dest.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {dest.highlights.slice(0, 4).map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500 text-lg">✦</span> {h}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== REST OF THE CONTENT ===== */}
          <div className="grid lg:grid-cols-3 gap-12 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Best Time */}
              <div className="bg-green-50 rounded-3xl p-6 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-2xl font-light mb-3">Best Time</h2>
                  <p className="text-gray-600 text-sm">
                    Peak season:{" "}
                    <span className="font-semibold text-green-600">
                      Nov–Mar
                    </span>
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {Object.entries(dest.weather).map(([s, t]) => (
                      <div
                        key={s}
                        className="bg-white rounded-xl p-2 text-center shadow-sm"
                      >
                        <p className="text-xl">
                          {s === "summer"
                            ? "☀️"
                            : s === "monsoon"
                              ? "🌧️"
                              : "❄️"}
                        </p>
                        <p className="text-[10px] font-semibold capitalize">
                          {s}
                        </p>
                        <p className="text-[10px] text-gray-500">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <img
                  src={t16}
                  alt="Best Time"
                  className="w-full h-auto max-h-64 object-contain hover:scale-105 transition duration-500"
                />
              </div>

              {/* traditional */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 space-y-24">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-pink-300 shadow-xl bg-white flex items-center justify-center">
                      <img src={t15} className="max-w-full max-h-full object-contain" alt="" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-4xl font-bold mb-5">
                      Traditional Celebration
                    </h3>
                    <p className="text-lg text-gray-600 leading-8">
                      A beautiful beginning filled with colorful traditions, joy, and heartfelt emotions. Every celebration tells a
                      story of culture, togetherness, and unforgettable memories that last a lifetime.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row items-center gap-12">
                  <div className="md:w-2/3 text-left md:text-right">
                    <h3 className="text-4xl font-bold mb-5">
                      Forever Memories
                    </h3>
                    <p className="text-lg text-gray-600 leading-8">
                      A precious memory that captures togetherness, happiness, and everlasting love. Every smile and every moment become
                      a cherished part of life's beautiful journey.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-pink-300 shadow-xl bg-white flex items-center justify-center">
                      <img src={t17} className="max-w-full max-h-full object-contain" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Quick Details</h3>
                {[
                  ["Entry Fee", dest.entryFee],
                  ["Timings", dest.timings],
                  ["Best Time", dest.bestTimeToVisit],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="flex justify-between py-2 border-b border-green-100 last:border-0 text-sm"
                  >
                    <span className="text-gray-500">{l}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-black text-white rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Getting There</h3>
                {Object.entries(dest.howToReach).map(([k, v]) => (
                  <div key={k} className="text-sm py-1">
                    {k === "byAir" ? "✈️" : k === "byTrain" ? "🚂" : "🚗"} {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== GRID VIEW =====
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">
            Birds of <span className="text-green-600">India</span>
          </h1>
          <p className="text-gray-500">
            Discover India's incredible avian diversity
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search birds or sanctuaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-green-400 outline-none"
            />
          </div>
        </div>

        <div
          onClick={() => {
            setDest(d);
            setShow(true);
            window.scrollTo(0, 0);
          }}
          className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition cursor-pointer overflow-hidden group max-w-sm"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={t14}
              className="w-full h-full object-cover group-hover:scale-110 transition"
            />
            <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
          <div className="p-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold group-hover:text-green-600 transition">
                {d.name}
              </h3>
              <span className="flex items-center gap-1 text-sm">
                <FaStar className="text-yellow-400" /> {d.rating}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaMapMarkerAlt className="text-green-400" /> {d.state}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2 my-2">
              {d.description?.substring(0, 100)}...
            </p>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                {d.type}
              </span>
              <span className="text-xs text-gray-400">{d.bestTimeToVisit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Birds;
