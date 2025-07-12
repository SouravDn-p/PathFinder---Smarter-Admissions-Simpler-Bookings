"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllCollegesQuery } from "@/redux/api/collegeApi";
import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  Heart,
  TrendingUp,
  Award,
  Clock,
  FileText,
  Sparkles,
  ArrowRight,
  University,
  DollarSign,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResearchSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const isVisible = true;
  const { data: allColleges, isLoading, error } = useGetAllCollegesQuery();

  // Extract colleges data from the API response
  const colleges = allColleges?.data;

  // Extract and format research papers from colleges data
  const formatResearchPapers = (collegesData) => {
    if (!Array.isArray(collegesData)) return [];

    const allResearch = [];
    const colors = [
      {
        color: "from-blue-500 to-cyan-500",
        bgColor: "from-blue-50 to-cyan-50",
      },
      {
        color: "from-green-500 to-emerald-500",
        bgColor: "from-green-50 to-emerald-50",
      },
      {
        color: "from-purple-500 to-pink-500",
        bgColor: "from-purple-50 to-pink-50",
      },
      {
        color: "from-orange-500 to-red-500",
        bgColor: "from-orange-50 to-red-50",
      },
      {
        color: "from-indigo-500 to-blue-500",
        bgColor: "from-indigo-50 to-blue-50",
      },
      {
        color: "from-teal-500 to-green-500",
        bgColor: "from-teal-50 to-green-50",
      },
    ];

    collegesData.forEach((college, collegeIndex) => {
      if (Array.isArray(college.research)) {
        college.research.forEach((research, researchIndex) => {
          const colorIndex = (collegeIndex + researchIndex) % colors.length;
          const id =
            college._id || college.id || `${collegeIndex}-${researchIndex}`;
          const randomViews = Math.floor(Math.random() * 3000) + 500;
          const randomDownloads = Math.floor(Math.random() * 1000) + 100;
          const randomLikes = Math.floor(Math.random() * 300) + 50;
          const readTime = Math.floor(Math.random() * 15) + 5;

          allResearch.push({
            id: `${id}-${researchIndex}`,
            collegeId: college._id,
            title: research.title,
            category: research.department || "Research",
            author: "Research Team",
            institution: college.name,
            publishDate: "2024",
            readTime: `${readTime} min read`,
            views: `${(randomViews / 1000).toFixed(1)}K`,
            downloads: randomDownloads.toString(),
            likes: randomLikes.toString(),
            description:
              research.description ||
              "Comprehensive research conducted by students and faculty members.",
            funding: research.funding || "N/A",
            tags: [
              research.department?.split(" ")[0] || "Research",
              "Student Research",
              college.type?.replace(" University", "") || "Academic",
            ],
            featured: collegeIndex < 3,
            ...colors[colorIndex],
            college: {
              name: college.name,
              location: college.location,
              established: college.established,
              website: college.website,
              image: college.image,
            },
          });
        });
      }
    });

    return allResearch;
  };

  const researchPapers = formatResearchPapers(colleges);
  const featuredPapers = researchPapers
    .filter((paper) => paper.featured)
    .slice(0, 3);
  const regularPapers = researchPapers
    .filter((paper) => !paper.featured)
    .slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <BookOpen className="w-16 h-16 mx-auto text-red-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Failed to Load Research Papers
            </h3>
            <p className="text-gray-600">
              We&apos;re having trouble loading the research data. Please try
              again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && researchPapers.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Research Papers Coming Soon
            </h3>
            <p className="text-gray-600">
              We&apos;re currently collecting research papers from our partner
              universities. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="research-section"
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-purple-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-green-400 rounded-full animate-float animation-delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">
              Student Research
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Research
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Papers
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover groundbreaking research conducted by students from our
            recommended universities
          </p>
        </div>

        {/* Featured Papers */}
        {featuredPapers.length > 0 && (
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-500" />
                Featured Research
              </h3>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                Top Universities
              </Badge>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredPapers.map((paper, index) => (
                <Card
                  key={paper.id}
                  className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(paper.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${paper.color}`}></div>

                  <CardContent className="p-6 lg:p-8">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium text-gray-900"
                      >
                        {paper.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{paper.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300  h-8 truncate ">
                      {paper.title}
                    </h4>

                    {/* University Info */}
                    <div className="flex items-center mb-4 text-sm text-gray-600">
                      <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        {paper.college.image ? (
                          <Image
                            width={400}
                            height={400}
                            src={paper.college.image || "/placeholder.svg"}
                            alt={paper.institution}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <University
                          className="w-5 h-5 text-white"
                          style={{
                            display: paper.college.image ? "none" : "block",
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {paper.institution}
                        </div>
                        <div className="text-xs">
                          {paper.college.established}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {paper.description}
                    </p>

                    {/* Funding Info */}
                    {paper.funding && paper.funding !== "N/A" && (
                      <div className="flex items-center mb-4 text-sm text-green-600 bg-green-50 rounded-lg p-2">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          Funding: {paper.funding}
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {paper.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{paper.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{paper.downloads}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{paper.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{paper.publishDate}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`colleges/${paper.collegeId}`}
                      // className="inline-block absolute bottom-2 w-fit left-25 "
                    >
                      <Button
                        className={`w-full bg-gradient-to-r ${paper.color} hover:shadow-lg transition-all duration-300 text-white border-0 group-hover:scale-105`}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Read Full Paper
                        <ArrowRight
                          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                            hoveredCard === paper.id ? "translate-x-1" : ""
                          }`}
                        />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="text-center mt-8 sm:hidden">
          <Button variant="outline" className="w-full bg-transparent">
            View All Research Papers
            <TrendingUp className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
