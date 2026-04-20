// Course Section Types
export interface OverviewSection {
  title: string;
  subtitle: string;
  bullets: string[];
  backgroundImage?: string;
  ctaButton?: {
    text: string;
    action: string;
  };
}

export interface WhyEnrollSection {
  headline: string;
  description: string;
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface BenefitsSection {
  headline: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface CurriculumModule {
  title: string;
  lessons: string[];
  duration: string;
  description: string;
}

export interface CurriculumSection {
  headline: string;
  description: string;
  modules: CurriculumModule[];
  downloadBrochure?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
}

export interface FeesSection {
  headline: string;
  description: string;
  price: string;
  originalPrice?: string;
  paymentOptions: string[];
  discounts: string[];
  emiOptions?: {
    enabled: boolean;
    text: string;
  };
  refundPolicy?: {
    enabled: boolean;
    text: string;
  };
}

export interface SkillsToolsSection {
  skillsHeadline: string;
  skillsDescription: string;
  skills: string[];
  toolsHeadline: string;
  toolsDescription: string;
  tools: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  skills: string[];
  image?: string;
}

export interface ProjectsSection {
  headline: string;
  description: string;
  projects: ProjectItem[];
  highlights: {
    text: string;
    icon: string;
  }[];
}

export interface ReviewItem {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface ReviewsSection {
  headline: string;
  reviews: ReviewItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  headline: string;
  faqs: FAQItem[];
}

export interface ComparisonRow {
  feature: string;
  ourCourse: boolean | string;
  traditional: boolean | string;
}

export interface ComparisonSection {
  headline: string;
  rows: ComparisonRow[];
}

export interface BatchItem {
  date: string;
  title: string;
  days: string;
  time: string;
  type: string;
}

export interface BatchScheduleSection {
  headline: string;
  batches: BatchItem[];
  customTimingText?: string;
  customTimingAction?: string;
}

export interface CTASection {
  text: string;
  buttonText: string;
  action: string;
  style?: 'primary' | 'secondary' | 'outline';
  showCountdown?: boolean;
  countdownEndDate?: string;
  countdownMessage?: string;
}

export interface HeroBannerSection {
  headline: string;
  subheadline: string;
  backgroundImage?: string;
  ctaButtons: {
    primary: CTASection;
    secondary?: CTASection;
  };
  nextBatchDate?: string;
}

// Main Course Interface with Dynamic Sections
export interface CourseWithSections {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: number | null;
  students: number;
  instructor?: string | null;
  instructorImage?: string | null;
  instructorBio?: string | null;
  instructorExperience?: string | null;
  instructorSpecialties: string[];
  image?: string | null;
  lessons?: number | null;
  certificate: boolean;
  language?: string | null;
  access?: string | null;
  brochureUrl?: string | null; // URL to the uploaded brochure PDF
  outcomes: string[];
  companies: string[];
  requirements?: { type: string; text: string }[];
  offerEndDate?: string | null;
  promotionBannerText?: string | null;
  startDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ctaText?: string | null;
  registrationOpen: boolean;
  slug: string;
  
  // Legacy fields for backward compatibility
  modules?: CourseModule[] | null;
  features?: CourseFeature[] | null;
  faq?: { question: string; answer: string }[] | null;
  testimonials?: {
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
  }[] | null;
  tools?: string[];
  projects?: {
    title: string;
    description: string;
    skills: string[];
  }[] | null;
  benefits?: {
    title: string;
    description: string;
    icon: string;
  }[] | null;
  batches?: BatchInfo[] | null;
  timings?: Record<string, unknown>;
  
  // Dynamic Sections
  overviewSection?: OverviewSection;
  whyEnrollSection?: WhyEnrollSection;
  benefitsSection?: BenefitsSection;
  curriculumSection?: CurriculumSection;
  feesSection?: FeesSection;
  skillsToolsSection?: SkillsToolsSection;
  projectsSection?: ProjectsSection;
  reviewsSection?: ReviewsSection;
  faqSection?: FAQSection;
  comparisonSection?: ComparisonSection;
  batchScheduleSection?: BatchScheduleSection;
  heroBannerSection?: HeroBannerSection;
  ctaSections?: CTASection[];
}

// Legacy interfaces for backward compatibility
export interface CourseModule {
  title: string;
  lessons: string[];
  duration: string;
  description: string;
}

export interface CourseFeature {
  title: string;
  description: string;
  icon: string;
}

export interface BatchInfo {
  date: string;
  title: string;
  days: string;
  time: string;
  type: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: number | null;
  students: number;
  instructor?: string | null;
  instructorImage?: string | null;
  instructorBio?: string | null;
  instructorExperience?: string | null;
  instructorSpecialties: string[];
  image?: string | null;
  lessons?: number | null;
  certificate: boolean;
  language?: string | null;
  access?: string | null;
  brochureUrl?: string | null; // URL to the uploaded brochure PDF
  modules?: CourseModule[] | null;
  features?: CourseFeature[] | null;
  outcomes: string[];
  faq?: { question: string; answer: string }[] | null;
  testimonials?: {
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
  }[] | null;
  tools: string[];
  projects?: {
    title: string;
    description: string;
    skills: string[];
  }[] | null;
  benefits?: {
    title: string;
    description: string;
    icon: string;
  }[] | null;
  companies: string[];
  requirements?: { type: string; text: string }[];
  offerEndDate?: string | null;
  promotionBannerText?: string | null;
  startDate?: string | null;
  batches?: BatchInfo[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ctaText?: string | null;
  registrationOpen: boolean;
  timings?: Record<string, unknown>;
}
