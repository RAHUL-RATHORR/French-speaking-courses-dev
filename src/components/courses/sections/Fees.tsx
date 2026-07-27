"use client";

import { FeesSection } from "@/types/course";
import { parsePriceNumber } from "@/lib/utils";

interface FeesProps {
  section: FeesSection;
  duration?: string;
  offerEndDate?: string;
  registrationOpen?: boolean;
  onEMIClick?: () => void;
  onRefundPolicyClick?: () => void;
  onEnrollClick?: () => void;
  onNextBatchesClick?: () => void;
}

// Pricing / Enroll CTA lives in CourseBuyBox — this section only shows payment & discount details.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Fees({ section }: FeesProps) {
  const originalPriceValue = parsePriceNumber(section.originalPrice || "");
  const currentPriceValue = parsePriceNumber(section.price || "");

  const discountPercentage =
    originalPriceValue > 0 && currentPriceValue > 0
      ? Math.round(
          ((originalPriceValue - currentPriceValue) / originalPriceValue) * 100
        )
      : 0;

  const hasPaymentOptions =
    Array.isArray(section.paymentOptions) && section.paymentOptions.length > 0;
  const hasDiscounts =
    Array.isArray(section.discounts) && section.discounts.length > 0;

  if (!hasPaymentOptions && !hasDiscounts) {
    return null;
  }

  return (
    <section id="fees" className="pt-8 pb-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
          {section.headline || "Payment & Offers"}
        </h2>

        <div className="space-y-6">
          {hasPaymentOptions && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Payment Options
              </h3>
              <ul className="space-y-2">
                {section.paymentOptions.map((option, index) => (
                  <li key={index} className="flex items-center text-slate-700">
                    <svg
                      className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasDiscounts && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Discounts & Offers
              </h3>
              <ul className="space-y-2">
                {section.discounts.map((discount, index) => (
                  <li key={index} className="flex items-center text-slate-700">
                    <svg
                      className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    {discount.replace(
                      "{discountPercentage}",
                      discountPercentage.toString()
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
