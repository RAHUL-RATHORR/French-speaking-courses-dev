"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Define interfaces for our data types
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  createdAt: string | Date;
}

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  createdAt: string | Date;
}

interface Course {
  id: string;
  title: string;
  level: string;
  slug: string;
  createdAt: string | Date;
}

interface DashboardData {
  blogs: BlogPost[];
  testimonials: Testimonial[];
  courses: Course[];
}

export default function DashboardOverview({ initialData }: { initialData?: DashboardData | null }) {
  // State for each data type
  const [blogs, setBlogs] = useState<BlogPost[]>(initialData?.blogs || []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData?.testimonials || []);
  const [courses, setCourses] = useState<Course[]>(initialData?.courses || []);
  
  // Loading states
  const [loadingBlogs, setLoadingBlogs] = useState(!initialData);
  const [loadingTestimonials, setLoadingTestimonials] = useState(!initialData);
  const [loadingCourses, setLoadingCourses] = useState(!initialData);
  
  // Error states
  const [blogsError, setBlogsError] = useState("");
  const [testimonialsError, setTestimonialsError] = useState("");
  const [coursesError, setCoursesError] = useState("");

  // Fetch all data on component mount if not provided
  useEffect(() => {
    if (initialData) return;
    
    fetchBlogs();
    fetchTestimonials();
    fetchCourses();
  }, [initialData]);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const res = await fetch("/api/admin/blog");
      
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      
      const data = await res.json();
      setBlogs(data);
      setBlogsError("");
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogsError("Failed to load blogs");
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Function to fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      const res = await fetch("/api/admin/testimonials");
      
      if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      
      const data = await res.json();
      setTestimonials(data);
      setTestimonialsError("");
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setTestimonialsError("Failed to load testimonials");
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // Function to fetch courses
  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const res = await fetch("/api/admin/courses");
      
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      
      const data = await res.json();
      setCourses(data);
      setCoursesError("");
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCoursesError("Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  // Format date for display
  const formatDate = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dashboard summary cards */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Blogs</h3>
          <p className="text-3xl font-bold text-french-blue mt-2">
            {loadingBlogs ? "..." : blogs.length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Testimonials</h3>
          <p className="text-3xl font-bold text-french-blue mt-2">
            {loadingTestimonials ? "..." : testimonials.length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          <p className="text-3xl font-bold text-french-blue mt-2">
            {loadingCourses ? "..." : courses.length}
          </p>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Blog Posts</h2>
          <Link href="/admin/blog" className="text-french-blue hover:text-blue-700 transition">
            Manage All Blogs
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          {loadingBlogs ? (
            <div className="text-center py-4">Loading blogs...</div>
          ) : blogsError ? (
            <div className="text-center py-4 text-red-500">{blogsError}</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-4">No blogs found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.slice(0, 5).map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(blog.createdAt)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Testimonials</h2>
          <Link href="/admin/testimonials" className="text-french-blue hover:text-blue-700 transition">
            Manage All Testimonials
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          {loadingTestimonials ? (
            <div className="text-center py-4">Loading testimonials...</div>
          ) : testimonialsError ? (
            <div className="text-center py-4 text-red-500">{testimonialsError}</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-4">No testimonials found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testimonials.slice(0, 5).map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{testimonial?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{testimonial.rating}/5</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(testimonial.createdAt)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Courses</h2>
          <Link href="/admin/courses" className="text-french-blue hover:text-blue-700 transition">
            Manage All Courses
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          {loadingCourses ? (
            <div className="text-center py-4">Loading courses...</div>
          ) : coursesError ? (
            <div className="text-center py-4 text-red-500">{coursesError}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-4">No courses found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.slice(0, 5).map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{course.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(course.createdAt)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
