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
    ... (3 to 5 items, choose categories relevant to the prompt type)
  ],
  "optimized_prompt": "<the improved prompt>"
}

Choose feedback categories that fit the actual purpose of the prompt. Examples:
- Image/video prompts: Subject, Style, Composition, Lighting, Mood
- Text/chat/marketing prompts: Context, Instruction, Tone, Format, Target Audience
- Coding prompts: Task Definition, Input/Output, Constraints, Language/Framework, Examples
- Adapt freely for any other type.

CRITICAL RULES:
1. Detect the language of the user's input and write EVERYTHING in the JSON — category names, notes, and optimized_prompt — in that exact same language.
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
