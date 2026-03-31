import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CalendarDays, MapPin, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

export default function Trips() {
  const { user, navigateToLogin } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) navigateToLogin();
  }, [user]);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-trips", user?.email],
    queryFn: () => phumeh.entities.Booking.filter({ guest_email: user.email }, "-created_date", 50),
    enabled: !!user,
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => phumeh.entities.Booking.update(id, { status: "cancelled" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      toast.success("Booking cancelled");
    },
  });

  const upcomingTrips = bookings.filter((b) => b.status !== "cancelled" && new Date(b.check_in) >= new Date());
  const pastTrips = bookings.filter((b) => b.status === "cancelled" || new Date(b.check_in) < new Date());

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 pb-24">
      <h1 className="text-3xl font-bold mb-8">Trips</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20">
          <CalendarDays className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
          <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
          <Link to={createPageUrl("Home")}>
            <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg px-6">
              Start searching
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {upcomingTrips.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
              <div className="space-y-4">
                {upcomingTrips.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onCancel={(id) => cancelMutation.mutate(id)} />
                ))}
              </div>
            </div>
          )}

          {pastTrips.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Past trips</h2>
              <div className="space-y-4">
                {pastTrips.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} isPast />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function BookingCard({ booking, onCancel, isPast }) {
  const img = booking.property_image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&auto=format&fit=crop";
  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <Link to={createPageUrl("PropertyDetail") + `?id=${booking.property_id}`} className="sm:w-48 h-40 sm:h-auto shrink-0">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 p-4 sm:py-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{booking.property_title || "Property"}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" /> {booking.property_location}
            </p>
          </div>
          <Badge className={statusColors[booking.status]}>
            {booking.status}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {format(new Date(booking.check_in), "MMM d")} – {format(new Date(booking.check_out), "MMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" /> {booking.guests_count} guest{booking.guests_count > 1 ? 's' : ''}
          </span>
          <span className="font-semibold text-[#222222]">${booking.total_price}</span>
        </div>
        {!isPast && booking.status !== "cancelled" && (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 text-sm"
            onClick={() => onCancel?.(booking.id)}
          >
            <X className="h-3.5 w-3.5 mr-1" /> Cancel booking
          </Button>
        )}
      </div>
    </div>
  );
}