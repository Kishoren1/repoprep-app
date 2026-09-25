# repoprep-app

The exact file-parsing, filtering, and AI-context-building logic that runs
client-side on **[repoprep.com](https://www.repoprep.com)** — published so
you don't have to take our word for the privacy claim.

Repoprep converts a project folder, ZIP, or file collection into a single
structured text file ready to paste into Claude, ChatGPT, Gemini, Cursor, or
any other AI tool. The core promise is that **nothing ever leaves your
browser** — no upload, no server, no telemetry. This package is that promise,
made checkable: it's the same code, with the same behavior, that ships in the
production app.

## What's in here

| Module | What it does |
| --- | --- |
| `parsers/` | Extracts text from `.docx`, `.pdf`, `.xlsx`, and plain-text/code files |
| `fileFilters` | Classifies a path/filename as noise (`node_modules`, lockfiles, build output), a secret (`.env`, SSH keys, cloud credentials), a blocked binary extension, or none of the above |
| `treeBuilder` | Builds the project directory tree shown in the output |
| `contextBuilder` | Assembles the final structured context file (tree + file contents + summary) |
| `tokenEstimator` | Estimates token count and checks it against common model context windows |

Every function here is a pure, synchronous-or-async transform: file(s) in,
text out. Nothing in this package makes a network request.

Note that `parseFile`/`parseFiles` don't call `fileFilters` internally —
filtering is meant to happen *before* a file reaches the parser, the same way
the production app does it (deciding what to read is a separate step from
reading it). `fileFilters` is exported so you can wire that decision in
yourself, and so anyone checking the "secrets get blocked automatically"
claim can see exactly what that check does.

## What's *not* in here

This repo is the processing engine only. It does not include repoprep.com's
UI, pricing/plan limits, license verification, or repo-fetching logic (i.e.
talking to the GitHub/GitLab APIs) — those stay in the private app repo,
since they're product and business logic rather than the privacy-relevant
part. If you're evaluating the "your code never leaves the browser" or
"secrets get filtered automatically" claims specifically, this package is the
part that matters for both.

## Install

```bash
npm install repoprep-app
```

or directly from GitHub without publishing to npm:

```bash
npm install github:Kishoren1/repoprep-app
```

## Usage

```ts
import { parseFiles, buildContext, getSkipReason } from "repoprep-app";

// Filter first — parseFile assumes it's already been given files worth reading.
const filtered = files.filter(
  (f) => getSkipReason(f.raw.name, f.path) === null,
);

// files: Array<{ raw: File; path: string }>
const { results } = await parseFiles(filtered, (done, total) => {
  console.log(`Parsed ${done}/${total}`);
});

const output = buildContext(results);

console.log(output.text);   // the full structured context, ready to paste
console.log(output.tokens); // estimated token count
console.log(output.tree);   // just the directory tree
```

### Individual pieces

```ts
import {
  parseFile,
  buildDirectoryTree,
  estimateTokens,
  formatTokenCount,
  getTokenStatus,
  getModelCompatibility,
  getSkipReason,
  shouldSkipDirName,
  shouldSkipPath,
  shouldSkipFile,
  isLikelyBinary,
} from "repoprep-app";
```

`getSkipReason(name, fullPath)` returns `"directory" | "secret" |
"blocked-ext" | null` — use it to decide whether a file should be included at
all before you ever hand it to `parseFile`. `shouldSkipDirName(name)` is the
cheaper, name-only check meant for pruning a directory *before* descending
into it during traversal (so a huge `node_modules` folder is never even
walked, not just filtered out after the fact).

## A note on the PDF parser

`parsePdf` dynamically imports [`pdfjs-dist`](https://github.com/mozilla/pdf.js).
If you're bundling this for a Node.js environment (rather than a browser),
you'll likely need to alias or stub the `canvas` optional dependency the way
the production app does — see `src/canvas-stub.js` for reference. In a
browser bundle (Vite, Webpack, Next.js, etc.) this is usually unnecessary.

## Why this exists

We built repoprep because preparing a codebase for an AI chat tool meant
copying files one by one. The differentiator we care about most is that it
runs entirely locally — no server, ever — and that it keeps obvious secrets
out of what you paste into a chat window. Both of those are easy things to
*say* and harder things to *prove*. Publishing the actual engine, filtering
rules included, is our attempt to make it provable instead of just a claim on
a landing page.

If you find a bug, a security concern, or just want to use this in your own
tool, issues and PRs are welcome.

— [repoprep.com](https://www.repoprep.com)
