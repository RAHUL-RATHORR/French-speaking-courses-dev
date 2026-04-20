"use client"

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CourseCard from '@/components/CourseCard';

interface CourseFromAPI {
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
  registrationOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface CourseFilterProps {
  courses: CourseFromAPI[];
  filterOptions: FilterOption[];
}

export default function CourseFilter({ courses, filterOptions }: CourseFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize filter and search from URL parameters
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sync with URL parameters on component mount and when searchParams change
  useEffect(() => {
    const initialFilter = searchParams.get('level') || searchParams.get('category') || 'all';
    const initialSearch = searchParams.get('search') || '';
    
    setSelectedFilter(initialFilter);
    setSearchTerm(initialSearch);
  }, [searchParams]);

  // Update URL when filter changes
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'all') {
      params.delete('level');
      params.delete('category');
    } else {
      // Check if it's a level or category filter
      const isLevel = ['Beginner', 'Intermediate', 'Advanced', 'All levels'].includes(filter);
      if (isLevel) {
        params.set('level', filter);
        params.delete('category');
      } else {
        params.set('category', filter);
        params.delete('level');
      }
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/courses';
    router.replace(newUrl, { scroll: false });
  };

  // Update URL when search changes
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '/courses';
    router.replace(newUrl, { scroll: false });
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesFilter = selectedFilter === 'all' || course.level === selectedFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Search Bar Section */}
      <section className="py-8 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-french-blue/20 text-lg shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Filter by level</h2>
            <p className="text-gray-600">Find the perfect course for your current level</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                  selectedFilter === option.value
                    ? 'btn-french-primary shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <span>{option.label}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedFilter === option.value 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
          
          {searchTerm && (
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {filteredCourses.length} course{filteredCourses.length > 1 ? 's' : ''} found for &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {selectedFilter === 'all' ? 'All our courses' : `Courses ${selectedFilter}`}
                </h2>
                <div className="section-divider w-24 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No course found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search criteria or contact us for a personalized course.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  handleFilterChange('all');
                }}
                className="btn-french-primary px-8 py-3 rounded-xl font-semibold"
              >
                <span>See all courses</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
