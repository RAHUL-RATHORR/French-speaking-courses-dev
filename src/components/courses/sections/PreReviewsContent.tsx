"use client";

import { PreReviewsSection } from "@/types/course";
import { openLinksInNewTab } from "@/lib/utils";

interface PreReviewsContentProps {
  section: PreReviewsSection;
}

export default function PreReviewsContent({ section }: PreReviewsContentProps) {
  if (!section?.content?.trim()) return null;

  return (
    <section className="pt-4 pb-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-p:first:mt-0 prose-headings:first:mt-0 [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: openLinksInNewTab(section.content),
            }}
          />
        </div>
      </div>
    </section>
  );
}
