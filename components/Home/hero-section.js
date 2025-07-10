import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Your Future
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  Starts
                </span>
                <br />
                Here
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-lg">
                Connect with top colleges and universities. Book facilities,
                explore programs, and begin your educational journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/colleges">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
                  Explore Colleges
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/admission">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Apply Now
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-2 mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Colleges</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-2 mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-2 mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-blue-200 text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students celebrating graduation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Top Rated</div>
                  <div className="text-sm text-gray-600">Universities</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">24/7 Support</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
