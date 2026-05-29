import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import CityPageRedesign from "@/components/CityPageRedesign";

export const revalidate = 0; // Always fetch fresh data from DB


interface FAQ {
  question: string;
  answer: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface TestimonialData {
  name: string;
  designation?: string;
  description: string;
  profile?: string;
  rating?: number;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cityPage = await prisma.cityPage.findUnique({ 
    where: { slug },
    select: {
      cityName: true,
      metaTitle: true,
      metaDescription: true,
      keywords: true
    }
  });
  if (!cityPage) return { title: "Page Not Found" };
  return {
    title: {
      absolute: cityPage.metaTitle || `${cityPage.cityName} - French Skill Academy`,
    },
    description: cityPage.metaDescription,
    keywords: cityPage.keywords,
  };
}

export default async function PublicCityPage({ params }: PageProps) {
  const { slug } = await params;
  
  const cityPage = await prisma.cityPage.findUnique({
    where: { slug },
    select: {
      id: true,
      cityName: true,
      slug: true,
      title: true,
      content: true,
      middleContent: true,
      afterCourseContent: true,
      headerImage: true,
      menuUrl: true,
      faqs: true,
      testimonials: true,
      metaTitle: true,
      metaDescription: true,
      keywords: true,
      isActive: true,
    }
  });

  if (!cityPage) notFound();

  const courses = await prisma.course.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  
  const rawTestimonials = cityPage.testimonials;
  const testimonialsData = Array.isArray(rawTestimonials) ? (rawTestimonials as unknown as TestimonialData[]) : [];
  
  const formattedTestimonials = testimonialsData.map(t => ({
    name: t.name || "Anonymous",
    role: t.designation || "Student",
    content: t.description || "",
    image: t.profile || "/french-skill.png",
    rating: t.rating
  }));

  // Default FAQs if none provided in Admin Panel
  const faqData = cityPage?.faqs as unknown as FAQ[];
  const displayFaqs: FAQ[] = (faqData && faqData.length > 0) 
    ? faqData 
    : [
        { question: `How much do your French classes in ${cityPage?.cityName} cost?`, answer: "Our fees are highly competitive and vary based on the course level. Contact us for a detailed fee structure." },
        { question: `Can I join your French language courses in ${cityPage?.cityName} as a beginner?`, answer: "Yes, we have specialized batches for absolute beginners starting from A1 level." },
        { question: "Can I enroll my kid in one of your French Courses?", answer: "Absolutely! We offer 'French for Kids' programs specially designed for young learners." },
        { question: "Do you offer courses for preparing for Canada PR or immigration exams?", answer: "Yes, we provide intensive training for TEF and TCF exams required for Canada PR." },
        { question: "Can I request a doubt-clearing session?", answer: "Yes, we provide personalized mentorship and dedicated doubt-clearing sessions for all our students." }
      ];

  return (
    <CityPageRedesign 
      cityPage={cityPage as unknown as Parameters<typeof CityPageRedesign>[0]['cityPage']}
      courses={courses}
      formattedTestimonials={formattedTestimonials}
      displayFaqs={displayFaqs}
    />
  );
}
