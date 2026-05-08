"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

interface CityPage {
  id: string;
  cityName: string;
  slug: string;
  title: string;
  description: string;
  content: any;
  metaTitle: string | null;
  metaDescription: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CityPageManagement() {
  const [cityPages, setCityPages] = useState<CityPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState<CityPage | null>(null);
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  
  const [formData, setFormData] = useState({
    cityName: "",
    slug: "",
    title: "",
    description: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    published: true,
  });
  
  useEffect(() => {
    fetchCityPages();
  }, []);
  
  const fetchCityPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/city-pages");
      
      if (!res.ok) {
        throw new Error("Failed to fetch city pages");
      }
      
      const data = await res.json();
      setCityPages(data);
    } catch (err) {
      console.error("Error fetching city pages:", err);
      setError("Failed to load city pages");
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cityName') {
      // Auto-generate slug and title when city name changes
      const citySlug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      const generatedSlug = `french-classes-in-${citySlug}`;
      const generatedTitle = `Best French Language Classes in ${value}`;
      
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value, 
        slug: generatedSlug,
        title: generatedTitle,
        metaTitle: generatedTitle
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const url = editingPage 
        ? `/api/admin/city-pages/${editingPage.id}` 
        : "/api/admin/city-pages";
      
      const method = editingPage ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save city page");
      }
      
      resetForm();
      await fetchCityPages();
    } catch (err: any) {
      console.error("Error saving city page:", err);
      setError(err.message || "Failed to save city page");
    }
  };
  
  const startEdit = (page: CityPage) => {
    setEditingPage(page);
    setFormData({
      cityName: page.cityName,
      slug: page.slug,
      title: page.title,
      description: page.description,
      content: typeof page.content === 'string' ? page.content : JSON.stringify(page.content),
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      published: page.published,
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this city page?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/city-pages/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete city page");
      }
      
      await fetchCityPages();
    } catch (err) {
      console.error("Error deleting city page:", err);
      setError("Failed to delete city page");
    }
  };
  
  const resetForm = () => {
    setFormData({
      cityName: "",
      slug: "",
      title: "",
      description: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      published: true,
    });
    setEditingPage(null);
    setShowForm(false);
    setError("");
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading city pages...</div>;
  }
  
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {cityPages.length} City Pages Found
        </h2>
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {showForm ? "Cancel" : "Add New City Page"}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {editingPage ? "Edit City Page" : "Add New City Page"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Delhi, Mumbai"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="french-classes-in-cityname"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title (H1)</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                placeholder="Short summary for the page"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md space-y-4">
              <h4 className="font-medium text-blue-800">SEO Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="published"
                    value={formData.published ? "true" : "false"}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.value === "true" }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft (Hidden)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Content (Rich Text)</label>
              <div className="border border-gray-300 rounded-md">
                <Editor
                  apiKey="6rgp3aqnerp62a7r0l5av9vb7bjq42nhcy6wmzcf01bd9cd2"
                  onInit={(evt, editor) => editorRef.current = editor}
                  value={formData.content}
                  onEditorChange={handleContentChange}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'emoticons', 'template', 'paste',
                      'help', 'wordcount', 'autosave'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | ' +
                      'bold italic underline strikethrough | forecolor backcolor | ' +
                      'alignleft aligncenter alignright alignjustify | ' +
                      'bullist numlist outdent indent | ' +
                      'table link image media emoticons | ' +
                      'code preview fullscreen | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height: 1.6; }',
                  }}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold"
              >
                {editingPage ? "Update City Page" : "Create City Page"}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cityPages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No city pages created yet.</td>
              </tr>
            ) : (
              cityPages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{page.cityName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">/{page.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {page.published ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Live</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => startEdit(page)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
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
