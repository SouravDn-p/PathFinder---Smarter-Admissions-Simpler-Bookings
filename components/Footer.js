import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              PathFinder
            </h3>
            <p className="text-gray-300 mb-4">
              Your gateway to higher education. Discover and book college
              services with ease.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer" />
              <Twitter className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer" />
              <Instagram className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/colleges"
                  className="hover:text-white transition-colors"
                >
                  Colleges
                </a>
              </li>
              <li>
                <a
                  href="/admission"
                  className="hover:text-white transition-colors"
                >
                  Admission
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  College Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Application Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Career Guidance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Scholarship Info
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@PathFinder.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Education St, Learning City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PathFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
