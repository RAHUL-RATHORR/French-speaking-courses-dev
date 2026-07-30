import cleanWordHTML from "tinymce-word-paste-filter";

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

/** Cleans MS Word / Google Docs HTML on paste (tables, lists, formatting) */
function convertTabSeparatedTextToTable(content: string): string {
  if (
    /<table[\s>]/i.test(content) ||
    !/(?:\t|&nbsp;\s*&nbsp;|\u00a0\s*\u00a0)/i.test(content)
  ) {
    return content;
  }

  const lineBreak = "__TINYMCE_TABLE_LINE_BREAK__";
  const lines = content
    .replace(/<br\s*\/?>/gi, lineBreak)
    .replace(/(<\/(?:p|div|h[1-6])>)/gi, `$1${lineBreak}`)
    .split(lineBreak);
  const output: string[] = [];
  let tableRows: string[][] = [];
  const textSeparator = /\t+|\u00a0(?:\s|\u00a0)+/;
  const htmlSeparator = /\t+|(?:&nbsp;|\u00a0)(?:\s|&nbsp;|\u00a0)+/i;

  const flushTable = () => {
    if (tableRows.length < 2) {
      output.push(...tableRows.map((row) => `<p>${row.join(" ")}</p>`));
    } else {
      const [header, ...body] = tableRows;
      output.push(
        `<table><thead><tr>${header.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>` +
        `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      );
    }
    tableRows = [];
  };

  lines.forEach((lineHtml) => {
    const fragment = document.createElement("div");
    fragment.innerHTML = lineHtml;
    const lineText = fragment.textContent || "";

    if (textSeparator.test(lineText)) {
      const onlyElement = fragment.childElementCount === 1 && fragment.firstElementChild;
      const rowHtml = onlyElement ? onlyElement.innerHTML : fragment.innerHTML;
      tableRows.push(
        rowHtml
          .split(htmlSeparator)
          .map((cell) => cell.trim())
          .filter(Boolean)
      );
      return;
    }

    flushTable();
    if (lineText.trim()) {
      output.push(fragment.innerHTML);
    }
  });
  flushTable();

  return output.join("");
}

export function pastePreProcess(
  _editor: unknown,
  args: { content: string }
): void {
  args.content = convertTabSeparatedTextToTable(cleanWordHTML(args.content));
}

/** Preserve table structure and inline styles when pasting from Word */
export const pasteFromWordOptions = {
  paste_webkit_styles: "all" as const,
  paste_remove_styles_if_webkit: false,
  paste_convert_word_fake_lists: true,
  paste_enable_default_filters: true,
  paste_preprocess: pastePreProcess,
  extended_valid_elements:
    "table[style|border|cellpadding|cellspacing|width|class]," +
    "tr[style|class],td[style|colspan|rowspan|width|height|class]," +
    "th[style|colspan|rowspan|width|height|class],thead,tfoot,tbody,caption,col,colgroup",
};

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
  ...pasteFromWordOptions,
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
  ...pasteFromWordOptions,
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
