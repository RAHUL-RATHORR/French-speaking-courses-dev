import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseSlug = searchParams.get('course');
  
  try {
    let brochureUrl = '/french-course-brochure.pdf'; // Default fallback
    let filename = 'French-Course-Brochure.pdf';

    // If course slug is provided, try to get course-specific brochure
    if (courseSlug && courseSlug !== 'general') {
      const course = await prisma.course.findUnique({
        where: { slug: courseSlug },
        select: { brochureUrl: true, title: true }
      });

      if (course?.brochureUrl) {
        brochureUrl = course.brochureUrl;
        filename = `${course.title.replace(/[^a-zA-Z0-9]/g, '-')}-Brochure.pdf`;
      }
    }

    // Check if the file exists in the public directory
    const filePath = join(process.cwd(), 'public', brochureUrl.replace('/', ''));
    
    try {
      const fileBuffer = await readFile(filePath);
      
      // Return the file directly
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
    } catch {
      // If file doesn't exist, redirect to default brochure
      console.warn(`Brochure file not found: ${filePath}, using default`);
      const defaultBrochureUrl = new URL('/french-course-brochure.pdf', request.url);
      
      return new NextResponse(null, {
        status: 302,
        headers: {
          'Location': defaultBrochureUrl.toString(),
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }
  } catch (error) {
    console.error('Error serving brochure:', error);
    return new NextResponse('Brochure not found', { status: 404 });
  }
}
