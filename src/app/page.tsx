"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import BlogCard from "@/components/BlogCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready?: (cb: () => void) => void;
    };
  }
}

// Language learning benefits
const benefits = [
  {
    title: "Interactive sessions",
    description:
      "Learn with teachers who engage, correct and guide you with individual attention.",
    icon: "👨‍🏫",
  },
  {
    title: "Experienced instructors",
    description:
      "Get trained by DELF Qualified tutors because experience speaks in every way.",
    icon: "🎓",
  },
  {
    title: "Tailored Courses",
    description:
      "No matter why you are learning, we customize your plans just on one call.",
    icon: "✂️",
  },
  {
    title: "Focus on Speaking & Confidence",
    description:
      "School students or DELF aspirants, we allow the flow of French.",
    icon: "🗣️",
  },
];

// FAQ Data
const faqData = [
  {
    question: "What levels of French do you offer?",
    answer:
      "We offer courses for all levels - from complete beginners (A1) to advanced speakers (C2). Our courses are structured according to the Common European Framework of Reference for Languages (CEFR).",
  },
  {
    question: "How long does it take to complete a course?",
    answer:
      "Course duration varies by level and intensity. Our beginner courses typically take 8-12 weeks with 2-3 classes per week. We also offer intensive programs that can be completed faster.",
  },
  {
    question: "Do you provide certificates upon completion?",
    answer:
      "Yes! We provide certificates of completion for all our courses. Our advanced courses also prepare you for official DELF/DALF examinations.",
  },
  {
    question: "Can I get a trial class before enrolling?",
    answer:
      "Absolutely! We offer a free trial class so you can experience our teaching methodology and decide if our courses are right for you.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 7-day money-back guarantee if you're not satisfied with our course. Refunds are processed within 5-7 business days.",
  },
  {
    question: "Do you offer one-on-one classes?",
    answer:
      "Yes, we offer both group classes and personalized one-on-one sessions. Private classes can be customized to your specific learning goals and schedule.",
  },
];

// Types for our fetched data
interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  students: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  message: string;
  rating: number;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  // FAQ state
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Handle contact form input changes
  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactLoading(true);

    try {
      // reCAPTCHA v3 token
      let recaptchaToken = "";
      if (typeof window !== "undefined" && window.grecaptcha && '6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO') {
        try {
          recaptchaToken = await window.grecaptcha.execute('6LdKD5krAAAAAPxNRvx8Tt0E8k4Io5SwvsCXqYiO', { action: "contact_submit" });
        } catch { }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: `Subject: ${contactForm.subject}\n\n${contactForm.message}`,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setContactSubmitted(true);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setContactError(
        err instanceof Error
          ? err.message
          : "Failed to submit the form. Please try again."
      );
    } finally {
      setContactLoading(false);
    }
  };
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState({
    courses: true,
    blogs: true,
    testimonials: true,
  });

  // Convert testimonials from API to the format expected by TestimonialCarousel
  const formattedTestimonials = testimonials.map((testimonial) => ({
    name: testimonial?.name,
    role: testimonial.role || "Student",
    content: testimonial.message,
    image: testimonial.avatar || "https://i.pravatar.cc/150?img=1",
  }));

  // Featured courses - first 4 courses from API
  const featuredCourses = courses;

  useEffect(() => {
    // Fetch courses
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading((prev) => ({ ...prev, courses: false }));
      }
    }

    // Fetch blog posts
    async function fetchBlogPosts() {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading((prev) => ({ ...prev, blogs: false }));
      }
    }

    // Fetch testimonials
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading((prev) => ({ ...prev, testimonials: false }));
      }
    }

    fetchCourses();
    fetchBlogPosts();
    fetchTestimonials();
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      {/* Enhanced Hero Section */}
      <section className="hero-gradient-enhanced text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-40 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -left-10 bottom-0 w-80 h-80 bg-french-red rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-left md:pr-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Bonjour to Live French Learning
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Interactive live classes by expert instructors. Join from
                anywhere, speak with confidence and master French faster online.{" "}
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/courses"
                  className="bg-white text-french-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg transform hover:scale-105"
                >
                  Explore Courses
                </Link>
                <Link
                  href="#how-it-works"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300"
                >
                  How It Works
                </Link>
              </div>

              {/* Stats */}
              <div className="flex space-x-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold">2,000+</div>
                  <div className="text-sm text-gray-200">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm text-gray-200">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.5</div>
                  <div className="text-sm text-gray-200">Avg. Rating</div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-12 md:mt-0 relative">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                <Image
                  src="/frenchskill-class.jpeg"
                  alt="French language learning"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-lg font-semibold">All French Courses</div>
                  <div className="text-2xl font-bold">Certified French Tutors</div>
                  {/* <Link
                    href="/french-for-travelers"
                    className="text-blue-300 flex items-center mt-2"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link> */}
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-5 -right-5 rounded-full p-2 shadow-lg">
                <div className="text-3xl">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z" /><path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z" /><path fill="#EEE" d="M12 5h12v26H12z" /></svg>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-french-red rounded-full p-2 shadow-lg">
                <div className="text-3xl">📚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <div className="bg-white border-y border-french-red/30 py-6 overflow-hidden relative shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
            <div>
              <h3 className="text-xl md:text-3xl font-black tracking-tighter text-french-blue whitespace-nowrap">
                ONE ON ONE <span className="text-black">SESSION</span>
              </h3>
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-200"></div>

            <div className="max-w-xl">
              <p className="text-lg md:text-xl font-bold leading-tight mb-2 text-black">
                Personalized learning <span className="text-french-blue">tailored to your goals</span> and pace.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-gray-500 font-semibold tracking-wide uppercase text-[9px] md:text-xs">
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-french-red rounded-full mr-2"></span>
                  Certified Tutors
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-french-red rounded-full mr-2"></span>
                  Anytime Learning
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-french-red rounded-full mr-2"></span>
                  Unlimited Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Benefits Section */}
      <section className="py-12 bg-slate-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-french-blue">Why Learn with Us?</h2>
            <div className="w-16 h-1 bg-french-red mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our methodology combines proven language learning techniques with
              modern technology to deliver the most effective French learning
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-french-blue">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Courses Section - Enhanced */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Our Popular Courses</h2>
              <p className="text-gray-600 mt-2">
                Designed for different proficiency levels
              </p>
            </div>
            <Link
              href="/courses"
              className="mt-4 md:mt-0 btn-french-secondary px-6 py-2 rounded-lg font-medium inline-flex items-center"
            >
              View All Courses
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading.courses ? (
              <div className="flex justify-center items-center h-64 col-span-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-french-blue"></div>
                <p className="ml-4 text-lg text-gray-600">Loading courses...</p>
              </div>
            ) : featuredCourses.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p>No courses found</p>
              </div>
            ) : (
              featuredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))
            )}
          </div>
        </div>
      </section>
      {/* Learning Process Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Our Courses Work</h2>
            <div className="w-24 h-1 bg-french-blue mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              A structured approach to ensure you achieve your language learning
              goals efficiently
            </p>
          </div>

          {/* Define the learning steps data */}
          {(() => {
            const learningSteps = [
              {
                id: "assessment",
                number: "01",
                title: "Assessment",
                description:
                  "Start with a quick assessment so we can understand your level of French.",
              },
              {
                id: "personalization",
                number: "02",
                title: "Customizable Plans",
                description:
                  "Courses can be easily customized according to your learning goals.",
              },
              {
                id: "interactive",
                number: "03",
                title: "Interactive Learning",
                description:
                  "Learn through engaging classes, exercises and real time practice.",
              },
              {
                id: "certification",
                number: "04",
                title: "Certification",
                description:
                  "Your growth is our achievement, earn a certificate to showcase your skills.",
              },
            ];

            return (
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {learningSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className="bg-white rounded-2xl p-8 shadow-lg relative z-10">
                      <div className="text-3xl font-bold text-french-blue mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    {index < learningSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-french-blue to-transparent -translate-y-1/2 -z-0"></div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="btn-french-primary px-8 py-3 rounded-xl font-semibold inline-flex items-center shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Start Your Journey</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <div className="w-24 h-1 bg-french-blue mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-french-blue">
                Our Mission
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                At Frenchskill, we believe that learning French should be fun
                and not a burden. A language is learned with experience.
                Frenchskill gives you the exposure while being engaging,
                accessible and effective. Our mission is to connect students
                with expert French tutors and proven learning methodologies to
                help them achieve fluency faster.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                A language is learned with passion. You put that passion and
                will into you because your growth is our achievement. Develop
                your language skills because it is the need of the hour.
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-french-blue">
                <p className="text-gray-700 italic">
                  &ldquo;Language is the road map of a culture. It tells you
                  where its people come from and where they are going.&rdquo;
                </p>
                <p className="text-right text-french-blue font-medium mt-2">
                  - Rita Mae Brown
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-video relative">
                  <Image
                    src="/frenchskill-team.jpeg"
                    alt="Our teaching team"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                  />
                </div>
                <div className="bg-white p-6">
                  <h4 className="font-bold text-xl mb-2">
                    Expert Teaching Team
                  </h4>
                  <p className="text-gray-700">
                    Our instructors are certified language teachers with years
                    of experience.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-french-blue">5+</div>
                  <div className="text-gray-600">Courses Offered</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-french-blue">17+</div>
                  <div className="text-gray-600">Native Instructors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section - Carousel */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <div className="w-24 h-1 bg-french-blue mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community of French learners about their experiences
              and progress with our courses
            </p>
          </div>

          {/* Testimonial Carousel Component with proper spacing for navigation */}
          <div className="px-8 md:px-12">
            <TestimonialCarousel testimonials={formattedTestimonials} />
          </div>
        </div>
      </section>
      {/* Contact Information and Form */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions about our courses or need more information? Reach
              out to us directly through the form below or visit our location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-french-blue">
                Send Us a Message
              </h3>
              {/* Add state variables */}
              {contactSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h4 className="text-xl font-semibold text-green-800 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-green-700">
                    Thank you for contacting us. We will respond to your message
                    as soon as possible.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  {contactError && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg mb-4">
                      {contactError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue transition"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue transition"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Your phone number"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue transition"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="course-inquiry">Course Inquiry</option>
                      <option value="private-lessons">Private Lessons</option>
                      <option value="corporate-training">
                        Corporate Training
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="How can we help you?"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue transition"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className={`w-full btn-french-primary text-white hover:text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ${contactLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {contactLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section */}
      <section className="py-20 bg-white" id="blog">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              French Language Blog
            </h2>
            <div className="w-24 h-1 bg-french-blue mx-auto mt-4"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              Explore articles, tips, and insights to enhance your French
              language learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading.blogs ? (
              <div className="flex justify-center items-center h-64 col-span-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-french-blue"></div>
                <p className="ml-4 text-lg text-gray-600">Loading blogs...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p>No blog posts found</p>
              </div>
            ) : (
              blogPosts
                .slice(0, 3)
                .map((post) => (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={
                      post.excerpt || post.content.substring(0, 120) + "..."
                    }
                    image={post?.image || "/french-skill.png"}
                    category="learning"
                    date={new Date(post.createdAt).toLocaleDateString()}
                    readTime="5 min read"
                  />
                ))
            )}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/blog"
              className="btn-french-primary text-white hover:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center hover:shadow-lg transition-all duration-300"
            >
              <span>Explore All Articles</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-french-blue mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions about our French courses
              and learning process
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-french-blue focus:ring-opacity-20"
                  aria-expanded={openFAQ === index}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-french-blue transform transition-transform duration-200 flex-shrink-0 ${openFAQ === index ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We&apos;re here to help!
            </p>
            <Button
              href="#contact"
              variant="primary"
              className="shadow-lg transform hover:scale-105 active:scale-95"
            >
              <span>Contact Us</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-french-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your French Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of successful students who have transformed their
            French language skills through our comprehensive courses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="bg-white text-french-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
            >
              Browse Courses
            </Link>
            <Button
              href="#contact"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
      </section>{" "}
      <Footer />
    </div>
  );
}
