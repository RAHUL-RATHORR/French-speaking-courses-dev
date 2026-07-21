"use client";

import { PreReviewsSection } from "@/types/course";
import { openLinksInNewTab } from "@/lib/utils";

interface PreReviewsContentProps {
  section: PreReviewsSection;
}

export default function PreReviewsContent({ section }: PreReviewsContentProps) {
  if (!section?.content?.trim()) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
          className="prose prose-slate max-w-4xl mx-auto prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600"
          dangerouslySetInnerHTML={{
            __html: openLinksInNewTab(section.content),
          }}
        />
      </div>
    </section>
  );
}
