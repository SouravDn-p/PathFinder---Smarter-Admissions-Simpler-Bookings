"use client";
import { useState } from "react";
import CollegeCard from "@/components/Home/college-card";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import getAllColleges from "@/lib/getAllColleges";

// Extended mock data for colleges page
const allColleges = getAllColleges();

const ITEMS_PER_PAGE = 6;

export default function CollegesPage() {
  const [colleges, setColleges] = useState(allColleges);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filtered = allColleges.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setColleges(filtered);
    } else {
      setColleges(allColleges);
    }
    setCurrentPage(1); // Reset to first page after search
  };

  // Pagination logic
  const totalPages = Math.ceil(colleges.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentColleges = colleges.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">All Colleges</h1>
          <p className="text-xl text-blue-100">
            Explore our comprehensive list of partner institutions
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <form
            onSubmit={handleSearch}
            className="flex gap-4 items-center max-w-2xl mx-auto"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl"
            >
              Search
            </Button>
            <Button
              variant="google"
              className="px-6 py-3 rounded-xl border-2 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </form>
        </div>
      </section>

      {/* Colleges Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, colleges.length)} of{" "}
              {colleges.length} colleges
            </h2>
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {colleges.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                No colleges found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                variant="google"
                className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;

                  // Show first page, last page, current page, and pages around current page
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        onClick={() => goToPage(page)}
                        variant={isCurrentPage ? "default" : "google"}
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentPage
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-transparent hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </Button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <Button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                variant="google"
                className="px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
