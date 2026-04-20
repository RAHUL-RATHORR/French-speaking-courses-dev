"use client";

import { useState } from "react";
import ImageUpload from "../ui/ImageUpload";

interface DynamicSectionsEditorProps {
  course: Record<string, unknown>;
  onUpdate: (sections: Record<string, unknown>) => void;
}

export default function DynamicSectionsEditor({ course, onUpdate }: DynamicSectionsEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("hero");
  
  const [sections, setSections] = useState({
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
  });

  const updateSection = (sectionName: string, sectionData: Record<string, unknown> | null) => {
    const newSections = { ...sections, [sectionName]: sectionData };
    setSections(newSections);
    onUpdate(newSections);
  };

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: "🏠" },
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "whyenroll", label: "Why Enroll", icon: "❓" },
    { id: "benefits", label: "Benefits", icon: "✨" },
    { id: "curriculum", label: "Curriculum", icon: "📚" },
    { id: "fees", label: "Fees", icon: "💰" },
    { id: "skills", label: "Skills & Tools", icon: "🛠️" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "faq", label: "FAQ", icon: "❔" },
    { id: "comparison", label: "Comparison", icon: "📊" },
    { id: "batches", label: "Batches", icon: "📅" },
    { id: "cta", label: "CTA Sections", icon: "🎯" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-xl font-semibold text-gray-800">Dynamic Sections Editor</h3>
        <p className="text-gray-600 mt-1">Configure the dynamic sections for your course page</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {activeTab === "hero" && (
          <HeroBannerEditor
            section={sections.heroBannerSection as Record<string, unknown> | null}
            onUpdate={(data) => updateSection("heroBannerSection", data)}
          />
        )}
        
        {activeTab === "overview" && (
          <OverviewEditor
            section={sections.overviewSection as Record<string, unknown> | null}
            onUpdate={(data) => updateSection("overviewSection", data)}
          />
        )}

        {activeTab === "whyenroll" && (
          <WhyEnrollEditor
            section={sections.whyEnrollSection as Record<string, unknown> | null}
            onUpdate={(data) => updateSection("whyEnrollSection", data)}
          />
        )}
        
        {activeTab === "benefits" && (
          <BenefitsEditor
            section={sections.benefitsSection as Record<string, unknown> | null}
            onUpdate={(data) => updateSection("benefitsSection", data)}
          />
        )}
        
        {activeTab === "curriculum" && (
          <CurriculumEditor
            section={sections.curriculumSection as Record<string, unknown> | null}
            onUpdate={(data) => updateSection("curriculumSection", data)}
          />
        )}
        
        {activeTab === "fees" && (
          <FeesEditor
            section={sections.feesSection as Record<string, unknown> | null}
            onUpdate={(data) => updateSection("feesSection", data)}
          />
        )}
        
        {activeTab === "skills" && (
          <SkillsToolsEditor
            section={sections.skillsToolsSection as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("skillsToolsSection", data)}
          />
        )}
        
        {activeTab === "projects" && (
          <ProjectsEditor
            section={sections.projectsSection as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("projectsSection", data)}
          />
        )}
        
        {activeTab === "reviews" && (
          <ReviewsEditor
            section={sections.reviewsSection as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("reviewsSection", data)}
          />
        )}
        
        {activeTab === "faq" && (
          <FAQEditor
            section={sections.faqSection as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("faqSection", data)}
          />
        )}
        
        {activeTab === "comparison" && (
          <ComparisonEditor
            section={sections.comparisonSection as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("comparisonSection", data)}
          />
        )}
        
        {activeTab === "batches" && (
          <BatchScheduleEditor
            section={sections.batchScheduleSection as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("batchScheduleSection", data)}
          />
        )}
        
        {activeTab === "cta" && (
          <CTASectionsEditor
            section={sections.ctaSections as Record<string, unknown> | null}
            onUpdate={(data: Record<string, unknown>) => updateSection("ctaSections", data)}
          />
        )}
      </div>
    </div>
  );
}

// Hero Banner Editor Component
function HeroBannerEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "",
    subheadline: (section?.subheadline as string) || "",
    backgroundImage: (section?.backgroundImage as string) || "",
    ctaButtons: {
      primary: {
        text: "Get Started",
        buttonText: "Enroll Now",
        action: "enroll",
        style: "primary"
      }
    },
    nextBatchDate: (section?.nextBatchDate as string) || ""
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data };
    if (field.includes('.')) {
      const keys = field.split('.');
      let current: Record<string, unknown> = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = value;
    } else {
      newData[field as keyof typeof newData] = value as never;
    }
    setData(newData);
    onUpdate(newData);
  };

  const handleImageUpload = (imageUrl: string) => {
    handleChange('backgroundImage', imageUrl);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Hero Banner Section</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Best Online Course in..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
        <textarea
          value={data.subheadline}
          onChange={(e) => handleChange('subheadline', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Course description or key benefits"
        />
      </div>

      <div>
        <ImageUpload
          onImageUploaded={handleImageUpload}
          currentImage={data.backgroundImage}
          label="Background Image"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
        <input
          type="text"
          value={data.ctaButtons.primary.buttonText}
          onChange={(e) => handleChange('ctaButtons.primary.buttonText', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enroll Now"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Next Batch Date</label>
        <input
          type="text"
          value={data.nextBatchDate}
          onChange={(e) => handleChange('nextBatchDate', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="20 JAN 2025"
        />
      </div>
    </div>
  );
}

// Overview Editor Component  
function OverviewEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    title: (section?.title as string) || "",
    subtitle: (section?.subtitle as string) || "",
    bullets: (section?.bullets as string[]) || []
  });

  const handleChange = (field: string, value: string | string[]) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addBullet = () => {
    const newBullets = [...data.bullets, ""];
    handleChange('bullets', newBullets);
  };

  const removeBullet = (index: number) => {
    const newBullets = data.bullets.filter((_, i) => i !== index);
    handleChange('bullets', newBullets);
  };

  const updateBullet = (index: number, value: string) => {
    const newBullets = [...data.bullets];
    newBullets[index] = value;
    handleChange('bullets', newBullets);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Overview Section</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Course Overview"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={data.subtitle}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Brief description of what this course offers"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Points</label>
        {data.bullets.map((bullet, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={bullet}
              onChange={(e) => updateBullet(index, e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Key benefit or feature"
            />
            <button
              onClick={() => removeBullet(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addBullet}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Point
        </button>
      </div>
    </div>
  );
}

// Benefits Editor Component
function BenefitsEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "",
    description: (section?.description as string) || "",
    features: (section?.features as Array<{title: string; description: string; icon: string}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addFeature = () => {
    const newFeatures = [...data.features, { title: "", description: "", icon: "✨" }];
    const newData = { ...data, features: newFeatures };
    setData(newData);
    onUpdate(newData);
  };

  const removeFeature = (index: number) => {
    const newFeatures = data.features.filter((_, i) => i !== index);
    const newData = { ...data, features: newFeatures };
    setData(newData);
    onUpdate(newData);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    const newData = { ...data, features: newFeatures };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Benefits Section</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Course Benefits"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Brief description of the benefits students will gain"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Features/Benefits</label>
        {data.features.map((feature, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Feature {index + 1}</h5>
              <button
                onClick={() => removeFeature(index)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Icon (emoji)</label>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="🗣️"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Interactive Learning"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Detailed description of this benefit"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addFeature}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Feature
        </button>
      </div>
    </div>
  );
}

// Curriculum Editor Component
function CurriculumEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "",
    description: (section?.description as string) || "",
    modules: (section?.modules as Array<{title: string; lessons: string[]; duration: string; description: string}>) || [],
    downloadBrochure: (section?.downloadBrochure as {enabled: boolean; text: string; link?: string}) || {
      enabled: true,
      text: "Download Brochure",
      link: ""
    }
  });

  const handleChange = (field: string, value: string | boolean) => {
    if (field.startsWith('downloadBrochure.')) {
      const subField = field.split('.')[1];
      const newData = { 
        ...data, 
        downloadBrochure: { 
          ...data.downloadBrochure, 
          [subField]: value 
        } 
      };
      setData(newData);
      onUpdate(newData);
    } else {
      const newData = { ...data, [field]: value };
      setData(newData);
      onUpdate(newData);
    }
  };

  const addModule = () => {
    const newModules = [...data.modules, { title: "", lessons: [], duration: "", description: "" }];
    const newData = { ...data, modules: newModules };
    setData(newData);
    onUpdate(newData);
  };

  const removeModule = (index: number) => {
    const newModules = data.modules.filter((_, i) => i !== index);
    const newData = { ...data, modules: newModules };
    setData(newData);
    onUpdate(newData);
  };

  const updateModule = (index: number, field: string, value: string | string[]) => {
    const newModules = [...data.modules];
    newModules[index] = { ...newModules[index], [field]: value };
    const newData = { ...data, modules: newModules };
    setData(newData);
    onUpdate(newData);
  };

  const addLesson = (moduleIndex: number) => {
    const newModules = [...data.modules];
    newModules[moduleIndex].lessons.push("");
    const newData = { ...data, modules: newModules };
    setData(newData);
    onUpdate(newData);
  };

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    const newModules = [...data.modules];
    newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
    const newData = { ...data, modules: newModules };
    setData(newData);
    onUpdate(newData);
  };

  const updateLesson = (moduleIndex: number, lessonIndex: number, value: string) => {
    const newModules = [...data.modules];
    newModules[moduleIndex].lessons[lessonIndex] = value;
    const newData = { ...data, modules: newModules };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Curriculum Section</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Course Curriculum"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Brief description of the curriculum structure"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Download Brochure Settings</label>
        <div className="flex items-center space-x-4 mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.downloadBrochure.enabled}
              onChange={(e) => handleChange('downloadBrochure.enabled', e.target.checked)}
              className="mr-2"
            />
            Enable Download Brochure Button
          </label>
        </div>
        {data.downloadBrochure.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={data.downloadBrochure.text}
              onChange={(e) => handleChange('downloadBrochure.text', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Download Brochure"
            />
            <input
              type="text"
              value={data.downloadBrochure.link || ""}
              onChange={(e) => handleChange('downloadBrochure.link', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Link to brochure PDF (optional)"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum Modules</label>
        {data.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-medium">Module {moduleIndex + 1}</h5>
              <button
                onClick={() => removeModule(moduleIndex)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Remove Module
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Module Title</label>
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Introduction to French"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Duration</label>
                <input
                  type="text"
                  value={module.duration}
                  onChange={(e) => updateModule(moduleIndex, 'duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="2 weeks"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Module Description</label>
              <textarea
                value={module.description}
                onChange={(e) => updateModule(moduleIndex, 'description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={2}
                placeholder="What students will learn in this module"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Lessons</label>
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={lesson}
                    onChange={(e) => updateLesson(moduleIndex, lessonIndex, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Lesson topic or title"
                  />
                  <button
                    onClick={() => removeLesson(moduleIndex, lessonIndex)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => addLesson(moduleIndex)}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Add Lesson
              </button>
            </div>
          </div>
        ))}
        
        <button
          onClick={addModule}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Module
        </button>
      </div>
    </div>
  );
}

// Why Enroll Editor Component
function WhyEnrollEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "",
    description: (section?.description as string) || "",
    benefits: (section?.benefits as Array<{title: string; description: string; icon?: string}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addBenefit = () => {
    const newBenefits = [...data.benefits, { title: "", description: "", icon: "🎓" }];
    const newData = { ...data, benefits: newBenefits };
    setData(newData);
    onUpdate(newData);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = data.benefits.filter((_, i) => i !== index);
    const newData = { ...data, benefits: newBenefits };
    setData(newData);
    onUpdate(newData);
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...data.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    const newData = { ...data, benefits: newBenefits };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Why Enroll Section</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Why Choose Our French Course?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Brief description of why students should enroll in this course"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Benefits</label>
        {data.benefits.map((benefit, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Benefit {index + 1}</h5>
              <button
                onClick={() => removeBenefit(index)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Icon (emoji)</label>
                <input
                  type="text"
                  value={benefit.icon || ""}
                  onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="🎓"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={benefit.title}
                  onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Expert Instructors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  value={benefit.description}
                  onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Learn from native French speakers with years of experience"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addBenefit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Benefit
        </button>
      </div>
    </div>
  );
}

// Fees Editor Component
function FeesEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "Course Fees & Pricing",
    description: (section?.description as string) || "Invest in your future with our affordable and flexible pricing options",
    price: (section?.price as string) || "",
    originalPrice: (section?.originalPrice as string) || "",
    paymentOptions: (section?.paymentOptions as string[]) || ["Full Payment", "EMI Available"],
    discounts: (section?.discounts as string[]) || ["Early Bird Discount", "Student Discount"],
    emiOptions: {
      enabled: ((section?.emiOptions as Record<string, unknown>)?.enabled as boolean) || true,
      text: ((section?.emiOptions as Record<string, unknown>)?.text as string) || "EMI options available"
    },
    refundPolicy: {
      enabled: ((section?.refundPolicy as Record<string, unknown>)?.enabled as boolean) || true,
      text: ((section?.refundPolicy as Record<string, unknown>)?.text as string) || "30-day money-back guarantee"
    }
  });

  const handleChange = (field: string, value: string | boolean) => {
    const newData = { ...data };
    if (field.includes('.')) {
      const keys = field.split('.');
      let current: Record<string, unknown> = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = value;
    } else {
      (newData as Record<string, unknown>)[field] = value;
    }
    setData(newData);
    onUpdate(newData);
  };

  const addPaymentOption = () => {
    const newOptions = [...data.paymentOptions, ""];
    const newData = { ...data, paymentOptions: newOptions };
    setData(newData);
    onUpdate(newData);
  };

  const removePaymentOption = (index: number) => {
    const newOptions = data.paymentOptions.filter((_, i) => i !== index);
    const newData = { ...data, paymentOptions: newOptions };
    setData(newData);
    onUpdate(newData);
  };

  const updatePaymentOption = (index: number, value: string) => {
    const newOptions = [...data.paymentOptions];
    newOptions[index] = value;
    const newData = { ...data, paymentOptions: newOptions };
    setData(newData);
    onUpdate(newData);
  };

  const addDiscount = () => {
    const newDiscounts = [...data.discounts, ""];
    const newData = { ...data, discounts: newDiscounts };
    setData(newData);
    onUpdate(newData);
  };

  const removeDiscount = (index: number) => {
    const newDiscounts = data.discounts.filter((_, i) => i !== index);
    const newData = { ...data, discounts: newDiscounts };
    setData(newData);
    onUpdate(newData);
  };

  const updateDiscount = (index: number, value: string) => {
    const newDiscounts = [...data.discounts];
    newDiscounts[index] = value;
    const newData = { ...data, discounts: newDiscounts };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">💰 Fees Section</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Headline</label>
            <input
              type="text"
              value={data.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Course Fees & Pricing"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Current Price</label>
            <input
              type="text"
              value={data.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="₹299"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Original Price (optional)</label>
            <input
              type="text"
              value={data.originalPrice}
              onChange={(e) => handleChange('originalPrice', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="₹399"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={2}
            placeholder="Invest in your future with our affordable and flexible pricing options"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Payment Options</label>
          {data.paymentOptions.map((option, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updatePaymentOption(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Payment option"
              />
              <button
                onClick={() => removePaymentOption(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addPaymentOption}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Payment Option
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Discounts</label>
          {data.discounts.map((discount, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={discount}
                onChange={(e) => updateDiscount(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Discount option"
              />
              <button
                onClick={() => removeDiscount(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addDiscount}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Discount
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={data.emiOptions.enabled}
                onChange={(e) => handleChange('emiOptions.enabled', e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Enable EMI Options</label>
            </div>
            <input
              type="text"
              value={data.emiOptions.text}
              onChange={(e) => handleChange('emiOptions.text', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="EMI options available"
              disabled={!data.emiOptions.enabled}
            />
          </div>
          
          <div className="border border-gray-200 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={data.refundPolicy.enabled}
                onChange={(e) => handleChange('refundPolicy.enabled', e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Enable Refund Policy</label>
            </div>
            <input
              type="text"
              value={data.refundPolicy.text}
              onChange={(e) => handleChange('refundPolicy.text', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="30-day money-back guarantee"
              disabled={!data.refundPolicy.enabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skills & Tools Editor Component
function SkillsToolsEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    skillsHeadline: (section?.skillsHeadline as string) || "Skills Covered",
    skillsDescription: (section?.skillsDescription as string) || "Master these valuable skills through our comprehensive French course",
    skills: (section?.skills as string[]) || ["French grammar mastery", "Conversational fluency", "Pronunciation skills"],
    toolsHeadline: (section?.toolsHeadline as string) || "Tools Covered",
    toolsDescription: (section?.toolsDescription as string) || "Learn with these powerful tools and resources",
    tools: (section?.tools as string[]) || ["Pronunciation guide", "Grammar exercises", "Interactive lessons"]
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addSkill = () => {
    const newSkills = [...data.skills, ""];
    const newData = { ...data, skills: newSkills };
    setData(newData);
    onUpdate(newData);
  };

  const removeSkill = (index: number) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    const newData = { ...data, skills: newSkills };
    setData(newData);
    onUpdate(newData);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    const newData = { ...data, skills: newSkills };
    setData(newData);
    onUpdate(newData);
  };

  const addTool = () => {
    const newTools = [...data.tools, ""];
    const newData = { ...data, tools: newTools };
    setData(newData);
    onUpdate(newData);
  };

  const removeTool = (index: number) => {
    const newTools = data.tools.filter((_, i) => i !== index);
    const newData = { ...data, tools: newTools };
    setData(newData);
    onUpdate(newData);
  };

  const updateTool = (index: number, value: string) => {
    const newTools = [...data.tools];
    newTools[index] = value;
    const newData = { ...data, tools: newTools };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🛠️ Skills & Tools Section</h4>
        
        {/* Skills Section */}
        <div className="border border-gray-200 p-4 rounded-md mb-6">
          <h5 className="font-medium mb-4">Skills Section</h5>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Skills Headline</label>
              <input
                type="text"
                value={data.skillsHeadline}
                onChange={(e) => handleChange('skillsHeadline', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Skills Covered"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Skills Description</label>
              <textarea
                value={data.skillsDescription}
                onChange={(e) => handleChange('skillsDescription', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={2}
                placeholder="Master these valuable skills through our comprehensive French course"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Skills List</label>
            {data.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter skill"
                />
                <button
                  onClick={() => removeSkill(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* Tools Section */}
        <div className="border border-gray-200 p-4 rounded-md">
          <h5 className="font-medium mb-4">Tools Section</h5>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tools Headline</label>
              <input
                type="text"
                value={data.toolsHeadline}
                onChange={(e) => handleChange('toolsHeadline', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Tools Covered"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tools Description</label>
              <textarea
                value={data.toolsDescription}
                onChange={(e) => handleChange('toolsDescription', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={2}
                placeholder="Learn with these powerful tools and resources"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Tools List</label>
            {data.tools.map((tool, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tool}
                  onChange={(e) => updateTool(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter tool"
                />
                <button
                  onClick={() => removeTool(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addTool}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Projects Editor Component
function ProjectsEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "Course Projects",
    description: (section?.description as string) || "Apply your skills with these hands-on projects",
    projects: (section?.projects as Array<{title: string; description: string; skills: string[]}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addProject = () => {
    const newProjects = [...data.projects, { title: "", description: "", skills: [] }];
    const newData = { ...data, projects: newProjects };
    setData(newData);
    onUpdate(newData);
  };

  const removeProject = (index: number) => {
    const newProjects = data.projects.filter((_, i) => i !== index);
    const newData = { ...data, projects: newProjects };
    setData(newData);
    onUpdate(newData);
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...data.projects];
    (newProjects[index] as Record<string, unknown>)[field] = value;
    const newData = { ...data, projects: newProjects };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🚀 Projects Section</h4>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Headline</label>
            <input
              type="text"
              value={data.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Course Projects"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={2}
              placeholder="Apply your skills with these hands-on projects"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-gray-600 font-medium">Projects</label>
          {data.projects.map((project, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">Project {index + 1}</h5>
                <button
                  onClick={() => removeProject(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Project title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Project Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Describe the project"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={project.skills.join(', ')}
                    onChange={(e) => updateProject(index, 'skills', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="French conversation, Grammar, Pronunciation"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addProject}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}

// Reviews Editor Component
function ReviewsEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "Student Reviews",
    reviews: (section?.reviews as Array<{name: string; role: string; content: string; rating: number}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addReview = () => {
    const newReviews = [...data.reviews, { name: "", role: "", content: "", rating: 5 }];
    const newData = { ...data, reviews: newReviews };
    setData(newData);
    onUpdate(newData);
  };

  const removeReview = (index: number) => {
    const newReviews = data.reviews.filter((_, i) => i !== index);
    const newData = { ...data, reviews: newReviews };
    setData(newData);
    onUpdate(newData);
  };

  const updateReview = (index: number, field: string, value: string | number) => {
    const newReviews = [...data.reviews];
    (newReviews[index] as Record<string, unknown>)[field] = value;
    const newData = { ...data, reviews: newReviews };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">⭐ Reviews Section</h4>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Headline</label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Student Reviews"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-gray-600 font-medium">Reviews</label>
          {data.reviews.map((review, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">Review {index + 1}</h5>
                <button
                  onClick={() => removeReview(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={review.name}
                    onChange={(e) => updateReview(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Student name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Role/Title</label>
                  <input
                    type="text"
                    value={review.role}
                    onChange={(e) => updateReview(index, 'role', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Student, Professional, etc."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Review Content</label>
                  <textarea
                    value={review.content}
                    onChange={(e) => updateReview(index, 'content', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="The review content..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Rating (1-5)</label>
                  <select
                    value={review.rating}
                    onChange={(e) => updateReview(index, 'rating', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addReview}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Review
        </button>
      </div>
    </div>
  );
}

// FAQ Editor Component
function FAQEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "Frequently Asked Questions",
    faqs: (section?.faqs as Array<{question: string; answer: string}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addFAQ = () => {
    const newFAQs = [...data.faqs, { question: "", answer: "" }];
    const newData = { ...data, faqs: newFAQs };
    setData(newData);
    onUpdate(newData);
  };

  const removeFAQ = (index: number) => {
    const newFAQs = data.faqs.filter((_, i) => i !== index);
    const newData = { ...data, faqs: newFAQs };
    setData(newData);
    onUpdate(newData);
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const newFAQs = [...data.faqs];
    (newFAQs[index] as Record<string, unknown>)[field] = value;
    const newData = { ...data, faqs: newFAQs };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">❔ FAQ Section</h4>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Headline</label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Frequently Asked Questions"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-gray-600 font-medium">FAQ Items</label>
          {data.faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">FAQ {index + 1}</h5>
                <button
                  onClick={() => removeFAQ(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="What is the duration of this course?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="The course duration is 8 weeks..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addFAQ}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add FAQ
        </button>
      </div>
    </div>
  );
}

// Comparison Editor Component
function ComparisonEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "Comparison with Other Options",
    rows: (section?.rows as Array<{feature: string; ourCourse: string; traditional: string}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addRow = () => {
    const newRows = [...data.rows, { feature: "", ourCourse: "✓", traditional: "✗" }];
    const newData = { ...data, rows: newRows };
    setData(newData);
    onUpdate(newData);
  };

  const removeRow = (index: number) => {
    const newRows = data.rows.filter((_, i) => i !== index);
    const newData = { ...data, rows: newRows };
    setData(newData);
    onUpdate(newData);
  };

  const updateRow = (index: number, field: string, value: string) => {
    const newRows = [...data.rows];
    (newRows[index] as Record<string, unknown>)[field] = value;
    const newData = { ...data, rows: newRows };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Comparison Section</h4>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Headline</label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Comparison with Other Options"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-gray-600 font-medium">Comparison Rows</label>
          {data.rows.map((row, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">Row {index + 1}</h5>
                <button
                  onClick={() => removeRow(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Feature</label>
                  <input
                    type="text"
                    value={row.feature}
                    onChange={(e) => updateRow(index, 'feature', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Native teachers"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Our Course</label>
                  <input
                    type="text"
                    value={row.ourCourse}
                    onChange={(e) => updateRow(index, 'ourCourse', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="✓ or Yes"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Traditional</label>
                  <input
                    type="text"
                    value={row.traditional}
                    onChange={(e) => updateRow(index, 'traditional', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="✗ or Sometimes"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Comparison Row
        </button>
      </div>
    </div>
  );
}

// Batch Schedule Editor Component
function BatchScheduleEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    headline: (section?.headline as string) || "Flexible Batches for You",
    batches: (section?.batches as Array<{date: string; title: string; days: string; time: string; type: string}>) || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const addBatch = () => {
    const newBatches = [...data.batches, { date: "", title: "", days: "", time: "", type: "Weekdays" }];
    const newData = { ...data, batches: newBatches };
    setData(newData);
    onUpdate(newData);
  };

  const removeBatch = (index: number) => {
    const newBatches = data.batches.filter((_, i) => i !== index);
    const newData = { ...data, batches: newBatches };
    setData(newData);
    onUpdate(newData);
  };

  const updateBatch = (index: number, field: string, value: string) => {
    const newBatches = [...data.batches];
    (newBatches[index] as Record<string, unknown>)[field] = value;
    const newData = { ...data, batches: newBatches };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">📅 Batch Schedule Section</h4>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Headline</label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Flexible Batches for You"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-gray-600 font-medium">Batches</label>
          {data.batches.map((batch, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">Batch {index + 1}</h5>
                <button
                  onClick={() => removeBatch(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={batch.date}
                    onChange={(e) => updateBatch(index, 'date', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="June 15th"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Batch Title</label>
                  <input
                    type="text"
                    value={batch.title}
                    onChange={(e) => updateBatch(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Weekends"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Days</label>
                  <input
                    type="text"
                    value={batch.days}
                    onChange={(e) => updateBatch(index, 'days', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="SAT - SUN (8 weeks)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Time</label>
                  <input
                    type="text"
                    value={batch.time}
                    onChange={(e) => updateBatch(index, 'time', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="10:00AM to 12:00PM (CET)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addBatch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Batch
        </button>
      </div>
    </div>
  );
}

// CTA Sections Editor Component
function CTASectionsEditor({ 
  section, 
  onUpdate 
}: { 
  section: Record<string, unknown> | null;
  onUpdate: (data: Record<string, unknown>) => void;
}) {
  const [data, setData] = useState({
    sections: (section?.sections as Array<{text: string; buttonText: string; action: string; style: string}>) || []
  });

  const addCTA = () => {
    const newSections = [...data.sections, { text: "", buttonText: "Get Started", action: "enroll", style: "primary" }];
    const newData = { ...data, sections: newSections };
    setData(newData);
    onUpdate(newData);
  };

  const removeCTA = (index: number) => {
    const newSections = data.sections.filter((_, i) => i !== index);
    const newData = { ...data, sections: newSections };
    setData(newData);
    onUpdate(newData);
  };

  const updateCTA = (index: number, field: string, value: string) => {
    const newSections = [...data.sections];
    (newSections[index] as Record<string, unknown>)[field] = value;
    const newData = { ...data, sections: newSections };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🎯 CTA Sections</h4>

        <div className="space-y-4">
          <label className="block text-sm text-gray-600 font-medium">Call-to-Action Sections</label>
          {data.sections.map((cta, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">CTA {index + 1}</h5>
                <button
                  onClick={() => removeCTA(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">CTA Text</label>
                  <textarea
                    value={cta.text}
                    onChange={(e) => updateCTA(index, 'text', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="Ready to start your French journey?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={cta.buttonText}
                    onChange={(e) => updateCTA(index, 'buttonText', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Get Started"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Action</label>
                  <select
                    value={cta.action}
                    onChange={(e) => updateCTA(index, 'action', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="enroll">Enroll</option>
                    <option value="contact">Contact</option>
                    <option value="download_brochure">Download Brochure</option>
                    <option value="register">Register</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Style</label>
                  <select
                    value={cta.style}
                    onChange={(e) => updateCTA(index, 'style', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addCTA}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add CTA Section
        </button>
      </div>
    </div>
  );
}
