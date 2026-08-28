// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import axios from "axios";
import { ChevronDown, X } from "lucide-react";
import { Helmet } from "react-helmet";
import Map from "../components/Map";
import api from "../services/api";

// Import images
import t1 from "../videos/t1.png";
import t2 from "../videos/t2.png";
import t3 from "../videos/t3.png";
import t4 from "../videos/t4.png";
import t5 from "../videos/t5.png";
import t6 from "../videos/t6.png";
import t7 from "../videos/t7.png";
import t8 from "../videos/t8.png";
import t9 from "../videos/t9.png";
import t104 from "../videos/t104.png";
import claySculptureImg from "../videos/t65.png";
import handloomImg from "../videos/t67.png";

const Home = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const [selected, setSelected] = useState([]);

  // Slides data
  const slides = [
    {
      id: 1,
      image: t1,
      badge: "🏰 Rajasthan Heritage",
      title: "Experience the Royal Charm of Jaipur",
      subtitle:
        "Discover magnificent palaces, colorful streets, camel rides, and the timeless beauty of Hawa Mahal.",
    },
    {
      id: 2,
      image: t2,
      badge: "🎭 Cultural Festivals",
      title: "Celebrate India's Vibrant Traditions",
      subtitle:
        "Witness spectacular festivals, traditional dances, folk music, and centuries-old cultural celebrations.",
    },
    {
      id: 3,
      image: t3,
      badge: "🌊 Coastal Escapes",
      title: "Relax Along India's Beautiful Coastline",
      subtitle:
        "Enjoy golden beaches, crystal-clear waters, breathtaking sunsets, and unforgettable seaside adventures.",
    },
    {
      id: 4,
      image: t4,
      badge: "🚤 Kerala Backwaters",
      title: "Cruise Through God's Own Country",
      subtitle:
        "Experience peaceful houseboats, lush coconut groves, serene waterways, and the natural beauty of Kerala.",
    },
    {
      id: 5,
      image: t5,
      badge: "🪔 Spiritual India",
      title: "Witness the Divine Ganga Aarti",
      subtitle:
        "Feel the spiritual energy of sacred rivers, ancient temples, glowing lamps, and mesmerizing evening rituals.",
    },
  ];

  // State page mapping
  const statePageMap = {
    "Himachal Pradesh": "/HimachalPradesh",
    Ladakh: "/Ladakh",
    "Tamil Nadu": "/TamilNadu",
    Telangana: "/Telangana",
    "West Bengal": "/WestBengal",
    Odisha: "/Odisha",
    "Madhya Pradesh": "/MadhyaPradesh",
    Maharashtra: "/Maharashtra",
    Gujarat: "/Gujarat",
    Kashmir: "/Kashmir",
    Meghalaya: "/Meghalaya",
  };

  // Experience page mapping
  const experiencePageMap = {
    "Wildlife Safari": "/wildlife",
    "Bird Watching": "/birds",
    "Eco Tourism": "/EcoTourismPage",
    "Museums & Art & Craft": "/ArtGallery",
    "Water & Mountain": "/WaterMountainSection",
    Spiritual: "/Spiritual",
    Wellness: "/Wellness",
    "Luxury Travel": "/LuxuryTravel",
    Culinary: "/Culinary",
  };

  // Interests
  const interests = [
    {
      title: "🌿 Nature & Wildlife",
      items: [
        { name: "Wildlife Safari", page: "/wildlife" },
        { name: "Bird Watching", page: "/birds" },
      ],
    },
    {
      title: "🏛️ Heritage & Culture",
      items: [
        { name: "Eco Tourism", page: "/EcoTourismPage" },
        { name: "Museums & Art & Craft", page: "/ArtGallery" },
      ],
    },
    {
      title: "⛰️ Adventure & Thrill",
      items: [{ name: "Water & Mountain", page: "/WaterMountainSection" }],
    },
    {
      title: "🕉️ Spiritual & Wellness",
      items: [
        { name: "Spiritual", page: "/Spiritual" },
        { name: "Wellness", page: "/Wellness" },
      ],
    },
    {
      title: "🏖️ Beach & Leisure",
      items: [{ name: "Luxury Travel", page: "/LuxuryTravel" }],
    },
    {
      title: "🍛 Food & Festivals",
      items: [{ name: "Culinary", page: "/Culinary" }],
    },
  ];

  // Regions
  const regions = [
    {
      title: "North India",
      icon: "🏔️",
      states: ["Himachal Pradesh", "Ladakh", "Kashmir"],
    },
    {
      title: "South India",
      icon: "🌴",
      states: ["Tamil Nadu", "Telangana"],
    },
    {
      title: "East India",
      icon: "🌅",
      states: ["West Bengal", "Odisha"],
    },
    {
      title: "West India",
      icon: "🏜️",
      states: ["Maharashtra", "Gujarat"],
    },
    {
      title: "Central India",
      icon: "🌳",
      states: ["Madhya Pradesh"],
    },
    {
      title: "North East",
      icon: "🌄",
      states: ["Meghalaya"],
    },
  ];

  // Fetch data
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const [statesRes, expRes] = await Promise.all([
  //       api.get("/states"),
  //       api.get("/experiences"),
  //     ]);

  //     setStates(statesRes.data?.states || statesRes.data?.data || []);

  //     setExperiences(expRes.data?.experiences || expRes.data?.data || []);

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
  setLoading(true);

  // Fetch states independently
  try {
    const statesRes = await api.get("/states");

    console.log("✅ STATES API:", statesRes.status, statesRes.data);

    const statesData =
      statesRes.data?.states ||
      statesRes.data?.data ||
      (Array.isArray(statesRes.data) ? statesRes.data : []);

    setStates(Array.isArray(statesData) ? statesData : []);
  } catch (error) {
    console.error(
      "❌ STATES API ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );

    setStates([]);
  }

  // Fetch experiences independently
  try {
    const expRes = await api.get("/experiences");

    console.log("✅ EXPERIENCES API:", expRes.status, expRes.data);

    const experiencesData =
      expRes.data?.experiences ||
      expRes.data?.data ||
      (Array.isArray(expRes.data) ? expRes.data : []);

    console.log("📍 FINAL EXPERIENCES:", experiencesData);

    setExperiences(
      Array.isArray(experiencesData) ? experiencesData : []
    );
  } catch (error) {
    console.error(
      "❌ EXPERIENCES API ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );

    setExperiences([]);
  }

  setLoading(false);
};
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleSelection = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <>
      <Helmet>
        <title>TravelBharat - Explore India State by State</title>
        <meta
          name="description"
          content="Discover tourist destinations across India. Explore states, heritage sites, and travel insights."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="animate-fade-in">
        {/* ===== HERO SLIDER ===== */}
        <section
          className="relative w-full bg-black"
          style={{ height: "80vh" }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="max-w-xl lg:max-w-2xl">
                        <span className="inline-block bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                          {slide.badge}
                        </span>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold font-baloo text-white leading-tight mb-5">
                          {slide.title}
                        </h3>
                        <p className="text-lg md:text-xl text-white/90 font-baloo leading-9 mb-10">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            to="/states"
                            className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition"
                          >
                            Explore Now <FaArrowRight className="ml-2" />
                          </Link>
                          <Link
                            to="/experience"
                            className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition"
                          >
                            View Experiences
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition border border-white/20"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition border border-white/20"
          >
            <FaChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-10 h-2.5 rounded-full"
                    : "bg-white/50 hover:bg-white/80 w-2.5 h-2.5 rounded-full"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ===== STATES FEATURED SECTION ===== */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2 relative overflow-hidden h-[340px] group cursor-pointer">
                <img
                  src={t6}
                  alt="Kerala Backwaters"
                  className="absolute inset-0 w-full h-full object-cover duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-8 text-white max-w-lg">
                  <p className="uppercase tracking-[6px] text-sm font-semibold mb-4">
                    EXPLORE KERALA
                  </p>
                  <h4 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                    Discover the Majestic <br />
                    Jatayu Earth's Center
                  </h4>
                  <p className="text-base text-gray-200 leading-7">
                    Perched atop a rocky hill in Kollam, this iconic destination
                    features the world's largest bird sculpture, scenic cable
                    car rides, adventure parks, and spectacular views.
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 bg-white">
                <img
                  src={t7}
                  alt="Heritage"
                  className="w-full h-44 object-cover"
                />
                <div className="p-7">
                  <p className="uppercase tracking-[5px] text-gray-500 text-sm mb-4">
                    HERITAGE
                  </p>
                  <h3 className="text-2xl leading-snug mb-5">
                    Walk Through India's Historic Temple Legacy
                  </h3>
                  <Link
                    to="/TamilNadu"
                    className="uppercase tracking-[4px] text-sm font-semibold hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  image: t8,
                  place: "Kashmir",
                  title: "Experience the Peaceful Meadows of Kashmir",
                  link: "/Kashmir",
                },
                {
                  image: t9,
                  place: "Port Blair, Andaman and Nicobar",
                  title: "Experience the Crystal-Clear Waters of Port Blair",
                  link: "/Telangana",
                },
                {
                  image: t104,
                  place: "Sanchi Stupa",
                  title: "A timeless symbol of India's Buddhist heritage.",
                  link: "/MadhyaPradesh",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 bg-white group cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.place}
                      className="h-44 w-full object-cover duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="uppercase tracking-[5px] text-gray-500 text-sm mb-4">
                      {item.place}
                    </p>
                    <h4 className="text-2xl leading-snug mb-6">{item.title}</h4>
                    {item.link ? (
                      <Link
                        to={item.link}
                        className="uppercase tracking-[4px] text-sm font-semibold hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                      >
                        Read →
                      </Link>
                    ) : (
                      <span className="uppercase tracking-[4px] text-sm font-semibold text-gray-400 cursor-not-allowed">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TRAVEL DIARIES WITH TWO BUTTONS ===== */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-2.5 rounded-full shadow-lg shadow-red-200 mb-6">
                <span className="text-2xl animate-pulse">🔥</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                  Travel Diaries
                </span>
                <span className="text-2xl animate-pulse">🔥</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Discover Your{" "}
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Next Adventure
                </span>
              </h2>
              <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                Curated experiences for every passion and destination
              </p>
            </div>

            {/* Interests & Regions Buttons */}
            <div className="relative flex flex-wrap justify-center gap-4 md:gap-6">
              {/* Interests Button */}
              <div className="relative">
                <button
                  onClick={() => toggleTab("interests")}
                  className={`group flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 ${
                    activeTab === "interests"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-xl shadow-red-200 scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <span className="text-2xl">🎯</span> Interests
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      activeTab === "interests" ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                {activeTab === "interests" && (
                  <div className="absolute left-1/2 -translate-x-1/2 z-50 mt-4 w-[95vw] max-w-5xl rounded-3xl border border-gray-100 bg-white/95 backdrop-blur-xl p-8 shadow-2xl animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">
                        <span className="text-red-500">✦</span> Choose Your
                        Interests
                      </h3>
                      <button
                        onClick={() => setActiveTab(null)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {interests.map((section) => (
                        <div key={section.title} className="space-y-4">
                          <h4 className="text-lg font-bold text-sky-600 border-b-2 border-sky-100 pb-2">
                            {section.title}
                          </h4>
                          <div className="space-y-2">
                            {section.items.map((item) => (
                              <label
                                key={item.name}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                  selected.includes(item.name)
                                    ? "bg-red-50 border-2 border-red-400 shadow-md"
                                    : "hover:bg-gray-50 border-2 border-transparent"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected.includes(item.name)}
                                  onChange={() => handleSelection(item.name)}
                                  className="h-5 w-5 accent-red-500 cursor-pointer"
                                />
                                <span className="font-medium text-gray-700">
                                  {item.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Regions Button */}
              <div className="relative">
                <button
                  onClick={() => toggleTab("regions")}
                  className={`group flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 ${
                    activeTab === "regions"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-xl shadow-red-200 scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <span className="text-2xl">🗺️</span> Regions
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      activeTab === "regions" ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                {activeTab === "regions" && (
                  <div className="absolute left-1/2 -translate-x-1/2 z-50 mt-4 w-[95vw] max-w-5xl rounded-3xl border border-gray-100 bg-white/95 backdrop-blur-xl p-8 shadow-2xl animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">
                        <span className="text-red-500">✦</span> Explore by
                        Region
                      </h3>
                      <button
                        onClick={() => setActiveTab(null)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {regions.map((region) => (
                        <div
                          key={region.title}
                          className="rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-red-200 group"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                              {region.icon}
                            </span>
                            <h4 className="text-xl font-bold text-sky-600">
                              {region.title}
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {region.states.map((state) => (
                              <label
                                key={state}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                                  selected.includes(state)
                                    ? "bg-red-50 border-l-4 border-red-500"
                                    : "hover:bg-gray-50 border-l-4 border-transparent"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected.includes(state)}
                                  onChange={() => handleSelection(state)}
                                  className="h-4 w-4 accent-red-500 cursor-pointer"
                                />
                                <span className="text-gray-700">{state}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Tags */}
            {selected.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {selected.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {item}
                    <X
                      size={16}
                      className="cursor-pointer text-red-400 hover:text-red-600 transition-colors ml-1"
                      onClick={() =>
                        setSelected(selected.filter((i) => i !== item))
                      }
                    />
                  </div>
                ))}
                <button
                  onClick={() => setSelected([])}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors underline-offset-2 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* ===== TWO BUTTONS ===== */}
            <div className="mt-14 flex flex-wrap justify-center gap-6">
              {/* BUTTON 1: Discover Experiences (RED) */}
              <button
                onClick={() => {
                  if (selected.length > 0) {
                    const experienceItem = selected.find(
                      (item) => experiencePageMap[item],
                    );
                    if (experienceItem) {
                      navigate(experiencePageMap[experienceItem]);
                      return;
                    }
                  }
                  navigate("/experience");
                }}
                className="group relative inline-flex items-center gap-4 px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-red-200/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-slate-400 via-red-500 to-red-800 group-hover:scale-105 transition-transform duration-300"></span>
                <span className="relative flex items-center gap-4">
                  <span className="text-2xl">🚀</span> Discover Experiences
                  <span className="relative inline-block">
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></span>
                  </span>
                </span>
              </button>

              {/* BUTTON 2: Explore States (BLUE) */}
              <button
                onClick={() => {
                  if (selected.length > 0) {
                    const stateItem = selected.find(
                      (item) => statePageMap[item],
                    );
                    if (stateItem) {
                      navigate(statePageMap[stateItem]);
                      return;
                    }
                  }
                  navigate("/states");
                }}
                className="group relative inline-flex items-center gap-4 px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-blue-200/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-slate-400 via-blue-500 to-blue-800 group-hover:scale-105 transition-transform duration-300"></span>
                <span className="relative flex items-center gap-4">
                  <span className="text-2xl">🧭</span> Explore States
                  <span className="relative inline-block">
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ===== MAP SECTION ===== */}
        <section className="relative min-h-[450px] flex items-center py-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="text-white space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium tracking-wider">
                      Interactive Map
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    Explore{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                      Experiences
                    </span>{" "}
                    Across India
                  </h2>

                  <p className="text-sm text-white/70 max-w-lg">
                    Discover hidden gems with our interactive map experience
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/states"
                      className="px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex items-center gap-1.5"
                    >
                      🗺️ Explore Map
                    </Link>
                    <Link
                      to="/experience"
                      className="px-5 py-2 border border-white/30 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition flex items-center gap-1.5"
                    >
                      📍 View All Experiences
                    </Link>
                  </div>

                  <div className="flex gap-6 sm:gap-8">
                    {[
                      {
                        value: experiences?.length || 0,
                        label: "Experiences",
                      },
                      { value: states?.length || 0, label: "States" },
                      { value: "4.5+", label: "Avg Rating" },
                    ].map((stat, index) => (
                      <div key={index}>
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {loading ? "..." : stat.value}
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4 lg:mt-0">
                  <div className="relative rounded-xl overflow-hidden shadow-xl border border-white/20 bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 pointer-events-none"></div>

                    {experiences && experiences.length > 0 ? (
                      <div className="p-3 max-h-[320px] overflow-y-auto scrollbar-thin">
                        <Map
                          experiences={experiences.slice(0, 8)}
                          title="🌍 Explore Experiences"
                        />
                      </div>
                    ) : loading ? (
                      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 text-center">
                        <div className="animate-pulse">
                          <div className="w-12 h-12 bg-orange-500/20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                            🗺️
                          </div>
                          <p className="text-white/60 text-sm font-medium">
                            Loading experiences...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 text-center">
                        <div className="text-4xl mb-3">📍</div>
                        <p className="text-white/60 text-sm font-medium">
                          No experiences available
                        </p>
                        <Link
                          to="/experience"
                          className="mt-3 inline-block text-orange-400 text-sm hover:text-orange-300 transition"
                        >
                          Browse Experiences →
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/admin"
                    className="absolute -bottom-3 -right-3 bg-white rounded-xl shadow-lg p-2.5 flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer group z-10 animate-float-ultimate"
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-lg group-hover:bg-orange-200 transition flex-shrink-0">
                      🏆
                    </div>
                    <div className="pr-1">
                      <p className="text-xs font-bold text-gray-800 group-hover:text-orange-600 transition">
                        🔥 Popular
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CULTURAL HERITAGE ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-light text-gray-900">
                Heritage <span className="italic text-amber-700">Crafts</span>
              </h2>
              <p className="text-gray-400 text-sm font-light">
                Ancient traditions preserved through generations
              </p>
            </div>

            <div className="space-y-6">
              <div
                onClick={() => navigate("/cultural")}
                className="group flex flex-col md:flex-row bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="md:w-2/5 h-56 overflow-hidden">
                  <img
                    src={claySculptureImg}
                    alt="Clay Idol"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-center">
                  <p className="text-xs text-amber-600 font-medium">
                    Kumartuli, Kolkata
                  </p>
                  <h3 className="text-xl font-serif font-light text-gray-900 mt-1">
                    Clay Idol & Sacred Sculpture
                  </h3>
                  <p className="text-sm text-gray-500 font-light mt-2">
                    Ganges riverbank silt molded into divine Durga Puja idols.
                  </p>
                  <span className="mt-4 text-amber-700 text-sm font-medium group-hover:ml-2 transition">
                    Explore →
                  </span>
                </div>
              </div>

              <div
                onClick={() => navigate("/cultural")}
                className="group flex flex-col md:flex-row md:flex-row-reverse bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="md:w-2/5 h-56 overflow-hidden">
                  <img
                    src={handloomImg}
                    alt="Handloom Weaving"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-center">
                  <p className="text-xs text-amber-600 font-medium">
                    Varanasi & Kanchipuram
                  </p>
                  <h3 className="text-xl font-serif font-light text-gray-900 mt-1">
                    Handloom & Zari Weaving
                  </h3>
                  <p className="text-sm text-gray-500 font-light mt-2">
                    Exquisite silk woven with pure metallic gold threads.
                  </p>
                  <span className="mt-4 text-amber-700 text-sm font-medium group-hover:ml-2 transition">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TRAVEL BOOKING ===== */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Plan Your <span className="text-blue-600">Journey</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Book flights, trains, buses & more
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden border border-gray-100">
              <div className="flex flex-wrap gap-1 px-6 pt-4 border-b border-gray-100">
                {[
                  { name: "Flights", icon: "✈️", route: "/flights" },
                  { name: "Trains", icon: "🚂", route: "/trains" },
                  { name: "Buses", icon: "🚌", route: "/buses" },
                  { name: "Cabs", icon: "🚕", route: "/cabs" },
                  {
                    name: "Accommodations",
                    icon: "🏨",
                    route: "/accommodations",
                  },
                  { name: "Tour Packages", icon: "🧳", route: "/tourpackages" },
                ].map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => navigate(tab.route)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-300 ${
                      tab.name === "Flights"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {tab.icon} {tab.name}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  {["One Way", "Round Trip"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="trip"
                        defaultChecked={type === "One Way"}
                        className="w-4 h-4 text-blue-600"
                      />
                      {type}
                    </label>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      From
                    </label>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                      defaultValue="New Delhi (DEL)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      To
                    </label>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                      defaultValue="Mumbai (BOM)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Depart
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                      defaultValue="2026-08-01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Return
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
                      defaultValue="2026-08-15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Travelers
                    </label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white">
                      <option>1 Traveler</option>
                      <option>2 Travelers</option>
                      <option>3 Travelers</option>
                      <option>4 Travelers</option>
                      <option>5+ Travelers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Cabin
                    </label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white">
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-6 pt-2 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">
                    Fare Type:
                  </span>
                  {[
                    "Regular Fares",
                    "Armed Forces Fares",
                    "Student Fares",
                    "Senior Citizen Fares",
                    "Doctors & Nurses Fares",
                  ].map((fare) => (
                    <button
                      key={fare}
                      className="fare-btn text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      {fare}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/flights")}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-xl"
                >
                  ✈️ Search Flights
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
