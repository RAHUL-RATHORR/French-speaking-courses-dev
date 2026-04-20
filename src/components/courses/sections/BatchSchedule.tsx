"use client";

import { BatchScheduleSection } from "@/types/course";

interface BatchScheduleProps {
  section: BatchScheduleSection;
  onEnrollClick?: (batchIndex: number) => void;
  onCustomTimingClick?: () => void;
}

export default function BatchSchedule({ section, onEnrollClick, onCustomTimingClick }: BatchScheduleProps) {
  if (!section.batches || section.batches.length === 0) {
    return null;
  }

  return (
    <section id="batches" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
            {section.headline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.batches.map((batch, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 text-center">
                  <h3 className="text-xl font-bold">{batch.date}</h3>
                  <p className="font-medium opacity-90">{batch.title}</p>
                </div>
                
                <div className="p-6 text-center">
                  <div className="space-y-2 mb-6">
                    <p className="text-slate-600">
                      <span className="font-medium">{batch.days}</span>
                      {batch.type && (
                        <span className="text-sm text-slate-500 ml-2">
                          ({batch.type})
                        </span>
                      )}
                    </p>
                    <p className="text-slate-600">{batch.time}</p>
                  </div>
                  
                  <button
                    onClick={() => onEnrollClick?.(index)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    ENROLL NOW
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Timing Option */}
          {section.customTimingText && (
            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-2">{section.customTimingText}</p>
              {section.customTimingAction && (
                <button
                  onClick={onCustomTimingClick}
                  className="text-blue-600 font-medium hover:underline transition-colors duration-200"
                >
                  {section.customTimingAction}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
