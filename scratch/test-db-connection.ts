import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Database is CONNECTED successfully!');
    const blogCount = await prisma.blogPost.count();
    const courseCount = await prisma.course.count();
    console.log('Data found:');
    console.log(`- Blogs: ${blogCount}`);
    console.log(`- Courses: ${courseCount}`);
  } catch (e) {
    console.error('❌ Database connection FAILED:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
