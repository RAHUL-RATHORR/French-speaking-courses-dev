"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon } from "./icons/StarIcon";
import ImageUpload from "../ui/ImageUpload";

interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  message: string;
  rating: number;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: "5",
    avatar: "",
  });
  
  useEffect(() => {
    fetchTestimonials();
  }, []);
  
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/testimonials");
      
      if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, avatar: imageUrl }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const testimonialData = {
        ...formData,
        rating: parseInt(formData.rating),
      };
      
      const url = editingTestimonial 
        ? `/api/admin/testimonials/${editingTestimonial.id}` 
        : "/api/admin/testimonials";
      
      const method = editingTestimonial ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save testimonial");
      }
      
      // Reset form and refresh testimonials list
      resetForm();
      await fetchTestimonials();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error saving testimonial:", error);
      setError(error.message || "Failed to save testimonial");
    }
  };
  
  const startEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial?.name,
      role: testimonial.role || "",
      message: testimonial.message,
      rating: testimonial.rating.toString(),
      avatar: testimonial.avatar || "",
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete testimonial");
      }
      
      await fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      setError("Failed to delete testimonial");
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      message: "",
      rating: "5",
      avatar: "",
    });
    setEditingTestimonial(null);
    setShowForm(false);
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon key={index} filled={index < rating} />
    ));
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
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
          {testimonials.length} {testimonials.length === 1 ? "Testimonial" : "Testimonials"}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {showForm ? "Cancel" : "Add New Testimonial"}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role (Optional)
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Student, Business Professional"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              
              <div>
                <ImageUpload
                  onImageUploaded={handleImageUpload}
                  currentImage={formData.avatar}
                  label="Avatar Image"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                required
              ></textarea>
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
                {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center py-6 text-gray-500">
            No testimonials found
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {testimonial.avatar ? (
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-3 border-2 border-gray-200">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                    <span className="text-gray-500 font-bold text-lg">
                      {testimonial?.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-900">{testimonial?.name}</h3>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
              
              <div className="flex mb-2">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 mb-4">{testimonial.message}</p>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(testimonial)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
