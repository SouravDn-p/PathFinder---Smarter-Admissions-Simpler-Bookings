import { Card, CardContent } from "@/components/ui/card";

export default function AdmissionLoading() {
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

      {/* College Selection Loading */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-12 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className="bg-white/95 backdrop-blur-sm border-0 animate-pulse"
              >
                <CardContent className="p-6">
                  <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-300 rounded mr-1"></div>
                      <div className="h-4 w-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Login Prompt Loading */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-pulse">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-6"></div>
              <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-4"></div>
              <div className="h-6 w-96 bg-gray-300 rounded mx-auto mb-8"></div>
              <div className="flex justify-center space-x-4">
                <div className="h-12 w-24 bg-gray-300 rounded-xl"></div>
                <div className="h-12 w-28 bg-gray-300 rounded-xl"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
