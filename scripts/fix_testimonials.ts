import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const VALID_IMAGES = [
  '/e163afd8-79b3-4bbb-afea-4c1523b19a79.jpeg',
  '/f318e821-f6a4-4f6e-accc-b2c75eca5911.jpeg',
  '/0eb126a0-a94c-4b3f-8c54-214c0ceed189.jpg',
  '/cb6d96b3-d5c3-4d34-a7b9-11d78ae21965.jpg',
  '/47ad1c4e-2959-484b-83d5-0cdfd46d4a81.jpeg'
];

async function main() {
  const testimonials = await prisma.testimonial.findMany();
  
  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    const newAvatar = VALID_IMAGES[i % VALID_IMAGES.length];
    
    await prisma.testimonial.update({
      where: { id: testimonial.id },
      data: { avatar: newAvatar }
    });
    
    console.log(`Updated testimonial for ${testimonial?.name} with avatar: ${newAvatar}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
