import { callOpenRouterChat, DEFAULT_MODEL, type AnalysisResult, type FeedbackItem } from './openrouter';

export type { AnalysisResult, FeedbackItem };

export function getStoredApiKey(): string {
  return localStorage.getItem('prompt_architect_api_key') || '';
}

function getClientModel(): string {
  return (process.env as Record<string, string | undefined>).OPENROUTER_MODEL || DEFAULT_MODEL;
}

/**
 * If the caller supplies their own OpenRouter key (BYOK, from Settings), call OpenRouter
 * directly from the browser. Otherwise fall back to our own /api/analyze endpoint, which
 * holds the shared default key server-side so it's never shipped in the client bundle.
 */
export async function analyzePrompt(prompt: string, apiKey?: string): Promise<AnalysisResult> {
  if (apiKey) {
    return callOpenRouterChat(prompt, apiKey, getClientModel());
  }

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error || `API error (${response.status})`);
  }

  return response.json() as Promise<AnalysisResult>;
}
