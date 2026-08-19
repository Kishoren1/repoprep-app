const CHARS_PER_TOKEN = 4;

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

export function formatTokenCount(tokens: number): string {
  if (tokens < 1_000) return `~${tokens} tokens`;
  if (tokens < 1_000_000) return `~${(tokens / 1_000).toFixed(1)}k tokens`;
  return `~${(tokens / 1_000_000).toFixed(2)}M tokens`;
}

export interface ModelLimit {
  name: string;
  maxTokens: number;
  safeTokens: number;
}

export const MODEL_LIMITS: ModelLimit[] = [
  { name: "Claude Sonnet 5", maxTokens: 1_000_000, safeTokens: 900_000 },
  { name: "GPT-5.6 Sol", maxTokens: 1_050_000, safeTokens: 945_000 },
  { name: "Gemini 3.1 Pro", maxTokens: 1_048_576, safeTokens: 943_718 },
  { name: "Llama 4 Scout", maxTokens: 10_000_000, safeTokens: 9_000_000 },
];

export type TokenStatus = "safe" | "warning" | "danger";

export function getTokenStatus(tokens: number): TokenStatus {
  if (tokens < 500_000) return "safe";
  if (tokens < 900_000) return "warning";
  return "danger";
}

export function getModelCompatibility(tokens: number): ModelLimit[] {
  return MODEL_LIMITS.filter((m) => tokens <= m.safeTokens);
}
