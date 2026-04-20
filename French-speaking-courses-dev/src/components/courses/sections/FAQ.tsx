"use client";

import { FAQSection } from "@/types/course";
import { useState } from "react";

interface FAQProps {
  section: FAQSection;
}

export default function FAQ({ section }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!section.faqs || section.faqs.length === 0) {
    return null;
  }

  return (
    <section id="faqs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            {section.headline}
          </h2>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            {section.faqs.map((faq, index) => (
              <div
                key={index}
                className={`border-b border-slate-200 ${
                  index === section.faqs.length - 1 ? "border-b-0" : ""
                }`}
              >
                <button
                  className="w-full text-left flex items-center justify-between px-6 py-5 focus:outline-none hover:bg-slate-50 transition-colors duration-200"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${
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
                    className="px-6 pb-5 text-slate-700 leading-relaxed animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
