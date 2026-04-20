'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const maxIndex = testimonials.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Update visible count based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(3); // Desktop: 3 cards
      } else if (width >= 640) {
        setVisibleCount(2); // Tablet: 2 cards
      } else {
        setVisibleCount(1); // Mobile: 1 card
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate which testimonials to show
  const getVisibleTestimonials = useCallback(() => {
    // Create a new array that wraps around to the beginning if needed
    const visibleItems: Testimonial[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % maxIndex;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  }, [currentIndex, visibleCount, maxIndex, testimonials]);
  
  // Slide management
  const goToSlide = useCallback((index: number) => {
    // Ensure the index loops around
    let newIndex = index;
    if (newIndex < 0) newIndex = maxIndex - 1;
    if (newIndex >= maxIndex) newIndex = 0;
    
    setCurrentIndex(newIndex);
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [goToSlide, currentIndex]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [goToSlide, currentIndex]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative px-4">
      {/* Multi-card responsive carousel */}
      <div className="overflow-hidden" ref={carouselRef}>
        <div className="flex flex-wrap -mx-4 p-3 transition-all duration-500">
          {getVisibleTestimonials().map((testimonial, idx) => (
            <div 
              key={`${currentIndex}-${idx}`}
              className={`px-4 mb-4 md:mb-0 transition-all duration-500 ${
                visibleCount === 1 ? 'w-full' : 
                visibleCount === 2 ? 'w-full sm:w-1/2' : 
                'w-full sm:w-1/2 lg:w-1/3'
              }`}
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg h-full flex flex-col transform transition-all duration-300 hover:translate-y-[-5px]">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 flex justify-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-french-red/20 shadow-sm">
                      <Image
                        src={testimonial?.image || "/default-avatar.png"}
                        alt={testimonial?.name || "Student"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-lg text-french-blue">{testimonial?.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial?.role}</p>
                  </div>
                </div>
                <div className="mt-2 mb-2 border-t border-gray-100"></div>
                <p className="text-gray-700 italic flex-grow text-center sm:text-left">
                  &ldquo;{testimonial?.content}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-french-blue text-blue rounded-full p-2 md:p-3 shadow-lg z-10 hover:text-white hover:bg-blue-700 transition-colors"
        onClick={prevSlide}
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-french-blue text-blue rounded-full p-2 md:p-3 shadow-lg z-10 hover:text-white hover:bg-blue-700 transition-colors"
        onClick={nextSlide}
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-8">
        {testimonials.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full mx-1 transition-colors ${currentIndex === index ? 'bg-french-blue' : 'bg-gray-300'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={currentIndex === index ? 'true' : 'false'}
          ></button>
        ))}
      </div>
    </div>
  );
}
