import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.cityPage.findMany({
    select: { slug: true, cityName: true, isActive: true },
    orderBy: { cityName: 'asc' },
  });
  console.log(JSON.stringify(pages, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
