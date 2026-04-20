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

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: number;
  students: number;
  instructor: string;
  instructorImage: string;
  instructorBio: string;
  instructorExperience: string;
  instructorSpecialties: string[];
  image: string;
  lessons: number;
  certificate: boolean;
  language: string;
  access: string;
  modules: CourseModule[];
  features: CourseFeature[];
  outcomes: string[];
  faq: { question: string; answer: string }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
  }[];
  tools: string[];
  projects: {
    title: string;
    description: string;
    skills: string[];
  }[];
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  companies: string[];
  requirements?: { type: string; text: string }[];
}
