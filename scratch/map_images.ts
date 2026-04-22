import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const files = fs.readdirSync(uploadsDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|jfif|PNG|JPG)$/i.test(file));
  
  console.log(`Found ${files.length} images in public/uploads`);

  const courses = await prisma.course.findMany();
  console.log(`Found ${courses.length} courses in database`);

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    // Map sequentially if possible, otherwise wrap around
    const imageFile = files[i % files.length];
    const imagePath = `/api/uploads/${imageFile}`;

    await prisma.course.update({
      where: { id: course.id },
      data: { image: imagePath }
    });
    
    console.log(`Updated Course "${course.title}" with image "${imagePath}"`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
