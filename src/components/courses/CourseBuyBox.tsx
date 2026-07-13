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

  const moneyBackText =
    course.feesSection?.refundPolicy?.enabled && course.feesSection.refundPolicy.text
      ? course.feesSection.refundPolicy.text
      : "Money-Back Guarantee**";

  const registrationOpen = course.registrationOpen !== false;

  const shareUrl = `https://www.frenchskill.com/course/${course.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(course.title);

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
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <div className="text-3xl font-bold text-[#E4222A] leading-none">
              {formatRupee(price || "0")}
            </div>
            {originalPrice && (
              <div className="mt-1 text-base font-semibold text-[#1A3260] line-through">
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

        <div className="text-center mt-3">
          <button
            type="button"
            onClick={onEnroll}
            className="text-sm font-semibold text-[#1A3260] underline underline-offset-2 hover:text-[#E4222A]"
          >
            {moneyBackText}
          </button>
        </div>

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

        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-center text-sm font-semibold text-[#1A3260] mb-4">
            Share this course
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#1A3260] hover:text-[#1A3260] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H17l-.4 3h-2.3v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#1A3260] hover:text-[#1A3260] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.56l-5.14-6.71L5.2 22H1.94l8.03-9.17L1.5 2h6.72l4.64 6.14L18.244 2zm-1.15 18h1.82L7.02 3.95H5.07L17.094 20z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#1A3260] hover:text-[#1A3260] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.64 4.75 6.07V23h-4v-7.4c0-1.77-.03-4.04-2.46-4.04-2.46 0-2.84 1.92-2.84 3.9V23h-4V8.5z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#1A3260] hover:text-[#1A3260] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 3.5A11 11 0 004.1 18.3L3 21.5l3.3-1a11 11 0 0014.2-17zM12 20.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.2.5.5.2 1 .2 1.3.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
