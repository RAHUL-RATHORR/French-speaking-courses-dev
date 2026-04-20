"use client";

import { CTASection } from "@/types/course";
import CountdownTimer from "@/components/courses/CountdownTimer";

interface CTAProps {
  section: CTASection;
  onClick?: (action: string) => void;
}

export default function CTA({ section, onClick }: CTAProps) {
  return (
    <div className={`p-6 rounded-xl shadow-lg text-center ${
      section.style === 'secondary' 
        ? 'bg-slate-50 border border-slate-200' 
        : section.style === 'outline'
        ? 'border-2 border-blue-600 bg-white'
        : 'bg-gradient-to-r from-blue-50 to-blue-100'
    }`}>
      <div className="mb-4">
        <p className="text-lg font-medium text-slate-700 mb-4">
          {section.text}
        </p>
        
        {section.showCountdown && section.countdownEndDate && (
          <div className="mb-4">
            <CountdownTimer 
              endDate={section.countdownEndDate}
              message={section.countdownMessage || "Offer ends in:"}
              compact={true}
            />
          </div>
        )}
      </div>
      
      <button
        onClick={() => onClick?.(section.action)}
        className={`px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
          section.style === 'secondary'
            ? 'bg-slate-600 hover:bg-slate-700 text-white'
            : section.style === 'outline'
            ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
        }`}
      >
        {section.buttonText}
      </button>
      
      <div className="mt-4 text-center text-sm text-slate-600">
        <p className="flex items-center justify-center">
          <span className="mr-1">🔒</span> Secure Transaction
        </p>
      </div>
    </div>
  );
}
