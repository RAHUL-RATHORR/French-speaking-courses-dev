import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create the default admin user
  const adminExists = await prisma.admin.findUnique({
    where: { username: 'admin' },
  });

  if (!adminExists) {
    const hashedPassword = await hash('U0W3PA5h8hF9', 12);
    await prisma.admin.create({
      data: {
        username: 'ashok',
        password: hashedPassword,
      },
    });
    console.log('Default admin user created');
  } else {
    console.log('Admin user already exists');
  }

  // Add some sample courses
  const coursesCount = await prisma.course.count();
  if (coursesCount === 0) {
    const courses = [
      {
        // Basic Course Information
        title: 'French for Beginners - Complete Foundation Course',
        description: 'Master French fundamentals with our comprehensive beginner program designed for absolute beginners.',
        longDescription: 'This comprehensive beginner course is meticulously designed for students who have little to no experience with the French language. You will learn essential vocabulary, basic grammar structures, pronunciation fundamentals, and conversational skills that will give you a solid foundation for further French language study. Our interactive approach combines traditional learning methods with modern technology to ensure rapid progress and long-term retention.',
        level: 'Beginner',
        duration: '12 weeks',
        price: '₹4,999',
        originalPrice: '₹7,999',
        rating: 4.8,
        students: 1247,
        image: '/french-skill.png',
        slug: 'french-for-beginners-complete',
        
        // Instructor Information
        instructor: 'Marie Dubois',
        instructorImage: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
        instructorBio: 'Native French speaker from Paris with over 10 years of teaching experience. Holds a Master\'s degree in French Literature from Sorbonne University and specializes in beginner-friendly teaching methodologies.',
        instructorExperience: '10+ years teaching French',
        instructorSpecialties: ['Beginner French', 'Pronunciation', 'Grammar Fundamentals', 'Conversational French'],
        
        // Course Details
        lessons: 48,
        certificate: true,
        language: 'French',
        access: 'Lifetime Access',
        
        // Learning Outcomes
        outcomes: [
          'Master basic French grammar and sentence structure',
          'Build a vocabulary of 1000+ essential French words',
          'Engage in simple conversations in French',
          'Understand and use present, past, and future tenses',
          'Read and comprehend basic French texts',
          'Write simple paragraphs in French',
          'Develop proper French pronunciation skills'
        ],
        
        // Companies where graduates work
        companies: ['Alliance Française', 'Institut Français', 'Sorbonne', 'TV5Monde', 'RFI'],
        
        // Course Requirements
        requirements: [
          { type: 'prerequisite', text: 'No prior French knowledge required' },
          { type: 'technical', text: 'Computer/smartphone with internet connection' },
          { type: 'time', text: '5-7 hours per week study commitment' },
          { type: 'material', text: 'Notebook and pen for practice exercises' }
        ],
        
        // Promotional Information
        offerEndDate: new Date('2025-08-15T23:59:59Z'),
        promotionBannerText: 'Early Bird Special - Save ₹3,000! Limited time offer ending soon.',
        startDate: new Date('2025-08-10T10:00:00Z'),
        
        // SEO Information
        metaTitle: 'Learn French for Beginners - Complete Online Course | French Skill Academy',
        metaDescription: 'Start your French learning journey with our comprehensive beginner course. Master grammar, vocabulary, and conversation skills with expert native instructors.',
        ctaText: 'Start Learning French Today',
        
        // Legacy Fields for Backward Compatibility
        modules: [
          {
            title: 'French Fundamentals',
            lessons: [
              'French alphabet and pronunciation',
              'Basic greetings and introductions',
              'Numbers 1-100',
              'Days of the week and months',
              'Common phrases for daily life'
            ],
            duration: '3 weeks',
            description: 'Build your foundation with essential French basics, pronunciation, and everyday vocabulary.'
          },
          {
            title: 'Grammar Essentials',
            lessons: [
              'Articles (le, la, les, un, une, des)',
              'Present tense verbs (être, avoir, regular verbs)',
              'Question formation',
              'Negation in French',
              'Adjective agreement'
            ],
            duration: '3 weeks',
            description: 'Master fundamental French grammar rules that form the backbone of the language.'
          },
          {
            title: 'Practical Conversations',
            lessons: [
              'At the café and restaurant',
              'Shopping and directions',
              'Family and describing people',
              'Hobbies and preferences',
              'Making plans and appointments'
            ],
            duration: '3 weeks',
            description: 'Apply your knowledge in real-world conversation scenarios.'
          },
          {
            title: 'Building Fluency',
            lessons: [
              'Past tense (passé composé)',
              'Future tense introduction',
              'Complex sentence structures',
              'Cultural insights and etiquette',
              'Review and practice sessions'
            ],
            duration: '3 weeks',
            description: 'Advance your skills and gain confidence in French communication.'
          }
        ],
        
        features: [
          {
            title: 'Native Instructors',
            description: 'Learn from qualified native French speakers',
            icon: '👨‍🏫'
          },
          {
            title: 'Interactive Lessons',
            description: 'Engaging video lessons with quizzes and exercises',
            icon: '📱'
          },
          {
            title: 'Live Sessions',
            description: 'Weekly live practice sessions with instructors',
            icon: '🎥'
          },
          {
            title: 'Certificate',
            description: 'Receive completion certificate upon finishing course',
            icon: '🏆'
          }
        ],
        
        faq: [
          {
            question: 'Is this course suitable for complete beginners?',
            answer: 'Absolutely! This course is specifically designed for students with no prior French knowledge. We start from the very basics and gradually build your skills.'
          },
          {
            question: 'How much time should I dedicate to this course?',
            answer: 'We recommend 5-7 hours per week, including video lessons, practice exercises, and homework. This ensures steady progress without overwhelming you.'
          },
          {
            question: 'Will I be able to speak French after completing this course?',
            answer: 'Yes! By the end of the course, you\'ll be able to engage in basic conversations, introduce yourself, order food, ask for directions, and handle everyday situations in French.'
          },
          {
            question: 'Do you provide a certificate?',
            answer: 'Yes, upon successful completion of the course and passing the final assessment, you\'ll receive a completion certificate that you can add to your resume or LinkedIn profile.'
          }
        ],
        
        testimonials: [
          {
            name: 'Priya Sharma',
            role: 'Software Engineer',
            content: 'I went from knowing zero French to having conversations with my French colleagues. The teaching methodology is excellent!',
            rating: 5,
            image: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg'
          },
          {
            name: 'Rajesh Kumar',
            role: 'Business Analyst',
            content: 'The course structure is perfect for working professionals. I could learn at my own pace and the instructors were very supportive.',
            rating: 5,
            image: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg'
          },
          {
            name: 'Anita Patel',
            role: 'Student',
            content: 'Marie made learning French so enjoyable! The interactive sessions helped me gain confidence in speaking.',
            rating: 4,
            image: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg'
          }
        ],
        
        tools: [
          'Duolingo Integration',
          'French Dictionary App',
          'Pronunciation Checker',
          'Grammar Practice Tools',
          'Conversation Simulator',
          'Progress Tracker'
        ],
        
        projects: [
          {
            title: 'Personal Introduction Video',
            description: 'Create a 2-minute video introducing yourself in French, covering name, age, profession, hobbies, and family.',
            skills: ['Speaking', 'Pronunciation', 'Basic Vocabulary', 'Confidence Building']
          },
          {
            title: 'French Menu Translation',
            description: 'Translate a complete French restaurant menu and write a dialogue for ordering food.',
            skills: ['Reading Comprehension', 'Vocabulary', 'Cultural Understanding', 'Practical Application']
          },
          {
            title: 'Travel Itinerary Planning',
            description: 'Plan a 3-day trip to Paris in French, including places to visit, transportation, and accommodation.',
            skills: ['Writing', 'Research', 'Practical French', 'Cultural Knowledge']
          }
        ],
        
        benefits: [
          {
            title: 'Structured Learning Path',
            description: 'Follow a carefully designed curriculum that builds skills progressively',
            icon: '📚'
          },
          {
            title: 'Flexible Schedule',
            description: 'Learn at your own pace with 24/7 access to course materials',
            icon: '⏰'
          },
          {
            title: 'Community Support',
            description: 'Connect with fellow learners in our exclusive student community',
            icon: '👥'
          },
          {
            title: 'Practical Focus',
            description: 'Learn French that you can actually use in real-life situations',
            icon: '🌟'
          }
        ],
        
        batches: [
          {
            date: '10th August 2025',
            title: 'Weekend Batch',
            days: 'Saturday & Sunday',
            time: '10:00 AM - 12:00 PM IST',
            type: 'Live Online'
          },
          {
            date: '15th August 2025',
            title: 'Evening Batch',
            days: 'Monday, Wednesday, Friday',
            time: '7:00 PM - 8:30 PM IST',
            type: 'Live Online'
          },
          {
            date: 'Anytime',
            title: 'Self-Paced',
            days: 'Flexible',
            time: 'Your convenience',
            type: 'Recorded Content'
          }
        ],
        
        // Dynamic Sections
        heroBannerSection: {
          headline: 'Master French from Zero to Conversational in 12 Weeks',
          subheadline: 'Join 1,000+ students who transformed their careers with our proven French learning system',
          backgroundImage: '/french-skill.png',
          ctaButtons: {
            primary: {
              text: 'Enroll Now - Save ₹3,000',
              buttonText: 'Start Learning',
              action: 'enroll'
            },
            secondary: {
              text: 'Download Free Brochure',
              buttonText: 'Get Brochure',
              action: 'download_brochure'
            }
          },
          nextBatchDate: '10th August 2025'
        },
        
        overviewSection: {
          title: 'Complete French Foundation Course',
          subtitle: 'Transform from absolute beginner to confident French speaker',
          bullets: [
            '48 structured video lessons with native French instructors',
            'Weekly live practice sessions for speaking confidence',
            'Real-world projects and practical exercises',
            'Lifetime access to course materials and updates',
            'Completion certificate from French Skill Academy',
            'Exclusive access to student community and job board'
          ],
          ctaButton: {
            text: 'Start Your French Journey',
            action: 'enroll'
          }
        },
        
        whyEnrollSection: {
          headline: 'Why Choose Our French Beginner Course?',
          description: 'Our proven methodology has helped thousands of students achieve fluency faster than traditional methods.',
          benefits: [
            {
              title: 'Native French Instructors',
              description: 'Learn authentic pronunciation and cultural nuances from qualified Parisian instructors',
              icon: '🇫🇷'
            },
            {
              title: 'Proven Track Record',
              description: '95% of our students achieve conversational level within 12 weeks',
              icon: '📈'
            },
            {
              title: 'Interactive Learning',
              description: 'Engaging video lessons, quizzes, and real-time feedback keep you motivated',
              icon: '🎯'
            },
            {
              title: 'Practical Application',
              description: 'Focus on real-world scenarios you\'ll actually encounter in France',
              icon: '🌍'
            }
          ]
        },
        
        curriculumSection: {
          headline: 'Comprehensive 12-Week Curriculum',
          description: 'Our structured approach ensures you build a strong foundation while developing practical communication skills.',
          modules: [
            {
              title: 'Week 1-3: French Fundamentals',
              lessons: [
                'French alphabet and pronunciation rules',
                'Essential greetings and polite expressions',
                'Numbers, dates, and time expressions',
                'Basic sentence structure and word order',
                'Common everyday vocabulary (200+ words)'
              ],
              duration: '3 weeks',
              description: 'Master the building blocks of French language with proper pronunciation and essential vocabulary.'
            },
            {
              title: 'Week 4-6: Grammar Foundation',
              lessons: [
                'Articles and gender rules (le, la, un, une)',
                'Present tense of être, avoir, and regular verbs',
                'Question formation and interrogative words',
                'Negation patterns and common expressions',
                'Adjectives and basic agreement rules'
              ],
              duration: '3 weeks',
              description: 'Build grammatical accuracy with the most important French grammar concepts.'
            },
            {
              title: 'Week 7-9: Practical Communication',
              lessons: [
                'Ordering at restaurants and cafés',
                'Shopping and asking for prices',
                'Giving and asking for directions',
                'Talking about family and describing people',
                'Expressing likes, dislikes, and preferences'
              ],
              duration: '3 weeks',
              description: 'Apply your knowledge in real-world situations with practical conversation skills.'
            },
            {
              title: 'Week 10-12: Building Confidence',
              lessons: [
                'Past tense (passé composé) introduction',
                'Future tense and making plans',
                'Complex sentence structures with conjunctions',
                'French culture and social etiquette',
                'Final project and comprehensive review'
              ],
              duration: '3 weeks',
              description: 'Advance your skills and gain confidence for independent French communication.'
            }
          ],
          downloadBrochure: {
            enabled: true,
            text: 'Download Complete Curriculum PDF',
            link: '/brochures/french-beginners-curriculum.pdf'
          }
        },
        
        feesSection: {
          headline: 'Invest in Your French Future',
          description: 'Quality French education at an affordable price with flexible payment options.',
          price: '₹4,999',
          originalPrice: '₹7,999',
          paymentOptions: ['One-time payment', '3-month EMI', '6-month EMI'],
          discounts: ['Early bird: Save ₹3,000', 'Student discount: Additional 10%', 'Group booking: 15% off for 3+ students'],
          emiOptions: {
            enabled: true,
            text: 'EMI starting from ₹1,667/month'
          },
          refundPolicy: {
            enabled: true,
            text: '7-day money-back guarantee'
          }
        },
        
        ctaSections: [
          {
            text: 'Ready to start speaking French? Join our next batch starting August 10th!',
            buttonText: 'Enroll Now - Limited Seats',
            action: 'enroll',
            style: 'primary',
            showCountdown: true,
            countdownEndDate: '2025-08-15T23:59:59Z',
            countdownMessage: 'Early bird offer ends in:'
          }
        ]
      },

      {
        // Second Course - Intermediate French
        title: 'Intermediate French - Conversational Mastery',
        description: 'Advance your French skills to intermediate level with focus on fluent conversation and complex grammar.',
        longDescription: 'Take your French to the next level with our comprehensive intermediate course. Perfect for students who have completed beginner French or have A1-A2 level knowledge. This course emphasizes conversational fluency, complex grammar structures, and cultural understanding essential for confident communication in professional and social settings.',
        level: 'Intermediate',
        duration: '14 weeks',
        price: '₹6,999',
        originalPrice: '₹9,999',
        rating: 4.9,
        students: 892,
        image: '/french-skill.png',
        slug: 'intermediate-french-conversational',
        
        instructor: 'Pierre Dubois',
        instructorImage: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
        instructorBio: 'Experienced French instructor from Lyon with specialization in intermediate level teaching. Holds DALF C2 certification and has taught French in universities across India for 8 years.',
        instructorExperience: '8+ years teaching experience',
        instructorSpecialties: ['Intermediate French', 'Business French', 'Conversation Skills', 'French Literature'],
        
        lessons: 56,
        certificate: true,
        language: 'French',
        access: 'Lifetime Access',
        
        outcomes: [
          'Achieve B1-B2 level proficiency in French',
          'Engage in complex conversations on various topics',
          'Master advanced grammar including subjunctive mood',
          'Write detailed essays and formal letters in French',
          'Understand French media, films, and literature',
          'Express opinions and arguments fluently',
          'Navigate professional situations in French'
        ],
        
        companies: ['L\'Oréal', 'LVMH', 'Danone', 'Total Energies', 'Airbus'],
        
        requirements: [
          { type: 'prerequisite', text: 'Completed beginner French or A1-A2 level knowledge' },
          { type: 'technical', text: 'Computer with good internet for live sessions' },
          { type: 'time', text: '7-9 hours per week study commitment' },
          { type: 'assessment', text: 'Initial placement test required' }
        ],
        
        offerEndDate: new Date('2025-08-20T23:59:59Z'),
        promotionBannerText: 'Professional Upgrade Offer - Master business French and boost your career!',
        startDate: new Date('2025-08-15T10:00:00Z'),
        
        metaTitle: 'Intermediate French Course - Master Conversational French Online | French Skill Academy',
        metaDescription: 'Advance to intermediate French with our comprehensive course focusing on conversation, business French, and cultural fluency.',
        ctaText: 'Advance Your French Skills Today',
        
        tools: [
          'Advanced Grammar Checker',
          'French News App',
          'Conversation Practice Bot',
          'Business French Templates',
          'Literature Analysis Tools',
          'Pronunciation Perfector'
        ],
        
        heroBannerSection: {
          headline: 'Master Intermediate French & Unlock Global Opportunities',
          subheadline: 'Advanced course for professionals and serious learners',
          ctaButtons: {
            primary: {
              text: 'Advance Your French',
              buttonText: 'Enroll Now',
              action: 'enroll'
            }
          }
        }
      },

      {
        // Third Course - Business French
        title: 'Business French for Professionals',
        description: 'Master professional French for international business, presentations, and corporate communication.',
        longDescription: 'Specialized course designed for working professionals who need French for business purposes. Learn formal communication, presentation skills, negotiation tactics, and industry-specific vocabulary essential for success in French-speaking business environments.',
        level: 'Intermediate-Advanced',
        duration: '10 weeks',
        price: '₹8,999',
        originalPrice: '₹12,999',
        rating: 4.9,
        students: 456,
        image: '/french-skill.png',
        slug: 'business-french-professionals',
        
        instructor: 'Sophie Laurent',
        instructorImage: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
        instructorBio: 'Business French specialist with MBA from INSEAD. Former corporate trainer for multinational companies with expertise in professional French communication.',
        instructorExperience: '12+ years corporate training',
        instructorSpecialties: ['Business French', 'Corporate Communication', 'Presentation Skills', 'Negotiation'],
        
        lessons: 40,
        certificate: true,
        language: 'French',
        access: 'Lifetime Access',
        
        outcomes: [
          'Master formal business French communication',
          'Deliver confident presentations in French',
          'Write professional emails and reports',
          'Navigate business meetings and negotiations',
          'Understand French business culture and etiquette',
          'Build industry-specific vocabulary',
          'Network effectively in French-speaking markets'
        ],
        
        companies: ['Société Générale', 'BNP Paribas', 'Michelin', 'Schneider Electric', 'Safran'],
        
        tools: [
          'Business French Dictionary',
          'Email Templates Library',
          'Presentation Builder',
          'Meeting Simulator',
          'Industry Vocabulary Cards',
          'Cultural Etiquette Guide'
        ]
      },

      {
        // Fourth Course - French Literature & Culture
        title: 'French Literature & Cultural Immersion',
        description: 'Explore French literary masterpieces and dive deep into Francophone culture and history.',
        longDescription: 'An advanced course for literature enthusiasts and cultural explorers. Study classic and contemporary French literature, understand historical contexts, and develop deep cultural appreciation. Perfect for students planning to study in France or pursue French studies academically.',
        level: 'Advanced',
        duration: '16 weeks',
        price: '₹7,999',
        originalPrice: '₹11,999',
        rating: 4.8,
        students: 234,
        image: '/french-skill.png',
        slug: 'french-literature-culture',
        
        instructor: 'Dr. Isabelle Moreau',
        instructorImage: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
        instructorBio: 'PhD in French Literature from Sorbonne University. Published author and literary critic with specialization in 19th and 20th century French literature.',
        instructorExperience: '15+ years academic experience',
        instructorSpecialties: ['French Literature', 'Cultural Studies', 'Literary Analysis', 'French History'],
        
        lessons: 64,
        certificate: true,
        language: 'French',
        access: 'Lifetime Access',
        
        outcomes: [
          'Analyze French literary masterpieces',
          'Understand French cultural evolution',
          'Master advanced French writing styles',
          'Develop critical thinking in French',
          'Appreciate Francophone cultures worldwide',
          'Prepare for French university studies',
          'Gain deep cultural insights'
        ],
        
        companies: ['UNESCO', 'TV5Monde', 'Institut Français', 'Alliance Française', 'Gallimard'],
        
        tools: [
          'Digital French Library',
          'Literary Analysis Software',
          'Historical Timeline Tool',
          'Cultural Context Database',
          'Essay Writing Assistant',
          'Poetry Analysis Guide'
        ]
      }
    ];

    for (const courseData of courses) {
      await prisma.course.create({
        data: courseData
      });
    }
    
    console.log('4 comprehensive French courses created with all data fields');
  }

  // Add some sample blog posts
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: 'Why Learn French in 2025?',
          content: 'French is one of the most widely spoken languages in the world and offers numerous benefits...',
          slug: 'why-learn-french-in-2025',
          image: '/french-skill.png',
          excerpt: 'Discover the benefits of learning French in today\'s global world.',
        },
        {
          title: 'Top 10 French Learning Tips',
          content: 'Learning a new language can be challenging, but with these tips, you can master French faster...',
          slug: 'top-10-french-learning-tips',
          image: '/french-skill.png',
          excerpt: 'Accelerate your French language learning with these proven strategies.',
        },
      ],
    });
    console.log('Sample blog posts created');
  }

  // Add some sample testimonials
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: 'Sophie Martin',
          role: 'Student',
          message: 'The French speaking course has transformed my language abilities. I can now confidently speak French in everyday situations!',
          rating: 5,
          avatar: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
        },
        {
          name: 'James Wilson',
          role: 'Business Professional',
          message: 'I needed to learn French for business, and this course exceeded my expectations. The instructors are fantastic!',
          rating: 4,
          avatar: '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
        },
      ],
    });
    console.log('Sample testimonials created');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
