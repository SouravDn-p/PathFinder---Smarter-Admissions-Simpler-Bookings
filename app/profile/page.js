"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { updateProfile } = useAuth();
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      university: user.university || "",
      address: user.address || "",
    });
  }, [user, router]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    const updatedUser = {
      ...user,
      ...formData,
    };

    updateProfile(updatedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      university: user.university || "",
      address: user.address || "",
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-xl opacity-90">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Details */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">
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
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">
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
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="university">
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">
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
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name
                      </Label>
                      <p className="text-lg font-medium">{user.name}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address
                      </Label>
                      <p className="text-lg font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      <GraduationCap className="h-4 w-4 inline mr-2" />
                      University/College
                    </Label>
                    <p className="text-lg font-medium">
                      {user.university || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Address
                    </Label>
                    <p className="text-lg font-medium">
                      {user.address || "Not specified"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
