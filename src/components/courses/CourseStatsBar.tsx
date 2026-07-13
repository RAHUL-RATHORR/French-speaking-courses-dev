"use client";

import type { ReactNode } from "react";
import { CourseWithSections } from "@/types/course";

interface CourseStatsBarProps {
  course: CourseWithSections;
  embedded?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-px text-slate-400">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <svg
            key={i}
            className="w-3 h-3"
            viewBox="0 0 20 20"
            fill={filled || half ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={half ? 0 : 1}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

function StatCell({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-2 py-3 sm:px-3 sm:py-3.5">
      <div className="text-slate-400 mb-1">{icon}</div>
      <div className="text-sm sm:text-base font-bold text-[#1A3260] leading-tight mb-0.5">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-slate-500 leading-snug">{label}</div>
    </div>
  );
}

export default function CourseStatsBar({ course, embedded = false }: CourseStatsBarProps) {
  const rating = course.rating ?? 4.7;
  const reviewCount =
    course.reviewsSection?.reviews?.length ?? course.testimonials?.length ?? 0;

  const iconClass = "w-4 h-4";

  const grid = (
    <div className="grid grid-cols-3 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="border-r border-slate-200">
        <StatCell
          icon={<StarRating rating={rating} />}
          value={rating.toFixed(1)}
          label={`(${reviewCount} rating)`}
        />
      </div>

      <div className="border-r border-slate-200">
        <StatCell
          icon={
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          value={course.students.toLocaleString()}
          label="Students Enrolled"
        />
      </div>

      <div>
        <StatCell
          icon={
            <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14v7M5 8.5V17a2 2 0 002 2h10a2 2 0 002-2V8.5"
              />
            </svg>
          }
          value={course.instructor?.split(" ")[0] || "Expert"}
          label="Certified Teachers"
        />
      </div>
    </div>
  );

  if (embedded) {
    return <div className="mt-5 max-w-3xl">{grid}</div>;
  }

  return (
    <section className="bg-white border-y border-slate-200">
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-3xl">{grid}</div>
      </div>
    </section>
  );
}
