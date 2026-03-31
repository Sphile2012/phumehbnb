import React, { useState } from "react";
import { phumeh } from "@/api/phumehClient";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Share, Heart, Star, MapPin, Users, BedDouble, Bath, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoGallery from "@/components/property/PhotoGallery";
import BookingWidget from "@/components/property/BookingWidget";
import AmenityList from "@/components/property/AmenityList";
import ReviewSection from "@/components/property/ReviewSection";

export default function PropertyDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");
  const navigate = useNavigate();
  const [saved, setSaved] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem("wishlisted") || "[]");
      return list.includes(propertyId);
    } catch { return false; }
  });

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => phumeh.entities.Property.filter({ id: propertyId }),
    select: (data) => data[0],
    enabled: !!propertyId,
  });

  const toggleSave = () => {
    setSaved((prev) => {
      const list = JSON.parse(localStorage.getItem("wishlisted") || "[]");
      const next = prev ? list.filter((x) => x !== propertyId) : [...list, propertyId];
      localStorage.setItem("wishlisted", JSON.stringify(next));
      return !prev;
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[460px] rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-6 w-80" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold">Property not found</h2>
        <Link to={createPageUrl("Home")} className="text-[#FF385C] underline">Back to home</Link>
      </div>
    );
  }

  const typeLabel = {
    entire_place: "Entire place",
    private_room: "Private room",
    shared_room: "Shared room",
    hotel_room: "Hotel room",
  }[property.property_type] || "Place";

  return (
    <div className="pb-28 lg:pb-12 bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 px-3 py-1.5"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full px-3 py-1.5 transition-colors">
              <Share className="h-4 w-4" /> Share
            </button>
            <button
              onClick={toggleSave}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full px-3 py-1.5 transition-colors"
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-[#FF385C] text-[#FF385C]" : ""}`} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        {/* Title */}
        <h1 className="text-2xl md:text-[28px] font-semibold mb-2">{property.title}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-700 mb-6">
          {property.average_rating > 0 && (
            <>
              <Star className="h-3.5 w-3.5 fill-black inline" />
              <span className="font-medium">{property.average_rating.toFixed(2)}</span>
              <span className="text-gray-400">·</span>
              <span className="underline cursor-pointer">{property.review_count || 0} reviews</span>
              <span className="text-gray-400">·</span>
            </>
          )}
          {property.is_superhost && (
            <>
              <span className="font-medium">🏅 Superhost</span>
              <span className="text-gray-400">·</span>
            </>
          )}
          <span className="underline cursor-pointer flex items-center gap-1">
            <MapPin className="h-3 w-3 inline" />
            {property.location_city}, {property.location_country}
          </span>
        </div>

        {/* Photos */}
        <PhotoGallery images={property.images} />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Host info */}
            <div className="flex justify-between items-start pb-8 border-b">
              <div>
                <h2 className="text-[22px] font-semibold">
                  {typeLabel} hosted by {property.host_name || "Host"}
                </h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-600 mt-2 text-sm">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {property.max_guests || 2} guests</span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {property.bedrooms || 1} bedrooms</span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1"><DoorOpen className="h-4 w-4" /> {property.beds || 1} beds</span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms || 1} baths</span>
                </div>
              </div>
              <div className="h-14 w-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 ml-4">
                {(property.host_name || "H")[0].toUpperCase()}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="pb-8 border-b">
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="pb-8 border-b">
                <AmenityList amenities={property.amenities} />
              </div>
            )}

            {/* House rules */}
            {(property.house_rules || property.check_in_time) && (
              <div className="pb-8 border-b">
                <h2 className="text-[22px] font-semibold mb-4">House rules</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Check-in: after {property.check_in_time || "3:00 PM"}</p>
                  <p>Checkout: before {property.check_out_time || "11:00 AM"}</p>
                  {property.house_rules && <p className="mt-3 whitespace-pre-line">{property.house_rules}</p>}
                </div>
              </div>
            )}

            {/* Reviews */}
            <ReviewSection propertyId={property.id} />
          </div>

          {/* Booking widget – desktop */}
          <div className="hidden lg:block">
            <BookingWidget property={property} />
          </div>
        </div>
      </div>

      {/* Booking bar – mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-50 shadow-lg">
        <div>
          <span className="font-semibold text-lg">R {(property.price_per_night * 18.5).toLocaleString("en-ZA", { maximumFractionDigits: 0 })}</span>
          <span className="text-gray-500 text-sm"> / night</span>
          {property.average_rating > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <Star className="h-3 w-3 fill-gray-500" />
              <span>{property.average_rating.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Button
          className="bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white font-semibold px-7 py-3 rounded-lg"
          onClick={() => {
            const widget = document.getElementById("mobile-booking-widget");
            if (widget) { widget.scrollIntoView({ behavior: "smooth" }); }
          }}
        >
          Reserve
        </Button>
      </div>
    </div>
  );
}