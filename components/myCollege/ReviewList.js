"use client";
import { Star, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function ReviewList({ reviews, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="bg-white/95 backdrop-blur-sm border-0 animate-pulse"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 bg-gray-300 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-0">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600">
            Be the first to share your experience with this college!
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card
          key={review._id}
          className="bg-white/95 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <div className="relative">
                {review.userImage ? (
                  <Image
                    src={review.userImage || "/placeholder.svg"}
                    alt={review.userName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {review.userName}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.rating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-3 leading-relaxed">
                  {review.comment}
                </p>

                <p className="text-sm text-gray-500">
                  {formatDate(review.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
