import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const columns = await prisma.$queryRawUnsafe(`SELECT column_name FROM information_schema.columns WHERE table_name='CityPage' ORDER BY ordinal_position;`);
  console.log(columns);
}

main().catch((e) => { console.error(e); process.exit(1);} ).finally(async () => { await prisma.$disconnect(); });
