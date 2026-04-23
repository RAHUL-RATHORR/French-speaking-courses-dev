"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
  className?: string;
}

export default function ImageUpload({ 
  onImageUploaded, 
  currentImage, 
  label = "Upload Image",
  className = ""
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Upload failed (${response.status})`;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.details 
            ? `${errorData.error}: ${errorData.details}` 
            : (errorData.error || errorMessage);
        } else {
          const text = await response.text();
          console.error('Non-JSON error response:', text);
          errorMessage = `Server Error: The upload service returned an invalid response. Please check your server logs.`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      // Store relative URLs (e.g. "/uuid.png") to keep images same-origin and avoid
      // next/image treating them as remote (which can cause https/localhost issues).
      onImageUploaded(result.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      setPreviewUrl(currentImage || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}

      {previewUrl ? (
        <div className="relative inline-block">
          <Image
            src={previewUrl}
            alt="Preview"
            width={120}
            height={120}
            className="rounded-lg object-cover border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            disabled={uploading}
          >
            ×
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            Click to upload an image
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF, WebP up to 5MB
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : previewUrl ? 'Change Image' : 'Upload Image'}
        </button>
        
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={uploading}
            className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remove
          </button>
        )}
      </div>

      {/* Manual URL Input as fallback */}
      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or enter image URL manually
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={previewUrl}
            onChange={(e) => {
              setPreviewUrl(e.target.value);
              onImageUploaded(e.target.value);
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="https://example.com/image.jpg"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl('');
              onImageUploaded('');
            }}
            className="px-3 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
