import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function MyCollegeLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Loading */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-pulse">
          <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-6"></div>
          <div className="h-12 w-80 bg-white/20 rounded mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-white/20 rounded mx-auto"></div>
        </div>
      </section>

      {/* Content Loading */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* College Info Loading */}
            <div className="lg:col-span-2">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-pulse">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-2xl"></div>
                    <div className="flex-1">
                      <div className="h-8 w-64 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="h-8 w-16 bg-gray-300 rounded mx-auto mb-2"></div>
                        <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {[...Array(6)].map((_, index) => (
                        <div
                          key={index}
                          className="h-4 w-full bg-gray-300 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Status Loading */}
            <div className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-pulse">
                <CardHeader>
                  <div className="h-6 w-40 bg-gray-300 rounded"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-10 w-full bg-gray-300 rounded-xl"></div>
                </CardContent>
              </Card>

              {/* Review Form Loading */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-pulse">
                <CardHeader>
                  <div className="h-6 w-32 bg-gray-300 rounded"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 bg-gray-300 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="h-24 w-full bg-gray-300 rounded-xl"></div>
                  <div className="h-10 w-full bg-gray-300 rounded-xl"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reviews Loading */}
          <div className="mt-12">
            <div className="h-8 w-48 bg-gray-300 rounded mb-6 animate-pulse"></div>
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
          </div>
        </div>
      </section>
    </div>
  );
}
