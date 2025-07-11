import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CollegeLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {[...Array(6)].map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden bg-white shadow-lg border-0 rounded-2xl animate-pulse w-full"
        >
          <CardHeader className="p-0 relative">
            {/* Image Skeleton */}
            <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              {/* Rating Badge Skeleton */}
              <div className="absolute top-4 right-4">
                <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
              </div>
              {/* Title Skeleton */}
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="h-6 w-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Events and Sports */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
              <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
            </div>

            {/* Button */}
            <div className="h-12 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
