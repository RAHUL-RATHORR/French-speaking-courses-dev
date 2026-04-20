import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service - French Skill",
  description: "Terms of Service for French Skill online French language courses. Read our terms and conditions for using our platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-slate-600 mb-8 text-center">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using French Skill&apos;s services, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Course Enrollment and Access</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li>Course enrollment requires payment of applicable fees</li>
                  <li>Access to course materials is granted upon successful enrollment</li>
                  <li>Course access may be limited by duration or completion status</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Payment Terms</h2>
                <ul className="list-disc pl-6 mb-4">
                  <li>All course fees must be paid in advance</li>
                  <li>Payments are processed securely through third-party providers</li>
                  <li>Prices are subject to change with notice</li>
                  <li>No refunds after course completion or 30 days from enrollment</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Refund Policy</h2>
                <p className="mb-4">
                  We offer a 30-day money-back guarantee from the date of enrollment, provided:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>The course has not been completed</li>
                  <li>Less than 25% of the course content has been accessed</li>
                  <li>The refund request is made within 30 days of enrollment</li>
                  <li>No certificate has been issued</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Intellectual Property</h2>
                <p className="mb-4">
                  All course materials, including but not limited to videos, audio files, text content, 
                  and assessments, are the intellectual property of French Skill. You may not:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Redistribute or share course materials with others</li>
                  <li>Record, copy, or reproduce course content</li>
                  <li>Use course materials for commercial purposes</li>
                  <li>Reverse engineer or attempt to extract source materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. User Conduct</h2>
                <p className="mb-4">
                  You agree to use our services only for lawful purposes and in accordance with these Terms. 
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Share your account credentials with others</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Post inappropriate or offensive content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">
                  French Skill shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of our services. Our liability is limited 
                  to the amount you paid for the course.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Termination</h2>
                <p className="mb-4">
                  We reserve the right to terminate or suspend your account and access to our services 
                  at our sole discretion, without notice, for conduct that we believe violates these 
                  Terms or is harmful to other users or our business.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> support@frenchskill.com</p>
                  <p><strong>Address:</strong> French Skill, India</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of our services constitutes acceptance 
                  of the modified terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
