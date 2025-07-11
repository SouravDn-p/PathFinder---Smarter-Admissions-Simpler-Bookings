"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom-button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Star,
  User,
  Mail,
  Phone,
  Home,
  FileText,
  Upload,
  GraduationCap,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  useGetAllCollegesQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "@/redux/api/collegeApi";
import CollegeLoading from "@/components/loadings/CollegeLoading";
import Image from "next/image";
import AdmissionLoading from "@/components/loadings/AdmissionLoading";

export default function Admission() {
  const { data: session, status } = useSession();
  const { data: collegesData, error, isLoading } = useGetAllCollegesQuery();
  const colleges = collegesData?.data;
  const user = session?.user;
  const router = useRouter();

  // Get user data
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserByEmailQuery(user?.email, {
    skip: !user?.email,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    image: null,
  });

  // Check if user already has applications
  useEffect(() => {
    if (userData?.data?.applications?.length > 0) {
      // User has existing applications
    }
  }, [userData]);

  const handleCollegeSelect = (college) => {
    if (!user) {
      alert("Please login to apply for admission");
      router.push("/login");
      return;
    }
    setSelectedCollege(college);
    setFormData({
      candidateName: user.name || "",
      subject: "",
      candidateEmail: user.email || "",
      candidatePhone: userData?.data?.profile?.phone || "",
      address: userData?.data?.profile?.address || "",
      dateOfBirth: userData?.data?.profile?.dateOfBirth || "",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCollege) {
      alert("Please select a college first");
      return;
    }

    // Validate form
    if (
      !formData.candidateName ||
      !formData.subject ||
      !formData.candidateEmail ||
      !formData.candidatePhone ||
      !formData.address ||
      !formData.dateOfBirth
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Create application data
      const applicationData = {
        id: Date.now().toString(),
        collegeId: selectedCollege._id,
        collegeName: selectedCollege.name,
        subject: formData.subject,
        status: "pending",
        submittedAt: new Date().toISOString(),
        candidateInfo: {
          name: formData.candidateName,
          email: formData.candidateEmail,
          phone: formData.candidatePhone,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
        },
      };

      // Get existing applications
      const existingApplications = userData?.data?.applications || [];
      const updatedApplications = [...existingApplications, applicationData];

      // Update user with new application
      const res = await updateUser({
        email: user.email,
        data: {
          collegeId: selectedCollege._id,
          applications: updatedApplications,
          profile: {
            phone: formData.candidatePhone,
            address: formData.address,
            dateOfBirth: formData.dateOfBirth,
          },
        },
      }).unwrap();

      console.log("User updated:", res);

      setIsSubmitted(true);
      refetchUser();
    } catch (error) {
      console.error("Application submission error:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  // Loading states
  if (status === "loading" || userLoading) {
    return <AdmissionLoading />;
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Application Submitted!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Your application to <strong>{selectedCollege?.name}</strong> has
              been submitted successfully.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">
                What&apos;s Next?
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You&apos;ll receive a confirmation email shortly</li>
                <li>• The college will review your application</li>
                <li>• You&apos;ll be notified of the admission decision</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Link href="/my-college" className="flex-1">
                <CustomButton variant="primary" className="w-full">
                  View My Applications
                </CustomButton>
              </Link>
              <Link href="/" className="flex-1">
                <CustomButton
                  variant="outline"
                  className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Go Home
                </CustomButton>
              </Link>
            </div>
          </CardContent>
        </Card>
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

      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            College Admission
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Start your journey to higher education by applying to your dream
            college
          </p>
        </div>
      </section>

      {/* College Selection */}
      {!selectedCollege && (
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Select a College
            </h2>

            {isLoading ? (
              <CollegeLoading />
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Failed to Load Colleges
                </h3>
                <p className="text-gray-600">Please try refreshing the page</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges?.map((college) => (
                  <Card
                    key={college._id}
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/95 backdrop-blur-sm border-0"
                    onClick={() => handleCollegeSelect(college)}
                  >
                    <CardContent className="p-6">
                      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={
                            college.image ||
                            "/placeholder.svg?height=128&width=300"
                          }
                          alt={college.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {college.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{college.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">
                            {college.rating}
                          </span>
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          Apply Now →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Application Form */}
      {selectedCollege && (
        <section className="py-16 relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setSelectedCollege(null)}
                    className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div>
                    <CardTitle className="text-2xl text-gray-800">
                      Apply to {selectedCollege.name}
                    </CardTitle>
                    <p className="text-gray-600">
                      Fill out the form below to submit your application
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="candidateName" className="text-gray-700">
                        <User className="h-4 w-4 inline mr-2" />
                        Candidate Name *
                      </Label>
                      <Input
                        id="candidateName"
                        name="candidateName"
                        type="text"
                        value={formData.candidateName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-gray-700">
                        <FileText className="h-4 w-4 inline mr-2" />
                        Subject/Major *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Enter your desired major"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="candidateEmail" className="text-gray-700">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address *
                      </Label>
                      <Input
                        id="candidateEmail"
                        name="candidateEmail"
                        type="email"
                        value={formData.candidateEmail}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="candidatePhone" className="text-gray-700">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number *
                      </Label>
                      <Input
                        id="candidatePhone"
                        name="candidatePhone"
                        type="tel"
                        value={formData.candidatePhone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-gray-700">
                      <Home className="h-4 w-4 inline mr-2" />
                      Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full address"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-gray-700">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-gray-700">
                      <Upload className="h-4 w-4 inline mr-2" />
                      Profile Photo
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload a recent photo (optional)
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      className="flex-1"
                      disabled={isUpdating}
                      size="lg"
                    >
                      {isUpdating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </CustomButton>
                    <CustomButton
                      type="button"
                      variant="outline"
                      className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => setSelectedCollege(null)}
                    >
                      Back to Selection
                    </CustomButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Login Prompt for Non-authenticated Users */}
      {!user && (
        <section className="py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Ready to Apply?
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Please login to your account to start your college application
                  process
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/login">
                    <CustomButton variant="primary" size="lg">
                      Login
                    </CustomButton>
                  </Link>
                  <Link href="/register">
                    <CustomButton
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Register
                    </CustomButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
