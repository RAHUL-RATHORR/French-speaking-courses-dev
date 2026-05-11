"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating?: number;
}

interface PremiumTestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function PremiumTestimonialSlider({ testimonials }: PremiumTestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const maxIndex = testimonials.length;
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleCount(4);
      else if (width >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % maxIndex);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(testimonials[(currentIndex + i) % maxIndex]);
    }
    return items;
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-6 overflow-hidden px-4">
        <AnimatePresence mode="popLayout">
          {getVisibleItems().map((testimonial, idx) => (
            <motion.div
              key={`${currentIndex}-${idx}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className={`flex-shrink-0 relative group ${
                visibleCount === 4 ? 'w-[calc(25%-18px)]' : 
                visibleCount === 2 ? 'w-[calc(50%-12px)]' : 
                'w-full'
              }`}
            >
              <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-gray-800 shadow-2xl">
                {/* Background Image / Placeholder */}
                <Image
                  src={testimonial.image || "/french-skill.png"}
                  alt={testimonial.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Rating Badge Top Right */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
                  <span className="text-white text-xs font-bold">{testimonial.rating || "5.0"}</span>
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
                
                {/* Play Button Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-[#1A3260] fill-current translate-x-0.5" />
                  </div>
                </div>
                
                {/* Info Bottom */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-white text-xl font-black mb-2">{testimonial.name}</h4>
                  <div className="flex text-yellow-400 gap-0.5 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i > (testimonial.rating || 5) ? 'text-gray-400' : 'fill-current'}`} />
                    ))}
                    <span className="ml-2 text-white/60 text-xs font-bold">{testimonial.rating || "5.0"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 bg-white backdrop-blur-md border border-gray-200 rounded-full flex items-center justify-center text-[#1A3260] shadow-lg hover:bg-gray-50 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20">
        <button 
          onClick={nextSlide}
          className="w-12 h-12 bg-white backdrop-blur-md border border-gray-100 rounded-full flex items-center justify-center text-[#1A3260] shadow-lg hover:bg-gray-50 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
