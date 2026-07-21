"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { tinymceEditorProps, blogEditorInit, faqEditorInit, uploadEditorImage } from "./tinymceConfig";
import Image from 'next/image';
import ImageUpload from "../ui/ImageUpload";
import { StarIcon } from "./icons/StarIcon";
import { openLinksInNewTab } from "@/lib/utils";
import { BlogFAQItem, normalizeBlogFaqs } from "@/lib/blog-faq";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  image?: string | null;
  author: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaKeywords?: string | null;
  metaDescription?: string | null;
  categories?: string[];
  tags?: string[];
  faqs?: BlogFAQItem[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

const AVAILABLE_CATEGORIES = [
  "DELF/DALF Prep",
  "Learn French",
  "French Grammar",
  "Vocabulary",
  "Study in France",
  "French Culture",
  "General"
];

const AVAILABLE_TAGS = [
  "A1 exam preparation strategy",
  "Learn French for A1 exam",
  "B1 DELF tips",
  "Study in France requirements",
  "French Grammar rules",
  "Top 10 French TV shows",
  "French verbs to learn easily",
  "Is Paris affordable for students",
  "Advantages of learning French"
];

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [fetchingPostId, setFetchingPostId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    image: "",
    author: "French Skill Academy",
    excerpt: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    categories: [] as string[],
    tags: [] as string[],
    faqs: [] as BlogFAQItem[],
    featured: false,
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
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    
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
  
  const handleCategoryChange = (category: string) => {
    setFormData(prev => {
      const current = prev.categories || [];
      if (current.includes(category)) {
        return { ...prev, categories: current.filter(c => c !== category) };
      } else {
        return { ...prev, categories: [...current, category] };
      }
    });
  };

  const handleTagChange = (tag: string) => {
    setFormData(prev => {
      const current = prev.tags || [];
      if (current.includes(tag)) {
        return { ...prev, tags: current.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...current, tag] };
      }
    });
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  };

  const updateFaq = (index: number, field: keyof BlogFAQItem, value: string) => {
    setFormData((prev) => {
      const faqs = [...(prev.faqs || [])];
      faqs[index] = { ...faqs[index], [field]: value };
      return { ...prev, faqs };
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
        if (res.status === 404 && editingPost) {
          setEditingPost(null);
          setShowForm(false);
          await fetchBlogPosts();
          throw new Error("This blog post was deleted or no longer exists. Please refresh and try again.");
        }
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
  
  const startEdit = async (post: BlogPost) => {
    try {
      setFetchingPostId(post.id);
      setError("");
      const res = await fetch(`/api/admin/blog/${post.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch blog post details");
      }

      const fullPost = await res.json();

      setEditingPost(fullPost);
      setFormData({
        title: fullPost.title,
        content: fullPost.content || "",
        slug: fullPost.slug,
        image: fullPost?.image || "",
        author: fullPost.author,
        excerpt: fullPost.excerpt || "",
        metaTitle: fullPost.metaTitle || "",
        metaKeywords: fullPost.metaKeywords || "",
        metaDescription: fullPost.metaDescription || "",
        categories: fullPost.categories || [],
        tags: fullPost.tags || [],
        faqs: normalizeBlogFaqs(fullPost.faqs),
        featured: fullPost.featured ?? false,
      });
      setShowForm(true);
    } catch (err) {
      console.error("Error loading blog post:", err);
      setError("Failed to load blog post for editing");
    } finally {
      setFetchingPostId(null);
    }
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

      if (editingPost?.id === id) {
        resetForm();
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
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      categories: [],
      tags: [],
      faqs: [],
      featured: false,
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

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label htmlFor="featured" className="flex items-center gap-2 cursor-pointer">
                  <StarIcon
                    filled={formData.featured}
                    className={formData.featured ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured (show on homepage)
                  </span>
                </label>
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
                  key={editingPost?.id ?? "new-post"}
                  {...tinymceEditorProps}
                  onInit={(evt, editor) => editorRef.current = editor}
                  value={formData.content}
                  onEditorChange={handleContentChange}
                  init={{
                    ...blogEditorInit,
                    images_upload_handler: uploadEditorImage,
                    setup: (editor: { on: (event: string, callback: () => void) => void; getContent: () => string }) => {
                      editor.on('change', () => {
                        handleContentChange(editor.getContent());
                      });
                    }
                  }}
                />
              </div>
            </div>
            
            {/* SEO Section */}
            <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">SEO - Meta Tags</h3>
              <p className="text-sm text-gray-500 mb-4">Define page meta title, meta keywords and meta description to list your page in search engines</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title *
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  maxLength={70}
                />
                <span className="text-xs text-gray-500">Max length 70 characters</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keyword
                </label>
                <textarea
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  maxLength={160}
                />
                <span className="text-xs text-gray-500">Max length 160 characters</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  maxLength={250}
                />
                <span className="text-xs text-gray-500">Max length 250 characters</span>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">FAQ&apos;s</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Add questions and answers — they will appear at the bottom of the live blog post.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-3 py-2 bg-french-blue text-white text-sm rounded-md hover:bg-blue-900 transition-colors"
                >
                  + Add FAQ
                </button>
              </div>

              {(formData.faqs || []).length === 0 ? (
                <p className="text-sm text-gray-500 italic">No FAQs added yet.</p>
              ) : (
                <div className="space-y-6">
                  {formData.faqs.map((faq, idx) => (
                    <div key={`faq-${idx}-${editingPost?.id ?? "new"}`} className="bg-white p-4 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Question {idx + 1}
                        </label>
                        <button
                          type="button"
                          onClick={() => removeFaq(idx)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                        placeholder="Enter FAQ question"
                      />
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer
                      </label>
                      <Editor
                        key={`blog-faq-${idx}-${editingPost?.id ?? "new"}`}
                        {...tinymceEditorProps}
                        value={faq.answer}
                        onEditorChange={(content) => updateFaq(idx, "answer", content)}
                        init={{
                          ...faqEditorInit,
                          images_upload_handler: uploadEditorImage,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Categories & Tags Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Categories */}
              <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-800">Categories *</h3>
                </div>
                <div className="p-4 space-y-2">
                  {AVAILABLE_CATEGORIES.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${category}`}
                        checked={(formData.categories || []).includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`cat-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                  <div className="pt-2">
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      + Add New Category
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-800">Tags</h3>
                </div>
                <div className="p-4 space-y-2">
                  {AVAILABLE_TAGS.map(tag => (
                    <div key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`tag-${tag}`}
                        checked={(formData.tags || []).includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`tag-${tag}`} className="ml-2 text-sm text-gray-700">
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
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
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
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
                  <td className="px-6 py-4">
                    <StarIcon
                      filled={Boolean(post.featured)}
                      className={post.featured ? "text-yellow-400" : "text-gray-300"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => startEdit(post)}
                      disabled={fetchingPostId === post.id}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 disabled:opacity-50"
                    >
                      {fetchingPostId === post.id ? "Loading..." : "Edit"}
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

