"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import {
  GraduationCap, Users, Award, BookOpen, Clock,
  ArrowRight, Star, Check, Globe, Zap, ShieldCheck,
  ChevronDown
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import React, { useState, useCallback, useEffect } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface CityPage {
  id?: string;
  title?: string | null;
  cityName: string;
  slug: string;
  content: string | null;
  middleContent: string | null;
  afterCourseContent: string | null;
  headerImage: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  faqs?: FAQ[] | null;
  testimonials?: unknown;
  isActive?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating?: number;
}

interface CityPageRedesignProps {
  cityPage: CityPage;
  courses: Record<string, unknown>[];
  formattedTestimonials: Testimonial[];
  displayFaqs: FAQ[];
}

export default function CityPageRedesign({
  cityPage,
  courses,
  formattedTestimonials,
  displayFaqs
}: CityPageRedesignProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonialsPerPage = visibleCards;
  const fallbackTestimonials = [
    {
      name: "Rahul Mehra",
      role: "STUDENT",
      rating: 4.5,
      content: "The teachers at FrenchSkill explain everything clearly. I actually look forward to every class! The interactive sessions make learning complex grammar very easy.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Sumit Vats",
      role: "STUDENT",
      rating: 4.5,
      content: "Great platform for beginners! I started speaking basic French in just a few weeks. The personalized attention from tutors is what sets them apart.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Rohan Khanna",
      role: "STUDENT",
      rating: 4.5,
      content: "The weekend batches are a lifesaver for working professionals like me. The instructors are patient and the study material is very comprehensive. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Anjali Sharma",
      role: "STUDENT",
      rating: 4.5,
      content: "I joined for TEF preparation and the results were amazing. The mock tests and speaking practice sessions gave me the confidence I needed to clear my exams.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"
    }
  ];

  // Merge DB testimonials with fallbacks to ensure we always have a good number of them
  const testimonials = formattedTestimonials && formattedTestimonials.length > 0
    ? [...formattedTestimonials, ...fallbackTestimonials.slice(formattedTestimonials.length)]
    : fallbackTestimonials;

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev + 1) % (testimonials.length - (testimonialsPerPage - 1)));
  }, [testimonials.length, testimonialsPerPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-red-100 selection:text-red-600">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-40 px-4 overflow-hidden">
        {/* Modern Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-white">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-red-50 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1A3260 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-red-100 shadow-sm mb-8"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs font-black text-[#1A3260] uppercase tracking-wider">#1 French Academy in {cityPage.title || cityPage.cityName}</span>
            </motion.div>

            <div className="text-4xl md:text-7xl font-black text-[#1A3260] leading-[1.05] mb-8 tracking-tighter">
              {cityPage.title ? (
                <div dangerouslySetInnerHTML={{ __html: cityPage.title }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: cityPage.content || cityPage.cityName }} />
              )}
              <span className="text-red-600 block">Unlock Your Future.</span>
            </div>

            <p className="text-gray-600 text-xl mb-10 max-w-xl leading-relaxed font-medium">
              Join 11,000+ students mastering French with expert guidance. Personalized learning paths from A1 to B2 levels.
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <Link href="/courses" className="group bg-[#E4222A] text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:bg-red-700 transition-all flex items-center gap-2 hover:scale-[1.02]">
                Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-gray-200 overflow-hidden relative shadow-lg">
                      <Image src={`https://i.pravatar.cc/150?u=student${i}`} alt="Student" fill className="object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-white bg-[#1A3260] flex items-center justify-center text-white text-xs font-bold shadow-lg">+1k</div>
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm font-bold text-[#1A3260]">4.9/5 Rating</p>
                </div>
              </div>
            </div>



            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex gap-6 md:gap-16 pt-8 border-t border-gray-100"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-[#1A3260] tracking-tighter">2,000+</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Students</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-[#1A3260] tracking-tighter">5+</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Courses</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-[#1A3260] tracking-tighter">4.5</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Avg. Rating</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative">
            <motion.div
              style={{ y: y1 }}
              className="relative z-10"
            >
              <div className="relative h-[400px] md:h-[550px] w-full rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 md:border-[12px] border-white">
                <Image
                  src={cityPage.headerImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"}
                  alt="French Learning"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3260]/40 to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 md:-right-8 top-12 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#1A3260]">Expert Tutors</h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Certified Professionals</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-4 md:-left-8 bottom-12 bg-[#1A3260] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl z-20 border-2 border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">Fast Track</h4>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Learn 2x Faster</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 bg-gradient-to-br from-red-50 to-blue-50 rounded-[60px] rotate-6 opacity-50"></div>
          </div>
        </div>
      </section>
      {/* --- POPULAR COURSES --- */}
      <section className="py-24f bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A3260] tracking-tighter mb-4">Elite Programs</h2>
              <p className="text-gray-500 font-bold text-lg">Choose the path that fits your goals.</p>
            </div>
            <Link href="/courses" className="text-red-600 font-black flex items-center gap-2 hover:gap-3 transition-all">
              View All Courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={String(course.id || i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <CourseCard {...(course as unknown as Parameters<typeof CourseCard>[0])} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US GRID --- */}
      <section className="py-24 bg-white px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
            >
              Excellence Redefined
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#1A3260] tracking-tighter"
            >
              Why Thousands Choose <span className="text-red-600 italic">French Skill</span>
            </motion.h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Globe, title: "Global Recognition", desc: "Our certificates are accepted by top MNCs and global institutions.", color: "bg-blue-50 text-blue-600" },
              { icon: Users, title: "1-on-1 Mentorship", desc: "Personalized attention to ensure you master every nuance of the language.", color: "bg-red-50 text-red-600" },
              { icon: ShieldCheck, title: "Refund Guarantee", desc: "We are so confident in our methods that we offer a 100% refund policy.", color: "bg-green-50 text-green-600" },
              { icon: Clock, title: "Lifetime Access", desc: "Once you join, you get lifetime access to our community and materials.", color: "bg-purple-50 text-purple-600" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#1A3260] mb-4">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- VISION SECTION (ASYMMETRIC) --- */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="relative h-[400px] md:h-[650px] rounded-[32px] md:rounded-[56px] overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Vision" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3260]/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#E4222A] p-12 rounded-[40px] shadow-2xl hidden md:block">
                <h4 className="text-white text-4xl font-black mb-2">98%</h4>
                <p className="text-red-100 font-bold text-xs uppercase tracking-widest">Success Rate</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span 
                className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block"
                dangerouslySetInnerHTML={{ 
                  __html: cityPage.middleContent?.includes('|||')
                    ? cityPage.middleContent.split('|||')[0].replace(/French/gi, '<span class="text-red-600">French</span>')
                    : "Our Vision"
                }}
              />
              <div className="mb-8">
                {cityPage.middleContent?.includes('|||')
                  ? <div 
                      className="text-4xl md:text-5xl font-black text-[#1A3260] leading-[1.1] tracking-tighter"
                      dangerouslySetInnerHTML={{ 
                        __html: cityPage.middleContent.split('|||')[1].replace(/French/gi, (match) => `<span class="text-red-600">${match}</span>`) 
                      }} 
                    />
                  : <h2 className="text-4xl md:text-5xl font-black text-[#1A3260] leading-[1.1] tracking-tighter">Unlock Fluency in <span className="text-red-600">French</span> Classes in {cityPage.cityName}</h2>}
              </div>
              <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg whitespace-pre-line">
                {cityPage.middleContent ? (
                  <div dangerouslySetInnerHTML={{
                    __html: cityPage.middleContent.includes('|||')
                      ? cityPage.middleContent.split('|||')[2]
                      : cityPage.middleContent
                  }} />
                ) : (
                  <>
                    <p>
                      In today&apos;s global economy, French is more than just a language—it&apos;s a gateway to international opportunities. At French Skill, we&apos;ve reimagined how language is taught.
                    </p>
                    <p>
                      Our curriculum combines traditional linguistic foundations with modern immersive techniques. Whether you&apos;re aiming for Canada PR, higher education, or career growth, we provide the tools to get you there.
                    </p>
                  </>
                )}
                <ul className="space-y-4 pt-6">
                  {["Expert Native Instructors", "Modern E-Learning Portal", "24/7 Student Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#1A3260] font-black">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CERTIFICATION SHOWCASE --- */}
      <section className="py-16 px-4 relative overflow-hidden bg-[#1A3260]"
        style={{
          clipPath: "polygon(0 2%, 100% 0, 100% 98%, 0 100%)",
          background: "linear-gradient(135deg, #0d1b3a 0%, #1A3260 50%, #152a50 100%)"
        }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-white rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
              World-Class <span className="text-red-500">Certification</span>
            </h2>
            <p className="text-blue-100 text-lg mb-12 font-medium opacity-80 leading-relaxed">
              Your achievement deserves a badge of honor. Our certification is globally recognized and highly valued by top organizations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "MNC Approved", desc: "Valid across all major multinational companies." },
                { title: "Skill Focused", desc: "Demonstrates practical communication expertise." },
                { title: "Instant Access", desc: "Receive your digital certificate immediately after exams." },
                { title: "Verifiable", desc: "Secure QR code for instant employer verification." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-black mb-1">{item.title}</h4>
                    <p className="text-blue-200 text-sm font-medium opacity-70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            className="relative"
          >
            <div className="bg-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="/french-skill.png"
                alt="Certification"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl border-4 border-gray-50"
              />
              <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[#1A3260] font-black text-sm">Verified Achievement</p>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">French Skill Academy</p>
                  </div>
                </div>
                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                  Valid Globally
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SELF-PACED & STRUCTURED LESSONS --- */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="mb-8">
                {cityPage.afterCourseContent?.includes('|||')
                  ? <div 
                      className="text-4xl font-black text-[#1A3260] tracking-tighter leading-[1.1]"
                      dangerouslySetInnerHTML={{ 
                        __html: cityPage.afterCourseContent.split('|||')[0].replace(/classes/gi, (match) => `<span class="text-red-600">${match}</span>`) 
                      }} 
                    />
                  : <h2 className="text-4xl font-black text-[#1A3260] tracking-tighter leading-[1.1]">Self-Paced & Structured <span className="text-red-600">Classes</span> in {cityPage.title || cityPage.cityName}</h2>}
              </div>
              <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg whitespace-pre-line">
                {cityPage.afterCourseContent ? (
                  <div dangerouslySetInnerHTML={{
                    __html: cityPage.afterCourseContent.includes('|||')
                      ? cityPage.afterCourseContent.split('|||')[1]
                      : cityPage.afterCourseContent
                  }} />
                ) : (
                  <>
                    <p>
                      Looking for classes to help you prepare for the TEF French exam in {cityPage.title || cityPage.cityName}? French Skill is here to support you with professional, customized courses designed to match your learning goals. No matter which level you&apos;re aiming for (A1, A2, B1, or B2), we help you build a strong foundation in the French language so you can succeed.
                    </p>
                    <p>
                      Our courses are self-paced, allowing you to learn French without worrying about strict schedules or timing conflicts. We offer lessons for both beginners and advanced learners, making sure your learning experience is smooth, engaging, and confidence-building.
                    </p>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-50 p-10 rounded-[48px] border border-gray-100"
            >
              <h4 className="text-xl font-black text-[#1A3260] mb-8 flex items-center gap-2">
                <BookOpen className="text-red-600 w-6 h-6" />
                Featured Curriculums
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {[
                  "DELF A1 Beginner Level", "DELF A2 Intermediate Level",
                  "DELF B1 Professional Beginner Level", "DELF B2 Professional Intermediate Level",
                  "TEF Exam Preparation Course", "TEF Canada Exam Crash Course", "French for Kids"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group hover:border-red-100 transition-all">
                    <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm font-black text-[#1A3260] uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- LEARNING MADE EASY SECTION --- */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A3260] tracking-tighter">
              Learning Made <span className="text-red-600 italic">Easy</span> With French Skill
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Excellence Center",
                text: "Studying French in " + (cityPage.title || cityPage.cityName) + " has been made very easy with top-notch and qualified linguistic experts. Get enrolled in meticulously crafted courses that offer unparalleled guidance.",
                icon: "🌟"
              },
              {
                title: "Practical Learning",
                text: "Offer practical learning experience with audiovisual learning tools, simulation, and more while offering courses at the most affordable cost.",
                icon: "📱"
              },
              {
                title: "Immigration Ready",
                text: "Provide high-quality preparation modules and materials for Canadian immigration exams such as TEF, DELF, and more, with flexible and self-paced courses.",
                icon: "✈️"
              },
              {
                title: "Learner-Centric",
                text: "Personalized French classes " + (cityPage.title || cityPage.cityName) + " immigration training from industry experts who utilize a method to offer a deep understanding of language.",
                icon: "🎯"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 group hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-black text-[#1A3260] mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPARISON (MODERN TABLE) --- */}
      {/* Section 4: Start Your Journey Now */}
      {cityPage.afterCourseContent?.includes('|||') && cityPage.afterCourseContent.split('|||')[2] && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1A3260] rounded-[40px] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

              <div className="relative z-10">
                <div
                  className="text-white text-lg md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto mb-10 italic whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: cityPage.afterCourseContent.split('|||')[2] }}
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#EF233C] hover:bg-[#D90429] text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 mx-auto shadow-lg shadow-red-900/20 transition-colors"
                >
                  Start Your Journey Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A3260] tracking-tighter">The French Skill Advantage</h2>
          </div>

          <div className="overflow-x-auto rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#1A3260]">
                  <th className="px-6 md:px-10 py-6 md:py-8 font-black text-white uppercase tracking-[0.2em] text-xs">Benefit</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-center bg-[#E4222A] text-white font-black italic text-xl">French Skill</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-center text-blue-200 font-bold opacity-50 uppercase tracking-widest text-[10px]">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "100% Refund Policy",
                  "Expert Native Tutors",
                  "Personalized Learning Path",
                  "Lifetime Access",
                  "24/7 Doubt Support"
                ].map((feature, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-6 md:px-10 py-4 md:py-6 font-black text-[#1A3260] border-r border-gray-100">{feature}</td>
                    <td className="px-6 md:px-10 py-4 md:py-6 text-center border-r border-gray-100">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="text-green-600 w-4 h-4 md:w-6 md:h-6" />
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-4 md:py-6 text-center opacity-20">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-3 md:w-4 h-0.5 bg-gray-400"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (BOXED STYLE) --- */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A3260] tracking-tighter">Frequently Asked Questions</h2>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {displayFaqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-gray-200 last:border-b-0 bg-white transition-all`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left group"
                >
                  <span className={`text-lg font-bold transition-colors ${activeFaq === i ? 'text-blue-600' : 'text-[#1A3260] group-hover:text-blue-600'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'text-blue-600 rotate-180' : 'text-blue-400'}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-gray-600 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (REFERENCE IMAGE STYLE) --- */}
      <section className="py-24 bg-white px-4 relative overflow-hidden">
        {/* Decorative Background Image (Faded) */}
        <div className="absolute top-0 left-0 w-1/2 h-[90%] opacity-100 pointer-events-none select-none hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
            alt="Decoration"
            fill
            className="object-cover"
            style={{ maskImage: 'linear-gradient(to right, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12">
          {/* Left Side: Empty space for background image visibility */}
          <div className="hidden lg:block w-1/4" />

          {/* Right Side: Carousel Area */}
          <div className="flex-1 pt-0 md:-mt-10 relative">

            <div className="py-8 overflow-hidden">
              <motion.div
                className="flex gap-2"
                animate={{
                  x: `calc(-${testimonialIndex * (100 / visibleCards)}% - ${testimonialIndex * 0.5}rem)`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={i}
                    className="min-w-full md:min-w-[calc(50%-0.25rem)] lg:min-w-[calc(33.333%-0.25rem)] group relative h-[380px] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] cursor-pointer"
                  >
                    {/* Full Card Image Background */}
                    <div className="absolute inset-0 z-0 rounded-[5%] overflow-hidden">
                      <Image
                        src={testimonial.image || `https://i.pravatar.cc/150?u=${testimonial.name}`}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-[5%]"
                      />
                    </div>

                    {/* Dark Bottom Gradient (Always Visible for readability) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                    {/* Content Area */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-left">
                      <div className="mb-0">
                        <div className="flex items-center gap-3">
                          <h4 className="text-xl font-bold text-white tracking-tight">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => {
                              // FORCE 4.5 for testing
                              const rating = 4.5;
                              const isFull = star <= 4;
                              const isHalf = star === 5;

                              if (isFull) {
                                return <Star key={star} className="w-3.5 h-3.5 text-yellow-400 fill-current" />;
                              } else if (isHalf) {
                                return (
                                  <div key={star} className="relative w-3.5 h-3.5">
                                    <Star className="absolute inset-0 w-3.5 h-3.5 text-gray-500" />
                                    <div className="absolute inset-0 overflow-hidden w-[50%] z-10">
                                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                    </div>
                                  </div>
                                );
                              } else {
                                return <Star key={star} className="w-3.5 h-3.5 text-gray-500" />;
                              }
                            })}
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs font-medium">
                          {testimonial.role}
                        </p>
                      </div>

                      {/* Hover Reveal: Testimonial Content */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-[200px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        <p className="text-white text-[13px] leading-relaxed mt-4 font-medium border-t border-white/20 pt-4">
                          {testimonial.content}
                        </p>
                      </div>

                      {/* Arrow Icon (Bottom Right) */}
                      <div className="absolute bottom-8 right-8 text-white/70 group-hover:text-red-500 transition-colors">
                        <ArrowRight className="w-6 h-6 transform -rotate-45" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (INSPIRED BY SCREENSHOT) --- */}
      <section className="py-16 md:py-0 bg-gray-50 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left lg:max-w-[400px]">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3260] leading-[1.1] mb-6 tracking-tighter">
              Start your Career with <span className="text-red-600">French Skill</span> Now!
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
              We provide Career-oriented consultation services for all interested students to understand the importance of courses and empower the strengths of opportunities offered by French Skill Academy.
            </p>
          </div>

          {/* Center Image */}
          <div className="relative w-full lg:w-[450px] h-[300px] md:h-[400px] flex items-center justify-center order-first lg:order-none">
            <div className="absolute inset-0 bg-red-100/30 rounded-full blur-[80px] md:blur-[100px] -z-10"></div>
            <Image
              src="/female-student-cta.png"
              alt="Student Success"
              width={500}
              height={500}
              className="object-contain h-full w-auto mix-blend-multiply"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 w-full lg:max-w-[350px] space-y-6 md:space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-black text-[#1A3260] mb-3 md:mb-4">
                Book a Free Session for career consultation
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-medium italic">
                20 Minutes of Guidance often boost the Idea of Learning and Practise.
              </p>
            </div>

            <Link href="/#contact" className="group block w-full bg-[#E4222A] text-white text-center py-4 md:py-5 rounded-2xl font-black shadow-2xl hover:bg-red-700 transition-all hover:scale-[1.02]">
              BOOK A FREE SESSION
            </Link>
          </div>
        </div>
      </section>

      {/* --- ACHIEVEMENTS ---
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Our <span className="text-red-600 italic">Wall of Fame</span>
              </h2>
              <p className="text-gray-400 font-bold text-lg mt-2">Where our students landed after mastery.</p>
            </div>
            <Link href="/achievements" className="group bg-gray-50 px-8 py-4 rounded-2xl font-black text-[#1A3260] hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-2">
              All Success Stories <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { name: "Munira", loc: "Mississauga, Canada", company: "Bombardier", img: "https://i.pravatar.cc/150?u=munira" },
              { name: "Pratyasa", loc: "Calgary", company: "Oracle", img: "https://i.pravatar.cc/150?u=pratyasa" },
              { name: "Shrey", loc: "Mississauga, ON", company: "Desjardins", img: "https://i.pravatar.cc/150?u=shrey" },
              { name: "Shaleen", loc: "Unionville, ON", company: "IBM", img: "https://i.pravatar.cc/150?u=shaleen" },
              { name: "Arpit", loc: "Toronto, Ontario", company: "Accor", img: "https://i.pravatar.cc/150?u=arpit" },
              { name: "Priyanka", loc: "Montréal, Canada", company: "SNC - Lavalin", img: "https://i.pravatar.cc/150?u=priyanka" },
              { name: "Piyush", loc: "Calgary, Canada", company: "Sandman", img: "https://i.pravatar.cc/150?u=piyush" },
              { name: "Krishna", loc: "Montreal, Canada", company: "Oracle", img: "https://i.pravatar.cc/150?u=krishna" }
            ].map((person, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex items-center gap-5 group p-4 rounded-3xl hover:bg-gray-50 transition-all"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 border-4 border-white group-hover:rotate-3 transition-transform">
                  <Image src={person.img} alt={person.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-red-500/50 text-[9px] font-black uppercase tracking-widest mb-1">
                    <span className="text-xs">📍</span>
                    {person.loc}
                  </div>
                  <h4 className="text-xl font-black text-[#1A3260] mb-0.5">{person.name}</h4>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{person.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        

      </section> */}

      <Footer />
    </main>
  );
}
