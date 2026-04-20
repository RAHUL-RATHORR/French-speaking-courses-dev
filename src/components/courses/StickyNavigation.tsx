"use client";

import { useState, useEffect, useMemo } from "react";
import { CourseWithSections } from "@/types/course";

interface StickyNavigationProps {
  course: CourseWithSections;
  onDownloadBrochure: () => void;
  onEnroll: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StickyNavigation({ course, onDownloadBrochure, onEnroll }: StickyNavigationProps) {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Navigation links for the course page
  const navLinks = useMemo(() => [
    { label: "Overview", href: "#overview" },
    { label: "Why Enroll", href: "#why-enroll" },
    { label: "Benefits", href: "#benefits" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Fees", href: "#fees" },
    { label: "Skills & Tools", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faqs" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show navigation after scrolling past the hero section (approximately 300px)
      setIsVisible(scrollY > 300);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom > 120;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleSmoothScroll = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 100; // Account for sticky nav height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100 shadow-lg" : "-translate-y-full opacity-0 shadow-none"
      }`}
    >
  {/* Course Navigation Bar (hidden on mobile) */}
  <div className="hidden sm:block h-20 bg-white/96 backdrop-blur-md border-b border-slate-200/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left side - Course info and back button */}
  

            {/* Center - Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 overflow-hidden">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleSmoothScroll(link.href)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap relative ${
                    activeSection === link.href.substring(1)
                      ? "text-blue-700 bg-blue-50 border border-blue-200 shadow-sm"
                      : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.substring(1) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onDownloadBrochure}
                className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-blue-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                <span className="hidden md:inline">Brochure</span>
              </button>
              
              <button
                onClick={onEnroll}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg font-medium text-sm shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="hidden sm:inline">Enroll Now</span>
                <span className="sm:hidden">Enroll</span>
              </button>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <MobileNavigationMenu 
                  navLinks={navLinks}
                  activeSection={activeSection}
                  onSectionClick={handleSmoothScroll}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress Bar */}
      <CourseProgressBar />
    </div>
  );
}

// Mobile Navigation Menu Component
function MobileNavigationMenu({ 
  navLinks, 
  activeSection, 
  onSectionClick 
}: {
  navLinks: Array<{ label: string; href: string }>;
  activeSection: string;
  onSectionClick: (href: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  onSectionClick(link.href);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                    : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Course Progress Bar Component
function CourseProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-1 bg-slate-200">
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
