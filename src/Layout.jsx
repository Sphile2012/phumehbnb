import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Globe, Menu, User, Home, Heart, CalendarDays, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("Services") ? "services"
    : location.pathname.includes("Experiences") ? "experiences"
    : location.pathname === "/" || location.pathname.includes("Home") ? "homes"
    : "homes";

  const hideHeader = currentPageName === "PropertyDetail";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      {!hideHeader && (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 overflow-visible">
          <div className="max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12 overflow-visible">
            {/* Top row */}
            <div className="flex items-center justify-between h-16 gap-4">
              {/* Logo */}
              <Link to={createPageUrl("Home")} className="flex items-center gap-1.5 shrink-0">
                <svg viewBox="0 0 32 32" className="h-8 w-8 text-[#FF385C]" fill="currentColor">
                  <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.907 6.478-6.5 6.478-2.08 0-4.198-.963-6.237-2.735l-.228-.202-.312-.29-.012-.012-.312.29-.228.202c-2.039 1.772-4.157 2.735-6.237 2.735C5.907 28.478 3 26.062 3 22l.001-.228.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.296 5.146-11.005 7.1-14.836l.533-1.025C13.037 1.963 14.492 1 16.5 1h-.5z" />
                </svg>
                <span className="text-[#FF385C] font-bold text-xl hidden md:block tracking-tight">Phumeh</span>
              </Link>

              {/* Center nav tabs */}
              <div className="hidden md:flex items-end gap-6 self-end pb-0">
                <button
                  onClick={() => navigate(createPageUrl("Home"))}
                  className={`flex flex-col items-center gap-1 pb-3 border-b-2 text-sm font-semibold transition-colors ${activeTab === "homes" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                >
                  <Home className="h-5 w-5" />
                  Homes
                </button>
                <button
                  onClick={() => navigate(createPageUrl("Experiences"))}
                  className={`flex flex-col items-center gap-1 pb-3 border-b-2 text-sm font-semibold transition-colors relative ${activeTab === "experiences" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                >
                  <span className="absolute -top-1 -right-4 bg-[#FF385C] text-white text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none">New</span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  Experiences
                </button>
                <button
                  onClick={() => navigate(createPageUrl("Services"))}
                  className={`flex flex-col items-center gap-1 pb-3 border-b-2 text-sm font-semibold transition-colors relative ${activeTab === "services" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                >
                  <span className="absolute -top-1 -right-4 bg-[#FF385C] text-white text-[8px] font-bold px-1 py-0.5 rounded uppercase leading-none">New</span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z"/></svg>
                  Services
                </button>
              </div>

              {/* Right */}
              <div className="flex items-center gap-1 shrink-0">
                <Link to={createPageUrl("CreateListing")} className="hidden md:block">
                  <Button variant="ghost" className="rounded-full text-sm font-medium px-4 text-gray-700 hover:bg-gray-100">
                    Become a host
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full hidden md:flex text-gray-700 hover:bg-gray-100">
                  <Globe className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full flex items-center gap-2 pl-3 pr-2 py-2 h-auto border-gray-300 hover:shadow-md transition-shadow ml-1">
                      <Menu className="h-4 w-4 text-gray-600" />
                      <div className="h-7 w-7 bg-gray-500 rounded-full flex items-center justify-center overflow-hidden">
                        {user?.full_name ? (
                          <span className="text-white text-xs font-semibold">{user.full_name[0].toUpperCase()}</span>
                        ) : (
                          <User className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl p-1">
                    {user ? (
                      <>
                        <div className="px-3 py-2 border-b mb-1">
                          <p className="font-semibold text-sm">{user.full_name || user.email}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("Trips"))}>
                          <CalendarDays className="h-4 w-4 mr-2" /> Trips
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("Wishlists"))}>
                          <Heart className="h-4 w-4 mr-2" /> Wishlists
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("MyListings"))}>
                          <Home className="h-4 w-4 mr-2" /> Manage listings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("CreateListing"))}>
                          <Plus className="h-4 w-4 mr-2" /> Create listing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("HostDashboard"))}>
                          Host dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("Profile"))}>
                          Account
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg cursor-pointer text-red-500" onClick={() => logout()}>
                          Log out
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem className="rounded-lg cursor-pointer font-semibold" onClick={() => navigate('/login')}>
                          Log in
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate('/login')}>
                          Sign up
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => navigate(createPageUrl("CreateListing"))}>
                          Become a host
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search bar row */}
            <div className="pb-4 flex justify-center">
              {activeTab === "services" ? <ServicesSearchBar /> : <SearchBar />}
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link to={createPageUrl("Home")} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <Search className={`h-5 w-5 ${currentPageName === "Home" ? "text-[#FF385C]" : "text-gray-400"}`} />
            <span className={`text-[10px] ${currentPageName === "Home" ? "text-[#FF385C] font-semibold" : "text-gray-400"}`}>Explore</span>
          </Link>
          <Link to={createPageUrl("Wishlists")} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <Heart className={`h-5 w-5 ${currentPageName === "Wishlists" ? "text-[#FF385C]" : "text-gray-400"}`} />
            <span className={`text-[10px] ${currentPageName === "Wishlists" ? "text-[#FF385C] font-semibold" : "text-gray-400"}`}>Wishlists</span>
          </Link>
          <Link to={createPageUrl("Trips")} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <CalendarDays className={`h-5 w-5 ${currentPageName === "Trips" ? "text-[#FF385C]" : "text-gray-400"}`} />
            <span className={`text-[10px] ${currentPageName === "Trips" ? "text-[#FF385C] font-semibold" : "text-gray-400"}`}>Trips</span>
          </Link>
          <Link to={createPageUrl("Profile")} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <User className={`h-5 w-5 ${currentPageName === "Profile" ? "text-[#FF385C]" : "text-gray-400"}`} />
            <span className={`text-[10px] ${currentPageName === "Profile" ? "text-[#FF385C] font-semibold" : "text-gray-400"}`}>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

function ServicesSearchBar() {
  const [location, setLocation] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const serviceOptions = ["Photography", "Chefs", "Massage", "Prepared meals", "Training", "Makeup", "Hair", "Spa treatments", "Nails", "Catering"];

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setShowServiceMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-stretch bg-white rounded-full border border-gray-300 shadow-md hover:shadow-lg transition-shadow">
        {/* Where */}
        <div className="flex flex-col justify-center px-5 py-2.5 cursor-pointer rounded-l-full min-w-[180px] hover:bg-gray-50 transition-colors">
          <span className="text-[11px] font-semibold text-gray-900">Where</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search destinations"
            className="text-sm text-gray-400 bg-transparent outline-none placeholder-gray-400 w-full"
          />
        </div>
        <div className="w-px bg-gray-200 my-2" />
        {/* When */}
        <div className="flex flex-col justify-center px-5 py-2.5 cursor-pointer min-w-[130px] hover:bg-gray-50 transition-colors">
          <span className="text-[11px] font-semibold text-gray-900">When</span>
          <span className="text-sm text-gray-400">{dateLabel || "Add dates"}</span>
        </div>
        <div className="w-px bg-gray-200 my-2" />
        {/* Type of service */}
        <div
          className="flex flex-col justify-center px-5 py-2.5 cursor-pointer min-w-[150px] hover:bg-gray-50 transition-colors"
          onClick={() => setShowServiceMenu(!showServiceMenu)}
        >
          <span className="text-[11px] font-semibold text-gray-900">Type of service</span>
          <span className="text-sm text-gray-400">{serviceType || "Add service"}</span>
        </div>
        {/* Search button */}
        <div className="flex items-center px-2">
          <button
            onClick={() => navigate(createPageUrl("Services"))}
            className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-full flex items-center gap-2 px-4 py-2.5 transition-colors font-semibold text-sm"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </div>

      {showServiceMenu && (
        <div className="absolute top-[calc(100%+8px)] right-[60px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[200] w-72">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Type of service</p>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((s) => (
              <button
                key={s}
                onClick={() => { setServiceType(s); setShowServiceMenu(false); }}
                className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${serviceType === s ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-700 hover:border-gray-400"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchBar() {
  const [activeField, setActiveField] = useState(null);
  const [location, setLocation] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLocationSelect = (val) => {
    setLocation(val);
    window.dispatchEvent(new CustomEvent("phumeh-search", { detail: { location: val } }));
    setActiveField("when");
  };

  const totalGuests = guests.adults + guests.children;
  const guestLabel = totalGuests > 0
    ? `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}${guests.infants > 0 ? `, ${guests.infants} infant${guests.infants !== 1 ? "s" : ""}` : ""}`
    : "";

  const changeGuest = (type, delta) => {
    setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
  };

  const handleSearch = () => {
    window.dispatchEvent(new CustomEvent("phumeh-search", { detail: { location } }));
    setActiveField(null);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-stretch bg-white rounded-full border border-gray-300 shadow-md hover:shadow-lg transition-shadow">
        {/* Where */}
        <div
          className={`flex flex-col justify-center px-5 py-2.5 cursor-pointer rounded-l-full min-w-[180px] transition-colors ${activeField === "where" ? "bg-gray-50" : "hover:bg-gray-50"}`}
          onClick={() => setActiveField("where")}
        >
          <span className="text-[11px] font-semibold text-gray-900">Where</span>
          <input
            value={location}
            onChange={(e) => { setLocation(e.target.value); window.dispatchEvent(new CustomEvent("phumeh-search", { detail: { location: e.target.value } })); }}
            onFocus={() => setActiveField("where")}
            placeholder="Search destinations"
            className="text-sm text-gray-400 bg-transparent outline-none placeholder-gray-400 w-full"
          />
        </div>

        <div className="w-px bg-gray-200 my-2" />

        {/* When */}
        <div
          className={`flex flex-col justify-center px-5 py-2.5 cursor-pointer min-w-[130px] transition-colors ${activeField === "when" ? "bg-gray-50" : "hover:bg-gray-50"}`}
          onClick={() => setActiveField(activeField === "when" ? null : "when")}
        >
          <span className="text-[11px] font-semibold text-gray-900">When</span>
          <span className="text-sm text-gray-400">{dateLabel || "Add dates"}</span>
        </div>

        <div className="w-px bg-gray-200 my-2" />

        {/* Who */}
        <div
          className={`flex flex-col justify-center px-5 py-2.5 cursor-pointer min-w-[130px] transition-colors ${activeField === "who" ? "bg-gray-50" : "hover:bg-gray-50"}`}
          onClick={() => setActiveField(activeField === "who" ? null : "who")}
        >
          <span className="text-[11px] font-semibold text-gray-900">Who</span>
          <span className="text-sm text-gray-400">{guestLabel || "Add guests"}</span>
        </div>

        {/* Search button */}
        <div className="flex items-center px-2">
          <button
            onClick={handleSearch}
            className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-full p-3 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Where dropdown */}
      {activeField === "where" && (
        <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[200] w-72">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Suggested destinations</p>
          {[
            { label: "Cape Town", emoji: "🏔️" },
            { label: "Durban", emoji: "🏖️" },
            { label: "Kruger National Park", emoji: "🦁" },
            { label: "Knysna", emoji: "🌿" },
            { label: "Stellenbosch", emoji: "🍷" },
            { label: "Johannesburg", emoji: "🌆" },
          ].map((d) => (
            <button
              key={d.label}
              onClick={() => handleLocationSelect(d.label)}
              className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 text-left transition-colors"
            >
              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-base shrink-0">{d.emoji}</div>
              <span className="text-sm text-gray-800 font-medium">{d.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* When dropdown */}
      {activeField === "when" && (
        <div className="absolute top-[calc(100%+8px)] left-[180px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-[200] w-64">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">When are you going?</p>
          <div className="grid grid-cols-2 gap-2">
            {["Flexible", "This weekend", "Next week", "Next month"].map((d) => (
              <button key={d} onClick={() => { setDateLabel(d); setActiveField("who"); }}
                className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${dateLabel === d ? "border-gray-900 bg-gray-50 text-gray-900" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Who dropdown */}
      {activeField === "who" && (
        <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-[200] w-72">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Who's coming?</p>
          {[
            { key: "adults", label: "Adults", sub: "Ages 13 or above" },
            { key: "children", label: "Children", sub: "Ages 2–12" },
            { key: "infants", label: "Infants", sub: "Under 2" },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => changeGuest(key, -1)} disabled={guests[key] === 0}
                  className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-700 disabled:opacity-30 disabled:cursor-default transition-colors">−</button>
                <span className="w-5 text-center text-sm font-medium">{guests[key]}</span>
                <button onClick={() => changeGuest(key, 1)}
                  className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-700 transition-colors">+</button>
              </div>
            </div>
          ))}
          <button onClick={() => setActiveField(null)} className="mt-3 w-full text-center text-sm font-semibold text-gray-900 underline">Done</button>
        </div>
      )}
    </div>
  );
}