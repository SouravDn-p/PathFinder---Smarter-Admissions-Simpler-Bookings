import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
            <Search className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have taken a study
            break. Let&apos;s get you back to exploring amazing colleges!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/colleges">
            <Button variant="outline" size="lg" className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Browse Colleges
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Still can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}
