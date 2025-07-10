"use client";
import { useState } from "react";

import HeroSection from "@/components/Home/hero-section";
import SearchSection from "@/components/Home/search-section";
import CollegeCard from "@/components/Home/college-card";
import { Button } from "@/components/ui/button";
import GalleryImages from "@/components/Home/gallery-images";
import StudentReviews from "@/components/Home/studentReviews";

// Mock data for colleges
const mockColleges = [
  {
    id: 1,
    name: "Harvard University",
    image:
      "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    admissionDate: "Dec 2024",
    researchCount: 150,
    events: ["Tech Fest", "Cultural Night"],
    sports: ["Basketball", "Soccer"],
    description:
      "World-renowned university known for excellence in education and research.",
  },
  {
    id: 2,
    name: "MIT",
    image:
      "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    admissionDate: "Jan 2025",
    researchCount: 200,
    events: ["Innovation Summit", "Robotics Fair"],
    sports: ["Tennis", "Swimming"],
    description: "Leading institution in technology and engineering education.",
  },
  {
    id: 3,
    name: "Stanford University",
    image:
      "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    admissionDate: "Feb 2025",
    researchCount: 180,
    events: ["Startup Expo", "AI Conference"],
    sports: ["Football", "Baseball"],
    description:
      "Premier university fostering innovation and entrepreneurship.",
  },
];

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      const results = mockColleges.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SearchSection onSearch={handleSearch} />

      {/* Search Results */}
      {showResults && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Search Results
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Colleges */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Colleges
            </h2>
            <p className="text-xl text-gray-600">
              Discover top-rated institutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </section>

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
