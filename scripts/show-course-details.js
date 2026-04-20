const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function showCourseDetails() {
  try {
    const course = await prisma.course.findFirst({
      where: { slug: 'french-for-beginners-complete' }
    });
    
    if (course) {
      console.log('='.repeat(80));
      console.log('SAMPLE COURSE DETAILS - French for Beginners Complete');
      console.log('='.repeat(80));
      console.log(`Title: ${course.title}`);
      console.log(`Instructor: ${course.instructor}`);
      console.log(`Duration: ${course.duration}`);
      console.log(`Price: ${course.price} (Original: ${course.originalPrice})`);
      console.log(`Rating: ${course.rating}/5 (${course.students} students)`);
      console.log(`Lessons: ${course.lessons}`);
      console.log(`Certificate: ${course.certificate ? 'Yes' : 'No'}`);
      console.log(`Access: ${course.access}`);
      console.log(`\nInstructor Bio: ${course.instructorBio?.substring(0, 100)}...`);
      console.log(`\nLearning Outcomes: ${course.outcomes?.length || 0} outcomes defined`);
      console.log(`Companies: ${course.companies?.join(', ')}`);
      console.log(`\nDynamic Sections Available:`);
      console.log(`- Hero Banner: ${course.heroBannerSection ? '✓' : '✗'}`);
      console.log(`- Overview: ${course.overviewSection ? '✓' : '✗'}`);
      console.log(`- Why Enroll: ${course.whyEnrollSection ? '✓' : '✗'}`);
      console.log(`- Curriculum: ${course.curriculumSection ? '✓' : '✗'}`);
      console.log(`- Fees: ${course.feesSection ? '✓' : '✗'}`);
      console.log(`\nLegacy Data for Compatibility:`);
      console.log(`- Modules: ${course.modules?.length || 0} modules`);
      console.log(`- Features: ${course.features?.length || 0} features`);
      console.log(`- FAQ: ${course.faq?.length || 0} questions`);
      console.log(`- Testimonials: ${course.testimonials?.length || 0} testimonials`);
      console.log(`- Tools: ${course.tools?.length || 0} tools`);
      console.log(`- Projects: ${course.projects?.length || 0} projects`);
      
      if (course.heroBannerSection) {
        const hero = course.heroBannerSection;
        console.log(`\nHero Banner Details:`);
        console.log(`- Headline: ${hero.headline}`);
        console.log(`- Subheadline: ${hero.subheadline}`);
        console.log(`- Primary CTA: ${hero.ctaButtons?.primary?.buttonText}`);
        console.log(`- Next Batch: ${hero.nextBatchDate}`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showCourseDetails();
