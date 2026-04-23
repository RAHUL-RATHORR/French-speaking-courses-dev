import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export const dynamic = "force-dynamic";

function getPublicOrigin(request: NextRequest): string {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost ?? request.headers.get('host');
  const proto = forwardedProto ?? request.nextUrl.protocol.replace(':', '');
  if (host) return `${proto}://${host}`;
  return request.nextUrl.origin;
}

function extensionFromMime(mime: string): string | null {
  switch (mime) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpeg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    case 'application/pdf':
      return 'pdf';
    default:
      return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('Received file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/jfif'];
    const allowedDocumentTypes = ['application/pdf'];
    const allowedTypes = [...allowedImageTypes, ...allowedDocumentTypes];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, GIF, WebP images and PDF documents are allowed.' 
      }, { status: 400 });
    }

    // Validate file size (max 10MB for PDFs, 5MB for images)
    const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for PDF, 5MB for images
    if (file.size > maxSize) {
      const maxSizeText = file.type === 'application/pdf' ? '10MB' : '5MB';
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${maxSizeText}.` 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename (prefer MIME-derived extension)
    const mimeExt = extensionFromMime(file.type);
    const nameExt = file.name.includes('.') ? file.name.split('.').pop() : null;
    const safeExt = (mimeExt ?? nameExt ?? 'bin').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
    const filename = `${randomUUID()}.${safeExt}`;
    
    // Save to public/uploads directory
    const cwd = process.cwd();
    const uploadDir = join(cwd, 'public', 'uploads');
    console.log(`Current working directory: ${cwd}`);
    console.log(`Target upload directory: ${uploadDir}`);
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (dirError) {
      console.error('Error creating upload directory:', dirError);
      // Continue anyway, it might already exist or be a permission issue we'll catch later
    }

    const path = join(uploadDir, filename);
    console.log(`Uploading file to: ${path}`);
    
    await writeFile(path, buffer);

    // Return an API-backed URL (works even if a reverse proxy isn't serving the public folder)
    const fileUrl = `/api/uploads/${filename}`;
    const absoluteUrl = `${getPublicOrigin(request)}${fileUrl}`;
    
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: fileUrl,
      absoluteUrl
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
