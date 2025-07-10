"use client";

import { useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Calendar,
  BookOpen,
  Trophy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const colleges = [
  {
    id: 1,
    name: "Harvard University",
    image:
      "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Cambridge, MA",
    admissionDate: "2024-12-01",
    rating: 4.9,
    events: ["Academic Conference", "Sports Tournament", "Cultural Festival"],
    research: "Leading research in Medicine, Law, and Business",
    sports: ["Football", "Basketball", "Swimming", "Tennis"],
    description: "One of the most prestigious universities in the world...",
  },
  {
    id: 2,
    name: "Stanford University",
    image:
      "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Stanford, CA",
    admissionDate: "2024-11-15",
    rating: 4.8,
    events: ["Innovation Summit", "Tech Conference", "Art Exhibition"],
    research: "Cutting-edge technology and innovation research",
    sports: ["Soccer", "Tennis", "Golf", "Track and Field"],
    description: "Leading institution in technology and innovation...",
  },
  {
    id: 3,
    name: "MIT",
    image:
      "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Cambridge, MA",
    admissionDate: "2024-12-15",
    rating: 4.9,
    events: ["Science Fair", "Robotics Competition", "Innovation Lab"],
    research: "Advanced engineering and technology research",
    sports: ["Rowing", "Sailing", "Basketball", "Soccer"],
    description: "Premier institution for science and technology...",
  },
];

const galleryImages = [
  "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const researchPapers = [
  {
    title: "Artificial Intelligence in Modern Education",
    authors: "Dr. Sarah Johnson, MIT",
    link: "#",
    year: "2024",
  },
  {
    title: "Sustainable Energy Solutions for Campus",
    authors: "Prof. Michael Chen, Stanford",
    link: "#",
    year: "2024",
  },
  {
    title: "Digital Transformation in Higher Education",
    authors: "Dr. Emily Rodriguez, Harvard",
    link: "#",
    year: "2023",
  },
  {
    title: "Blockchain Technology in Academic Records",
    authors: "Prof. David Kim, MIT",
    link: "#",
    year: "2023",
  },
];

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    college: "Harvard University",
    rating: 5,
    comment:
      "Excellent faculty and amazing campus facilities. The research opportunities are outstanding.",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "Maria Garcia",
    college: "Stanford University",
    rating: 5,
    comment:
      "Great innovation culture and supportive environment. The tech resources are world-class.",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "James Wilson",
    college: "MIT",
    rating: 5,
    comment:
      "The engineering programs are exceptional. Great networking opportunities and career support.",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function Home() {
  const { data: session, isLoading, error } = useSession();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filtered = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges([]);
    }
  };
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  console.log(session);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect College
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing colleges, explore their facilities, and start your
            journey to higher education
          </p>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {filteredColleges.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Search Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map((college) => (
                <Card
                  key={college.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      width={400}
                      height={400}
                      src={college.image}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        {college.rating}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {college.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        Admission: {college.admissionDate}
                      </span>
                    </div>
                    <Link href={`/colleges/${college.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Colleges Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Colleges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <Card
                key={college.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    width={400}
                    height={400}
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {college.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{college.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      Admission: {college.admissionDate}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      Research: {college.research}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {college.sports.slice(0, 3).map((sport, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        <Trophy className="h-3 w-3 mr-1" />
                        {sport}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/colleges/${college.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            College Life Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  width={500}
                  height={500}
                  src={image}
                  alt={`College life ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Research Papers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchPapers.map((paper, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{paper.title}</h3>
                  <p className="text-gray-600 mb-2">{paper.authors}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{paper.year}</span>
                    <a
                      href={paper.link}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Read Paper
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Student Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      width={500}
                      height={500}
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
