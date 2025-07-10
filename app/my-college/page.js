"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Home,
  FileText,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function MyCollege() {
  const { data: session } = useSession();
  const { user } = session;
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Load applications
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    setApplications(savedApplications);

    // Load reviews
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews(savedReviews);
  }, [user, router]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!newReview.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    if (applications.length === 0) {
      toast.error("Please apply to a college first to leave a review");
      return;
    }

    const reviewData = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userImage: user.profileImage,
      college: applications[0].college.name, // Use first application's college
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, reviewData];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    // Also update global reviews for home page
    const globalReviews = JSON.parse(
      localStorage.getItem("globalReviews") || "[]"
    );
    globalReviews.push(reviewData);
    localStorage.setItem("globalReviews", JSON.stringify(globalReviews));

    setNewReview({ rating: 5, comment: "" });
    toast.success("Review submitted successfully!");
  };

  const handleEditReview = (review) => {
    setEditingReview({
      ...review,
      comment: review.comment,
    });
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();

    const updatedReviews = reviews.map((review) =>
      review.id === editingReview.id ? editingReview : review
    );

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    // Update global reviews
    const globalReviews = JSON.parse(
      localStorage.getItem("globalReviews") || "[]"
    );
    const updatedGlobalReviews = globalReviews.map((review) =>
      review.id === editingReview.id ? editingReview : review
    );
    localStorage.setItem("globalReviews", JSON.stringify(updatedGlobalReviews));

    setEditingReview(null);
    toast.success("Review updated successfully!");
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    // Update global reviews
    const globalReviews = JSON.parse(
      localStorage.getItem("globalReviews") || "[]"
    );
    const updatedGlobalReviews = globalReviews.filter(
      (review) => review.id !== reviewId
    );
    localStorage.setItem("globalReviews", JSON.stringify(updatedGlobalReviews));

    toast.success("Review deleted successfully!");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My College</h1>
          <p className="text-xl">
            Manage your college applications and reviews
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applications Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Applications</h2>

            {applications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 mb-4">
                    You haven't applied to any colleges yet.
                  </p>
                  <Button onClick={() => router.push("/admission")}>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ) : (
              applications.map((application, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{application.college.name}</span>
                      <span className="text-sm text-green-600 font-normal">
                        Application Submitted
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          <FileText className="h-4 w-4 inline mr-1" />
                          Subject/Major
                        </Label>
                        <p className="font-medium">{application.subject}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          <Mail className="h-4 w-4 inline mr-1" />
                          Email
                        </Label>
                        <p className="font-medium">
                          {application.candidateEmail}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          <Phone className="h-4 w-4 inline mr-1" />
                          Phone
                        </Label>
                        <p className="font-medium">
                          {application.candidatePhone}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Date of Birth
                        </Label>
                        <p className="font-medium">{application.dateOfBirth}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        <Home className="h-4 w-4 inline mr-1" />
                        Address
                      </Label>
                      <p className="font-medium">{application.address}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Applied on:{" "}
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Reviews Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Reviews</h2>

            {/* Add Review Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setNewReview((prev) => ({ ...prev, rating: star }))
                          }
                          className={`p-1 ${
                            star <= newReview.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                      <span className="text-sm text-gray-600">
                        {newReview.rating} star
                        {newReview.rating !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea
                      id="comment"
                      placeholder="Write your review about the college..."
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Reviews */}
            {reviews.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Reviews</h3>
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      {editingReview && editingReview.id === review.id ? (
                        <form
                          onSubmit={handleUpdateReview}
                          className="space-y-4"
                        >
                          <div>
                            <Label>Rating</Label>
                            <div className="flex items-center space-x-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setEditingReview((prev) => ({
                                      ...prev,
                                      rating: star,
                                    }))
                                  }
                                  className={`p-1 ${
                                    star <= editingReview.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  <Star className="h-5 w-5 fill-current" />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label>Comment</Label>
                            <Textarea
                              value={editingReview.comment}
                              onChange={(e) =>
                                setEditingReview((prev) => ({
                                  ...prev,
                                  comment: e.target.value,
                                }))
                              }
                              rows={3}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button type="submit" size="sm">
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingReview(null)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 text-yellow-400 fill-current"
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                {review.college}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditReview(review)}
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
