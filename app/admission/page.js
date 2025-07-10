"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const colleges = [
  { id: 1, name: "Harvard University", location: "Cambridge, MA", rating: 4.9 },
  { id: 2, name: "Stanford University", location: "Stanford, CA", rating: 4.8 },
  { id: 3, name: "MIT", location: "Cambridge, MA", rating: 4.9 },
  { id: 4, name: "Yale University", location: "New Haven, CT", rating: 4.7 },
  {
    id: 5,
    name: "Princeton University",
    location: "Princeton, NJ",
    rating: 4.8,
  },
  { id: 6, name: "Columbia University", location: "New York, NY", rating: 4.6 },
];

export default function Admission() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    image: null,
  });

  const handleCollegeSelect = (college) => {
    if (!user) {
      toast.error("Please login to apply for admission");
      router.push("/login");
      return;
    }
    setSelectedCollege(college);
    setFormData({
      candidateName: user.name || "",
      subject: "",
      candidateEmail: user.email || "",
      candidatePhone: "",
      address: "",
      dateOfBirth: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCollege) {
      toast.error("Please select a college first");
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
      toast.error("Please fill in all required fields");
      return;
    }

    // Store application data
    const applicationData = {
      college: selectedCollege,
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Get existing applications
    const existingApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    existingApplications.push(applicationData);
    localStorage.setItem("applications", JSON.stringify(existingApplications));

    toast.success("Application submitted successfully!");
    router.push("/my-college");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            College Admission
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Start your journey to higher education by applying to your dream
            college
          </p>
        </div>
      </section>

      {/* College Selection */}
      {!selectedCollege && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Select a College
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <Card
                  key={college.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCollegeSelect(college)}
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {college.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">
                        {college.rating}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      {selectedCollege && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Apply to {selectedCollege.name}
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below to submit your application
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="candidateName">
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
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">
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
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="candidateEmail">
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
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="candidatePhone">
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
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">
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
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">
                      <Upload className="h-4 w-4 inline mr-2" />
                      Profile Photo
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload a recent photo (optional)
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="flex-1">
                      Submit Application
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedCollege(null)}
                    >
                      Back to College Selection
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {!user && (
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-gray-600 mb-6">
              Please login to your account to start your college application
              process
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
