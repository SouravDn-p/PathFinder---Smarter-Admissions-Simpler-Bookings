export default function SearchLoading() {
  return (
    <div className="animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-4 items-center">
          <div className="flex-1 h-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-14 w-24 bg-gray-300 rounded-xl"></div>
          <div className="h-14 w-20 bg-gray-300 rounded-xl"></div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 w-20 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}
