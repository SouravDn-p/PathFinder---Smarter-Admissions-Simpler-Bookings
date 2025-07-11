"use client";
import { useState } from "react";

import HeroSection from "@/components/Home/hero-section";
import { Button } from "@/components/ui/button";
import GalleryImages from "@/components/Home/gallery-images";
import StudentReviews from "@/components/Home/studentReviews";
import SearchCollege from "@/components/Home/SearchCollege";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection />
      <SearchCollege />
      {/* Gallery Section */}
      <GalleryImages />

      {/* Research Papers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Research Papers
            </h2>
            <p className="text-xl text-gray-600">
              Latest research from our partner institutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "AI in Education: Future Perspectives",
              "Sustainable Campus Development",
              "Student Mental Health Research",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                >
                  Read More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <StudentReviews />
    </div>
  );
}
