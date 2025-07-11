"use client";
import { useState } from "react";
import { Star, Send } from "lucide-react";
import CustomButton from "../custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useAddReviewMutation } from "@/redux/api/collegeApi";

export default function ReviewForm({ collegeId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      alert("Please provide both rating and comment");
      return;
    }

    try {
      await addReview({
        collegeId,
        rating,
        comment: comment.trim(),
      }).unwrap();

      // Reset form
      setRating(0);
      setComment("");

      // Notify parent component
      if (onReviewAdded) {
        onReviewAdded();
      }

      alert("Review added successfully!");
    } catch (error) {
      console.error("Add review error:", error);
      alert(error?.data?.error || "Failed to add review");
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Add Your Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-gray-700 mb-2 block">Rating *</Label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    star <= (hoveredRating || rating)
                      ? "bg-yellow-500 text-white shadow-lg transform scale-110"
                      : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="text-gray-700 mb-2 block">
              Your Review *
            </Label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this college..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 resize-none bg-white text-gray-900 placeholder-gray-400"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          <CustomButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading || !rating || !comment.trim()}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </CustomButton>
        </form>
      </CardContent>
    </Card>
  );
}
