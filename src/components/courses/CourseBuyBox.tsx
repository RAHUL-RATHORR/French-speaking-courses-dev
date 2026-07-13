"use client";

import { useMemo } from "react";
import { CourseWithSections } from "@/types/course";
import { formatRupee, parsePriceNumber } from "@/lib/utils";

interface CourseBuyBoxProps {
  course: CourseWithSections;
  onEnroll: () => void;
}

type IncludeItem = {
  label: string;
  icon: "clock" | "doc" | "infinity" | "info" | "device" | "certificate" | "check" | "headset" | "screen";
};

function IncludeIcon({ type }: { type: IncludeItem["icon"] }) {
  const className = "w-5 h-5 text-slate-500 flex-shrink-0";
  switch (type) {
    case "clock":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "doc":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "infinity":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
        </svg>
      );
    case "device":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "certificate":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case "check":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "headset":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case "screen":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

function buildIncludes(course: CourseWithSections): IncludeItem[] {
  const items: IncludeItem[] = [];

  if (course.duration) {
    items.push({
      icon: "clock",
      label: `Course Duration : ${course.duration.replace(/months?/gi, "hrs").replace(/weeks?/gi, "hrs")}`,
    });
  }

  if (course.lessons) {
    items.push({
      icon: "doc",
      label: `Total : ${course.lessons} chapters`,
    });
  }

  if (course.access) {
    items.push({
      icon: "infinity",
      label: `Course Validity : ${course.access}`,
    });
  }

  items.push({ icon: "info", label: "Notes & Worksheet etc." });
  items.push({ icon: "device", label: "Access on Mobile, Tablet & Laptop" });

  if (course.certificate) {
    items.push({ icon: "certificate", label: "Certificate after Speaking Exam" });
    items.push({ icon: "check", label: "Certificate Trusted by Top MNCs." });
  }

  items.push({ icon: "headset", label: "Free Expert Support" });
  items.push({ icon: "screen", label: "Get Live Doubt-Solving Sessions*" });

  const featureTitles = (course.features || [])
    .map((f) => f.title)
    .filter(Boolean)
    .slice(0, 3);

  for (const title of featureTitles) {
    if (!items.some((item) => item.label.toLowerCase().includes(title.toLowerCase()))) {
      items.push({ icon: "check", label: title });
    }
  }

  return items;
}

export default function CourseBuyBox({ course, onEnroll }: CourseBuyBoxProps) {
  const price = course.feesSection?.price || course.price || "";
  const originalPrice =
    course.feesSection?.originalPrice || course.originalPrice || "";

  const originalPriceValue = parsePriceNumber(originalPrice);
  const currentPriceValue = parsePriceNumber(price);
  const discountPercentage =
    originalPriceValue > 0 && currentPriceValue > 0 && originalPriceValue > currentPriceValue
      ? Math.round(((originalPriceValue - currentPriceValue) / originalPriceValue) * 100)
      : 0;

  const includes = useMemo(() => buildIncludes(course), [course]);

  const imageSrc = course.image
    ? course.image.startsWith("http") || course.image.startsWith("/")
      ? course.image
      : `/uploads/${course.image}`
    : "/french-skill.png";

  const moneyBackText = (
    course.feesSection?.refundPolicy?.enabled && course.feesSection.refundPolicy.text
      ? course.feesSection.refundPolicy.text
      : "Money-Back Guarantee"
  ).replace(/\*+/g, "").trim();

  const registrationOpen = course.registrationOpen !== false;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg lg:shadow-xl">
      <div className="relative w-full bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={course.title}
          className="w-full h-auto block"
          onError={(e) => {
            e.currentTarget.src = "/french-skill.png";
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <div className="text-3xl font-bold text-[#E4222A] leading-none">
              {formatRupee(price || "0")}
            </div>
            {originalPrice && (
              <div className="text-base font-semibold text-[#1A3260] line-through">
                {formatRupee(originalPrice)}
              </div>
            )}
          </div>
          {discountPercentage > 0 && (
            <div className="shrink-0 border border-[#E4222A] text-[#E4222A] text-xs font-bold px-2.5 py-1.5 rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onEnroll}
          disabled={!registrationOpen}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-md text-white font-semibold text-base transition-colors ${
            registrationOpen
              ? "bg-[#1A3260] hover:bg-[#14274d]"
              : "bg-slate-400 cursor-not-allowed"
          }`}
        >
          {registrationOpen ? "Enroll Now" : "Registration Closed"}
          {registrationOpen && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
            </svg>
          )}
        </button>

        <p className="text-center mt-3 text-sm font-semibold text-[#1A3260]">
          {moneyBackText}
        </p>

        <div className="mt-6">
          <h4 className="text-base font-semibold text-[#1A3260] mb-4">
            This course includes:
          </h4>
          <ul className="space-y-3">
            {includes.map((item) => (
              <li key={item.label} className="flex items-start gap-3 text-sm text-slate-700">
                <IncludeIcon type={item.icon} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
