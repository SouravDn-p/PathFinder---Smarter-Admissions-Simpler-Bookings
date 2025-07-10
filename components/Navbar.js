"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-800 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:to-white transition-all duration-300">
                PathFinder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: "Home" },
              { href: "/colleges", label: "Colleges" },
              { href: "/admission", label: "Admission" },
              ...(session?.user
                ? [{ href: "/my-college", label: "My College" }]
                : []),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative">
                      <Image
                        width={32}
                        height={32}
                        src={
                          session?.user?.image ||
                          "/placeholder.svg?height=32&width=32"
                        }
                        alt={session?.user.name || "User"}
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="font-medium">{session?.user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-xl border-0 shadow-2xl rounded-2xl p-2 mt-2"
                >
                  <div className="px-4 py-3 border-b border-gray-200/50 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          width={40}
                          height={40}
                          src={
                            session?.user?.image ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={session?.user.name || "User"}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {session?.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {session?.user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center cursor-pointer px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-black hover:text-white transition-all duration-300 group "
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3  group-hover:scale-110  hover:text-white transition-transform duration-300">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium   ">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 group text-red-600 hover:text-white"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <LogOut className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-full px-6"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-b-2xl border-t border-white/20">
              {[
                { href: "/", label: "Home" },
                { href: "/colleges", label: "Colleges" },
                { href: "/admission", label: "Admission" },
                ...(session?.user
                  ? [{ href: "/my-college", label: "My College" }]
                  : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg mx-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {session?.user ? (
                <div className="border-t border-white/20 mt-4 pt-4">
                  <div className="flex items-center px-4 py-3 bg-white/10 rounded-lg mx-2 mb-3">
                    <div className="relative">
                      <Image
                        width={40}
                        height={40}
                        src={
                          session?.user.image ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={session?.user.name || "User"}
                        className="w-10 h-10 rounded-full border-2 border-white/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-white block">
                        {session?.user.name}
                      </span>
                      <span className="text-white/70 text-sm">Online</span>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-shadow-gray-950 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg mx-2 "
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center w-full px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all duration-300 rounded-lg mx-2"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/20 mt-4 pt-4 space-y-3 mx-2">
                  <Link
                    href="/login"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-lg"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
