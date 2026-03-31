import React, { useState, useRef } from "react";
import { Heart, Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SERVICE_CATEGORIES = [
  {
    id: "chefs",
    label: "Chefs",
    services: [
      { id: "c1", title: "Authentic Roman meal", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop", price: 1343, rating: 4.97, popular: false },
      { id: "c2", title: "Hyperlocal, foraged fare by Clair", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop", price: 1652, minBook: 3170, rating: 5.0, popular: false },
      { id: "c3", title: "Behind the flame and fusion flavors by Erick", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop", price: 1132, minBook: 1980, rating: 5.0, popular: true },
      { id: "c4", title: "Vibrant Cali-Mediterranean menus by Liza", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&auto=format&fit=crop", price: 1085, rating: 5.0, popular: false, perGroup: true },
      { id: "c5", title: "Luxury Private Dining by Chef Jimmy Matiz", image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&auto=format&fit=crop", price: 2753, minBook: 21690, rating: 5.0, popular: false },
      { id: "c6", title: "Catalan cuisine by Cristina", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop", price: 768, rating: 4.95, popular: false },
    ],
  },
  {
    id: "training",
    label: "Training",
    services: [
      { id: "t1", title: "Sunrise yoga & breathwork session", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop", price: 850, rating: 4.98, popular: false },
      { id: "t2", title: "Personal fitness coaching by Marco", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop", price: 1200, rating: 5.0, popular: true },
      { id: "t3", title: "Dance & movement therapy", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop", price: 950, rating: 4.9, popular: false },
      { id: "t4", title: "Pilates for beginners with Sara", image: "https://images.unsplash.com/photo-1616279969965-7a726b88d6c5?w=400&auto=format&fit=crop", price: 780, rating: 4.95, popular: false },
      { id: "t5", title: "Martial arts intro class", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&auto=format&fit=crop", price: 1100, rating: 4.92, popular: false },
      { id: "t6", title: "Swimming coaching - all levels", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&auto=format&fit=crop", price: 900, rating: 4.88, popular: false },
    ],
  },
  {
    id: "massage",
    label: "Massage",
    services: [
      { id: "m1", title: "Full body Swedish massage", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&auto=format&fit=crop", price: 1500, rating: 5.0, popular: true },
      { id: "m2", title: "Deep tissue sports recovery", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&auto=format&fit=crop", price: 1800, rating: 4.97, popular: false },
      { id: "m3", title: "Hot stone therapy by Ama", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop", price: 2100, rating: 5.0, popular: false },
      { id: "m4", title: "Couples relaxation session", image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&auto=format&fit=crop", price: 2800, rating: 4.95, popular: false },
      { id: "m5", title: "Prenatal massage with Leah", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&auto=format&fit=crop", price: 1650, rating: 4.99, popular: false },
      { id: "m6", title: "Reflexology foot treatment", image: "https://images.unsplash.com/photo-1630428590598-b34fb09a2ab8?w=400&auto=format&fit=crop", price: 980, rating: 4.9, popular: false },
    ],
  },
  {
    id: "photography",
    label: "Photography",
    services: [
      { id: "p1", title: "Couples sunset photoshoot", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop", price: 2500, rating: 5.0, popular: true },
      { id: "p2", title: "Family portrait session", image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&auto=format&fit=crop", price: 1800, rating: 4.95, popular: false },
      { id: "p3", title: "Cape Town landscape tour with photography", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop", price: 3200, rating: 4.98, popular: false },
      { id: "p4", title: "Brand & headshot session by Lyle", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop", price: 2200, rating: 5.0, popular: false },
      { id: "p5", title: "Newborn photography at home", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&auto=format&fit=crop", price: 2800, rating: 4.97, popular: false },
      { id: "p6", title: "Wedding day coverage", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&auto=format&fit=crop", price: 8500, rating: 5.0, popular: false },
    ],
  },
  {
    id: "spa",
    label: "Spa treatments",
    services: [
      { id: "s1", title: "Hydrating facial & skin renewal", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop", price: 1200, rating: 5.0, popular: true },
      { id: "s2", title: "Full body wrap & exfoliation", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop", price: 1850, rating: 4.96, popular: false },
      { id: "s3", title: "Aromatherapy & candle ritual", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop", price: 1450, rating: 4.92, popular: false },
      { id: "s4", title: "Luxury hamam experience", image: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?w=400&auto=format&fit=crop", price: 2400, rating: 4.99, popular: false },
      { id: "s5", title: "Anti-ageing collagen treatment", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&auto=format&fit=crop", price: 2200, rating: 5.0, popular: false },
      { id: "s6", title: "Men's grooming & spa day", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&auto=format&fit=crop", price: 1600, rating: 4.88, popular: false },
    ],
  },
  {
    id: "catering",
    label: "Catering",
    services: [
      { id: "ca1", title: "Braai & potjie experience for groups", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&auto=format&fit=crop", price: 680, rating: 4.97, popular: true, perGroup: true },
      { id: "ca2", title: "Cape Malay dinner experience", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&auto=format&fit=crop", price: 950, rating: 5.0, popular: false },
      { id: "ca3", title: "Sushi & wine pairing by Kenji", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop", price: 1350, rating: 4.94, popular: false },
      { id: "ca4", title: "Vegan feast & plant-based cooking", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop", price: 780, rating: 4.9, popular: false },
      { id: "ca5", title: "Corporate event catering", image: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=400&auto=format&fit=crop", price: 450, rating: 4.85, popular: false, perGroup: true },
      { id: "ca6", title: "Birthday celebration feast", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&auto=format&fit=crop", price: 1100, rating: 4.93, popular: false },
    ],
  },
];

export default function Services() {
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("service-bookings") || "[]"); } catch { return []; }
  });
  const [wishlisted, setWishlisted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("service-wishlist") || "[]"); } catch { return []; }
  });
  const [activeFilter, setActiveFilter] = useState(null);

  const serviceFilters = [
    { id: "photography", label: "Photography", icon: "📷" },
    { id: "chefs", label: "Chefs", icon: "👨‍🍳" },
    { id: "massage", label: "Massage", icon: "💆" },
    { id: "catering", label: "Prepared meals", icon: "🍱" },
    { id: "training", label: "Training", icon: "⏱" },
    { id: "makeup", label: "Makeup", icon: "💄" },
    { id: "hair", label: "Hair", icon: "✂️" },
    { id: "spa", label: "Spa treatments", icon: "🏨" },
    { id: "nails", label: "Nails", icon: "💅" },
  ];

  const toggleWishlist = (id) => {
    setWishlisted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("service-wishlist", JSON.stringify(next));
      return next;
    });
  };

  const book = (service) => {
    if (bookings.includes(service.id)) return;
    const next = [...bookings, service.id];
    setBookings(next);
    localStorage.setItem("service-bookings", JSON.stringify(next));
    toast.success(`Booked: ${service.title}`);
  };

  const cancel = (serviceId) => {
    const next = bookings.filter((x) => x !== serviceId);
    setBookings(next);
    localStorage.setItem("service-bookings", JSON.stringify(next));
    toast.success("Booking cancelled");
  };

  const visibleCategories = activeFilter
    ? SERVICE_CATEGORIES.filter((c) => c.id === activeFilter)
    : SERVICE_CATEGORIES;

  return (
    <div className="pb-24 md:pb-8">
      {/* Service filter pills */}
      <div className="max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12 pt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {serviceFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(activeFilter === f.id ? null : f.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                activeFilter === f.id
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
              }`}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category rows */}
      {visibleCategories.map((cat) => (
        <ServiceRow
          key={cat.id}
          category={cat}
          bookings={bookings}
          wishlisted={wishlisted}
          onBook={book}
          onCancel={cancel}
          onWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}

function ServiceRow({ category, bookings, wishlisted, onBook, onCancel, onWishlist }) {
  const scrollRef = React.useRef(null);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div className="max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12 mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{category.label}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="h-8 w-8 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:shadow-md transition-shadow">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button onClick={() => scroll(1)} className="h-8 w-8 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:shadow-md transition-shadow">
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {category.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isBooked={bookings.includes(service.id)}
            isWishlisted={wishlisted.includes(service.id)}
            onBook={() => onBook(service)}
            onCancel={() => onCancel(service.id)}
            onWishlist={() => onWishlist(service.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, isBooked, isWishlisted, onBook, onCancel, onWishlist }) {
  return (
    <div className="shrink-0 w-[220px]">
      <div className="relative rounded-xl overflow-hidden aspect-square mb-2 bg-gray-100">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        {service.popular && (
          <div className="absolute top-3 left-3 bg-white rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-gray-900 shadow-sm">Popular</div>
        )}
        <button
          onClick={onWishlist}
          className="absolute top-3 right-3 transition-transform active:scale-95"
        >
          <Heart className={`h-5 w-5 drop-shadow-md ${isWishlisted ? "fill-[#FF385C] text-[#FF385C]" : "fill-black/20 text-white"}`} />
        </button>
      </div>
      <p className="font-medium text-sm text-gray-900 leading-snug line-clamp-2">{service.title}</p>
      <p className="text-xs text-gray-600 mt-0.5">
        From R{service.price.toLocaleString()} ZAR / {service.perGroup ? "group" : "guest"}
      </p>
      {service.minBook && (
        <p className="text-xs text-gray-500">Minimum R{service.minBook.toLocaleString()} ZAR to book</p>
      )}
      {service.rating && (
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
          <span className="text-xs font-medium">{service.rating.toFixed(1)}</span>
        </div>
      )}
      <div className="mt-2">
        {isBooked ? (
          <button
            onClick={onCancel}
            className="flex items-center gap-1 text-xs text-red-600 font-semibold border border-red-200 rounded-full px-3 py-1 hover:bg-red-50 transition-colors"
          >
            <X className="h-3 w-3" /> Cancel booking
          </button>
        ) : (
          <button
            onClick={onBook}
            className="text-xs text-white font-semibold bg-[#FF385C] hover:bg-[#E31C5F] rounded-full px-3 py-1 transition-colors"
          >
            Book now
          </button>
        )}
      </div>
    </div>
  );
}