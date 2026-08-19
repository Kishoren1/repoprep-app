import { buildDirectoryTree } from "./treeBuilder";
import { estimateTokens, formatTokenCount } from "./tokenEstimator";
import type { ParseResult } from "./parsers/index";

export interface ContextOutput {
  text: string;
  tokens: number;
  fileCount: number;
  charCount: number;
  tree: string;
  skippedCount: number;
  sourceName?: string;
}

const SEP_STRUCTURE = "===== PROJECT STRUCTURE =====";
const SEP_CONTENTS = "===== FILE CONTENTS =====";
const SEP_SUMMARY = "===== SUMMARY =====";

const EXT_LANG: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  // Python
  py: "python",
  // Web
  html: "html",
  css: "css",
  scss: "scss",
  sass: "scss",
  less: "css",
  svelte: "svelte",
  vue: "vue",
  // Data / Config
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  xml: "xml",
  graphql: "graphql",
  gql: "graphql",
  sql: "sql",
  env: "env",
  // Docs
  md: "markdown",
  mdx: "markdown",
  txt: "text",
  rst: "text",
  // Shell
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  fish: "fish",
  ps1: "powershell",
  // Systems languages
  rs: "rust",
  go: "go",
  c: "c",
  cpp: "cpp",
  h: "c",
  java: "java",
  kt: "kotlin",
  swift: "swift",
  cs: "csharp",
  rb: "ruby",
  php: "php",
  lua: "lua",
  scala: "scala",
  r: "r",

  dockerfile: "dockerfile",
  makefile: "makefile",
  prisma: "prisma",
  tex: "latex",
};

function langTag(path: string): string {
  const name = path.split("/").pop()?.toLowerCase() ?? "";

  if (name === "dockerfile" || name.startsWith("dockerfile."))
    return " [dockerfile]";
  if (name === "makefile") return " [makefile]";
  if (name.startsWith(".env")) return " [env]";

  const ext = name.includes(".") ? name.split(".").pop()! : "";
  const lang = EXT_LANG[ext];
  return lang ? ` [${lang}]` : "";
}

function fileHeader(path: string): string {
  return `\n--- ${path}${langTag(path)} ---`;
}

export function buildContext(
  results: ParseResult[],
  sourceName?: string,
): ContextOutput {
  const successful = results.filter(
    (r) => !r.error && r.content.trim().length > 0,
  );
  const failed = results.filter((r) => r.error);
  const paths = results.map((r) => r.path);

  const tree = buildDirectoryTree(paths);

  const contentLines: string[] = [];
  for (const result of successful) {
    contentLines.push(fileHeader(result.path));
    contentLines.push(result.content.trimEnd());
  }

  const failedNote =
    failed.length > 0
      ? `\n\n[Note: ${failed.length} file${failed.length > 1 ? "s" : ""} could not be parsed: ${failed.map((f) => f.path).join(", ")}]`
      : "";

  const body = [
    SEP_STRUCTURE,
    "",
    tree,
    "",
    SEP_CONTENTS,
    contentLines.join("\n"),
    failedNote,
  ].join("\n");

  const tokens = estimateTokens(body);
  const charCount = body.length;

  const summaryBlock = [
    "",
    SEP_SUMMARY,
    `Files:   ${successful.length} parsed${failed.length > 0 ? ` (${failed.length} failed)` : ""}`,
    `Tokens:  ${formatTokenCount(tokens)}`,
    `Chars:   ${charCount.toLocaleString("en-US")}`,
    "",
  ].join("\n");

  const fullText = body + summaryBlock;

  return {
    text: fullText,
    tokens: estimateTokens(fullText),
    fileCount: successful.length,
    charCount: fullText.length,
    tree,
    skippedCount: failed.length,
    sourceName,
  };
}
