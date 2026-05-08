import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to database');
    const admins = await prisma.admin.findMany();
    console.log('Admins in DB:', admins);
    console.log('Env variables:');
    console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME);
    console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
