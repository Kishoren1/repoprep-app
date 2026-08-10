# repoprep-app

The exact file-parsing and AI-context-building logic that runs client-side on
**[repoprep.com](https://www.repoprep.com)** — published so you don't have to
take our word for the privacy claim.

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
| `treeBuilder` | Builds the project directory tree shown in the output |
| `contextBuilder` | Assembles the final structured context file (tree + file contents + summary) |
| `tokenEstimator` | Estimates token count and checks it against common model context windows |

Every function here is a pure, synchronous-or-async transform: file(s) in,
text out. Nothing in this package makes a network request.

## What's *not* in here

This repo is the processing engine only. It does not include repoprep.com's
UI, pricing/license logic, or server-side license verification — those stay
in the private app repo, since they're product and business logic rather than
the privacy-relevant part. If you're evaluating the "your code never leaves
the browser" claim specifically, this package is the part that matters.

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
import { parseFiles, buildContext } from "repoprep-app";

// files: Array<{ raw: File; path: string }>
const { results } = await parseFiles(files, (done, total) => {
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
} from "repoprep-app";
```

## A note on the PDF parser

`parsePdf` dynamically imports [`pdfjs-dist`](https://github.com/mozilla/pdf.js).
If you're bundling this for a Node.js environment (rather than a browser),
you'll likely need to alias or stub the `canvas` optional dependency the way
the production app does — see `src/canvas-stub.js` for reference. In a
browser bundle (Vite, Webpack, Next.js, etc.) this is usually unnecessary.

## Why this exists

We built repoprep because preparing a codebase for an AI chat tool meant
copying files one by one. The differentiator we care about most is that it
runs entirely locally — no server, ever. That's an easy thing to *say* and a
harder thing to *prove*. Publishing the actual engine is our attempt to make
it provable instead of just a claim on a landing page.

If you find a bug, a security concern, or just want to use this in your own
tool, issues and PRs are welcome.

— [repoprep.com](https://www.repoprep.com)
