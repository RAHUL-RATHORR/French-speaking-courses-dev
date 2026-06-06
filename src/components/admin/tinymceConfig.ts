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
