"use client";

import { BenefitsSection } from "@/types/course";

interface BenefitsProps {
  section: BenefitsSection;
}

export default function Benefits({ section }: BenefitsProps) {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.headline}
          </h2>
          
          {section.description && (
            <div className="text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                {section.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {section.features.map((feature, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
