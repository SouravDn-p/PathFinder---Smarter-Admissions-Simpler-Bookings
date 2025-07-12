"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom-button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Edit3,
  Save,
  X,
  Calendar,
  Phone,
  ArrowLeft,
  Shield,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "@/redux/api/collegeApi";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  // Get user data from backend
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserByEmailQuery(user?.email, {
    skip: !user?.email,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
    phone: "",
    dateOfBirth: "",
  });

  const backendUser = userData?.data;
  const profileData = backendUser?.profile;

  useEffect(() => {
    if (user && backendUser) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        university: profileData.university || "",
        address: profileData.address || "",
        phone: profileData.phone || "",
        dateOfBirth: profileData.dateOfBirth || "",
      });
    }
  }, [user, backendUser, profileData]);

  // Loading state
  if (status === "loading" || userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and email are required");
      return;
    }

    try {
      await updateUser({
        email: user.email,
        data: {
          profile: {
            university: formData.university,
            address: formData.address,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
          },
        },
      }).unwrap();

      setIsEditing(false);
      refetchUser();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      university: profileData.university || "",
      address: profileData.address || "",
      phone: profileData.phone || "",
      dateOfBirth: profileData.dateOfBirth || "",
    });
    setIsEditing(false);
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  width={128}
                  height={128}
                  src={user.image || "/placeholder.svg?height=128&width=128"}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {user.name}
              </h1>
              <p className="text-xl text-blue-100 mb-2">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start text-blue-200">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Member since{" "}
                  {new Date(backendUser?.createdAt || Date.now()).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Details */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-gray-800 flex items-center">
                      <User className="w-6 h-6 mr-2 text-blue-600" />
                      Profile Information
                    </CardTitle>
                    {!isEditing && (
                      <CustomButton
                        onClick={() => setIsEditing(true)}
                        variant="primary"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </CustomButton>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-gray-700">
                            <User className="h-4 w-4 inline mr-2" />
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                            required
                            disabled
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Name cannot be changed here
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-700">
                            <Mail className="h-4 w-4 inline mr-2" />
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                            required
                            disabled
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Email cannot be changed here
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="university" className="text-gray-700">
                            <GraduationCap className="h-4 w-4 inline mr-2" />
                            University/College
                          </Label>
                          <Input
                            id="university"
                            name="university"
                            type="text"
                            value={formData.university}
                            onChange={handleChange}
                            placeholder="Enter your university/college"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-700">
                            <Phone className="h-4 w-4 inline mr-2" />
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="address" className="text-gray-700">
                            <MapPin className="h-4 w-4 inline mr-2" />
                            Address
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="dateOfBirth"
                            className="text-gray-700"
                          >
                            <Calendar className="h-4 w-4 inline mr-2" />
                            Date of Birth
                          </Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <CustomButton
                          type="submit"
                          variant="primary"
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </CustomButton>
                        <CustomButton
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                          className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </CustomButton>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-xl">
                          <Label className="text-sm font-medium text-gray-600 flex items-center mb-2">
                            <User className="h-4 w-4 mr-2 text-blue-600" />
                            Full Name
                          </Label>
                          <p className="text-lg font-medium text-gray-800">
                            {user.name}
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl">
                          <Label className="text-sm font-medium text-gray-600 flex items-center mb-2">
                            <Mail className="h-4 w-4 mr-2 text-purple-600" />
                            Email Address
                          </Label>
                          <p className="text-lg font-medium text-gray-800">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-xl">
                          <Label className="text-sm font-medium text-gray-600 flex items-center mb-2">
                            <GraduationCap className="h-4 w-4 mr-2 text-green-600" />
                            University/College
                          </Label>
                          <p className="text-lg font-medium text-gray-800">
                            {profileData.university || "Not specified"}
                          </p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl">
                          <Label className="text-sm font-medium text-gray-600 flex items-center mb-2">
                            <Phone className="h-4 w-4 mr-2 text-orange-600" />
                            Phone Number
                          </Label>
                          <p className="text-lg font-medium text-gray-800">
                            {profileData.phone || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-pink-50 rounded-xl">
                          <Label className="text-sm font-medium text-gray-600 flex items-center mb-2">
                            <MapPin className="h-4 w-4 mr-2 text-pink-600" />
                            Address
                          </Label>
                          <p className="text-lg font-medium text-gray-800">
                            {profileData.address || "Not specified"}
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-50 rounded-xl">
                          <Label className="text-sm font-medium text-gray-600 flex items-center mb-2">
                            <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                            Date of Birth
                          </Label>
                          <p className="text-lg font-medium text-gray-800">
                            {profileData.dateOfBirth
                              ? new Date(
                                  profileData.dateOfBirth
                                ).toLocaleDateString()
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Settings */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 ">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center ">
                    <Settings className="w-5 h-5 mr-2 text-blue-600" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Link href="/update-password">
                    <CustomButton
                      variant="outline"
                      className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 mb-2"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </CustomButton>
                  </Link>
                  <Link href="/my-college">
                    <CustomButton
                      variant="outline"
                      className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      My College
                    </CustomButton>
                  </Link>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    Account Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {backendUser?.applications?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      {new Date(
                        backendUser?.createdAt || Date.now()
                      ).getFullYear()}
                    </div>
                    <div className="text-sm text-gray-600">Member Since</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
