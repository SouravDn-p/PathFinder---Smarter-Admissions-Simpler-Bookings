"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Search, Compass, Star, Zap } from "lucide-react";
import CustomButton from "@/components/custom-button";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-20"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-20"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-20"></div>

        {/* Interactive Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Star className="w-8 h-8 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float animation-delay-1000">
          <Compass className="w-6 h-6 text-blue-400 opacity-60" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-2000">
          <Zap className="w-7 h-7 text-purple-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse leading-none">
            404
          </div>

          {/* Glitch Effect */}
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-red-500 opacity-20 animate-ping">
            404
          </div>

          <div className="text-2xl md:text-4xl font-bold mb-4 animate-bounce">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Oops! Lost in Space
            </span>
          </div>
        </div>

        {/* Astronaut Illustration */}
        <div className="mb-8 relative">
          <div className="w-64 h-64 mx-auto relative">
            {/* Planet */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 animate-spin-slow">
              <div className="w-48 h-48 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Crater Effects */}
                <div className="absolute top-4 left-8 w-6 h-6 bg-purple-600 rounded-full opacity-50"></div>
                <div className="absolute bottom-8 right-6 w-4 h-4 bg-indigo-600 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-30"></div>

                {/* Search Icon in Center */}
                <Search className="w-16 h-16 text-white animate-pulse" />
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-orbit"></div>
            <div className="absolute bottom-0 right-1/2 w-3 h-3 bg-pink-400 rounded-full animate-orbit-reverse"></div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Page Not Found in This Galaxy
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have drifted into a black
            hole. Don&apos;t worry, our navigation system will help you find
            your way back to explore amazing colleges!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <CustomButton
              variant="primary"
              size="lg"
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Home className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Return Home</span>
            </CustomButton>
          </Link>

          <Link href="/colleges">
            <CustomButton
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 bg-transparent group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Search className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Explore Colleges</span>
            </CustomButton>
          </Link>
        </div>

        {/* Fun Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">500+ Colleges</h3>
            <p className="text-blue-200 text-sm">
              Discover amazing institutions waiting for you
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Navigation</h3>
            <p className="text-blue-200 text-sm">
              Find your perfect college with our smart search
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Apply</h3>
            <p className="text-blue-200 text-sm">
              Apply to your dream college in just a few clicks
            </p>
          </div>
        </div>

        {/* Easter Egg */}
        <div className="mt-12 text-center">
          <p className="text-blue-300 text-sm opacity-60">
            Fun fact: You&apos;re the {Math.floor(Math.random() * 1000) + 1}th
            explorer to visit this cosmic error page! 🚀
          </p>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          from {
            transform: rotate(0deg) translateX(-120px) rotate(0deg);
          }
          to {
            transform: rotate(-360deg) translateX(-120px) rotate(360deg);
          }
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
