"use client";

import { PreReviewsSection } from "@/types/course";
import { openLinksInNewTab } from "@/lib/utils";

interface PreReviewsContentProps {
  section: PreReviewsSection;
}

export default function PreReviewsContent({ section }: PreReviewsContentProps) {
  if (!section?.content?.trim()) return null;

  return (
    <section className="pt-6 pb-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="course-rich-text prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 [&_p]:leading-relaxed [&_*:first-child]:!mt-0 [&_h1]:!mt-0 [&_h2]:!mt-0 [&_h3]:!mt-0 [&_h4]:!mt-0 [&_p]:!mt-0 [&_.MsoNormal]:!mt-0 [&_h2]:!mb-4 [&_h3]:!mb-3 [&_p]:!mb-4"
            dangerouslySetInnerHTML={{
              __html: openLinksInNewTab(section.content),
            }}
          />
        </div>
      </div>
    </section>
  );
}
