"use client";

import { WhyEnrollSection } from "@/types/course";

interface WhyEnrollProps {
  section: WhyEnrollSection;
}

export default function WhyEnroll({ section }: WhyEnrollProps) {
  return (
    <section id="why-enroll" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.headline}
          </h2>
          
          {section.description && (
            <div className="text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed">
                {section.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {section.benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                {benefit.icon && (
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                )}
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
