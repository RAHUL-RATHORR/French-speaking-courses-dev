"use client";

import { SkillsToolsSection } from "@/types/course";

interface SkillsToolsProps {
  section: SkillsToolsSection;
}

export default function SkillsTools({ section }: SkillsToolsProps) {
  return (
    <section id="skills" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Skills Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.skillsHeadline}
          </h2>
          
          {section.skillsDescription && (
            <div className="text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                {section.skillsDescription}
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {section.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 py-3 px-6 rounded-full text-sm font-medium text-blue-700 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.toolsHeadline}
          </h2>
          
          {section.toolsDescription && (
            <div className="text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                {section.toolsDescription}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {section.tools.map((tool, index) => (
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
      </div>
    </section>
  );
}
