"use client";

import Link from "next/link";
import { CourseWithSections } from "@/types/course";
import CourseStatsBar from "@/components/courses/CourseStatsBar";

interface CoursePageHeaderProps {
  course: CourseWithSections;
}

export default function CoursePageHeader({ course }: CoursePageHeaderProps) {
  const description =
    course.longDescription || course.description || "";

  return (
    <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-700 mb-6">
          <Link href="/" className="hover:text-[#1A3260] transition-colors" aria-label="Home">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <span className="text-slate-400">›</span>
          <span className="font-medium">Course</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold text-[#1A3260] leading-tight mb-5 max-w-4xl">
          {course.title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-base md:text-lg text-[#E85D4C] leading-relaxed max-w-4xl mb-0">
            {description}
          </p>
        )}

        <CourseStatsBar course={course} embedded />
    </div>
  );
}
