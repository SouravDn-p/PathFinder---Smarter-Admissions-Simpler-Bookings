import React, { useState } from "react";
import CollegeCard from "./college-card";
import { useGetAllCollegesQuery } from "@/redux/api/collegeApi";
import SearchSection from "./search-section";
import CollegeLoading from "../loadings/CollegeLoading";

const SearchCollege = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { data, error, isLoading, refetch } = useGetAllCollegesQuery();
  const allColleges = data?.data;

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      const results = allColleges.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  return (
    <div>
      {/* Search Results */}
      <SearchSection onSearch={handleSearch} />

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
          {isLoading ? (
            <CollegeLoading />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allColleges?.slice(0, 3).map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchCollege;
