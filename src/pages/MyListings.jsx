import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Pencil, Trash2, Eye, EyeOff, MapPin, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyListings() {
  const { user, navigateToLogin } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) navigateToLogin();
  }, [user]);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["my-listings", user?.email],
    queryFn: () => phumeh.entities.Property.filter({ created_by: user.email }, "-created_date", 50),
    enabled: !!user,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }) => phumeh.entities.Property.update(id, { is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-listings"] });
      toast.success("Listing updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => phumeh.entities.Property.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-listings"] });
      toast.success("Listing deleted");
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your listings</h1>
        <Link to={createPageUrl("CreateListing")}>
          <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg gap-2">
            <Plus className="h-4 w-4" /> Create new
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20">
          <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
          <p className="text-gray-500 mb-6">Start hosting by creating your first listing.</p>
          <Link to={createPageUrl("CreateListing")}>
            <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg px-6">
              Create listing
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => {
            const img = listing.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&auto=format&fit=crop";
            return (
              <div key={listing.id} className="flex flex-col sm:flex-row gap-4 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <Link to={createPageUrl("PropertyDetail") + `?id=${listing.id}`} className="sm:w-52 h-40 sm:h-auto shrink-0">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 p-4 sm:py-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                        <Badge variant={listing.is_active ? "default" : "secondary"} className={listing.is_active ? "bg-green-100 text-green-800" : ""}>
                          {listing.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5" /> {listing.location_city}, {listing.location_country}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" /> ${listing.price_per_night}/night
                        </span>
                        {listing.average_rating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-[#222222]" /> {listing.average_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => toggleMutation.mutate({ id: listing.id, is_active: !listing.is_active })}
                      >
                        {listing.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-9 w-9 text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your listing.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => deleteMutation.mutate(listing.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}