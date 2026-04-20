import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const blogs = await prisma.blogPost.findMany({select: {slug: true}});
  console.log(blogs);
}
main();
