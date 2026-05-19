export interface FeedbackItem {
  category: string;
  status: 'good' | 'weak' | 'missing';
  note: string;
}

export interface AnalysisResult {
  feedback: FeedbackItem[];
  optimized_prompt: string;
}

export function getStoredApiKey(): string {
  const userKey = localStorage.getItem('prompt_architect_api_key') || '';
  const defaultKey = (process.env as Record<string, string | undefined>).OPENROUTER_API_KEY || '';
  return userKey || defaultKey;
}

const SYSTEM_PROMPT = `You are an expert in Prompt Engineering for any type of AI system: image generation, video generation, text/chat assistants, coding tools, marketing copy, etc.

Analyze the user's prompt and return ONLY a valid JSON object with this structure:
{
  "feedback": [
    { "category": "<category name>", "status": "good|weak|missing", "note": "<brief actionable note>" },
    ... (exactly 5 items, one per framework element: Role, Context, Task, Restriction, Format)
  ],
  "optimized_prompt": "<the improved prompt structured with the framework below>"
}

FEEDBACK: Evaluate the original prompt against each of the 5 framework elements:
1. Role — Does it define who or what the AI should act as?
2. Context — Does it provide relevant background or situational information?
3. Task — Is the core instruction clear and specific?
4. Restriction — Does it set limits, constraints, or things to avoid?
5. Format — Does it specify the desired output structure, length, or style?

OPTIMIZED PROMPT: Rewrite the prompt applying the 5-element framework. Use this exact layout, with each label translated to the detected language:
[Role label]: ...
[Context label]: ...
[Task label]: ...
[Restriction label]: ...
[Format label]: ...

CRITICAL RULES:
1. Detect the language of the user's input and write EVERYTHING — category names, notes, framework labels, and the optimized prompt content — in that exact same language.
2. Do not include markdown formatting or any text outside the JSON.`;

export async function analyzePrompt(prompt: string, apiKey: string): Promise<AnalysisResult> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://prompt-architect.vercel.app',
      'X-Title': 'Prompt Architect',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: { message?: string } };
    if (response.status === 401) throw new Error('Invalid API key. Please check your OpenAI API key in Settings.');
    if (response.status === 429) throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    throw new Error((err.error?.message) || `API error (${response.status})`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  const content = data.choices[0]?.message?.content;
  if (!content) throw new Error('Empty response from AI.');

  return JSON.parse(content) as AnalysisResult;
}
