import Link from "next/link";
import React from "react";
import CustomButton from "../custom-button";
import { ArrowLeft } from "lucide-react";

const CollegeNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🏫</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            College Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Sorry, we couldn&apos;t find the college you&apos;re looking for. It
            may have been moved or doesn&apos;t exist.
          </p>
          <Link href="/colleges">
            <CustomButton variant="primary" size="lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Colleges
            </CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeNotFound;
