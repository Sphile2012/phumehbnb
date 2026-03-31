import React, { useState, useRef } from "react";
import { Heart, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const experiencesByCity = [
  {
    city: "Cape Town",
    experiences: [
      {
        id: 1,
        title: "Hike Lions Head for Sunrise or Sunset",
        price: 800,
        rating: 4.99,
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Kayak with Dolphins",
        price: 600,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Cape of Good Hope & Cape Point, Penguins RoadTrip",
        price: 1210,
        rating: 4.92,
        image: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=600&auto=format&fit=crop",
      },
      {
        id: 4,
        title: "Guided Snorkel through Africa's magical Kelp Forest",
        price: 1100,
        rating: 4.91,
        image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&auto=format&fit=crop",
      },
      {
        id: 5,
        title: "Cape of Good Hope, Cape Point and Penguins Tour",
        price: 990,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=600&auto=format&fit=crop",
      },
      {
        id: 6,
        title: "Ocean Wildlife Encounter",
        price: 1550,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?w=600&auto=format&fit=crop",
      },
      {
        id: 7,
        title: "Bo-Kaap Neighbourhood & Cape Malay Cooking",
        price: 750,
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    city: "Johannesburg",
    experiences: [
      {
        id: 8,
        title: "Soweto Bicycle Tour",
        price: 550,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&auto=format&fit=crop",
      },
      {
        id: 9,
        title: "Traditional Zulu Dance & Culture",
        price: 680,
        rating: 4.94,
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop",
      },
      {
        id: 10,
        title: "Apartheid Museum Walking Tour",
        price: 400,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&auto=format&fit=crop",
      },
      {
        id: 11,
        title: "Street Art & Graffiti Tour in Maboneng",
        price: 350,
        rating: 4.93,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop",
      },
      {
        id: 12,
        title: "Gold Reef City Historical Experience",
        price: 820,
        rating: 4.90,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop",
      },
      {
        id: 13,
        title: "Hector Pieterson Memorial Tour",
        price: 490,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1571406384621-4d842ed0acba?w=600&auto=format&fit=crop",
      },
      {
        id: 14,
        title: "Township Jazz & Braai Evening",
        price: 720,
        rating: 4.92,
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    city: "Durban",
    experiences: [
      {
        id: 15,
        title: "Surfing Lesson at Durban's Golden Mile",
        price: 600,
        rating: 4.91,
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop",
      },
      {
        id: 16,
        title: "Indian Quarter Street Food Tour",
        price: 480,
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop",
      },
      {
        id: 17,
        title: "Valley of 1000 Hills Zulu Village",
        price: 950,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop",
      },
      {
        id: 18,
        title: "Dolphin & Whale Watching Boat Trip",
        price: 1100,
        rating: 4.93,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
      },
      {
        id: 19,
        title: "uShaka Marine World Private Tour",
        price: 750,
        rating: 4.89,
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop",
      },
      {
        id: 20,
        title: "Kayaking the Umgeni River",
        price: 520,
        rating: 4.94,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    city: "Islands",
    experiences: [
      {
        id: 26,
        title: "Zanzibar Spice Farm & Beach Snorkel",
        price: 1350,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=600&auto=format&fit=crop",
      },
      {
        id: 27,
        title: "Mauritius Catamaran Island Cruise",
        price: 1800,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
      },
      {
        id: 28,
        title: "Seychelles Snorkeling with Sea Turtles",
        price: 2200,
        rating: 4.99,
        image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&auto=format&fit=crop",
      },
      {
        id: 29,
        title: "Zanzibar Sunset Dhow Sailing",
        price: 950,
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=600&auto=format&fit=crop",
      },
      {
        id: 30,
        title: "Île aux Cerfs Day Island Escape",
        price: 1600,
        rating: 4.94,
        image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&auto=format&fit=crop",
      },
      {
        id: 31,
        title: "Pemba Island Diving Adventure",
        price: 1900,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    city: "Tropical",
    experiences: [
      {
        id: 32,
        title: "Victoria Falls Sunset River Cruise",
        price: 1400,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop",
      },
      {
        id: 33,
        title: "Diani Beach Kite Surfing Lesson",
        price: 800,
        rating: 4.93,
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop",
      },
      {
        id: 34,
        title: "Okavango Delta Mokoro Safari",
        price: 2500,
        rating: 4.99,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop",
      },
      {
        id: 35,
        title: "Rainforest Canopy Walk in Uganda",
        price: 1100,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop",
      },
      {
        id: 36,
        title: "Chobe River Sunset Boat Safari",
        price: 1650,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
      },
      {
        id: 37,
        title: "Ngorongoro Crater Game Drive",
        price: 3200,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    city: "Skiing",
    experiences: [
      {
        id: 38,
        title: "Tiffindell Ski Resort Private Lesson",
        price: 1200,
        rating: 4.92,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop",
      },
      {
        id: 39,
        title: "Afriski Mountain Resort Full Day Pass",
        price: 980,
        rating: 4.90,
        image: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=600&auto=format&fit=crop",
      },
      {
        id: 40,
        title: "Lesotho Snowboarding Adventure",
        price: 1450,
        rating: 4.94,
        image: "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=600&auto=format&fit=crop",
      },
      {
        id: 41,
        title: "Drakensberg Snow Hiking Experience",
        price: 850,
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop",
      },
      {
        id: 42,
        title: "Matroosberg Peak Winter Hike",
        price: 720,
        rating: 4.91,
        image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    city: "Stellenbosch",
    experiences: [
      {
        id: 21,
        title: "Wine Tasting on a Private Estate",
        price: 850,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop",
      },
      {
        id: 22,
        title: "Cheese & Wine Pairing Experience",
        price: 720,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&auto=format&fit=crop",
      },
      {
        id: 23,
        title: "Cape Winelands Cycling Tour",
        price: 980,
        rating: 4.94,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&auto=format&fit=crop",
      },
      {
        id: 24,
        title: "Brandy Distillery Tour & Tasting",
        price: 650,
        rating: 4.90,
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop",
      },
      {
        id: 25,
        title: "Farm-to-Table Cooking Class",
        price: 890,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&auto=format&fit=crop",
      },
    ],
  },
];

function ExperienceRow({ city, experiences }) {
  const scrollRef = useRef(null);
  const [wishlisted, setWishlisted] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="mb-10">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 group">
          <h2 className="text-xl font-semibold text-gray-900">Experiences in {city}</h2>
          <ArrowRight className="h-5 w-5 text-gray-900 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 disabled:opacity-30 disabled:cursor-default transition-colors bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 disabled:opacity-30 disabled:cursor-default transition-colors bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {experiences.map((exp) => (
          <div key={exp.id} className="flex-none w-[200px] cursor-pointer group">
            {/* Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2">
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Popular badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  Popular
                </span>
              </div>
              {/* Wishlist */}
              <button
                onClick={(e) => toggleWishlist(exp.id, e)}
                className="absolute top-2.5 right-2.5"
              >
                <Heart
                  className={`h-5 w-5 drop-shadow transition-all ${
                    wishlisted.includes(exp.id)
                      ? "fill-[#FF385C] text-[#FF385C]"
                      : "fill-black/30 text-white"
                  }`}
                />
              </button>
            </div>
            {/* Info */}
            <p className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 mb-0.5">
              {exp.title}
            </p>
            <p className="text-[12px] text-gray-500">
              From R{exp.price.toLocaleString("en-ZA")} ZAR / guest &nbsp;·&nbsp;
              <span className="inline-flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-gray-800 text-gray-800" />
                {exp.rating}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experiences() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8 pb-24 md:pb-8">
      {experiencesByCity.map((group) => (
        <ExperienceRow key={group.city} city={group.city} experiences={group.experiences} />
      ))}
    </div>
  );
}