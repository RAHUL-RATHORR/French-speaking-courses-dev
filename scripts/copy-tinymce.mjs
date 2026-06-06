import { cpSync, existsSync, rmSync } from "fs";
import { join } from "path";

const src = join("node_modules", "tinymce");
const dest = join("public", "tinymce");

if (!existsSync(src)) {
  console.warn("tinymce not installed, skipping copy");
  process.exit(0);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}

cpSync(src, dest, { recursive: true });
console.log("Copied tinymce to public/tinymce");
