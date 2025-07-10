import CustomButton from "../../../components/custom-button";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  BookOpen,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Target,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getAllColleges from "@/lib/getAllColleges";
import CollegeNotFound from "@/components/college/CollegeNotFound";

const allColleges = getAllColleges();

export default function CollegeDetailsPage({ params }) {
  const college = allColleges.find((col) => col.id === Number(params.id));

  if (!college) {
    return <CollegeNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/colleges"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Colleges
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-5xl font-bold">{college.name}</h1>
                <Badge className="bg-yellow-500 text-white border-0">
                  <Star className="w-4 h-4 mr-1" />
                  {college.rating}
                </Badge>
              </div>

              <div className="space-y-3 text-blue-100 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  {college.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  Established {college.established}
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-3" />
                  {college.type}
                </div>
              </div>

              <p className="text-lg text-blue-100 mb-8">
                {college.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <CustomButton variant="warning" size="lg">
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Website
                </CustomButton>
                <CustomButton
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </CustomButton>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {college.images?.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-32 rounded-xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${college.name} ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )) || (
                  // Fallback if no images array
                  <div className="col-span-2 relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={college.image || "/placeholder.svg"}
                      alt={college.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {college.stats.students}
              </div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {college.stats.faculty}
              </div>
              <div className="text-gray-600">Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {college.stats.programs}
              </div>
              <div className="text-gray-600">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {college.stats.campusSize}
              </div>
              <div className="text-gray-600">Campus Size</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="admission" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="admission">Admission</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
            </TabsList>

            {/* Admission Process */}
            <TabsContent value="admission" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-zinc-950">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Admission Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {college.admissionProcess.requirements.map(
                        (req, index) => (
                          <li
                            key={index}
                            className="flex items-start text-gray-700"
                          >
                            <div className="w-2 h-2  bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {req}
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Clock className="w-5 h-5 mr-2 text-purple-600" />
                      Important Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 text-gray-700 bg-blue-50 rounded-lg">
                      <span className="font-medium">Early Action</span>
                      <span className="text-blue-600 font-semibold">
                        {college.admissionProcess.deadlines.earlyAction}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 text-gray-700 bg-purple-50 rounded-lg">
                      <span className="font-medium">Regular Decision</span>
                      <span className="text-purple-600 font-semibold">
                        {college.admissionProcess.deadlines.regularDecision}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 text-gray-700 bg-green-50 rounded-lg">
                      <span className="font-medium">Financial Aid</span>
                      <span className="text-green-600 font-semibold">
                        {college.admissionProcess.deadlines.financialAid}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 font-bold">
                      Tuition & Fees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {college.admissionProcess.tuition}
                    </div>
                    <p className="text-gray-600">
                      Annual tuition for undergraduate programs
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 font-bold">
                      Acceptance Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {college.admissionProcess.acceptanceRate}
                    </div>
                    <p className="text-gray-600">Admission selectivity rate</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Events */}
            <TabsContent value="events" className="space-y-6">
              <div className="grid gap-6">
                {college.events.map((event, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {event.name}
                          </h3>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Research */}
            <TabsContent value="research" className="space-y-6">
              <div className="grid gap-6">
                {college.research.map((research, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {research.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {research.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {research.department}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-green-600">
                            {research.funding}
                          </div>
                          <div className="text-sm text-gray-500">Funding</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sports */}
            <TabsContent value="sports" className="space-y-6">
              <div className="grid gap-6">
                {college.sports.map((sport, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {sport.name}
                          </h3>
                          <div className="flex items-center text-blue-600 mb-3">
                            <Trophy className="w-4 h-4 mr-2" />
                            {sport.level}
                          </div>
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-700 mb-2">
                              Recent Achievements:
                            </h4>
                            <ul className="space-y-1">
                              {sport.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="text-gray-600 text-sm flex items-start"
                                >
                                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-sm text-gray-500">
                            <strong>Facilities:</strong> {sport.facilities}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Campus Facilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {college.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">{college.phone}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{college.email}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
              <p className="text-gray-600">{college.website}</p>
            </div>
          </div>
          <Link href="/admission">
            <CustomButton variant="primary" size="xl">
              Apply Now
            </CustomButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
