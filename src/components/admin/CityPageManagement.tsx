"use client";

import { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Button from "@/components/ui/Button";
import ImageUpload from "../ui/ImageUpload";

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  rating: number;
  designation: string;
  profile: string;
  description: string;
}

interface CityPage {
  id: string;
  cityName: string;
  slug: string;
  title: string;
  headerImage: string;
  content: string;
  middleContent: string;
  afterCourseContent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  faqs: FAQ[];
  testimonials: Testimonial[];
  isActive: boolean;
}

export default function CityPageManagement() {
  const [cityPages, setCityPages] = useState<CityPage[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<CityPage>>({
    cityName: "",
    slug: "",
    title: "",
    headerImage: "",
    content: "",
    middleContent: "",
    afterCourseContent: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    faqs: [{ question: "", answer: "" }],
    testimonials: [{ name: "", rating: 5, designation: "", profile: "", description: "" }],
    isActive: true,
  });

  useEffect(() => {
    fetchCityPages();
  }, []);

  const fetchCityPages = async () => {
    try {
      const res = await fetch("/api/admin/city-pages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCityPages(data);
      } else {
        setCityPages([]);
      }
    } catch (error) {
      console.error("Failed to fetch city pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = formData.id
        ? `/api/admin/city-pages/${formData.id}`
        : "/api/admin/city-pages";
      const method = formData.id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setIsEditing(false);
        resetForm();
        fetchCityPages();
      } else {
        setError(result.error || "Failed to save city page");
      }
    } catch (error) {
      console.error("Failed to save city page:", error);
      setError("An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      cityName: "",
      slug: "",
      title: "",
      headerImage: "",
      content: "",
      middleContent: "",
      afterCourseContent: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      faqs: [{ question: "", answer: "" }],
      testimonials: [{ name: "", rating: 5, designation: "", profile: "", description: "" }],
      isActive: true,
    });
    setIsEditing(false);
    setError("");
  };

  // Dynamic Item Handlers
  const addFaq = () => setFormData({ ...formData, faqs: [...(formData.faqs || []), { question: "", answer: "" }] });
  const removeFaq = (index: number) => setFormData({ ...formData, faqs: formData.faqs?.filter((_, i) => i !== index) });
  const updateFaq = (index: number, field: keyof FAQ, value: string) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addTestimonial = () => setFormData({ ...formData, testimonials: [...(formData.testimonials || []), { name: "", rating: 5, designation: "", profile: "", description: "" }] });
  const removeTestimonial = (index: number) => setFormData({ ...formData, testimonials: formData.testimonials?.filter((_, i) => i !== index) });
  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    const newTestimonials = [...(formData.testimonials || [])];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value } as Testimonial;
    setFormData({ ...formData, testimonials: newTestimonials });
  };

  const editorConfig = {
    height: 400,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
      'visualchars', 'directionality'
    ],
    toolbar: 'undo redo | blocks fontfamily fontsize | ' +
      'bold italic underline strikethrough | forecolor backcolor removeformat | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | ' +
      'table link image media emoticons | ' +
      'code preview fullscreen | ltr rtl help',
    table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height: 1.6; }',
    apiKey: "6rgp3aqnerp62a7r0l5av9vb7bjq42nhcy6wmzcf01bd9cd2"
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="sticky top-0 z-30 bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{formData.id ? "Edit City Page" : "Add New Page city"}</h2>
            <p className="text-xs text-gray-500">Pages &gt; Add New Pages city</p>
          </div>
          <div className="flex space-x-3">
            <button onClick={resetForm} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
            <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Publish"}</Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}
          <form className="space-y-8">
            {/* Basic Info Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b bg-gray-50/50">
                <h3 className="font-bold text-gray-800">Add New Page</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Page Name: *</label>
                  <input
                    type="text"
                    required
                    value={formData.cityName}
                    onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Page Url: *</label>
                  <div className="flex items-center">
                    <span className="bg-gray-100 border border-r-0 px-4 py-3 rounded-l-lg text-gray-500 text-sm">https://frenchskill.com/</span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="flex-1 p-3 border rounded-r-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                      placeholder="city-name"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Section 1: Hero Title */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-french-blue/5 px-6 py-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-french-blue uppercase tracking-wider">Section 1 (Hero Title)</h3>
              </div>
              <div className="p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Main Heading of the Page:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                  placeholder="e.g. French Classes in Mumbai"
                />
              </div>
            </div>

            {/* Section 2: Our Vision */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-french-blue/5 px-6 py-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-french-blue uppercase tracking-wider">Section 2 (Our Vision)</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Badge Text: (e.g. OUR VISION)</label>
                    <input
                      type="text"
                      value={formData.middleContent?.split('|||')[0] || ""}
                      onChange={(e) => {
                        const parts = formData.middleContent?.split('|||') || ["", "", ""];
                        setFormData({ ...formData, middleContent: `${e.target.value}|||${parts[1] || ""}|||${parts[2] || ""}` });
                      }}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                      placeholder="e.g. OUR VISION"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Main Heading: (e.g. Unlock Fluency in Mumbai)</label>
                    <input
                      type="text"
                      value={formData.middleContent?.split('|||')[1] || ""}
                      onChange={(e) => {
                        const parts = formData.middleContent?.split('|||') || ["", "", ""];
                        setFormData({ ...formData, middleContent: `${parts[0] || ""}|||${e.target.value}|||${parts[2] || ""}` });
                      }}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                      placeholder="e.g. Unlock Fluency in Mumbai"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description:</label>
                    <Editor
                      apiKey={editorConfig.apiKey}
                      init={editorConfig as Record<string, unknown>}
                      value={formData.middleContent?.split('|||')[2] || formData.middleContent || ""}
                      onEditorChange={(content) => {
                        const parts = formData.middleContent?.split('|||') || ["", "", ""];
                        setFormData({ ...formData, middleContent: `${parts[0] || ""}|||${parts[1] || ""}|||${content}` });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Self-Paced & Structured */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-french-blue/5 px-6 py-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-french-blue uppercase tracking-wider">Section 3 (Self-Paced & Structured)</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Section 3 Heading: (e.g. Self-Paced & Structured)</label>
                  <input
                    type="text"
                    value={formData.afterCourseContent?.includes('|||') ? formData.afterCourseContent.split('|||')[0] : ""}
                    onChange={(e) => {
                      const raw = formData.afterCourseContent || "";
                      const parts = raw.includes('|||') ? raw.split('|||') : ["", raw, ""];
                      while(parts.length < 3) parts.push("");
                      setFormData({ ...formData, afterCourseContent: `${e.target.value}|||${parts[1]}|||${parts[2]}` });
                    }}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                    placeholder="Section 3 Title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Section 3 Description:</label>
                  <Editor
                    apiKey={editorConfig.apiKey}
                    init={editorConfig as Record<string, unknown>}
                    value={formData.afterCourseContent?.includes('|||') ? formData.afterCourseContent.split('|||')[1] : formData.afterCourseContent || ""}
                    onEditorChange={(content) => {
                      const raw = formData.afterCourseContent || "";
                      const parts = raw.includes('|||') ? raw.split('|||') : ["", raw, ""];
                      // Ensure at least 3 parts
                      while(parts.length < 3) parts.push("");
                      setFormData({ ...formData, afterCourseContent: `${parts[0]}|||${content}|||${parts[2]}` });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Start Your Journey Now */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-french-blue/5 px-6 py-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-french-blue uppercase tracking-wider">Section 4 (Start Your Journey Now)</h3>
              </div>
              <div className="p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraph Text: (Inside the blue box)</label>
                <textarea
                  value={formData.afterCourseContent?.includes('|||') ? formData.afterCourseContent.split('|||')[2] : ""}
                  onChange={(e) => {
                    const raw = formData.afterCourseContent || "";
                    const parts = raw.includes('|||') ? raw.split('|||') : ["", raw, ""];
                    // Ensure at least 3 parts
                    while(parts.length < 3) parts.push("");
                    setFormData({ ...formData, afterCourseContent: `${parts[0]}|||${parts[1]}|||${e.target.value}` });
                  }}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                  placeholder="Paste your CTA paragraph here..."
                />
              </div>
            </div>

            {/* Header Image Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page Header Image:</label>
              <ImageUpload
                onImageUploaded={(url) => setFormData({ ...formData, headerImage: url })}
                currentImage={formData.headerImage}
                label="Header Image"
              />
              <p className="text-[10px] text-gray-400 mt-2">Accepted: webp, jpeg, png, jpg. Max file size 2Mb</p>
            </div>

            {/* SEO Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b bg-gray-50/50">
                <h3 className="font-bold text-gray-800">SEO - Meta Tags</h3>
                <p className="text-xs text-gray-500">Define page meta title, meta keywords and meta description to list your page in search engines</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title: *</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all"
                    maxLength={70}
                  />
                  <p className="text-[10px] text-gray-400 mt-1 text-right">Max length 70 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Keyword:</label>
                  <textarea
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all h-20"
                    maxLength={160}
                  />
                  <p className="text-[10px] text-gray-400 mt-1 text-right">Max length 160 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description:</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-french-blue/20 outline-none transition-all h-24"
                    maxLength={250}
                  />
                  <p className="text-[10px] text-gray-400 mt-1 text-right">Max length 250 characters</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Faq&apos;s</h3>
                <button type="button" onClick={addFaq} className="p-1 bg-[#1A3260] text-white rounded hover:bg-blue-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                {formData.faqs?.map((faq, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b last:border-0">
                    <div className="flex-1 space-y-2">
                      <input
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                      <textarea
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm h-20"
                      />
                    </div>
                    <button type="button" onClick={() => removeFaq(idx)} className="text-red-400 hover:text-red-600 p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Testimonials</h3>
                <button type="button" onClick={addTestimonial} className="p-1 bg-[#1A3260] text-white rounded hover:bg-blue-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
              <div className="p-6 space-y-8">
                {formData.testimonials?.map((t, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl space-y-4 relative border">
                    <button type="button" onClick={() => removeTestimonial(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Name: *</label>
                        <input value={t.name} onChange={(e) => updateTestimonial(idx, "name", e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Ratings:</label>
                        <select value={t.rating} onChange={(e) => updateTestimonial(idx, "rating", parseInt(e.target.value))} className="w-full p-2 border rounded-lg text-sm">
                          {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Designation:</label>
                        <input value={t.designation} onChange={(e) => updateTestimonial(idx, "designation", e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                      </div>
                      <div>
                        <ImageUpload onImageUploaded={(url) => updateTestimonial(idx, "profile", url)} currentImage={t.profile} label="Profile Image" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Description:</label>
                      <textarea value={t.description} onChange={(e) => updateTestimonial(idx, "description", e.target.value)} className="w-full p-2 border rounded-lg text-sm h-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-20"></div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumbs */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manage Pages</h2>
          <nav className="text-sm text-gray-500 mt-1">
            Pages &gt; <span className="text-gray-400">Manage Pages</span>
          </nav>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-[#1A3260] hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all shadow-sm"
        >
          <span className="text-xl font-light">+</span> Add New
        </button>
      </div>

      {/* Pages Listing Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b bg-white">
          <h3 className="text-lg font-bold text-gray-700">Pages Listing</h3>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-bold text-sm text-gray-700 w-20">S.No.</th>
              <th className="px-6 py-3 font-bold text-sm text-gray-700">Page Name</th>
              <th className="px-6 py-3 font-bold text-sm text-gray-700">Page Url</th>
              <th className="px-6 py-3 font-bold text-sm text-gray-700 text-center w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cityPages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                  {loading ? "Loading..." : "No records found."}
                </td>
              </tr>
            ) : (
              cityPages.map((page, index) => (
                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{page.cityName}</td>
                  <td className="px-6 py-4 text-sm text-blue-500 hover:underline">
                    <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                      https://frenchskill.com/{page.slug}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => { setFormData(page); setIsEditing(true); }}
                        className="p-1.5 bg-blue-50 text-blue-400 rounded hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={async () => { if (confirm("Delete this page?")) { await fetch(`/api/admin/city-pages/${page.id}`, { method: 'DELETE' }); fetchCityPages(); } }}
                        className="p-1.5 bg-red-50 text-red-400 rounded hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
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
