"use client";

import { ProjectsSection } from "@/types/course";
import Image from "next/image";

interface ProjectsProps {
  section: ProjectsSection;
}

export default function Projects({ section }: ProjectsProps) {
  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.headline}
          </h2>
          
          {section.description && (
            <div className="text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                {section.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {section.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {project.image && project.image.trim() !== "" && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 border-t border-slate-200">
                  <div className="flex items-center text-sm text-slate-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
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
                    Hands-on Project Experience
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Highlights */}
          {section.highlights && section.highlights.length > 0 && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
              {section.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-4xl mr-3">{highlight.icon}</div>
                  <span className="text-lg font-medium text-slate-700">
                    {highlight.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
