import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabase } from '@/lib/supabase';

export const dynamic = "force-dynamic";

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
    const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxSizeText = file.type === 'application/pdf' ? '10MB' : '5MB';
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${maxSizeText}.` 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const mimeExt = extensionFromMime(file.type);
    const nameExt = file.name.includes('.') ? file.name.split('.').pop() : null;
    const safeExt = (mimeExt ?? nameExt ?? 'bin').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
    const filename = `${randomUUID()}.${safeExt}`;
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('uploads') // You must create this bucket in Supabase Dashboard and set it to public
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ 
        error: 'Failed to upload to cloud storage',
        details: uploadError.message
      }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filename);
    
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: publicUrl,
      absoluteUrl: publicUrl,
      location: publicUrl
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
