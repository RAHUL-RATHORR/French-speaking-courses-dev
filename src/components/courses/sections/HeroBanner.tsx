"use client";

import { HeroBannerSection } from "@/types/course";
import Image from "next/image";

interface HeroBannerProps {
  section: HeroBannerSection;
  onCTAClick?: (action: string) => void;
}

export default function HeroBanner({ section, onCTAClick }: HeroBannerProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white py-16 relative overflow-hidden">
      {section.backgroundImage && section.backgroundImage.trim() !== "" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={section.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover opacity-20"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {section.headline}
          </h1>
          
          {section.subheadline && (
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              {section.subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => onCTAClick?.(section.ctaButtons.primary.action)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {section.ctaButtons.primary.buttonText}
            </button>
            
            {section.ctaButtons.secondary && (
              <button
                onClick={() => onCTAClick?.(section.ctaButtons.secondary!.action)}
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                {section.ctaButtons.secondary.buttonText}
              </button>
            )}
          </div>

          {section.nextBatchDate && (
            <div className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg">
              Next Batch Starts: {section.nextBatchDate}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
