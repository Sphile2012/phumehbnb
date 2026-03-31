import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, DollarSign, CalendarDays, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function HostDashboard() {
  const { user, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!user) navigateToLogin();
  }, [user]);

  const { data: listings = [], isLoading: listingsLoading } = useQuery({
    queryKey: ["host-listings", user?.email],
    queryFn: () => phumeh.entities.Property.filter({ created_by: user.email }, "-created_date", 50),
    enabled: !!user,
  });

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["host-bookings", user?.email],
    queryFn: () => phumeh.entities.Booking.filter({ host_email: user.email }, "-created_date", 50),
    enabled: !!user,
  });

  const totalEarnings = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + (b.total_price || 0), 0);

  const activeListings = listings.filter((l) => l.is_active).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.check_in) >= new Date()
  );

  const isLoading = listingsLoading || bookingsLoading;

  const statCards = [
    { title: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    { title: "Active Listings", value: activeListings, icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Bookings", value: bookings.length, icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Pending", value: pendingBookings, icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back{user?.full_name ? `, ${user.full_name}` : ""}</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your hosting activity</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">
                {isLoading ? <Skeleton className="h-7 w-16" /> : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Upcoming reservations</h2>
        {isLoading ? (
          <div className="space-y-3">
            {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        ) : upcomingBookings.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">No upcoming reservations</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium">
                    {(booking.guest_name || "G")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{booking.guest_name}</p>
                    <p className="text-sm text-gray-500">{booking.property_title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {format(new Date(booking.check_in), "MMM d")} – {format(new Date(booking.check_out), "MMM d")}
                  </p>
                  <p className="text-sm text-gray-500">${booking.total_price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to={createPageUrl("MyListings")} className="block p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <Home className="h-6 w-6 text-[#FF385C] mb-3" />
          <h3 className="font-semibold">Manage listings</h3>
          <p className="text-sm text-gray-500 mt-1">Edit or create new listings</p>
        </Link>
        <Link to={createPageUrl("CreateListing")} className="block p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <TrendingUp className="h-6 w-6 text-[#FF385C] mb-3" />
          <h3 className="font-semibold">Create new listing</h3>
          <p className="text-sm text-gray-500 mt-1">List a new property</p>
        </Link>
        <Link to={createPageUrl("Home")} className="block p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
          <Star className="h-6 w-6 text-[#FF385C] mb-3" />
          <h3 className="font-semibold">Browse properties</h3>
          <p className="text-sm text-gray-500 mt-1">See how others are listing</p>
        </Link>
      </div>
    </div>
  );
}