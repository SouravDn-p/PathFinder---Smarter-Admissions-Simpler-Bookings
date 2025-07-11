"use client";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useGetReviewsQuery } from "@/redux/api/collegeApi";
import Image from "next/image";

export default function StudentReviews() {
  const { data: reviewsData, isLoading, error } = useGetReviewsQuery();
  const reviews = reviewsData?.data || [];

  // Get latest 6 reviews for home page
  const latestReviews = reviews.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-blue-400 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-purple-400 rounded-full animate-float animation-delay-3000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 w-64 bg-gray-300 rounded mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-300 rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className="bg-white/95 backdrop-blur-sm border-0 animate-pulse"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="flex mb-3 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-gray-300 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Unable to Load Reviews
          </h3>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </section>
    );
  }

  if (latestReviews.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600">
            Be the first to share your college experience!
          </p>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-20 h-20 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-purple-400 rounded-full animate-float animation-delay-3000"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-yellow-400 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute top-20 right-10 w-14 h-14 bg-pink-400 rounded-full animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Quote className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Student{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our students about their incredible college experiences
            and academic journeys
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestReviews.map((review, index) => (
            <Card
              key={review._id}
              className="group bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote className="w-4 h-4 text-white" />
                </div>

                <div className="p-6">
                  {/* User Info */}
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      {review.userImage ? (
                        <Image
                          width={48}
                          height={48}
                          src={review.userImage || "/placeholder.svg"}
                          alt={review.userName}
                          className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300">
                          <span className="text-white font-semibold text-lg">
                            {review.userName?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {review.userName}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 transition-colors duration-200 ${
                            i < review.rating
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="relative">
                    <p className="text-gray-700 leading-relaxed line-clamp-4 group-hover:text-gray-800 transition-colors duration-300">
                      {review.comment}
                    </p>
                  </div>
                </div>

                {/* Bottom Gradient */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Reviews Button */}
        {reviews.length > 6 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Star className="w-5 h-5 mr-2" />
              View All {reviews.length} Reviews
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {reviews.length}+
            </div>
            <div className="text-gray-600">Student Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {reviews.length > 0
                ? (
                    reviews.reduce((acc, review) => acc + review.rating, 0) /
                    reviews.length
                  ).toFixed(1)
                : "0.0"}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {reviews.filter((review) => review.rating >= 4).length}
            </div>
            <div className="text-gray-600">4+ Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
