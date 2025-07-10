import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/wrapper/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Path Finder - Your Gateway to Higher Education",
  description:
    "Discover and book college services with ease. Find the perfect college for your future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-right" />
          </AuthProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
