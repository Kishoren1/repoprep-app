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
  // Anthropic — standard 200K window (1M available in beta for tier 4+)
  { name: "Claude Opus 4.6", maxTokens: 200_000, safeTokens: 180_000 },
  { name: "Claude Sonnet 4.6", maxTokens: 200_000, safeTokens: 180_000 },
  { name: "Claude Haiku 4.5", maxTokens: 200_000, safeTokens: 180_000 },
  // OpenAI
  { name: "GPT-4.1", maxTokens: 1_000_000, safeTokens: 900_000 },
  { name: "GPT-4o", maxTokens: 128_000, safeTokens: 110_000 },
  { name: "o3 / o4-mini", maxTokens: 200_000, safeTokens: 180_000 },
  // Google
  { name: "Gemini 2.0 Flash", maxTokens: 1_000_000, safeTokens: 900_000 },
  { name: "Gemini 1.5 Pro", maxTokens: 1_000_000, safeTokens: 900_000 },
];

export type TokenStatus = "safe" | "warning" | "danger";

export function getTokenStatus(tokens: number): TokenStatus {
  if (tokens < 80_000) return "safe";
  if (tokens < 120_000) return "warning";
  return "danger";
}

export function getModelCompatibility(tokens: number): ModelLimit[] {
  return MODEL_LIMITS.filter((m) => tokens <= m.safeTokens);
}

