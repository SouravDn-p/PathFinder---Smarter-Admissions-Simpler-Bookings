"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useGetUserByEmailQuery,
  useGetAllCollegesQuery,
  useGetReviewsQuery,
} from "@/redux/api/collegeApi";
import MyCollegeLoading from "@/components/loadings/MyCollegeLoading";
import ReviewForm from "@/components/myCollege/ReviewForm";
import ReviewList from "@/components/myCollege/ReviewList";
import CustomButton from "@/components/custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Star,
  Users,
  BookOpen,
  Trophy,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function MyCollege() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Get user data
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserByEmailQuery(session?.user?.email, {
    skip: !session?.user?.email,
  });

  // Get all colleges data
  const { data: collegesData, isLoading: collegesLoading } =
    useGetAllCollegesQuery();

  // Get reviews for the college
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useGetReviewsQuery(userData?.data?.collegeId, {
    skip: !userData?.data?.collegeId,
  });

  // Loading state
  if (status === "loading" || userLoading || collegesLoading) {
    return <MyCollegeLoading />;
  }

  // Redirect if not authenticated
  if (!session) {
    router.push("/login");
    return null;
  }

  const user = userData?.data;
  const colleges = collegesData?.data || [];
  const applications = user?.applications || [];
  const reviews = reviewsData?.data || [];

  // Find the college by ID
  const college = colleges.find((c) => c._id === user?.collegeId);

  // Get the latest application
  const latestApplication = applications[applications.length - 1];

  const handleReviewAdded = () => {
    refetchReviews();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // If no applications
  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My College</h1>
            <p className="text-xl text-blue-100">
              Your college application dashboard
            </p>
          </div>
        </section>

        {/* No Applications */}
        <section className="py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  No Applications Yet
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  You haven&apos;t applied to any colleges yet. Start your
                  journey by applying to your dream college!
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/admission">
                    <CustomButton variant="primary" size="lg">
                      Apply Now
                    </CustomButton>
                  </Link>
                  <Link href="/colleges">
                    <CustomButton
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Browse Colleges
                    </CustomButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My College</h1>
          <p className="text-xl text-blue-100">
            Your college application dashboard
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* College Information */}
            <div className="lg:col-span-2">
              {college ? (
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                        <GraduationCap className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-gray-800">
                          {college.name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{college.rating}</span>
                          <span className="text-gray-500 ml-1">
                            ({reviews.length} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">
                          {college.stats?.students}
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {college.stats?.faculty}
                        </div>
                        <div className="text-sm text-gray-600">Faculty</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <Trophy className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          {college.stats?.programs}
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-xl">
                        <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-600">
                          {college.established}
                        </div>
                        <div className="text-sm text-gray-600">Established</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        About
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {college.description}
                      </p>
                    </div>

                    {/* Facilities */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Facilities
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {college.facilities?.map((facility, index) => (
                          <div
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            {facility}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Contact Information
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center text-gray-700">
                          <Phone className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-sm">{college.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Mail className="w-4 h-4 mr-2 text-purple-600" />
                          <span className="text-sm">{college.email}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Globe className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-sm">{college.website}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      College Information Not Found
                    </h3>
                    <p className="text-gray-600">
                      The college information is not available at the moment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Application Status */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    Application Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {latestApplication && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge
                          className={`${getStatusColor(
                            latestApplication.status
                          )} flex items-center space-x-1`}
                        >
                          {getStatusIcon(latestApplication.status)}
                          <span className="capitalize">
                            {latestApplication.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">
                          {latestApplication.subject}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Applied:</span>
                        <span className="text-sm">
                          {new Date(
                            latestApplication.submittedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <Link href="/admission">
                        <CustomButton
                          variant="outline"
                          className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                        >
                          Apply to Another College
                        </CustomButton>
                      </Link>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Review Form */}
              {college && (
                <ReviewForm
                  collegeId={college._id.toString()}
                  onReviewAdded={handleReviewAdded}
                />
              )}
            </div>
          </div>

          {/* Reviews Section */}
          {college && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Student Reviews
              </h2>
              <ReviewList reviews={reviews} isLoading={reviewsLoading} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
