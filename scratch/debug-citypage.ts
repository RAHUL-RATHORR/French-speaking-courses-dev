import { prisma } from '../src/lib/db/prisma';
async function main() {
  try {
    console.log('Checking prisma.cityPage...');
    const cityPageModel = (prisma as any).cityPage;
    if (!cityPageModel) {
      console.log('❌ prisma.cityPage is UNDEFINED on the prisma object');
      console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_')));
      return;
    }
    const count = await cityPageModel.count();
    console.log('✅ prisma.cityPage is WORKING. Count:', count);
  } catch (e) {
    console.error('❌ Error accessing cityPage:', e);
  } finally {
    process.exit();
  }
}
main();
