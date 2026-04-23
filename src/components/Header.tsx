"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "@/components/ui/Link";
import Button from "@/components/ui/Button";
import { theme } from "@/lib/theme";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-transparent"
      style={{ borderImage: theme.gradients.frenchFlag + " 1" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3"
            variant="default"
          >
            <div className="relative">
              <Image
                src="/french-icon.png"
                alt="French Skill Logo"
                width={48}
                height={48}
                className="rounded-full shadow-french-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-french-red">
                French Skill
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Apprendre à parler français
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" variant="nav">
              Home
            </Link>
            <Link href="/courses" variant="nav">
              Courses
            </Link>
            <Link href="/blog" variant="nav">
              Blog
            </Link>
            <Link href="/#about" variant="nav">
              About
            </Link>
            <Link href="/#contact" variant="nav">
              Contact
            </Link>
          </nav>

          {/* Primary CTA Button */}
          <div className="hidden md:flex items-center">
            <Button href="/courses" variant="primary" size="md">
              <span>Explore Courses</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-french-blue hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-french-blue focus:ring-inset p-2 rounded-lg"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:text-french-blue hover:bg-gray-50 font-medium rounded-lg"
                variant="default"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="block px-4 py-3 text-gray-700 hover:text-french-blue hover:bg-gray-50 font-medium rounded-lg"
                variant="default"
              >
                Courses
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-gray-700 hover:text-french-blue hover:bg-gray-50 font-medium rounded-lg"
                variant="default"
              >
                Blog
              </Link>
              <Link
                href="/#about"
                className="block px-4 py-3 text-gray-700 hover:text-french-blue hover:bg-gray-50 font-medium rounded-lg"
                variant="default"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="block px-4 py-3 text-gray-700 hover:text-french-blue hover:bg-gray-50 font-medium rounded-lg"
                variant="default"
              >
                Contact
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Button href="/courses" variant="primary" fullWidth>
                  <span>Explore Courses</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
