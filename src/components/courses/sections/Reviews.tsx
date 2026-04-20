"use client";

import { ReviewsSection } from "@/types/course";
import { useState } from "react";

interface ReviewsProps {
  section: ReviewsSection;
}

export default function Reviews({ section }: ReviewsProps) {
  const [currentReview, setCurrentReview] = useState(0);
  const total = section.reviews.length;

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % total);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + total) % total);
  };

  if (!section.reviews || section.reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            {section.headline}
          </h2>

          <div className="relative">
            <div className="flex items-center justify-center gap-4">
              {/* Previous Button */}
              <button
                aria-label="Previous review"
                onClick={prevReview}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl focus:outline-none transition-shadow duration-200"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Review Card */}
              <div className="flex-1 max-w-2xl">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-slate-800">
                      {section.reviews[currentReview].name}
                    </h4>
                    <p className="text-slate-600 mb-3">
                      {section.reviews[currentReview].role}
                    </p>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < section.reviews[currentReview].rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-700 italic text-center leading-relaxed">
                    &ldquo;{section.reviews[currentReview].content}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Next Button */}
              <button
                aria-label="Next review"
                onClick={nextReview}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl focus:outline-none transition-shadow duration-200"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {section.reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentReview === index ? "bg-blue-600" : "bg-slate-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
