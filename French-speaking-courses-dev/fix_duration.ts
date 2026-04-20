const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany();
  let updatedCount = 0;

  for (const course of courses) {
    if (course.duration && course.duration.toLowerCase().includes('month')) {
      const newDuration = course.duration.replace(/month(s)?/i, 'hours');
      await prisma.course.update({
        where: { id: course.id },
        data: { duration: newDuration },
      });
      updatedCount++;
      console.log(`Updated course ${course.id}: ${course.duration} -> ${newDuration}`);
    }
  }

  console.log(`Updated ${updatedCount} courses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
