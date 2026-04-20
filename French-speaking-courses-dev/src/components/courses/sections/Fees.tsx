"use client";

import { FeesSection } from "@/types/course";
import CountdownTimer from "@/components/courses/CountdownTimer";
import { formatRupee, parsePriceNumber } from "@/lib/utils";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Fees({ section, duration, registrationOpen, offerEndDate, onEMIClick, onRefundPolicyClick, onEnrollClick, onNextBatchesClick }: FeesProps) {
  const originalPriceValue = parsePriceNumber(section.originalPrice || '');
  const currentPriceValue = parsePriceNumber(section.price || '');
  
  const discountPercentage = originalPriceValue > 0 && currentPriceValue > 0
    ? Math.round(((originalPriceValue - currentPriceValue) / originalPriceValue) * 100)
    : 0;

  const savingsAmount = originalPriceValue > 0 && currentPriceValue > 0
    ? originalPriceValue - currentPriceValue
    : 0;

  return (
    <section id="fees" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-slate-800">
            {section.headline}
          </h2>
          
          {section.description && (
            <div className="text-center mb-12">
              <p className="text-lg text-slate-600 leading-relaxed">
                {section.description.replace("{price}", formatRupee(section.price))}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">
                Course Pricing
              </h3>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  {section.originalPrice && (
                    <span className="text-2xl text-slate-400 line-through mr-3">
                      {formatRupee(section.originalPrice)}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-slate-800">
                    {formatRupee(section.price)}
                  </span>
                </div>

                {section.originalPrice && discountPercentage > 0 && (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 px-4 rounded-full text-sm font-medium mb-4 shadow-md inline-block">
                    {discountPercentage}% OFF, Save{" "}
                    {savingsAmount.toLocaleString('en-IN', { 
                      style: 'currency', 
                      currency: /€|\beur\b/i.test(section.price || '') ? 'EUR' : 'INR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                  </div>
                )}

                {offerEndDate && (
                  <div className="mt-4">
                    <CountdownTimer 
                      endDate={offerEndDate} 
                      message="Offer ends in:"
                      compact={true} 
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 text-center">
                <div className="flex justify-center gap-4 text-sm">
                  {section.emiOptions?.enabled && (
                    <button 
                      onClick={onEMIClick}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {section.emiOptions.text}
                    </button>
                  )}
                  {section.emiOptions?.enabled && section.refundPolicy?.enabled && (
                    <span className="text-slate-400">|</span>
                  )}
                  {section.refundPolicy?.enabled && (
                    <button 
                      onClick={onRefundPolicyClick}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {section.refundPolicy.text}
                    </button>
                  )}
                </div>

                <div className="space-y-3 mb-8 text-left mt-4 border-t border-slate-200 pt-6">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
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
                    <span className="text-slate-700 font-medium">
                      {duration ? duration.replace(/months?|weeks?/gi, 'hours') + ' of live classes' : '40 hours of live classes'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 h-5 flex items-center justify-center mr-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${registrationOpen !== false ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                    </span>
                    <span className={`${registrationOpen !== false ? "text-green-700" : "text-red-700"} font-bold uppercase tracking-wide text-xs`}>
                      Registration {registrationOpen !== false ? "Open" : "Closed"}
                    </span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-3 mt-6">
                  {onEnrollClick && (
                    <button
                      onClick={onEnrollClick}
                      disabled={registrationOpen === false}
                      className={`w-full bg-gradient-to-r ${
                        registrationOpen !== false 
                          ? "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 cursor-pointer" 
                          : "from-gray-400 to-gray-500 cursor-not-allowed opacity-80"
                      } text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300`}
                    >
                      {registrationOpen !== false ? "Enroll Now" : "Registration Closed"}
                    </button>
                  )}

                </div>
              </div>
            </div>

            {/* Payment & Discounts */}
            <div className="space-y-8">
              {/* Payment Options */}
              {section.paymentOptions && section.paymentOptions.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
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

              {/* Discounts */}
              {section.discounts && section.discounts.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
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
                        {discount.replace("{discountPercentage}", discountPercentage.toString())}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
