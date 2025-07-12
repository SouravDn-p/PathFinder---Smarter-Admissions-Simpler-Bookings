"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  GraduationCap,
  Award,
  Play,
  Star,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: GraduationCap,
      number: "500+",
      label: "Top Colleges",
      color: "from-emerald-400 to-cyan-500",
    },
    {
      icon: Users,
      number: "50K+",
      label: "Happy Students",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Award,
      number: "95%",
      label: "Success Rate",
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Animated Blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-20"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-20"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-20"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-float animation-delay-1000 opacity-80"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-300 rounded-full animate-float animation-delay-2000 opacity-40"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-float animation-delay-3000 opacity-70"></div>

        {/* Grid Pattern */}
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div> */}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`text-white space-y-6 lg:space-y-8 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                #1 Education Platform
              </span>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Your Future
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                  Starts Here
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-lg leading-relaxed">
                Connect with top colleges and universities. Book facilities,
                explore programs, and begin your
                <span className="text-yellow-300 font-semibold">
                  {" "}
                  extraordinary{" "}
                </span>
                educational journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/colleges" className="group">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group-hover:shadow-2xl">
                  <span className="flex items-center">
                    Explore Colleges
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link href="/admission" className="group">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-indigo-900 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 bg-white/5 backdrop-blur-sm hover:scale-105 group-hover:shadow-xl"
                >
                  <span className="flex items-center">
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Apply Now
                  </span>
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isActive = currentStat === index;
                return (
                  <div
                    key={index}
                    className={`text-center transition-all duration-500 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${
                        stat.color
                      } rounded-2xl mb-3 mx-auto shadow-lg ${
                        isActive ? "animate-pulse" : ""
                      }`}
                    >
                      <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="text-xl lg:text-3xl font-bold mb-1">
                      {stat.number}
                    </div>
                    <div className="text-blue-200 text-xs lg:text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-4 opacity-80">
              <div className="flex items-center text-sm text-blue-200">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center text-sm text-blue-200">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span>98% Placement Rate</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Image Section */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-3xl transform scale-110"></div>

              {/* Main Image */}
              <div className="relative w-full h-64 sm:h-80 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                <Image
                  src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students celebrating graduation"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-lg">
                          Live Campus Tour
                        </div>
                        <div className="text-blue-200 text-sm">
                          Join 1,234 students online
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Cards */}
            <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 lg:p-4 shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm lg:text-base">
                    Top Rated
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">
                    Universities
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 lg:p-4 shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm lg:text-base">
                    24/7 Support
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">
                    Available
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Floating Elements */}
            <div className="absolute top-1/4 -right-2 lg:top-1/3 lg:-right-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 lg:p-3 shadow-xl animate-bounce">
              <GraduationCap className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>

            <div className="absolute top-2/3 -left-2 lg:top-3/4 lg:-left-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 lg:p-3 shadow-xl animate-pulse">
              <Star className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>

            {/* Success Stories Ticker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hidden lg:block">
              <div className="flex items-center space-x-2 text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sarah just got admitted to MIT!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Mobile Optimized */}
        <div className="mt-12 lg:mt-20 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white">
            <span className="text-sm lg:text-base">
              🎉 Join thousands of successful students
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
