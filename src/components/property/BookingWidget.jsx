import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { createPageUrl } from "@/utils";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { differenceInDays } from "date-fns";

const ZAR = (usd) => `R ${(usd * 18.5).toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

export default function BookingWidget({ property }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const nights = checkIn && checkOut ? Math.max(0, differenceInDays(new Date(checkOut), new Date(checkIn))) : 0;
  const subtotal = nights * (property.price_per_night || 0);
  const cleaningFee = property.cleaning_fee || 0;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;
  const today = new Date().toISOString().split("T")[0];

  const handleReserve = async () => {
    if (!checkIn || !checkOut) { toast.error("Please select check-in and check-out dates"); return; }
    if (nights <= 0) { toast.error("Check-out must be after check-in"); return; }
    setLoading(true);
    if (!user) { navigate('/login'); setLoading(false); return; }
    await phumeh.entities.Booking.create({
      property_id: property.id,
      property_title: property.title,
      property_image: property.images?.[0] || "",
      property_location: `${property.location_city}, ${property.location_country}`,
      host_email: property.created_by,
      guest_email: user.email,
      guest_name: user.full_name || user.email,
      check_in: checkIn,
      check_out: checkOut,
      guests_count: guests,
      total_price: total * 18.5,
      nights,
      status: "confirmed",
    });
    toast.success("Booking confirmed! 🎉");
    navigate(createPageUrl("Trips"));
    setLoading(false);
  };

  return (
    <div className="border border-gray-200 rounded-2xl shadow-xl p-6 sticky top-20" id="mobile-booking-widget">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[22px] font-semibold">{ZAR(property.price_per_night)}</span>
          <span className="text-gray-500"> / night</span>
        </div>
        {property.average_rating > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-black" />
            <span className="font-medium">{property.average_rating.toFixed(2)}</span>
            {property.review_count > 0 && <span className="text-gray-500">· {property.review_count} reviews</span>}
          </div>
        )}
      </div>

      <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">Check-in</label>
            <input type="date" value={checkIn} min={today}
              onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
              className="text-sm w-full outline-none cursor-pointer text-gray-800" />
          </div>
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">Checkout</label>
            <input type="date" value={checkOut} min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-sm w-full outline-none cursor-pointer text-gray-800" />
          </div>
        </div>
        <div className="border-t border-gray-300 p-3 flex items-center justify-between">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">Guests</label>
            <span className="text-sm text-gray-800">{guests} guest{guests > 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1}
              className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-800 transition-colors disabled:opacity-40">−</button>
            <span className="w-5 text-center text-sm font-medium">{guests}</span>
            <button onClick={() => setGuests(Math.min(property.max_guests || 16, guests + 1))} disabled={guests >= (property.max_guests || 16)}
              className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-800 transition-colors">+</button>
          </div>
        </div>
      </div>

      <Button onClick={handleReserve} disabled={loading}
        className="w-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-90 text-white font-semibold text-base py-6 rounded-xl">
        {loading ? "Reserving…" : "Reserve"}
      </Button>

      <p className="text-center text-gray-500 text-sm mt-3">You won't be charged yet</p>

      {nights > 0 && (
        <div className="mt-4 space-y-2.5 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-700">
            <span className="underline">{ZAR(property.price_per_night)} × {nights} night{nights !== 1 ? "s" : ""}</span>
            <span>{ZAR(subtotal)}</span>
          </div>
          {cleaningFee > 0 && (
            <div className="flex justify-between text-sm text-gray-700">
              <span className="underline">Cleaning fee</span>
              <span>{ZAR(cleaningFee)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-700">
            <span className="underline">Phumeh service fee</span>
            <span>{ZAR(serviceFee)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t border-gray-200">
            <span>Total before taxes</span>
            <span>{ZAR(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}