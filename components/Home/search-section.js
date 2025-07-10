"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "../ui/input";

export default function SearchSection({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find Your Perfect
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            College
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover top colleges and universities that match your dreams and
          aspirations
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-2 border border-white/50 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center flex-1 px-4">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <Input
                type="text"
                placeholder="Search for colleges, universities, or programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus:ring-0 text-lg placeholder-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              Search
            </Button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Engineering", "Medical", "Business", "Arts", "Science"].map(
            (category) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 bg-transparent"
                onClick={() => onSearch(category)}
              >
                {category}
              </Button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
