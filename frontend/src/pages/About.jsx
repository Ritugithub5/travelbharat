import React from "react";

import t114 from "../videos/t114.png";
import t115 from "../videos/t115.png";
import t116 from "../videos/t116.png";

const About = () => {
  return (
    <div className="bg-[#f6f3ee] text-[#3e2723] overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="grid lg:grid-cols-2 min-h-[520px] lg:min-h-[580px]">
        {/* IMAGE */}
        <div className="h-[350px] lg:h-auto overflow-hidden">
          <img
            src={t114}
            alt="Travel experience"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex items-center px-8 md:px-12 lg:px-16 py-12">
          <div className="max-w-lg">
            <p className="uppercase tracking-[0.25em] text-xs text-[#8d6e63] mb-4">
              About Us
            </p>

            <h1 className="text-4xl md:text-5xl font-light leading-[1.1]">
              Curating Extraordinary Journeys
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#6d4c41]">
              We believe travel is more than reaching a destination. It is about
              discovering stories, cultures, and moments that stay with you
              forever.
            </p>

            <p className="mt-5 text-sm md:text-base leading-7 text-[#7f6b61]">
              From royal palaces and heritage towns to hidden valleys and
              pristine coastlines, every experience is thoughtfully designed to
              inspire wonder and meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE CREATE ================= */}
      <section className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[560px]">
        {/* CONTENT */}
        <div className="flex items-center px-8 md:px-12 lg:px-16 py-12 order-2 lg:order-1">
          <div className="max-w-lg">
            <p className="uppercase tracking-[0.25em] text-xs text-[#8d6e63] mb-4">
              Our Experiences
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              What We Create
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-[#6d4c41]">
              We craft journeys that blend luxury, authenticity, and cultural
              immersion.
            </p>

            <p className="mt-5 text-sm md:text-base leading-7 text-[#7f6b61]">
              Whether exploring ancient temples, experiencing local
              craftsmanship, or unwinding in world-class retreats, every
              itinerary is thoughtfully curated.
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="h-[350px] lg:h-auto overflow-hidden order-1 lg:order-2">
          <img
            src={t115}
            alt="Indian craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ================= DESIGNED AROUND YOU ================= */}
      <section className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[560px]">
        {/* IMAGE */}
        <div className="h-[350px] lg:h-auto overflow-hidden">
          <img
            src={t116}
            alt="Luxury travel experience"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex items-center px-8 md:px-12 lg:px-16 py-12">
          <div className="max-w-lg">
            <p className="uppercase tracking-[0.25em] text-xs text-[#8d6e63] mb-4">
              Personalised Travel
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              Designed Around You
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-[#6d4c41]">
              Every traveler is unique.
            </p>

            <p className="mt-5 text-sm md:text-base leading-7 text-[#7f6b61]">
              We take time to understand your interests, pace, and expectations
              to create journeys that feel personal, seamless, and
              unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="py-24 px-6 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8d6e63] mb-6">
          Our Philosophy
        </p>

        <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-3xl mx-auto">
          Travel slowly.
          <br />
          Experience deeply.
        </h2>
      </section>
    </div>
  );
};

export default About;
