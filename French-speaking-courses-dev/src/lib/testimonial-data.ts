export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Beginner Student",
    content:
      "These French courses transformed my language journey. Interactive methods kept me engaged and motivated. Zero to basic conversations in just 8 weeks!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Chen",
    role: "Business Professional",
    content:
      "The Business French course has been invaluable for my work. My French colleagues have noticed the improvement in my communication skills!",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Emma Wilson",
    role: "Intermediate Student",
    content:
      "The structured approach helped me progress from A1 to B1 in just 6 months. Practice with native speakers improved my accent and fluency.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Michael Rodriguez",
    role: "Advanced Student",
    content:
      "Nothing compares to the personalized attention here. My confidence in speaking French has skyrocketed. I can now watch French films without subtitles!",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Sophia Kim",
    role: "Cultural Exchange Student",
    content:
      "These courses prepared me perfectly for my study abroad in Paris. The cultural insights were just as valuable as the language skills.",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Jean Dupont",
    role: "Online Learner",
    content:
      "The flexibility of online learning combined with real-time feedback makes this program stand out. I can practice anytime while getting expert guidance.",
    image: "https://i.pravatar.cc/150?img=13",
  }
];
