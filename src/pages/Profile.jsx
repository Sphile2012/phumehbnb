import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User, Mail, Shield, LogOut, Home, CalendarDays, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Profile() {
  const { user, logout, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!user) navigateToLogin();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  const menuItems = [
    { label: "My trips", icon: CalendarDays, href: createPageUrl("Trips") },
    { label: "Wishlists", icon: Heart, href: createPageUrl("Wishlists") },
    { label: "Manage listings", icon: Home, href: createPageUrl("MyListings") },
    { label: "Host dashboard", icon: Shield, href: createPageUrl("HostDashboard") },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-10 pb-24">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      {/* User Card */}
      <Card className="mb-8 border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0">
              {(user.full_name || user.email)[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold truncate">{user.full_name || "Guest"}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Member since {new Date(user.created_date).getFullYear()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu */}
      <div className="space-y-1 mb-8">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full py-6 text-base font-medium rounded-xl border-gray-300"
        onClick={() => logout()}
      >
        <LogOut className="h-4 w-4 mr-2" /> Log out
      </Button>
    </div>
  );
}