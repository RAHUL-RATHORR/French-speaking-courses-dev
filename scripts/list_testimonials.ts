import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const testimonials = await prisma.testimonial.findMany();
  console.log(JSON.stringify(testimonials, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
