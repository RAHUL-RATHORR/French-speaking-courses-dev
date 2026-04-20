"use client";

import { OverviewSection } from "@/types/course";

interface OverviewProps {
  section: OverviewSection;
  onCTAClick?: (action: string) => void;
}

export default function Overview({ section, onCTAClick }: OverviewProps) {
  return (
    <section id="overview" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            {section.title}
          </h2>
          
          {section.subtitle && (
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {section.subtitle}
            </p>
          )}

          {section.bullets && section.bullets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {section.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start space-x-3 text-left">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          )}

          {section.ctaButton && (
            <button
              onClick={() => onCTAClick?.(section.ctaButton!.action)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {section.ctaButton.text}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
