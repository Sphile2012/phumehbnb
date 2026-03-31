import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useQuery } from "@tanstack/react-query";
import CategoryBar from "@/components/home/CategoryBar";
import PropertyCard from "@/components/home/PropertyCard";
import InspirationFooter from "@/components/home/InspirationFooter.jsx";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [wishlisted, setWishlisted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlisted") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    const handler = (e) => setSearchLocation(e.detail?.location || "");
    window.addEventListener("phumeh-search", handler);
    return () => window.removeEventListener("phumeh-search", handler);
  }, []);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => phumeh.entities.Property.filter({ is_active: true }, "-created_date", 100),
  });

  const filtered = properties.filter((p) => {
    const matchCat = !selectedCategory || p.category === selectedCategory || (selectedCategory === "pools" && p.amenities?.some(a => a.toLowerCase().includes("pool")));
    const matchLoc = !searchLocation || p.location_city?.toLowerCase().includes(searchLocation.toLowerCase()) || p.location_country?.toLowerCase().includes(searchLocation.toLowerCase());
    return matchCat && matchLoc;
  });

  const toggleWishlist = (id) => {
    setWishlisted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("wishlisted", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="pb-24 md:pb-8">
      <div className="max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12">
        <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-2">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">No properties found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-2">
            {filtered.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onWishlist={toggleWishlist}
                isWishlisted={wishlisted.includes(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      <InspirationFooter />
    </div>
  );
}