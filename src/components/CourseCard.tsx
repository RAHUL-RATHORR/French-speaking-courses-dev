"use client";

import NextLink from "next/link";

import { formatRupee } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
// import { theme } from '@/lib/theme';

interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  students: number;
  image?: string;
}

export default function CourseCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  slug,
  title,
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  level,
  duration,
  price,
  originalPrice,
  rating,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  students,
  image,
  registrationOpen,
}: CourseCardProps & { registrationOpen?: boolean }) {
  const formattedPrice = formatRupee(price);
  const formattedOriginalPrice = originalPrice
    ? formatRupee(originalPrice)
    : "";

  const imageSrc = image
    ? image.startsWith("http") || image.startsWith("/")
      ? image
      : `/uploads/${image}`
    : "/french-skill.png";

  const displayDuration = duration
    ? duration.replace(/months?|weeks?/gi, "hours")
    : "Flexible hours";

  return (
    <Card variant="hover" className="relative">
      <NextLink
        href={`/course/${slug}`}
        aria-label={`Open course: ${title}`}
        className="after:absolute after:inset-0 after:z-10 after:content-['']"
      >
        <span className="sr-only">{title}</span>
      </NextLink>
      <div className="relative w-full overflow-hidden bg-white">
        <NextLink href={`/course/${slug}`} className="block w-full relative z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/french-skill.png";
            }}
          />

          {/* Rating */}
          {rating ? (
            <div className="absolute bottom-3 left-3 rounded-md shadow-lg flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 z-20">
              <div className="text-yellow-400 text-sm flex">★★★★★</div>
              <span className="text-sm font-bold text-gray-800 ml-1">
                {rating}
              </span>
            </div>
          ) : null}
        </NextLink>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-french-blue transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Course Stats & Registration Status */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1">⏱️</span>
            <span>{displayDuration}</span>
          </div>

          <div className="flex items-center">
            {registrationOpen !== false ? (
              <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                REGISTRATION OPEN
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center shadow-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                REGISTRATION CLOSED
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-french-blue">
              {formattedPrice}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
          <Button
            href={`/course/${slug}`}
            variant="primary"
            size="sm"
            className="z-20 text-sm py-1.5 px-3"
          >
            <span className="flex items-center">
              <span>Join Now</span>
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
