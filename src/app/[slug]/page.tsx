import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import CityPageRedesign from "@/components/CityPageRedesign";

interface FAQ {
  question: string;
  answer: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cityPageModel = (prisma as any).cityPage;
  if (!cityPageModel) return { title: "French Skill Academy" };
  const cityPage = await cityPageModel.findUnique({ where: { slug } });
  if (!cityPage) return { title: "Page Not Found" };
  return {
    title: cityPage.metaTitle || `${cityPage.cityName} - French Skill Academy`,
    description: cityPage.metaDescription,
    keywords: cityPage.keywords,
  };
}

export default async function PublicCityPage({ params }: PageProps) {
  const { slug } = await params;
  const cityPageModel = (prisma as any).cityPage;
  if (!cityPageModel) return <div className="p-10 text-center text-[#1A3260] font-bold">Server Error. Please restart dev server.</div>;

  const cityPage = await cityPageModel.findUnique({ where: { slug } });
  if (!cityPage) notFound();

  const courses = await prisma.course.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  const formattedTestimonials = (cityPage.testimonials as any[] || []).map(t => ({
    name: t.name,
    role: t.designation || "Student",
    content: t.description,
    image: t.profile || "/french-skill.png",
    rating: t.rating
  }));

  // Default FAQs if none provided in Admin Panel
  const displayFaqs: FAQ[] = (cityPage.faqs && (cityPage.faqs as any[]).length > 0) 
    ? (cityPage.faqs as FAQ[]) 
    : [
        { question: `How much do your French classes in ${cityPage.cityName} cost?`, answer: "Our fees are highly competitive and vary based on the course level. Contact us for a detailed fee structure." },
        { question: `Can I join your French language courses in ${cityPage.cityName} as a beginner?`, answer: "Yes, we have specialized batches for absolute beginners starting from A1 level." },
        { question: "Can I enroll my kid in one of your French Courses?", answer: "Absolutely! We offer 'French for Kids' programs specially designed for young learners." },
        { question: "Do you offer courses for preparing for Canada PR or immigration exams?", answer: "Yes, we provide intensive training for TEF and TCF exams required for Canada PR." },
        { question: "Can I request a doubt-clearing session?", answer: "Yes, we provide personalized mentorship and dedicated doubt-clearing sessions for all our students." }
      ];

  return (
    <CityPageRedesign 
      cityPage={cityPage}
      courses={courses}
      formattedTestimonials={formattedTestimonials}
      displayFaqs={displayFaqs}
    />
  );
}
