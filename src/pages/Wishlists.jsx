import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/home/PropertyCard";

export default function Wishlists() {
  const [wishlisted, setWishlisted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlisted") || "[]"); } catch { return []; }
  });

  const { data: allProperties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: () => phumeh.entities.Property.filter({ is_active: true }, "-created_date", 100),
  });

  const wishlistedProperties = allProperties.filter((p) => wishlisted.includes(p.id));

  const toggleWishlist = (id) => {
    setWishlisted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("wishlisted", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 py-10 pb-24">
      <h1 className="text-3xl font-bold mb-8">Wishlists</h1>

      {wishlistedProperties.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create your first wishlist</h3>
          <p className="text-gray-500 mb-6">
            As you search, tap the heart icon to save your favorite places to stay.
          </p>
          <Link to={createPageUrl("Home")}>
            <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg px-6">
              Start exploring
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {wishlistedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isWishlisted={true}
              onWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}