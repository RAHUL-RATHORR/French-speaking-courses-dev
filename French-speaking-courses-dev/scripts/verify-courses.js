const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        level: true,
        price: true,
        rating: true,
        students: true,
        instructor: true,
        slug: true
      }
    });
    
    console.log(`Found ${courses.length} courses in the database:`);
    console.log('='.repeat(60));
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   Level: ${course.level}`);
      console.log(`   Price: ${course.price}`);
      console.log(`   Rating: ${course.rating}`);
      console.log(`   Students: ${course.students}`);
      console.log(`   Instructor: ${course.instructor}`);
      console.log(`   Slug: ${course.slug}`);
      console.log('-'.repeat(40));
    });
    
  } catch (error) {
    console.error('Error fetching courses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyCourses();
