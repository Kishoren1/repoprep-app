export const SKIP_DIRS = new Set([
  ".git",
  ".svn",
  ".hg",

  ".github",
  ".gitlab",
  ".circleci",
  ".jenkins",
  ".travis",
  ".husky",

  "node_modules",
  ".yarn",
  ".pnp",
  "dist",
  "build",
  "out",
  ".output",

  ".next",
  ".nuxt",
  ".svelte-kit",
  ".astro",
  ".docusaurus",
  ".vite",
  ".parcel-cache",
  ".webpack",
  ".turbo",
  ".angular",
  ".nx",
  ".cache",
  ".expo",
  ".expo-shared",

  "coverage",
  "htmlcov",
  ".nyc_output",
  "__snapshots__",
  "__fixtures__",
  "__mocks__",
  "TestResults",

  "__pycache__",
  ".venv",
  "venv",
  "env",
  ".env",
  ".tox",
  ".eggs",
  ".pytest_cache",
  ".mypy_cache",
  ".ruff_cache",
  ".pytype",
  ".dmypy",
  ".hypothesis",
  ".bundle",
  ".sass-cache",
  "vendor",
  "target",
  ".gradle",
  ".m2",
  "gradle",
  ".metals",
  ".bloop",
  "captures",
  "deriveddata",
  "pods",
  ".build",
  "xcuserdata",
  ".android",
  ".dart_tool",
  ".pub-cache",
  ".pub",

  "bin",
  "obj",
  "packages",
  "publish",
  ".vs",
  "_build",
  "deps",
  ".elixir_ls",

  ".stack-work",
  "dist-newstyle",

  "renv",

  "CMakeFiles",
  "cmake-build-debug",
  "cmake-build-release",
  ".cmake",
  ".terraform",
  ".terragrunt-cache",
  ".idea",
  ".vscode",
  ".fleet",
  ".settings",
  "nbproject",
  ".eclipse",
  "storybook-static",
  "site",
  "tmp",
  "temp",
  "logs",
  "log",
  "generated",
  "gen",
  ".aws",
  ".ssh",
  ".kube",
]);

export const SKIP_DIR_PATHS = new Set([
  "public/build",
  "public/assets",
  "public/packs",
  "vendor/bundle",
  "bootstrap/cache",
  "storage/framework",
  "app/release",
  "docs/build",
]);

export const NOISE_FILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "npm-shrinkwrap.json",
  "composer.lock",
  "Gemfile.lock",
  "gemfile.lock",
  "poetry.lock",
  "Pipfile.lock",
  "pipfile.lock",
  "Cargo.lock",
  "cargo.lock",
  "uv.lock",
  "pdm.lock",
  "pixi.lock",
  "mix.lock",
  "pubspec.lock",
  "Podfile.lock",
  "shard.lock",
  "conan.lock",
  "packages.lock.json",
  "paket.lock",
  "gradle.lockfile",
  "go.sum",
  "flake.lock",

  ".gitignore",
  ".gitattributes",
  ".gitmodules",
  ".gitkeep",
  ".keep",
  ".mailmap",
  ".hgignore",
  ".svnignore",
  "CODEOWNERS",

  ".DS_Store",
  ".ds_store",
  "Thumbs.db",
  "thumbs.db",
  "desktop.ini",
  ".Spotlight-V100",
  ".Trashes",
  ".fseventsd",
  "ehthumbs.db",
  ".eslintcache",
  ".prettiercache",
  ".stylelintcache",
  ".yarnrc",
  ".yarnrc.yml",
  ".npmrc",
  "local.properties",
  ".coverage",
  "coverage.xml",

  "jquery.js",
  "jquery.min.js",
  "bootstrap.js",
  "bootstrap.min.js",
  "bootstrap.min.css",
]);

export const SECRET_FILES = new Set([
  ".netrc",
  "_netrc",
  ".pgpass",
  ".pypirc",
  ".git-credentials",
  ".htpasswd",
  ".dockercfg",
  "secrets.yml",
  "secrets.yaml",
  "secrets.json",
  "credentials.db",
]);

export const SKIP_FILES = new Set([...NOISE_FILES, ...SECRET_FILES]);

export const SKIP_SUFFIXES: readonly string[] = [
  ".min.js",
  ".min.mjs",
  ".min.cjs",
  ".min.css",
  ".bundle.js",
  ".bundle.mjs",
  ".bundle.css",
  ".chunk.js",
  ".chunk.mjs",

  ".js.map",
  ".mjs.map",
  ".cjs.map",
  ".css.map",
  ".ts.map",

  ".pyc",
  ".pyo",
  ".pyd",

  ".pb.go",
  ".pb.swift",
  ".pb.cc",
  ".pb.h",

  ".g.dart",
  ".freezed.dart",
  ".gr.dart",
  ".mock.dart",

  ".generated.ts",
  ".generated.js",
  ".generated.dart",

  ".tfstate.backup",
];

export const CREDENTIAL_EXTS = new Set([
  "pem",
  "key",
  "p12",
  "pfx",
  "p8",
  "cert",
  "crt",
  "cer",
  "der",
  "keystore",
  "jks",
  "mobileprovision",
  "ppk",
  "tfstate",
  "tfvars",
]);

export const BLOCKED_EXTS = new Set([
  ...CREDENTIAL_EXTS,

  "exe",
  "dll",
  "so",
  "dylib",
  "bin",
  "dmg",
  "iso",
  "o",
  "a",
  "lib",
  "obj",
  "class",
  "jar",
  "war",
  "ear",
  "apk",
  "aab",
  "aar",
  "ipa",
  "dex",
  "wasm",
  "nib",
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "flv",
  "wmv",
  "m4v",
  "3gp",
  "mp3",
  "wav",
  "flac",
  "ogg",
  "aac",
  "m4a",
  "opus",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "avif",
  "heic",
  "heif",
  "ico",
  "bmp",
  "tiff",
  "tif",
  "psd",
  "ai",
  "eps",
  "svg",
  "fig",
  "sketch",
  "ttf",
  "otf",
  "woff",
  "woff2",
  "eot",
  "tar",
  "gz",
  "tgz",
  "bz2",
  "xz",
  "rar",
  "7z",
  "zst",
  "cab",
  "map",
  "sql",
  "sqlite",
  "sqlite3",
  "db",
  "mdb",
  "accdb",
  "pkl",
  "pickle",
  "npy",
  "npz",
  "pt",
  "pth",
  "onnx",
  "tflite",
  "mlmodel",
  "mlpackage",
  "safetensors",
  "ckpt",
  "h5",
  "hdf5",
  "parquet",
  "avro",
  "orc",
  "feather",
  "pptx",
  "pbxproj",
  "xcscheme",
  "pb",
  "bak",
  "orig",
  "swp",
  "swo",
  "tmp",
]);

export const PARSED_EXTS = new Set(["pdf", "docx", "xlsx", "zip"]);

export function getExt(name: string): string {
  const lower = name.toLowerCase();
  const parts = lower.split(".");
  if (parts.length === 1) return lower;
  if (parts[0] === "" && parts.length === 2) return parts[1];
  return parts[parts.length - 1];
}

/**
 * Cheap, name-only check for whether a directory is obviously noise
 * (node_modules, .git, dist, build output, caches, IDE folders, etc.).
 * Used to prune traversal *before* descending into a folder — unlike
 * shouldSkipPath, which needs a full path and is used to classify files
 * that have already been read. Doesn't cover SKIP_DIR_PATHS (path-pair
 * rules like "public/build"), since those need surrounding context that
 * isn't available from a bare directory name during traversal — those
 * still get caught by the normal post-read filtering pass.
 */
export function shouldSkipDirName(name: string): boolean {
  const lower = name.toLowerCase();
  if (SKIP_DIRS.has(lower)) return true;
  if (lower.endsWith(".egg-info")) return true;
  if (lower.endsWith(".dist-info")) return true;
  if (lower.endsWith(".xcworkspace")) return true;
  if (lower.endsWith(".xcodeproj")) return true;
  return false;
}

export function shouldSkipPath(filePath: string): boolean {
  const segments = filePath.replace(/\\/g, "/").split("/").filter(Boolean);

  for (let i = 0; i < segments.length; i++) {
    const lower = segments[i].toLowerCase();
    if (shouldSkipDirName(segments[i])) return true;

    if (i < segments.length - 1) {
      const pair = `${lower}/${segments[i + 1].toLowerCase()}`;
      if (SKIP_DIR_PATHS.has(pair)) return true;
    }
  }

  return false;
}

function isSshKeyName(lower: string): boolean {
  const isKeyLike =
    lower.includes("id_rsa") ||
    lower.includes("id_ed25519") ||
    lower.includes("id_dsa") ||
    lower.includes("id_ecdsa");
  return isKeyLike && !lower.endsWith(".pub");
}

function looksLikeServiceAccountKey(lower: string): boolean {
  return (
    (lower.includes("serviceaccount") ||
      lower.includes("service-account") ||
      lower.includes("service_account")) &&
    lower.endsWith(".json")
  );
}

export function shouldSkipFile(name: string): boolean {
  const lower = name.toLowerCase();

  if (SKIP_FILES.has(name) || SKIP_FILES.has(lower)) return true;
  if (SKIP_SUFFIXES.some((s) => lower.endsWith(s))) return true;

  const ext = getExt(name);
  if (BLOCKED_EXTS.has(ext)) return true;

  if (lower === ".env" || lower.startsWith(".env.")) return true;
  if (isSshKeyName(lower)) return true;
  if (looksLikeServiceAccountKey(lower)) return true;

  return false;
}

export type SkipReason = "directory" | "secret" | "blocked-ext" | null;

export function getSkipReason(name: string, fullPath: string): SkipReason {
  if (shouldSkipPath(fullPath)) return "directory";

  const lower = name.toLowerCase();
  const ext = getExt(name);

  const isSecret =
    SECRET_FILES.has(name) ||
    SECRET_FILES.has(lower) ||
    lower === ".env" ||
    lower.startsWith(".env.") ||
    isSshKeyName(lower) ||
    looksLikeServiceAccountKey(lower) ||
    CREDENTIAL_EXTS.has(ext);
  if (isSecret) return "secret";

  if (shouldSkipFile(name)) return "blocked-ext";

  return null;
}

export function isLikelyBinary(content: string): boolean {
  const sample = content.slice(0, 8_000);
  let nonPrintable = 0;
  for (let i = 0; i < sample.length; i++) {
    const code = sample.charCodeAt(i);
    if (code === 0) return true;
    if (code < 9 || (code > 13 && code < 32)) nonPrintable++;
  }
  return sample.length > 0 && nonPrintable / sample.length > 0.1;
}
