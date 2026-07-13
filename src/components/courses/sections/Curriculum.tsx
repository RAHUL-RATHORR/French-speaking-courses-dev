"use client";

import { useMemo, useState } from "react";
import { CurriculumModule, CurriculumSection } from "@/types/course";

interface CurriculumProps {
  section: CurriculumSection;
  onDownloadBrochure?: () => void;
  totalChapters?: number | null;
}

function parseLesson(lesson: string): { title: string; duration?: string } {
  const durationMatch = lesson.match(/\s*[-–|]\s*(\d{1,2}\s*:\s*\d{2})\s*$/);
  if (durationMatch) {
    return {
      title: lesson.replace(/\s*[-–|]\s*\d{1,2}\s*:\s*\d{2}\s*$/, "").trim(),
      duration: durationMatch[1].replace(/\s/g, ""),
    };
  }
  return { title: lesson };
}

function ModuleAccordion({
  module,
  index,
  defaultOpen,
}: {
  module: CurriculumModule;
  index: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const lessonCount = module.lessons?.length ?? 0;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left hover:bg-slate-50/80 transition-colors"
        aria-expanded={open}
      >
        <span className="shrink-0 w-9 h-9 rounded-full bg-[#1A3260] text-white text-sm font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-[#1A3260] leading-snug">
            {module.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {lessonCount} {lessonCount === 1 ? "Lesson" : "Lessons"}
            {module.duration ? ` · ${module.duration}` : ""}
          </p>
        </div>
        <svg
          className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 sm:px-5 pb-4 pt-3 bg-slate-50/40">
          {module.description && (
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{module.description}</p>
          )}

          <ul className="space-y-1">
            {module.lessons?.map((lesson, lessonIndex) => {
              const { title, duration } = parseLesson(lesson);
              return (
                <li
                  key={lessonIndex}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors group"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 group-hover:border-[#1A3260] group-hover:text-[#1A3260] transition-colors">
                    <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="flex-1 text-sm text-slate-700 group-hover:text-[#1A3260] transition-colors">
                    {title}
                  </span>
                  {duration && (
                    <span className="shrink-0 text-xs font-medium text-slate-400 tabular-nums">
                      {duration}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Curriculum({ section, onDownloadBrochure, totalChapters }: CurriculumProps) {
  const stats = useMemo(() => {
    const modules = section.modules ?? [];
    const lessonTotal = modules.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0);
    const chapters = totalChapters ?? modules.length;
    return { chapters, lessons: lessonTotal, modules: modules.length };
  }, [section.modules, totalChapters]);

  return (
    <section id="curriculum" className="py-10">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3260] mb-2">
              {section.headline || "Course Content"}
            </h2>
            {section.description && (
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                {section.description}
              </p>
            )}
          </div>

          {section.downloadBrochure?.enabled && onDownloadBrochure && (
            <button
              type="button"
              onClick={onDownloadBrochure}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#1A3260] text-[#1A3260] text-sm font-semibold hover:bg-[#1A3260] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {section.downloadBrochure.text || "Download Brochure"}
            </button>
          )}
        </div>

        {/* Stats pills — Frenchtree inspired */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-sm">
            <svg className="w-4 h-4 text-[#1A3260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-semibold text-[#1A3260]">{stats.chapters}</span> Chapters
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-sm">
            <svg className="w-4 h-4 text-[#1A3260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-[#1A3260]">{stats.lessons}</span> Lessons
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-sm">
            <svg className="w-4 h-4 text-[#1A3260]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notes &amp; Worksheets
          </span>
        </div>

        {/* Module accordion list */}
        <div className="space-y-3">
          {section.modules.map((module, index) => (
            <ModuleAccordion
              key={`${module.title}-${index}`}
              module={module}
              index={index}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const DEFAULT_CURRICULUM_MODULES: CurriculumModule[] = [
  {
    title: "Introduction to French",
    description:
      "Master basic French pronunciation, essential vocabulary, and fundamental grammar structures.",
    duration: "12 hours",
    lessons: [
      "French alphabet and pronunciation",
      "Basic greetings and introductions",
      "Numbers, dates, and time",
      "Common verbs and present tense",
      "Essential vocabulary (family, colors, food)",
      "Simple sentence structures",
    ],
  },
  {
    title: "Building Conversations",
    description:
      "Develop conversational skills and expand vocabulary for everyday situations.",
    duration: "14 hours",
    lessons: [
      "Asking questions and giving directions",
      "Shopping and restaurant conversations",
      "Past and future tenses",
      "Describing people and places",
      "Express opinions and preferences",
      "Cultural customs and etiquette",
    ],
  },
  {
    title: "Advanced Communication",
    description:
      "Master complex grammar structures and engage in sophisticated conversations.",
    duration: "16 hours",
    lessons: [
      "Complex grammar and verb conjugations",
      "Business and professional French",
      "Reading comprehension and literature",
      "Writing skills and composition",
      "Advanced vocabulary and idioms",
      "French culture and history",
    ],
  },
];
