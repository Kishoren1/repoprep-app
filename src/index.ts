// repoprep-engine
// The exact file-parsing and context-building logic that runs client-side
// on https://repoprep.com — published so anyone can verify it never sends
// a file anywhere. Every function below runs entirely in the caller's
// environment (browser or Node); there is no network call in this package.

export { parseFile, parseFiles } from "./parsers/index";
export type { ParseResult, BatchParseResult } from "./parsers/index";

export { buildContext } from "./contextBuilder";
export type { ContextOutput } from "./contextBuilder";

export { buildDirectoryTree } from "./treeBuilder";

export {
  estimateTokens,
  formatTokenCount,
  getTokenStatus,
  getModelCompatibility,
  MODEL_LIMITS,
} from "./tokenEstimator";
export type { ModelLimit, TokenStatus } from "./tokenEstimator";
