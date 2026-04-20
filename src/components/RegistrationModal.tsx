'use client';

import { useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready?: (cb: () => void) => void;
    };
  }
}
import Button from '@/components/ui/Button';
// import { theme } from '@/lib/theme';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id?: string;
    title: string;
    price: string;
    originalPrice?: string;
    duration: string;
    level: string;
  };
}

export default function RegistrationModal({ isOpen, onClose, course }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLevel: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a query for course inquiry
      const queryData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        courseId: course.id || 'unknown',
        courseTitle: course.title,
        message: formData.message || `Interested in "${course.title}" course. Current level: ${formData.currentLevel}`
      };
      
      // reCAPTCHA v3 token
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && window.grecaptcha && '6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO') {
        try {
          recaptchaToken = await window.grecaptcha.execute('6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO', { action: 'course_inquiry_submit' });
        } catch {}
      }

      // Submit the course inquiry
      await fetch('/api/course-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...queryData, recaptchaToken }),
      });
      
      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      // Still proceed to success screen
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Course Inquiry</h2>
              <p className="text-gray-600 mt-1">{course.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your current level in French
                </label>
                <select
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue"
                >
                  <option value="">Select your level</option>
                  <option value="complete-beginner">Complete Beginner</option>
                  <option value="a1">A1 - Elementary</option>
                  <option value="a2">A2 - Pre-intermediate</option>
                  <option value="b1">B1 - Intermediate</option>
                  <option value="b2">B2 - Upper-intermediate</option>
                  <option value="c1">C1 - Advanced</option>
                  <option value="c2">C2 - Proficiency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue"
                  placeholder="Tell us about your goals or any questions you have..."
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!formData.firstName || !formData.email || isSubmitting}
                  variant="primary"
                  size="lg"
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Inquiry Submitted!</h3>
              <p className="text-gray-600 mb-8">
                Thank you for your interest in &quot;{course.title}&quot;. 
                We&apos;ll get back to you soon with more information about the course.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={onClose}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
