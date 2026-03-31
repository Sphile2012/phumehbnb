import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mountain, Waves, TreePine, Compass, Gem, Castle, Snowflake, Home, TrendingUp, Tent, Eye, Landmark, Flame, UtensilsCrossed, Star } from "lucide-react";

const PalmtreeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h11z" />
    <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-9" />
    <path d="M11.93 8c.046.385.07.77.07 1.16C12 12.97 9.54 16 6.5 16" />
    <path d="M12 8c0 3.81 2.46 7 5.5 7" />
    <path d="M12 22V8" />
  </svg>
);

const PoolIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path d="M7 7V4m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 3V4m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 4h10" />
  </svg>
);

const categories = [
  { id: "pools",          label: "Pools",           Icon: PoolIcon },
  { id: "trending",       label: "Trending",         Icon: TrendingUp },
  { id: "amazing_views",  label: "Amazing views",    Icon: Eye },
  { id: "beachfront",     label: "Beachfront",       Icon: Waves },
  { id: "luxe",           label: "Luxe",             Icon: Star },
  { id: "tropical",       label: "Tropical",         Icon: PalmtreeIcon },
  { id: "cabins",         label: "Cabins",           Icon: TreePine },
  { id: "countryside",    label: "Countryside",      Icon: Compass },
  { id: "design",         label: "Design",           Icon: Gem },
  { id: "islands",        label: "Islands",          Icon: Landmark },
  { id: "lakefront",      label: "Lakefront",        Icon: Mountain },
  { id: "mansions",       label: "Mansions",         Icon: Castle },
  { id: "national_parks", label: "National parks",   Icon: Tent },
  { id: "omg",            label: "OMG!",             Icon: Flame },
  { id: "skiing",         label: "Skiing",           Icon: Snowflake },
  { id: "tiny_homes",     label: "Tiny homes",       Icon: Home },
  { id: "restaurants",    label: "Restaurants",      Icon: UtensilsCrossed },
];

export default function CategoryBar({ selected, onSelect }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setShowLeft(el.scrollLeft > 20);
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    };
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="relative">
      {showLeft && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pointer-events-none">
          <div className="bg-gradient-to-r from-white to-transparent w-16 h-full" />
          <button onClick={() => scroll(-1)} className="absolute left-0 h-8 w-8 rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow pointer-events-auto">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}

      <div ref={scrollRef} className="flex gap-7 overflow-x-auto py-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {categories.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(isActive ? null : cat.id)}
              className={`flex flex-col items-center gap-1.5 pb-2 border-b-2 transition-all duration-150 shrink-0 ${
                isActive ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <cat.Icon className="h-6 w-6" />
              <span className="text-[11px] font-medium whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {showRight && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pointer-events-none">
          <div className="bg-gradient-to-l from-white to-transparent w-16 h-full" />
          <button onClick={() => scroll(1)} className="absolute right-0 h-8 w-8 rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow pointer-events-auto">
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}