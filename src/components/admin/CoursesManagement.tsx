"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatRupee } from "@/lib/utils";
import DynamicSectionsEditor from "./DynamicSectionsEditor";
import ImageUpload from "../ui/ImageUpload";
import FileUpload from "../ui/FileUpload";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string | null;
  rating?: number | null;
  students: number;
  image?: string | null;
  instructorImage?: string | null;
  brochureUrl?: string | null; // URL to the uploaded brochure PDF
  slug: string;
  createdAt: string;
  updatedAt: string;
  offerEndDate?: string | null;
  promotionBannerText?: string | null;
  startDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ctaText?: string | null;
  registrationOpen: boolean;
  // Complex fields stored as JSON strings in the database
  batches?: string | null; // JSON string of batch objects
  requirements?: string | null; // JSON string of requirement items
  timings?: string | null; // JSON string of timing information
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [dynamicSections, setDynamicSections] = useState<Record<string, unknown>>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    price: "",
    originalPrice: "",
    rating: "",
    students: "0",
    image: "",
    instructorImage: "",
    brochureUrl: "", // Add brochure URL field
    slug: "",
    offerEndDate: "",
    promotionBannerText: "",
    startDate: "",
    metaTitle: "",
    metaDescription: "",
    ctaText: "",
    registrationOpen: true,
    // Complex fields as JSON strings
    batches: "[]",
    requirements: "[]",
    timings: "{}"
  });
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/courses");
      
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleInstructorImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, instructorImage: imageUrl }));
  };

  const handleBrochureUpload = (fileUrl: string) => {
    setFormData((prev) => ({ ...prev, brochureUrl: fileUrl }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Filter out empty dynamic sections to reduce payload size
      const cleanedDynamicSections = Object.entries(dynamicSections).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && (typeof value !== 'object' || Object.keys(value as object).length > 0)) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, unknown>);

      const courseData = {
        ...formData,
        ...cleanedDynamicSections,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        students: formData.students ? parseInt(formData.students) : 0,
      };
      
      const url = editingCourse 
        ? `/api/admin/courses/${editingCourse.id}` 
        : "/api/admin/courses";
      
      const method = editingCourse ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      
      if (!res.ok) {
        let errorMessage = "Failed to save course";
        try {
          // Only attempt to parse as JSON if the response is not empty
          const text = await res.text();
          if (text) {
            try {
              const errorData = JSON.parse(text);
              errorMessage = errorData.error || errorMessage;
            } catch {
              // Not JSON, use the text if it's short
              errorMessage = text.length < 100 ? text : errorMessage;
            }
          }
        } catch {
          console.error("Error parsing response");
        }

        // Specific handling for common server errors
        if (res.status === 413) {
          errorMessage = "Data too large! Please reduce the amount of text or sections.";
        } else if (res.status === 504) {
          errorMessage = "Request timeout. The data might be too large for the server to process.";
        } else if (errorMessage === "Failed to save course") {
          errorMessage = `Server Error (${res.status}). Please try again.`;
        }
        
        throw new Error(errorMessage);
      }
      
      // Reset form and refresh courses list
      resetForm();
      await fetchCourses();
    } catch (err: unknown) {
      console.error("Error saving course:", err);
      setError(err instanceof Error ? err.message : "Failed to save course");
    }
  };
  
  const [fetchingCourseId, setFetchingCourseId] = useState<string | null>(null);

  const startEdit = async (courseSummary: Course) => {
    try {
      setFetchingCourseId(courseSummary.id);
      const res = await fetch(`/api/admin/courses/${courseSummary.id}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch full course details");
      }
      
      const course = await res.json();
      
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description || "",
        level: course.level,
        duration: course.duration,
        price: course.price,
        originalPrice: course.originalPrice || "",
        rating: course.rating?.toString() || "",
        students: course.students.toString(),
        image: course?.image || "",
        instructorImage: course?.instructorImage || "",
        brochureUrl: course?.brochureUrl || "",
        slug: course.slug,
        offerEndDate: course.offerEndDate || "",
        promotionBannerText: course.promotionBannerText || "",
        startDate: course.startDate || "",
        metaTitle: course.metaTitle || "",
        metaDescription: course.metaDescription || "",
        ctaText: course.ctaText || "",
        registrationOpen: course.registrationOpen !== false,
        batches: course.batches ? (typeof course.batches === 'string' ? course.batches : JSON.stringify(course.batches)) : "[]",
        requirements: course.requirements ? (typeof course.requirements === 'string' ? course.requirements : JSON.stringify(course.requirements)) : "[]",
        timings: course.timings ? (typeof course.timings === 'string' ? course.timings : JSON.stringify(course.timings)) : "{}"
      });
      
      // Load existing dynamic sections if available
      const existingSections = {
        heroBannerSection: course.heroBannerSection || null,
        overviewSection: course.overviewSection || null,
        whyEnrollSection: course.whyEnrollSection || null,
        benefitsSection: course.benefitsSection || null,
        curriculumSection: course.curriculumSection || null,
        feesSection: course.feesSection || null,
        skillsToolsSection: course.skillsToolsSection || null,
        projectsSection: course.projectsSection || null,
        reviewsSection: course.reviewsSection || null,
        faqSection: course.faqSection || null,
        comparisonSection: course.comparisonSection || null,
        batchScheduleSection: course.batchScheduleSection || null,
        ctaSections: course.ctaSections || null,
      };
      setDynamicSections(existingSections);
      
      setShowForm(true);
    } catch (err) {
      console.error("Error fetching course details:", err);
      setError("Failed to load course details for editing");
    } finally {
      setFetchingCourseId(null);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete course");
      }
      
      await fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      setError("Failed to delete course");
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      level: "",
      duration: "",
      price: "",
      originalPrice: "",
      rating: "",
      students: "0",
      image: "",
      instructorImage: "",
      brochureUrl: "", // Add brochure URL field
      slug: "",
      offerEndDate: "",
      promotionBannerText: "",
      startDate: "",
      metaTitle: "",
      metaDescription: "",
      ctaText: "",
      registrationOpen: true,
      batches: "[]",
      requirements: "[]",
      timings: "{}"
    });
    setDynamicSections({});
    setEditingCourse(null);
    setShowForm(false);
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading courses...</div>;
  }
  
  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {courses.length} {courses.length === 1 ? "Course" : "Courses"}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {showForm ? "Cancel" : "Add New Course"}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingCourse ? "Edit Course" : "Add New Course"}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. 40 hours"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. $99"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (Optional)
                </label>
                <input
                  type="text"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. $149"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (Optional)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. 4.5"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students
                </label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
              </div>
              
              <div>
                <ImageUpload
                  onImageUploaded={handleImageUpload}
                  currentImage={formData.image}
                  label="Course Image"
                  className="w-full"
                />
              </div>

              <div>
                <ImageUpload
                  onImageUploaded={handleInstructorImageUpload}
                  currentImage={formData.instructorImage}
                  label="Instructor Image"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <FileUpload
                onFileUploaded={handleBrochureUpload}
                currentFile={formData.brochureUrl}
                label="Course Brochure (PDF)"
                accept=".pdf"
                allowedTypes={['application/pdf']}
                maxSize={10 * 1024 * 1024} // 10MB
                className="w-full"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                required
              ></textarea>
            </div>
            
            <h3 className="font-medium text-lg mb-4 mt-6 border-b pb-2">Dynamic Course Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer End Date
                </label>
                <input
                  type="date"
                  name="offerEndDate"
                  value={formData.offerEndDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Promotion Banner Text
                </label>
                <input
                  type="text"
                  name="promotionBannerText"
                  value={formData.promotionBannerText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Limited Time Offer: 25% Off"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Text
                </label>
                <input
                  type="text"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Register Now"
                />
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="registrationOpen"
                  name="registrationOpen"
                  checked={Boolean(formData.registrationOpen)}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="registrationOpen" className="ml-2 block text-sm font-medium text-gray-700">
                  Registration Open
                </label>
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-4 mt-6 border-b pb-2">SEO Information</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="SEO title for the course page"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="SEO description for the course page"
                ></textarea>
              </div>
            </div>
            
            {/* <h3 className="font-medium text-lg mb-4 mt-6 border-b pb-2">Course Details</h3> */}
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batches (JSON)
                </label>
                <textarea
                  name="batches"
                  value={formData.batches}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  rows={4}
                  placeholder='[{"name": "Morning Batch", "days": "Mon-Wed-Fri", "time": "9:00 AM - 11:00 AM"}, {"name": "Evening Batch", "days": "Tue-Thu", "time": "6:00 PM - 8:00 PM"}]'
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Enter as JSON array of batch objects</p>
              </div> */}
              
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements (JSON)
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  rows={4}
                  placeholder='["Basic knowledge of grammar", "Commitment to practice daily", "Computer with internet connection"]'
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Enter as JSON array of strings</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timings (JSON)
                </label>
                <textarea
                  name="timings"
                  value={formData.timings}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  rows={4}
                  placeholder='{"total": "40 hours", "weekly": "8 hours", "duration": "40 hours"}'
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Enter as JSON object with timing details</p>
              </div> */}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingCourse ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dynamic Sections Editor - Only show when editing or adding a course */}
      {showForm && (
        <div className="mb-6">
          <DynamicSectionsEditor 
            course={editingCourse ? {...editingCourse} as Record<string, unknown> : {}}
            onUpdate={(sections) => setDynamicSections(sections)}
          />
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {course.image && (
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={40}
                          height={40}
                          className="rounded-full mr-3 object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {course.description.length > 100
                            ? `${course.description.substring(0, 100)}...`
                            : course.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatRupee(course.price)}</div>
                    {course.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        {formatRupee(course.originalPrice)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => startEdit(course)}
                      disabled={fetchingCourseId === course.id}
                      className={`text-indigo-600 hover:text-indigo-900 mr-4 font-medium ${fetchingCourseId === course.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {fetchingCourseId === course.id ? "Loading..." : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
