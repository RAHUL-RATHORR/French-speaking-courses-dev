"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Image from 'next/image';
import ImageUpload from "../ui/ImageUpload";
import { openLinksInNewTab } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  image?: string | null;
  author: string;
  excerpt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    image: "",
    author: "French Skill Academy",
    excerpt: "",
  });
  
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blog");
      
      if (!res.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      
      const data = await res.json();
      setBlogPosts(data);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when title changes
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
      
      setFormData((prev) => ({ ...prev, [name]: value, slug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => {
      // Auto-generate excerpt if not manually set
      let autoExcerpt = prev.excerpt;
      if (!prev.excerpt || prev.excerpt.trim() === '') {
        // Strip HTML tags and get first 150 characters
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        autoExcerpt = textContent.length > 150 
          ? textContent.substring(0, 150) + '...'
          : textContent;
      }
      
      return { ...prev, content, excerpt: autoExcerpt };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPost 
        ? `/api/admin/blog/${editingPost.id}` 
        : "/api/admin/blog";
      
      const method = editingPost ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save blog post");
      }
      
      // Reset form and refresh blog posts list
      resetForm();
      await fetchBlogPosts();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error saving blog post:", error);
      setError(error.message || "Failed to save blog post");
    }
  };
  
  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      slug: post.slug,
      image: post?.image || "",
      author: post.author,
      excerpt: post.excerpt || "",
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete blog post");
      }
      
      await fetchBlogPosts();
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError("Failed to delete blog post");
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      slug: "",
      image: "",
      author: "French Skill Academy",
      excerpt: "",
    });
    setEditingPost(null);
    setShowForm(false);
    setShowPreview(false);
    setError("");
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading blog posts...</div>;
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
          {blogPosts.length} {blogPosts.length === 1 ? "Blog Post" : "Blog Posts"}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          {showForm ? "Cancel" : "Add New Blog Post"}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
            </h3>
            <p className="text-sm text-gray-600">
              Create engaging blog content with rich text formatting and image uploads. 
              The slug will be auto-generated from the title, and excerpt will be created from content if not provided.
            </p>
          </div>
          
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
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <ImageUpload
                  onImageUploaded={handleImageUpload}
                  currentImage={formData.image}
                  label="Blog Post Image"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Short description for the blog post"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
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
                    table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height: 1.6; }',
                    default_link_target: '_blank',
                    link_default_target: '_blank',
                    link_default_rel: 'noopener noreferrer',
                    link_assume_external_targets: 'https',
                    paste_data_images: true,
                    file_picker_types: 'image',
                    automatic_uploads: true,
                    images_upload_handler: async (blobInfo: { blob: () => Blob; filename: () => string }) => {
                      const formData = new FormData();
                      formData.append('file', blobInfo.blob(), blobInfo.filename());
                      
                      try {
                        console.log('Starting blog image upload...');
                        const response = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        });
                        
                        if (!response.ok) {
                          const errorText = await response.text();
                          console.error('Upload failed with status:', response.status, errorText);
                          throw new Error(`Upload failed: ${response.status}`);
                        }
                        
                        const data = await response.json();
                        return data.url;
                      } catch (error) {
                        console.error('Image upload failed:', error);
                        throw error;
                      }
                    },
                    setup: (editor: { on: (event: string, callback: () => void) => void; getContent: () => string }) => {
                      editor.on('change', () => {
                        handleContentChange(editor.getContent());
                      });
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              
              <div className="flex space-x-2">
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
                  {editingPost ? "Update Blog Post" : "Add Blog Post"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Preview Section */}
      {showPreview && formData.title && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="bg-white p-6 rounded-lg border">
            {/* Preview Image */}
            {formData.image && (
              <div className="relative w-full h-75 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={formData.image || '/french-skill.png'}
                  alt={formData.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Preview Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {formData.title}
            </h1>
            
            {/* Preview Meta */}
            <div className="flex items-center text-gray-600 gap-x-6 mb-6">
              <div className="flex items-center">
                <span>📅 {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <span>👤 {formData.author}</span>
              </div>
            </div>
            
            {/* Preview Excerpt */}
            {formData.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                {formData.excerpt}
              </div>
            )}
            
            {/* Preview Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: openLinksInNewTab(formData.content) }}
            />
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogPosts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No blog posts found
                </td>
              </tr>
            ) : (
              blogPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post?.image && (
                        <div className="h-10 w-10 rounded-full mr-3 bg-gray-200 overflow-hidden">
                          <div 
                            className="h-full w-full bg-cover bg-center" 
                            style={{ backgroundImage: `url(${post?.image})` }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500">{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => startEdit(post)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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
