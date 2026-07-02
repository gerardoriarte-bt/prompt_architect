import type { IncomingMessage, ServerResponse } from 'http';
import { callOpenRouterChat, DEFAULT_MODEL } from '../src/services/openrouter';

interface VercelRequest extends IncomingMessage {
  method?: string;
  body?: unknown;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY.' });
    return;
  }

  const body = req.body as { prompt?: string } | undefined;
  const prompt = body?.prompt?.trim();
  if (!prompt) {
    res.status(400).json({ error: 'Missing "prompt" in request body.' });
    return;
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  try {
    const result = await callOpenRouterChat(prompt, apiKey, model);
    res.status(200).json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unexpected error contacting the AI provider.';
    const status = message.startsWith('Invalid API key') ? 500 : message.startsWith('Rate limit') ? 429 : 502;
    res.status(status).json({ error: message });
  }
}
