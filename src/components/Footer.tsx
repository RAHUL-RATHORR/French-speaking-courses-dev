"use client";

import Link from "@/components/ui/Link";
import Image from "next/image";
import Button from "./ui/Button";

declare global {
  interface Window {
    grecaptcha?: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
      ready?: (cb: () => void) => void;
    };
  }
}

export default function Footer() {
  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    try {
      let recaptchaToken = "";
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        "6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO"
      ) {
        try {
          recaptchaToken = await window.grecaptcha.execute(
            "6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO",
            { action: "newsletter_submit" }
          );
        } catch { }
      }

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, recaptchaToken }),
      });

      if (response.ok) {
        alert("Thank you for subscribing to our newsletter!");
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      alert("Failed to subscribe. Please try again.");
    }
  };

  return (
    <>

      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        {/* Wave decoration */}
        <div className="relative h-12 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#F0F6FF"
              fillOpacity="1"
              d="M0,256L48,229.3C96,203,192,149,288,138.7C384,128,480,160,576,181.3C672,203,768,213,864,192C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                  <span className="font-bold text-white text-xs">
                    {" "}
                    <Image
                      src="/frenchskill-white.png"
                      alt="French Skill White Logo"
                      width={48}
                      height={48}
                      className="rounded-full shadow-french-lg"
                    />
                  </span>
                </div>
                <span className="text-2xl font-bold">French Skill</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Learn French with our interactive online courses. Structured
                lessons for all levels with native instructors and personalized
                feedback.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/frenchskill"
                  target="_blank"
                  className="text-gray-300 hover:text-white bg-gray-700 hover:bg-french-blue p-2 rounded-full transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                {/* <a
                  href="#"
                  className="text-gray-300 hover:text-white bg-gray-700 hover:bg-french-blue p-2 rounded-full transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a> */}
                <a
                  href="https://www.instagram.com/frenchskill_official"
                  target="_blank"
                  className="text-gray-300 hover:text-white bg-gray-700 hover:bg-french-blue p-2 rounded-full transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* <a
                  href="#"
                  className="text-gray-300 hover:text-white bg-gray-700 hover:bg-french-blue p-2 rounded-full transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a> */}
              </div>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative pb-2 border-b border-gray-700 inline-block">
                Courses
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/courses?level=Beginner"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Beginner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses?level=Intermediate"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Intermediate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses?level=Advanced"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Advanced
                  </Link>
                </li>

                <li>
                  <Link
                    href="/courses"
                    className="group flex items-center !text-red-300 hover:text-white"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    View All Courses
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative pb-2 border-b border-gray-700 inline-block">
                Blog
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog?category=culture"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    French Culture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog?category=grammar"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Grammar Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog?category=vocabulary"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Vocabulary
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog?category=travel"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Travel Phrases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="group flex items-center !text-red-300 hover:text-white"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    All Articles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 relative pb-2 border-b border-gray-700 inline-block">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#contact"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    variant="footer"
                    className="group flex items-center"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      ›
                    </span>
                    FAQ
                  </Link>
                </li>
                <li className="flex items-center mt-6 bg-gray-700/30 p-3 rounded-lg">
                  <div className="mr-3 !text-red-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Need Help?</div>
                    <a
                      href="mail:info@frenchskill.com"
                      className="text-white hover:!text-red-300 transition-colors"
                    >
                      info@frenchskill.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="footer-policies"
            className="border-t border-gray-700 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex space-x-4 text-sm text-gray-400">
                  <Link href="/privacy-policy" variant="footer">
                    Privacy Policy
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/terms-of-service" variant="footer">
                    Terms of Service
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/cookie-policy" variant="footer">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-center text-sm mt-8">
              © {new Date().getFullYear()} French Skill. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
