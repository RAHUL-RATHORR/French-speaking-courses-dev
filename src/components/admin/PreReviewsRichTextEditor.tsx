"use client";

import { Editor } from "@tinymce/tinymce-react";
import {
  blogEditorInit,
  tinymceEditorProps,
  uploadEditorImage,
} from "./tinymceConfig";

interface PreReviewsRichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  editorKey?: string;
}

export default function PreReviewsRichTextEditor({
  value,
  onChange,
  editorKey = "pre-reviews",
}: PreReviewsRichTextEditorProps) {
  return (
    <div className="rounded-md border border-indigo-200 bg-white overflow-hidden">
      <Editor
        key={editorKey}
        {...tinymceEditorProps}
        value={value}
        onEditorChange={onChange}
        init={{
          ...blogEditorInit,
          images_upload_handler: uploadEditorImage,
        }}
      />
    </div>
  );
}
