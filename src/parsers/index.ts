import { parseText } from "./textParser";
import { parsePdf } from "./pdfParser";
import { parseDocx } from "./docxParser";
import { parseXlsx } from "./xlsxParser";

const TEXT_EXTS = new Set([
  // JavaScript / TypeScript
  "js",
  "jsx",
  "ts",
  "tsx",
  "mjs",
  "cjs",
  // Python / Ruby / Go / Java / Rust / etc.
  "py",
  "rb",
  "go",
  "java",
  "rs",
  "php",
  "cs",
  "cpp",
  "c",
  "h",
  "swift",
  "kt",
  "scala",
  "r",
  "lua",
  // Web
  "html",
  "css",
  "scss",
  "sass",
  "less",
  "svelte",
  "vue",
  // Data / Config
  "json",
  "yaml",
  "yml",
  "toml",
  "ini",
  "cfg",
  "xml",
  "graphql",
  "gql",
  "prisma",
  "sql",
  "env",
  // Docs
  "md",
  "mdx",
  "txt",
  "rst",
  "tex",
  // Shell
  "sh",
  "bash",
  "zsh",
  "fish",
  "ps1",
  // Misc dotfiles (matched by name, not ext — handled below)
  "gitignore",
  "gitattributes",
  "editorconfig",
  "prettierrc",
  "eslintrc",
  "babelrc",
  "dockerfile",
  "makefile",
]);

const PDF_EXTS = new Set(["pdf"]);
const DOCX_EXTS = new Set(["docx"]);
const XLSX_EXTS = new Set(["xlsx", "xls"]);

const DOTFILE_NAMES = new Set([
  ".gitignore",
  ".gitattributes",
  ".editorconfig",
  ".prettierrc",
  ".eslintrc",
  ".babelrc",
  ".env",
  ".env.local",
  ".env.example",
  "dockerfile",
  "makefile",
  "procfile",
  "gemfile",
  "rakefile",
  "brewfile",
]);

export interface ParseResult {
  path: string;
  content: string;
  error: boolean;
}

function isLikelyBinary(content: string): boolean {
  const sample = content.slice(0, 8_000);
  let nonPrintable = 0;
  for (let i = 0; i < sample.length; i++) {
    const code = sample.charCodeAt(i);
    if (code === 0) return true;
    if (code < 9 || (code > 13 && code < 32)) nonPrintable++;
  }
  return sample.length > 0 && nonPrintable / sample.length > 0.1;
}

export async function parseFile(
  file: File,
  relativePath: string,
): Promise<ParseResult> {
  const name = file.name.toLowerCase();
  const ext = name.includes(".") ? name.split(".").pop()! : "";

  try {
    let content = "";

    if (DOTFILE_NAMES.has(name) || TEXT_EXTS.has(ext)) {
      content = await parseText(file);
    } else if (PDF_EXTS.has(ext)) {
      content = await parsePdf(file);
    } else if (DOCX_EXTS.has(ext)) {
      content = await parseDocx(file);
    } else if (XLSX_EXTS.has(ext)) {
      content = await parseXlsx(file);
    } else {
      // Unrecognized extension — attempt a text read, but verify it's
      // actually text before accepting it, rather than trusting any
      // extension we don't recognize.
      try {
        const text = await parseText(file);
        content = isLikelyBinary(text)
          ? "[Binary file — content not extracted]"
          : text;
      } catch {
        content = "[Binary or unsupported file — content not extracted]";
      }
    }

    const MAX_CHARS = 100_000;
    if (content.length > MAX_CHARS) {
      content =
        content.slice(0, MAX_CHARS) +
        `\n\n[... truncated — file exceeded ${MAX_CHARS.toLocaleString("en-US")} characters ...]`;
    }

    return { path: relativePath, content, error: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      path: relativePath,
      content: `[Failed to parse: ${message}]`,
      error: true,
    };
  }
}

export interface BatchParseResult {
  results: ParseResult[];
  failed: number;
  total: number;
}

export async function parseFiles(
  files: Array<{ raw: File; path: string }>,
  onProgress?: (done: number, total: number) => void,
): Promise<BatchParseResult> {
  const results: ParseResult[] = [];
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const { raw, path } = files[i];
    const result = await parseFile(raw, path);
    results.push(result);
    if (result.error) failed++;
    onProgress?.(i + 1, files.length);
  }

  return { results, failed, total: files.length };
}
