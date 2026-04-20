const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const admins = await prisma.admin.findMany();
    console.log('Current Admins in DB:', admins.map(a => a.username));
    
    const coursesCount = await prisma.course.count();
    console.log('Total Courses in DB:', coursesCount);
  } catch (error) {
    console.error('Error connecting to DB:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
