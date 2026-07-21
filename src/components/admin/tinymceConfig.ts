export const TINYMCE_SCRIPT_SRC = "/tinymce/tinymce.min.js";
export const TINYMCE_LICENSE_KEY = "gpl";

/** Self-hosted TinyMCE — free, no API key, no monthly limit */
export const tinymceSelfHostedInit = {
  base_url: "/tinymce",
  suffix: ".min",
  promotion: false,
  branding: false,
};

export const tinymceEditorProps = {
  tinymceScriptSrc: TINYMCE_SCRIPT_SRC,
  licenseKey: TINYMCE_LICENSE_KEY,
};

const linkTargetOptions = {
  default_link_target: "_blank",
  link_default_target: "_blank",
  link_default_rel: "noopener noreferrer",
  link_assume_external_targets: "https" as const,
  target_list: [
    { title: "New window", value: "_blank" },
    { title: "Same window", value: "_self" },
  ],
};

const contentStyle = [
  "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; }",
  "table { border-collapse: collapse; width: 100%; margin: 1em 0; }",
  "th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; vertical-align: top; }",
  "th { background-color: #f9fafb; font-weight: 600; }",
].join(" ");

/** Full multi-row toolbar — similar to CKEditor Full on Fluent AUF */
export const blogEditorPlugins = [
  "accordion",
  "advlist",
  "anchor",
  "autolink",
  "charmap",
  "code",
  "codesample",
  "directionality",
  "emoticons",
  "fullscreen",
  "help",
  "image",
  "insertdatetime",
  "link",
  "lists",
  "media",
  "nonbreaking",
  "pagebreak",
  "preview",
  "quickbars",
  "searchreplace",
  "table",
  "visualblocks",
  "visualchars",
  "wordcount",
];

export const blogEditorToolbar = [
  "undo redo | cut copy paste pastetext | searchreplace | preview code | fullscreen",
  "blocks fontfamily fontsize | bold italic underline strikethrough subscript superscript | forecolor backcolor removeformat",
  "alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | blockquote accordion",
  "link unlink anchor | image media table hr charmap emoticons pagebreak codesample insertdatetime nonbreaking",
  "ltr rtl | visualblocks visualchars | help wordcount",
];

export const blogEditorInit = {
  ...tinymceSelfHostedInit,
  ...linkTargetOptions,
  height: 550,
  min_height: 400,
  resize: true,
  menubar: "file edit view insert format tools table help",
  plugins: blogEditorPlugins,
  toolbar: blogEditorToolbar,
  toolbar_mode: "wrap" as const,
  table_toolbar:
    "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
  quickbars_selection_toolbar:
    "bold italic underline | blocks | bullist numlist | quicklink blockquote",
  quickbars_insert_toolbar: "image media table hr",
  content_style: contentStyle,
  paste_data_images: true,
  file_picker_types: "image media",
  automatic_uploads: true,
  block_formats:
    "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre",
  font_family_formats:
    "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino,serif; Helvetica=helvetica,arial,sans-serif; Times New Roman=times new roman,times,serif; Verdana=verdana,geneva,sans-serif",
  font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
};

export async function uploadEditorImage(
  blobInfo: { blob: () => Blob; filename: () => string }
): Promise<string> {
  const body = new FormData();
  body.append("file", blobInfo.blob(), blobInfo.filename());

  const response = await fetch("/api/upload", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.url;
}

export const faqEditorInit = {
  ...tinymceSelfHostedInit,
  ...linkTargetOptions,
  height: 220,
  menubar: "edit insert format tools",
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "charmap",
    "searchreplace",
    "code",
    "table",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | bold italic underline | bullist numlist | link table | removeformat",
  content_style: contentStyle,
  paste_data_images: true,
  automatic_uploads: true,
};
