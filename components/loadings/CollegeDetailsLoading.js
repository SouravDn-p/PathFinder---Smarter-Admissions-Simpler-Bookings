import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CollegeDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Loading */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            {/* Back Button */}
            <div className="h-6 w-32 bg-white/20 rounded mb-6"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Title and Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-80 bg-white/20 rounded"></div>
                  <div className="h-8 w-16 bg-white/20 rounded-full"></div>
                </div>

                {/* Info Items */}
                <div className="space-y-3 mb-6">
                  <div className="h-5 w-48 bg-white/20 rounded"></div>
                  <div className="h-5 w-40 bg-white/20 rounded"></div>
                  <div className="h-5 w-36 bg-white/20 rounded"></div>
                </div>

                {/* Description */}
                <div className="space-y-2 mb-8">
                  <div className="h-4 w-full bg-white/20 rounded"></div>
                  <div className="h-4 w-4/5 bg-white/20 rounded"></div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <div className="h-12 w-32 bg-white/20 rounded-xl"></div>
                  <div className="h-12 w-28 bg-white/20 rounded-xl"></div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="h-32 bg-white/20 rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Loading */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="h-8 w-16 bg-gray-300 rounded mx-auto mb-2"></div>
                <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Loading */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            {/* Tab Headers */}
            <div className="flex space-x-4 mb-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-24 bg-gray-300 rounded-lg"
                ></div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {[...Array(2)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 w-48 bg-gray-300 rounded"></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
