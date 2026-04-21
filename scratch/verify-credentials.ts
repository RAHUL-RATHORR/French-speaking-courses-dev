import { PrismaClient } from '@prisma/client';

async function testConnection(url: string, label: string) {
  console.log(`Testing ${label}...`);
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });

  try {
    await prisma.$connect();
    console.log(`✅ ${label} SUCCESS!`);
    await prisma.$disconnect();
    return true;
  } catch (error: any) {
    console.error(`❌ ${label} FAILED:`, error.message);
    await prisma.$disconnect();
    return false;
  }
}

async function run() {
  const dbUrl = "postgresql://postgres.tngxhsrytkeatuefwpgp:v84sjwbmIiP2j1fu@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const directUrl = "postgresql://postgres.tngxhsrytkeatuefwpgp:v84sjwbmIiP2j1fu@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

  const dbOk = await testConnection(dbUrl, "DATABASE_URL (Pooled)");
  const directOk = await testConnection(directUrl, "DIRECT_URL (Direct)");

  if (!dbOk && !directOk) {
    console.log("\n⚠️ BOTH connections failed. Please check your password and project reference.");
  } else if (!dbOk && directOk) {
    console.log("\n⚠️ Only pooled connection failed. This usually means the username format for PgBouncer is wrong.");
  } else {
    console.log("\n🚀 Configuration looks good!");
  }
}

run();
