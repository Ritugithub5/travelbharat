import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  MapPin,
  Mountain,
  Waves,
  ArrowRight,
} from "lucide-react";

// Images
import t31 from "../videos/t31.png"; 
import t32 from "../videos/t32.png"; 
import t33 from "../videos/t33.png"; 
import t34 from "../videos/t34.png"; 
import t35 from "../videos/t35.png"; 
import t36 from "../videos/t36.png"; 
import t37 from "../videos/t37.png"; 
import t38 from "../videos/t38.png"; 
import t39 from "../videos/t39.png"; 

const destinations = [
  {
    image: t31,
    place: "Andaman Islands",
    state: "Andaman & Nicobar",
    category: "Beach",
    icon: <Waves size={18} />,
    description:
      "Crystal-clear turquoise waters, white sand beaches and hidden lagoons."
  },
  {
    image: t32,
    place: "Havelock Island",
    state: "Andaman",
    category: "Scuba Diving",
    icon: <Waves size={18} />,
    description:
      "Dive into colorful coral reefs filled with vibrant marine life."
  },
  {
    image: t33,
    place: "Udaipur",
    state: "Rajasthan",
    category: "Lake",
    icon: <Waves size={18} />,
    description:
      "Explore the City of Lakes with majestic palaces and boat rides."
  },
  {
    image: t34,
    place: "Rishikesh",
    state: "Uttarakhand",
    category: "River Rafting",
    icon: <Waves size={18} />,
    description:
      "Feel the thrill of white-water rafting through Himalayan rapids."
  },
  {
    image: t35,
    place: "Kovalam",
    state: "Kerala",
    category: "Surfing",
    icon: <Waves size={18} />,
    description:
      "Ride the Arabian Sea waves at one of India's best surfing beaches."
  },
  {
    image: t36,
    place: "Gulmarg",
    state: "Jammu & Kashmir",
    category: "Snow",
    icon: <Mountain size={18} />,
    description:
      "Snow-covered mountains, gondola rides and breathtaking landscapes."
  },
  {
    image: t37,
    place: "Chikmagalur",
    state: "Karnataka",
    category: "Hills",
    icon: <Mountain size={18} />,
    description:
      "Rolling green hills, coffee plantations and peaceful trekking trails."
  },
  {
    image: t38,
    place: "Meghalaya",
    state: "North East",
    category: "Cloud Valley",
    icon: <Mountain size={18} />,
    description:
      "Floating clouds, waterfalls and lush valleys unlike anywhere else."
  },
  {
    image: t39,
    place: "Athirappilly Falls",
    state: "Kerala",
    category: "Waterfall",
    icon: <Waves size={18} />,
    description:
      "Witness Kerala's largest waterfall surrounded by dense rainforest."
  }
];

export default function WaterMountainSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <span className="inline-block px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">
            Water • Mountains • Adventures
          </span>

          <h2 className="text-5xl font-bold mt-6">
            Explore Nature's Finest Escapes
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-lg">
            From crystal-clear islands and thrilling river rafting to
            snow-covered peaks and misty green valleys, discover India's
            most breathtaking destinations.
          </p>

        </div>

        {/* Swiper */}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {destinations.map((item, index) => (
            <SwiperSlide key={index}>

              <div className="group relative rounded-3xl overflow-hidden h-[520px] shadow-xl">

                <img
                  src={item.image}
                  alt={item.place}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute top-5 left-5">

                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white">

                    {item.icon}

                    <span>{item.category}</span>

                  </div>

                </div>

                <div className="absolute bottom-0 p-7 text-white">

                  <div className="flex items-center gap-2 text-cyan-300 mb-3">

                    <MapPin size={18} />

                    <span className="text-sm">
                      {item.place}, {item.state}
                    </span>

                  </div>

                  <h3 className="text-3xl font-bold mb-3">
                    {item.place}
                  </h3>

                  <p className="text-gray-200 leading-relaxed">
                    {item.description}
                  </p>

                  <button className="mt-6 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full transition">

                    Explore Now

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}