
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const indiaPage = await prisma.cityPage.findFirst({
    where: {
      OR: [
        { slug: 'french-classes-in-india' },
        { cityName: { contains: 'India' } }
      ]
    },
    select: {
      headerImage: true
    }
  });
  console.log('India Page Header Image:', indiaPage?.headerImage);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
