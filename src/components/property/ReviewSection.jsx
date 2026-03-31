import React, { useState } from "react";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";

function StarRating({ value, onChange, size = "sm" }) {
  const s = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange?.(star)}>
          <Star
            className={`${s} transition-colors ${
              star <= value ? "fill-[#222222] text-[#222222]" : "text-gray-300"
            } ${onChange ? "cursor-pointer hover:text-[#222222]" : ""}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({ propertyId }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: () => phumeh.entities.Review.filter({ property_id: propertyId }, "-created_date", 50),
  });

  const addReviewMutation = useMutation({
    mutationFn: async (data) => {
      return phumeh.entities.Review.create({
        ...data,
        property_id: propertyId,
        reviewer_name: user?.full_name || user?.email || "Guest",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", propertyId] });
      setShowForm(false);
      setComment("");
      setRating(5);
      toast.success("Review submitted!");
    },
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        {avgRating && (
          <>
            <Star className="h-5 w-5 fill-[#222222]" />
            <span className="text-xl font-semibold">{avgRating}</span>
            <span className="text-xl">·</span>
          </>
        )}
        <span className="text-xl font-semibold">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Review Form */}
      {showForm ? (
        <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4">
          <h4 className="font-medium">Write a review</h4>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Rating</span>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>
          <Textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="h-24"
          />
          <div className="flex gap-3">
            <Button onClick={() => setShowForm(false)} variant="outline" className="rounded-lg">Cancel</Button>
            <Button
              onClick={() => addReviewMutation.mutate({ rating, comment })}
              className="bg-[#222222] hover:bg-black text-white rounded-lg"
              disabled={!comment.trim()}
            >
              Submit Review
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setShowForm(true)}
          variant="outline"
          className="mb-8 rounded-lg font-medium"
        >
          Write a review
        </Button>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {(review.reviewer_name || "?")[0].toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-sm">{review.reviewer_name}</p>
                <p className="text-gray-500 text-xs">{format(new Date(review.created_date), "MMMM yyyy")}</p>
              </div>
            </div>
            <StarRating value={review.rating} size="sm" />
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}