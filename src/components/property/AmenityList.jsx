import React from "react";
import {
  Wifi, Tv, Car, Utensils, Snowflake, Flame, WashingMachine,
  Waves, Dumbbell, ShieldCheck, Wind, Bath, Coffee, TreePine
} from "lucide-react";

const amenityIcons = {
  "WiFi": Wifi,
  "TV": Tv,
  "Free parking": Car,
  "Kitchen": Utensils,
  "Air conditioning": Snowflake,
  "Heating": Flame,
  "Washer": WashingMachine,
  "Pool": Waves,
  "Gym": Dumbbell,
  "Security cameras": ShieldCheck,
  "Hair dryer": Wind,
  "Bathtub": Bath,
  "Coffee maker": Coffee,
  "Garden": TreePine,
};

export default function AmenityList({ amenities }) {
  if (!amenities?.length) return null;

  return (
    <div>
      <h2 className="text-[22px] font-semibold mb-6">What this place offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || ShieldCheck;
          return (
            <div key={amenity} className="flex items-center gap-4 py-2">
              <Icon className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
              <span className="text-base">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}