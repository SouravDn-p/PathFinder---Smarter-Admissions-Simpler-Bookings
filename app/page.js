"use client";
import { useState } from "react";

import HeroSection from "@/components/Home/hero-section";
import { Button } from "@/components/ui/button";
import GalleryImages from "@/components/Home/gallery-images";
import StudentReviews from "@/components/Home/studentReviews";
import SearchCollege from "@/components/Home/SearchCollege";
import ResearchSection from "@/components/Home/research-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection />
      <SearchCollege />
      {/* Gallery Section */}
      <GalleryImages />

      {/* Research Papers */}
      <ResearchSection />

      {/* Reviews Section */}
      <StudentReviews />
    </div>
  );
}
