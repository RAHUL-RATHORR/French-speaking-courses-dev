"use client";

import { useState } from "react";
import { openLinksInNewTab } from "@/lib/utils";

import { BlogFAQItem } from "@/lib/blog-faq";

interface BlogFAQProps {
  faqs: BlogFAQItem[];
}

export default function BlogFAQ({ faqs }: BlogFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const visibleFaqs = faqs.filter((faq) => faq.question.trim());

  if (visibleFaqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-10 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        {visibleFaqs.map((faq, index) => (
          <div
            key={`${faq.question}-${index}`}
            className={`border-b border-gray-200 ${
              index === visibleFaqs.length - 1 ? "border-b-0" : ""
            }`}
          >
            <button
              type="button"
              className="w-full text-left flex items-center justify-between px-6 py-4 focus:outline-none hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              aria-controls={`blog-faq-answer-${index}`}
            >
              <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 shrink-0 transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                } text-french-blue`}
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
                id={`blog-faq-answer-${index}`}
                className="px-6 pb-5 text-gray-700 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{
                  __html: openLinksInNewTab(faq.answer),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
