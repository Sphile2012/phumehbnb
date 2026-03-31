import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyCard({ property, onWishlist, isWishlisted }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const images =
    property.images?.length > 0
      ? property.images
      : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop"];

  const nextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  const prevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlist?.(property.id);
  };

  const typeLabel = property.property_type
    ? property.property_type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : property.title;

  return (
    <Link to={`${createPageUrl("PropertyDetail")}?id=${property.id}`} className="group block">
      {/* Image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={images[imgIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 transition-transform active:scale-95"
        >
          <Heart
            className={`h-6 w-6 drop-shadow-md transition-all ${
              isWishlisted ? "fill-[#FF385C] text-[#FF385C]" : "fill-black/20 text-white"
            }`}
          />
        </button>

        {/* Badge */}
        {property.is_superhost && (
          <div className="absolute top-3 left-3 bg-white rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-gray-900 shadow-sm">
            Superhost
          </div>
        )}

        {/* Nav arrows */}
        {hovered && images.length > 1 && (
          <>
            {imgIndex > 0 && (
              <button
                onClick={prevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-white transition z-10"
              >
                <ChevronLeft className="h-3.5 w-3.5 text-gray-800" />
              </button>
            )}
            {imgIndex < images.length - 1 && (
              <button
                onClick={nextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-white transition z-10"
              >
                <ChevronRight className="h-3.5 w-3.5 text-gray-800" />
              </button>
            )}
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === imgIndex ? "bg-white w-2 h-2" : "bg-white/60 w-1.5 h-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between gap-1">
          <p className="font-semibold text-[13px] text-gray-900 leading-snug line-clamp-1">
            {typeLabel} in {property.location_city}
          </p>
          {property.average_rating > 0 && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
              <span className="text-[12px] font-medium">{property.average_rating.toFixed(2)}</span>
            </div>
          )}
        </div>
        <p className="text-[12px] text-gray-500 mt-0.5">{property.location_city}, {property.location_country}</p>
        <p className="text-[13px] mt-1">
          <span className="font-semibold text-gray-900">R {(property.price_per_night * 18.5).toLocaleString("en-ZA", { maximumFractionDigits: 0 })}</span>
          <span className="text-gray-500"> / night</span>
        </p>
      </div>
    </Link>
  );
}