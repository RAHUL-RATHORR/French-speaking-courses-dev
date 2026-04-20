"use client";

import { CurriculumSection } from "@/types/course";

interface CurriculumProps {
  section: CurriculumSection;
  onDownloadBrochure?: () => void;
}

export default function Curriculum({ section, onDownloadBrochure }: CurriculumProps) {
  return (
    <section id="curriculum" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.headline}
          </h2>
          
          {section.description && (
            <div className="text-center mb-8">
              <p className="text-lg text-slate-600 leading-relaxed">
                {section.description}
              </p>
            </div>
          )}

          {section.downloadBrochure?.enabled && (
            <div className="text-center mb-12">
              <button
                onClick={onDownloadBrochure}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {section.downloadBrochure.text}
              </button>
            </div>
          )}

          <div className="space-y-6">
            {section.modules.map((module, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl shadow-lg overflow-hidden bg-white"
              >
                <div className="bg-slate-800 text-white p-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="w-8 h-8 bg-blue-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    Module {index + 1}: {module.title}
                  </h3>
                  {module.duration && (
                    <p className="text-slate-300 mt-2 text-sm">
                      Duration: {module.duration}
                    </p>
                  )}
                </div>

                <div className="p-6">
                  {module.description && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-blue-700 mb-2">
                        Learning Outcomes
                      </h4>
                      <p className="text-slate-700">{module.description}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3">
                      Topics Covered
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.lessons.map((lesson, lessonIndex) => (
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
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
