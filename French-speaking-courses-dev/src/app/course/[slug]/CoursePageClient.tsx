"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import {
  HeroBanner,
  Overview,
  WhyEnroll,
  Benefits,
  Curriculum,
  Fees,
  SkillsTools,
  Reviews,
  FAQ,
  Comparison,
  BatchSchedule,
  CTA,
} from "@/components/courses/sections";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import {
  CourseWithSections,
  CourseModule,
  CourseFeature,
} from "@/types/course";
import { downloadBrochure } from "@/lib/brochure-utils";
import { formatRupee } from "@/lib/utils";
import StickyNavigation from "@/components/courses/StickyNavigation";

interface CoursePageClientProps {
  course: CourseWithSections;
}

export default function CoursePageClient({ course }: CoursePageClientProps) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const handleDownloadBrochure = async () => {
    const success = await downloadBrochure(course?.slug);
    if (!success) {
      alert(
        "Sorry, there was an issue downloading the brochure. Please try again or contact support."
      );
    }
  };

  const handleEnroll = () => {
    setIsRegistrationModalOpen(true);
  };
  // Navigation links for the page
  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Why to Enroll?", href: "#why-enroll" },
    { label: "Benefits", href: "#benefits" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Fees", href: "#fees" },
    { label: "Skills & Tools", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faqs" },
  ];

  // Handle CTA actions
  const handleCTAClick = async (action: string) => {
    if (action === "enroll" || action === "register") {
      setIsRegistrationModalOpen(true);
    } else if (action === "download_brochure") {
      // Handle brochure download using utility function with course slug
      const success = await downloadBrochure(course?.slug);
      if (!success) {
        alert(
          "Sorry, there was an issue downloading the brochure. Please try again or contact support."
        );
      }
    } else if (action === "contact") {
      // Handle contact action
      window.location.href = "/support/contact";
    }
    // Add more actions as needed
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <StickyNavigation
        course={course}
        onDownloadBrochure={handleDownloadBrochure}
        onEnroll={handleEnroll}
      />
      {/* Navigation Links */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6 whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 py-2 px-3 rounded-lg transition-colors duration-200 hover:bg-blue-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => handleCTAClick("download_brochure")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-lg transition-all duration-300 transform hover:scale-105 ml-4 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}

      {/* Hero Banner Section */}
      {course.heroBannerSection && (
        <HeroBanner
          section={course.heroBannerSection}
          onCTAClick={handleCTAClick}
        />
      )}

      {/* Overview Section */}
      {course.overviewSection ? (
        <div id="overview">
          <Overview
            section={course.overviewSection}
            onCTAClick={handleCTAClick}
          />
        </div>
      ) : (
        // Fallback Overview Section
        <section id="overview" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-800 mb-6">
                  Course Overview
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                  {course.description ||
                    `Master the French language with our comprehensive ${course.title} program. 
                  Designed for learners of all levels, this course combines interactive lessons, 
                  practical exercises, and cultural insights to help you achieve fluency in French.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
                  <div className="text-blue-600 text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Course Duration
                  </h3>
                  <p className="text-slate-600">
                    {course.duration ? course.duration.replace(/months?|weeks?/gi, 'hours') : "40 hours of intensive learning"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-grey-50 to-green-100 p-8 rounded-xl border border-green-200">
                  <div className="text-grey-600 text-3xl mb-4">👥</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Class Type
                  </h3>
                  <p className="text-slate-600">
                    Interactive live sessions with expert instructors
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
                  <div className="text-purple-600 text-3xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Certification
                  </h3>
                  <p className="text-slate-600">
                    Official certificate upon course completion
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => setIsRegistrationModalOpen(true)}
                  disabled={course.registrationOpen === false}
                  className={`bg-gradient-to-r ${
                    course.registrationOpen !== false
                      ? "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 cursor-pointer"
                      : "from-gray-400 to-gray-500 cursor-not-allowed opacity-80"
                  } text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300`}
                >
                  {course.registrationOpen !== false ? "Enroll Now" : "Registration Closed"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Curriculum Section */}
      {course.curriculumSection ? (
        <div id="curriculum">
          <Curriculum
            section={course.curriculumSection}
            onDownloadBrochure={() => handleCTAClick("download_brochure")}
          />
        </div>
      ) : Array.isArray(course.modules) && course.modules.length > 0 ? (
        // Legacy modules section
        <section id="curriculum" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Course Curriculum
            </h2>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Elevate your French language skills with our modules and unlock
                new communication opportunities.
              </p>
              <button
                onClick={() => handleCTAClick("download_brochure")}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                DOWNLOAD BROCHURE
              </button>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
              {Array.isArray(course.modules) && course.modules.map((module: CourseModule, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6"
                >
                  <div className="bg-slate-800 text-white p-4 rounded-t-xl">
                    <h3 className="text-xl font-semibold flex items-center">
                      <span className="w-8 h-8 bg-blue-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      Module {index + 1}: {module.title}
                    </h3>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="mb-4">
                      <h4 className="font-semibold text-blue-700 mb-2">
                        Learning Outcomes
                      </h4>
                      <p className="text-slate-700 mb-2">
                        {module.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">
                        Topics Covered
                      </h4>
                      <ul className="space-y-2">
                        {Array.isArray(module.lessons) && module.lessons.map(
                          (lesson: string, lessonIndex: number) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center text-slate-700"
                            >
                              <svg
                                className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{lesson}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        // Fallback Curriculum Section - continues with same pattern...
        <section id="curriculum" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
              Course Curriculum
            </h2>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed">
                Our comprehensive French curriculum is designed to take you from
                beginner to advanced level through structured modules and
                interactive learning experiences.
              </p>
              <button
                onClick={() => handleCTAClick("download_brochure")}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                DOWNLOAD BROCHURE
              </button>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Module 1 */}
              <div className="border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="w-10 h-10 bg-blue-400 text-slate-900 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                      1
                    </span>
                    Introduction to French
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">
                      Learning Outcomes
                    </h4>
                    <p className="text-slate-700 mb-4">
                      Master basic French pronunciation, essential vocabulary,
                      and fundamental grammar structures.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">
                      Topics Covered
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "French alphabet and pronunciation",
                        "Basic greetings and introductions",
                        "Numbers, dates, and time",
                        "Common verbs and present tense",
                        "Essential vocabulary (family, colors, food)",
                        "Simple sentence structures",
                      ].map((lesson, i) => (
                        <div
                          key={i}
                          className="flex items-center text-slate-700"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="w-10 h-10 bg-blue-400 text-slate-900 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                      2
                    </span>
                    Building Conversations
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">
                      Learning Outcomes
                    </h4>
                    <p className="text-slate-700 mb-4">
                      Develop conversational skills and expand vocabulary for
                      everyday situations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">
                      Topics Covered
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Asking questions and giving directions",
                        "Shopping and restaurant conversations",
                        "Past and future tenses",
                        "Describing people and places",
                        "Express opinions and preferences",
                        "Cultural customs and etiquette",
                      ].map((lesson, i) => (
                        <div
                          key={i}
                          className="flex items-center text-slate-700"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="w-10 h-10 bg-blue-400 text-slate-900 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                      3
                    </span>
                    Advanced Communication
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">
                      Learning Outcomes
                    </h4>
                    <p className="text-slate-700 mb-4">
                      Master complex grammar structures and engage in
                      sophisticated conversations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">
                      Topics Covered
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Complex grammar and verb conjugations",
                        "Business and professional French",
                        "Reading comprehension and literature",
                        "Writing skills and composition",
                        "Advanced vocabulary and idioms",
                        "French culture and history",
                      ].map((lesson, i) => (
                        <div
                          key={i}
                          className="flex items-center text-slate-700"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Enroll Section */}
      {course.whyEnrollSection ? (
        <div id="why-enroll">
          <WhyEnroll section={course.whyEnrollSection} />
        </div>
      ) : (
        // Fallback Why Enroll Section
        <section id="why-enroll" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Why Choose Our French Course?
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto">
                Join thousands of successful students who have mastered French
                with our proven methodology and expert instruction. Here&apos;s
                why our course stands out:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Expert Instructors
                  </h3>
                  <p className="text-slate-600">
                    Learn from native French speakers with years of teaching
                    experience
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Fast Results
                  </h3>
                  <p className="text-slate-600">
                    See noticeable improvement in your French skills within
                    a few hours
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Cultural Immersion
                  </h3>
                  <p className="text-slate-600">
                    Learn not just the language but French culture and customs
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Career Boost
                  </h3>
                  <p className="text-slate-600">
                    Open doors to international opportunities and career
                    advancement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {course.benefitsSection ? (
        <div id="benefits">
          <Benefits section={course.benefitsSection} />
        </div>
      ) : Array.isArray(course.features) && course.features.length > 0 ? (
        // Legacy features section
        <section id="benefits" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
              Key Features
            </h2>
            <div className="max-w-5xl mx-auto mb-8">
              <p className="text-center text-lg mb-12 text-slate-600">
                Learn French language skills from our &ldquo;{course.title}
                &rdquo; program which features key methods with interactive
                lessons, native teachers, and practical conversations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {course.features.map(
                  (feature: CourseFeature, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-slate-800">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Fallback Benefits Section
        <section id="benefits" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
              Course Benefits
            </h2>
            <div className="max-w-5xl mx-auto mb-8">
              <p className="text-center text-lg mb-12 text-slate-600">
                Discover the amazing benefits of learning French with our
                comprehensive &ldquo;{course.title}&rdquo; program designed to
                help you achieve fluency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">🗣️</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Interactive Learning
                  </h3>
                  <p className="text-slate-600">
                    Engage with native speakers and practice real conversations
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Structured Curriculum
                  </h3>
                  <p className="text-slate-600">
                    Follow a well-designed path from beginner to advanced
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Certified Teachers
                  </h3>
                  <p className="text-slate-600">
                    Learn from qualified native French instructors
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">⏰</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Flexible Schedule
                  </h3>
                  <p className="text-slate-600">
                    Choose from multiple batch timings that suit your lifestyle
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Practical Focus
                  </h3>
                  <p className="text-slate-600">
                    Learn through real-life scenarios and practical applications
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Cultural Insights
                  </h3>
                  <p className="text-slate-600">
                    Understand French culture, customs, and social nuances
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Digital Resources
                  </h3>
                  <p className="text-slate-600">
                    Access course materials anytime, anywhere on any device
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    Community Support
                  </h3>
                  <p className="text-slate-600">
                    Join a community of learners and practice together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* Continue with other sections... */}
      {/* Fees Section */}
      {course.feesSection ? (
        <div id="fees">
          <Fees
            section={course.feesSection}
            duration={course.duration}
            registrationOpen={course.registrationOpen}
            offerEndDate={course.offerEndDate || undefined}
            onEMIClick={() => handleCTAClick("emi")}
            onRefundPolicyClick={() => handleCTAClick("refund_policy")}
            onEnrollClick={() => setIsRegistrationModalOpen(true)}
            onNextBatchesClick={() => {
              const batchSection =
                document.querySelector("#batches") ||
                document.querySelector("#batch-schedule") ||
                document.querySelector('[id*="batch"]');
              if (batchSection) {
                batchSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>
      ) : (
        // Fallback Fees Section
        <section id="fees" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Course Fees & Pricing
              </h2>
              <p className="text-xl text-slate-600 mb-12">
                Invest in your future with our affordable and flexible pricing
                options
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 max-w-md mx-auto">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    Course Fee
                  </h3>
                  <div className="mb-6">
                    {course.price ? (
                      <div>
                        <span className="text-4xl font-bold text-blue-600">
                          {formatRupee(course.price)}
                        </span>
                        {course.originalPrice && (
                          <span className="text-lg text-slate-500 line-through ml-2">
                            {formatRupee(course.originalPrice)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-blue-600">
                        {formatRupee(299)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8 text-left">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-slate-700">
                        {course.duration ? course.duration.replace(/months?|weeks?/gi, 'hours') + ' of live classes' : '40 hours of live classes'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-5 h-5 flex items-center justify-center mr-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${course.registrationOpen !== false ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                      </span>
                      <span className={`${course.registrationOpen !== false ? "text-green-700" : "text-red-700"} font-bold uppercase tracking-wide text-xs`}>
                        Registration {course.registrationOpen !== false ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setIsRegistrationModalOpen(true)}
                      disabled={course.registrationOpen === false}
                      className={`w-full bg-gradient-to-r ${
                        course.registrationOpen !== false
                          ? "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 cursor-pointer"
                          : "from-gray-400 to-gray-500 cursor-not-allowed opacity-80"
                      } text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300`}
                    >
                      {course.registrationOpen !== false ? "Enroll Now" : "Registration Closed"}
                    </button>

                  </div>

                  <div className="mt-6 text-sm text-slate-600">
                    <p>💳 EMI options available</p>
                    <p>🔄 30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills & Tools Section */}
      {course.skillsToolsSection ? (
        <div id="skills">
          <SkillsTools section={course.skillsToolsSection} />
        </div>
      ) : (
        // Fallback to legacy tools section
        Array.isArray(course.tools) &&
        course.tools.length > 0 && (
          <section id="skills" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
                Skills Covered
              </h2>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <p className="text-lg text-slate-600 leading-relaxed">
                  With its impressive array of skills, French language learning
                  provides valuable communication abilities, cultural
                  understanding, and opportunities for personal and professional
                  growth.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {[
                  "French grammar mastery",
                  "Conversational fluency",
                  "Pronunciation skills",
                  "Vocabulary building",
                  "Reading comprehension",
                  "Listening skills",
                  "Written expression",
                  "Cultural understanding",
                  "Communication strategies",
                  "Public speaking",
                  "Translation basics",
                  "Analytical thinking",
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 py-3 px-6 rounded-full text-sm font-medium text-blue-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <h2 className="text-4xl font-bold text-center mt-20 mb-12 text-slate-800">
                Tools Covered
              </h2>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Unlock the full potential of your French learning with these
                  powerful and intuitive tools that will enhance your language
                  acquisition journey.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
                {course.tools.map((tool: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center aspect-square border border-slate-100"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-center text-slate-700">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* Reviews Section */}
      {course.reviewsSection ? (
        <div id="reviews">
          <Reviews section={course.reviewsSection} />
        </div>
      ) : (
        // Fallback to legacy testimonials section
        Array.isArray(course.testimonials) &&
        course.testimonials.length > 0 && (
          <section id="reviews" className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                Student Reviews
              </h2>
              <TestimonialCarousel testimonials={course.testimonials} />
            </div>
          </section>
        )
      )}

      {/* FAQ Section */}
      {course.faqSection ? (
        <div id="faqs">
          <FAQ section={course.faqSection} />
        </div>
      ) : (
        // Fallback to legacy FAQ section
        Array.isArray(course.faq) &&
        course.faq.length > 0 && (
          <section id="faqs" className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection faq={course.faq} />
          </section>
        )
      )}

      {/* Comparison Section */}
      {course.comparisonSection && (
        <Comparison section={course.comparisonSection} />
      )}

      {/* Batch Schedule Section */}
      {course.batchScheduleSection ? (
        <BatchSchedule
          section={course.batchScheduleSection}
          onEnrollClick={() => setIsRegistrationModalOpen(true)}
          onCustomTimingClick={() => handleCTAClick("custom_timing")}
        />
      ) : (
        // Fallback to legacy batches section
        Array.isArray(course.batches) &&
        course.batches.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">
                Flexible Batches for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {course.batches.map((batch, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 text-center">
                      <h3 className="text-xl font-bold">{batch.date}</h3>
                      <p className="font-medium opacity-90">{batch.title}</p>
                    </div>
                    <div className="p-6 text-center bg-white">
                      <p className="mb-2 text-slate-600">{batch.days}</p>
                      <p className="mb-4 text-slate-600">{batch.time}</p>
                      <button
                        onClick={() => setIsRegistrationModalOpen(true)}
                        className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        ENROLL NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* CTA Sections */}
      {Array.isArray(course.ctaSections) && course.ctaSections.length > 0 && (
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {course.ctaSections.map((ctaSection, index) => (
                <CTA
                  key={index}
                  section={ctaSection}
                  onClick={handleCTAClick}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Alumni Work At */}
      {Array.isArray(course.companies) && course.companies.length > 0 && (
        <section className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Our Alumni Work At
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {course.companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[120px] min-h-[60px]"
              >
                {/* Replace with logo if available in /public, else fallback to name */}
                {company === "Alliance Française" && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={`https://picsum.photos/500/200?random=${10 + index}`}
                      alt="Alliance Française logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {company === "Institut Français" && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={`https://picsum.photos/500/200?random=${11 + index}`}
                      alt="Institut Français logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {company === "Sorbonne" && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={`https://picsum.photos/500/200?random=${12 + index}`}
                      alt="Sorbonne logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {company === "TV5Monde" && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={`https://picsum.photos/500/200?random=${13 + index}`}
                      alt="TV5Monde logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {company === "RFI" && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={`https://picsum.photos/500/200?random=${14 + index}`}
                      alt="RFI logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {company === "Le Figaro" && (
                  <div className="relative h-10 w-32">
                    <Image
                      src={`https://picsum.photos/500/200?random=${15 + index}`}
                      alt="Le Figaro logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {![
                  "Alliance Française",
                  "Institut Français",
                  "Sorbonne",
                  "TV5Monde",
                  "RFI",
                  "Le Figaro",
                ].includes(company) && (
                  <span className="text-lg font-semibold text-gray-700">
                    {company}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        course={course}
      />
    </div>
  );
}

// Collapsible FAQ Section
function FAQSection({ faq }: { faq: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {faq.map((item, index) => (
        <div
          key={index}
          className={`border-b border-gray-200 ${
            index === faq.length - 1 ? "border-b-0" : ""
          }`}
        >
          <button
            className="w-full text-left flex items-center justify-between px-6 py-4 focus:outline-none"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="text-lg font-semibold text-gray-900">
              {item.question}
            </span>
            <svg
              className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              } text-blue-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div
              id={`faq-answer-${index}`}
              className="px-6 pb-4 text-gray-700 animate-fade-in"
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
