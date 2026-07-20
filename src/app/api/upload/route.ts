import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
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

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    url !== 'https://placeholder.supabase.co' &&
    key !== 'placeholder'
  );
}

async function uploadToLocal(buffer: Buffer, filename: string): Promise<string> {
  const uploadsDir = join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(join(uploadsDir, filename), buffer);
  return `/uploads/${filename}`;
}

async function uploadToSupabase(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(filename, buffer, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    return { ok: false, message: uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(filename);

  return { ok: true, url: publicUrl };
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/jfif'];
    const allowedDocumentTypes = ['application/pdf'];
    const allowedTypes = [...allowedImageTypes, ...allowedDocumentTypes];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, GIF, WebP images and PDF documents are allowed.',
      }, { status: 400 });
    }

    const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxSizeText = file.type === 'application/pdf' ? '10MB' : '5MB';
      return NextResponse.json({
        error: `File too large. Maximum size is ${maxSizeText}.`,
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mimeExt = extensionFromMime(file.type);
    const nameExt = file.name.includes('.') ? file.name.split('.').pop() : null;
    const safeExt = (mimeExt ?? nameExt ?? 'bin').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
    const filename = `${randomUUID()}.${safeExt}`;

    let url: string;
    let storage: 'supabase' | 'local';

    if (isSupabaseConfigured()) {
      const result = await uploadToSupabase(buffer, filename, file.type);

      if (result.ok) {
        url = result.url;
        storage = 'supabase';
      } else if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase upload failed, saving locally:', result.message);
        url = await uploadToLocal(buffer, filename);
        storage = 'local';
      } else {
        console.error('Supabase upload error:', result.message);
        return NextResponse.json({
          error: 'Failed to upload to cloud storage',
          details: result.message,
        }, { status: 500 });
      }
    } else if (process.env.NODE_ENV === 'development') {
      url = await uploadToLocal(buffer, filename);
      storage = 'local';
    } else {
      return NextResponse.json({
        error: 'Cloud storage is not configured',
        details: 'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY',
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'File uploaded successfully',
      url,
      absoluteUrl: url,
      location: url,
      storage,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
