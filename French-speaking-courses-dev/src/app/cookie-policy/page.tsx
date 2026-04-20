import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy - French Skill",
  description: "Cookie Policy for French Skill online French language courses. Learn about how we use cookies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
              Cookie Policy
            </h1>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-slate-600 mb-8 text-center">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. What Are Cookies?</h2>
                <p className="mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you 
                  visit our website. They help us provide you with a better experience by remembering your 
                  preferences and understanding how you use our site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Essential Cookies</h3>
                  <p className="mb-2">
                    These cookies are necessary for the website to function properly. They enable basic 
                    features like page navigation, access to secure areas, and payment processing.
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Authentication and security cookies</li>
                    <li>Shopping cart and payment processing</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Analytics Cookies</h3>
                  <p className="mb-2">
                    We use Google Analytics to understand how visitors interact with our website. 
                    This helps us improve our services and user experience.
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Google Analytics (_ga, _gid, _gat)</li>
                    <li>Page views and user behavior tracking</li>
                    <li>Traffic source and conversion tracking</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Functionality Cookies</h3>
                  <p className="mb-2">
                    These cookies enhance your experience by remembering your preferences and settings.
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Language preferences</li>
                    <li>Course progress and bookmarks</li>
                    <li>User interface customizations</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Marketing Cookies</h3>
                  <p className="mb-2">
                    These cookies help us deliver relevant advertising and measure the effectiveness 
                    of our marketing campaigns.
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Ad targeting and personalization</li>
                    <li>Conversion tracking</li>
                    <li>Social media integration</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Third-Party Cookies</h2>
                <p className="mb-4">
                  We use several third-party services that may set cookies on your device:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                  <li><strong>Payment Processors:</strong> Secure payment processing</li>
                  <li><strong>Social Media:</strong> Social sharing and login features</li>
                  <li><strong>Video Players:</strong> Course video streaming and playback</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Managing Your Cookie Preferences</h2>
                <p className="mb-4">
                  You have several options for managing cookies:
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Browser Settings</h3>
                  <p className="mb-2">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Block all cookies</li>
                    <li>Accept only first-party cookies</li>
                    <li>Delete cookies when you close your browser</li>
                    <li>Get notifications when cookies are set</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Google Analytics Opt-out</h3>
                  <p className="mb-2">
                    You can opt out of Google Analytics tracking by installing the 
                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      Google Analytics Opt-out Browser Add-on
                    </a>.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Impact of Disabling Cookies</h2>
                <p className="mb-4">
                  While you can disable cookies, please note that doing so may affect your experience 
                  on our website:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Some features may not work properly</li>
                  <li>You may need to re-enter information repeatedly</li>
                  <li>Course progress may not be saved</li>
                  <li>Personalized content may not be available</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Updates to This Policy</h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or applicable laws. We will notify you of any significant changes 
                  by posting the updated policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, 
                  please contact us at:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@frenchskill.com</p>
                  <p><strong>Address:</strong> French Skill, India</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
