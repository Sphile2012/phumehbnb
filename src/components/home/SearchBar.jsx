import React, { useState, useRef, useEffect } from "react";
import { Search, Navigation, Building2, Palmtree, Waves, Mountain, X } from "lucide-react";

const suggestedDestinations = [
  {
    id: "nearby",
    icon: Navigation,
    label: "Nearby",
    subtitle: "Find what's around you",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: "malibu",
    icon: Waves,
    label: "Malibu, California",
    subtitle: "Popular beach destination",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    id: "paris",
    icon: Building2,
    label: "Paris, France",
    subtitle: "Great for a romantic getaway",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    id: "bali",
    icon: Palmtree,
    label: "Bali, Indonesia",
    subtitle: "Tropical paradise",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "aspen",
    icon: Mountain,
    label: "Aspen, Colorado",
    subtitle: "Perfect for skiing",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

export default function SearchBar({ onSearch, variant = "default" }) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [activeTab, setActiveTab] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch({ location, checkIn, checkOut, guests });
    setActiveTab(null);
  };

  const selectDestination = (dest) => {
    setLocation(dest.id === "nearby" ? "Near me" : dest.label);
    setActiveTab("checkin");
  };

  const isOpen = activeTab !== null;

  return (
    <div
      ref={searchRef}
      className={`relative w-full ${variant === "hero" ? "max-w-4xl" : "max-w-3xl"} mx-auto`}
    >
      {/* Main pill bar */}
      <div
        className={`flex items-stretch bg-white rounded-full border transition-all duration-200 ${
          isOpen
            ? "shadow-2xl border-gray-200 rounded-2xl"
            : "shadow-md border-gray-200 hover:shadow-lg cursor-pointer"
        }`}
      >
        {/* Where */}
        <button
          onClick={() => setActiveTab(activeTab === "where" ? null : "where")}
          className={`flex-1 flex flex-col px-6 py-3 text-left rounded-full transition-colors ${
            activeTab === "where" ? "bg-white rounded-2xl shadow-sm ring-2 ring-gray-200" : "hover:bg-gray-50"
          }`}
        >
          <span className="text-[11px] font-bold text-gray-900 tracking-wide">Where</span>
          <span className={`text-sm mt-0.5 truncate ${location ? "text-gray-900" : "text-gray-400"}`}>
            {location || "Search destinations"}
          </span>
        </button>

        <div className="w-px bg-gray-200 my-3" />

        {/* Check in */}
        <button
          onClick={() => setActiveTab(activeTab === "checkin" ? null : "checkin")}
          className={`flex-1 flex flex-col px-6 py-3 text-left rounded-full transition-colors ${
            activeTab === "checkin" ? "bg-white rounded-2xl shadow-sm ring-2 ring-gray-200" : "hover:bg-gray-50"
          }`}
        >
          <span className="text-[11px] font-bold text-gray-900 tracking-wide">Check in</span>
          <span className={`text-sm mt-0.5 ${checkIn ? "text-gray-900" : "text-gray-400"}`}>
            {checkIn || "Add dates"}
          </span>
        </button>

        <div className="w-px bg-gray-200 my-3" />

        {/* Check out */}
        <button
          onClick={() => setActiveTab(activeTab === "checkout" ? null : "checkout")}
          className={`flex-1 flex flex-col px-6 py-3 text-left rounded-full transition-colors ${
            activeTab === "checkout" ? "bg-white rounded-2xl shadow-sm ring-2 ring-gray-200" : "hover:bg-gray-50"
          }`}
        >
          <span className="text-[11px] font-bold text-gray-900 tracking-wide">Check out</span>
          <span className={`text-sm mt-0.5 ${checkOut ? "text-gray-900" : "text-gray-400"}`}>
            {checkOut || "Add dates"}
          </span>
        </button>

        <div className="w-px bg-gray-200 my-3" />

        {/* Who + Search button */}
        <div className="flex items-center gap-2 pr-2 pl-4">
          <button
            onClick={() => setActiveTab(activeTab === "guests" ? null : "guests")}
            className={`flex flex-col py-3 text-left transition-colors min-w-[90px] ${
              activeTab === "guests" ? "" : ""
            }`}
          >
            <span className="text-[11px] font-bold text-gray-900 tracking-wide">Who</span>
            <span className="text-sm mt-0.5 text-gray-400 whitespace-nowrap">
              {guests > 0 ? `${guests} guest${guests > 1 ? "s" : ""}` : "Add guests"}
            </span>
          </button>
          <button
            onClick={handleSearch}
            className={`flex items-center gap-2 font-semibold rounded-full transition-all ${
              isOpen
                ? "bg-[#FF385C] text-white px-5 py-3 text-sm"
                : "bg-[#FF385C] text-white p-3"
            }`}
          >
            <Search className={`${isOpen ? "h-4 w-4" : "h-4 w-4"}`} />
            {isOpen && <span>Search</span>}
          </button>
        </div>
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="p-6">
            {activeTab === "where" && (
              <div>
                <div className="relative mb-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C]"
                  />
                  {location && (
                    <button onClick={() => setLocation("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                  Suggested destinations
                </p>
                <div className="space-y-1">
                  {suggestedDestinations.map((dest) => {
                    const Icon = dest.icon;
                    return (
                      <button
                        key={dest.id}
                        onClick={() => selectDestination(dest)}
                        className="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left group"
                      >
                        <div className={`${dest.bg} p-2.5 rounded-xl shrink-0 group-hover:scale-105 transition-transform`}>
                          <Icon className={`h-5 w-5 ${dest.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{dest.label}</p>
                          <p className="text-xs text-gray-500">{dest.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "checkin" && (
              <div className="max-w-xs">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Check-in date</p>
                <input
                  autoFocus
                  type="date"
                  value={checkIn}
                  onChange={(e) => { setCheckIn(e.target.value); setActiveTab("checkout"); }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C]"
                />
              </div>
            )}

            {activeTab === "checkout" && (
              <div className="max-w-xs">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Check-out date</p>
                <input
                  autoFocus
                  type="date"
                  value={checkOut}
                  onChange={(e) => { setCheckOut(e.target.value); setActiveTab("guests"); }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C]"
                />
              </div>
            )}

            {activeTab === "guests" && (
              <div className="max-w-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Guests</p>
                {[
                  { label: "Adults", sub: "Ages 13 or above", key: "adults" },
                  { label: "Children", sub: "Ages 2–12", key: "children" },
                ].map((type, i) => (
                  <div key={type.key} className={`flex items-center justify-between py-4 ${i < 1 ? "border-b border-gray-100" : ""}`}>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-500">{type.sub}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                        className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
                      >−</button>
                      <span className="text-sm font-medium w-5 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-800 text-lg leading-none"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}