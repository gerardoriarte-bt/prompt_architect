import React, { useRef, useState } from 'react';
import { Sparkles, Copy, Check, AlertCircle, Loader2, Settings, ThumbsUp, AlertTriangle, XCircle } from 'lucide-react';
import { analyzePrompt, getStoredApiKey, type FeedbackItem, type AnalysisResult } from '../services/ai';

interface Props {
  onOpenSettings: () => void;
}

const MAX_PROMPT_LENGTH = 4000;

function StatusIcon({ status }: { status: FeedbackItem['status'] }) {
  if (status === 'good') return <ThumbsUp className="w-3.5 h-3.5 text-green-400" />;
  if (status === 'weak') return <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />;
  return <XCircle className="w-3.5 h-3.5 text-red-400" />;
}

function statusBorder(status: FeedbackItem['status']) {
  if (status === 'good') return 'border-green-500/20 bg-green-500/5';
  if (status === 'weak') return 'border-yellow-500/20 bg-yellow-500/5';
  return 'border-red-500/20 bg-red-500/5';
}

export default function PromptOptimizerView({ onOpenSettings }: Props) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const analysisCache = useRef<Map<string, AnalysisResult>>(new Map());

  const hasApiKey = !!getStoredApiKey();

  const handleAnalyze = async () => {
    const trimmed = inputPrompt.trim();
    if (!trimmed) return;

    const cached = analysisCache.current.get(trimmed);
    if (cached) {
      setError(null);
      setResult(cached);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const apiKey = getStoredApiKey();
      const analysis = await analyzePrompt(trimmed, apiKey || undefined);
      analysisCache.current.set(trimmed, analysis);
      setResult(analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 md:p-8 flex flex-col">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Optimize your <span className="text-[#FF6B00]">AI Prompt.</span>
        </h2>
        <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
          Paste any prompt below. The AI will analyze it, identify gaps, and return a structured, improved version ready to use.
        </p>
      </div>

      {!hasApiKey && (
        <div className="mb-6 p-4 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#FF6B00] shrink-0" />
          <p className="text-sm text-gray-300 flex-1">You're using the shared free tier. Add your own OpenRouter key in Settings for higher limits.</p>
          <button onClick={onOpenSettings} className="flex items-center gap-1.5 px-4 py-2 bg-[#FF6B00] hover:bg-[#FF8533] rounded-lg text-xs font-mono text-white transition-colors">
            <Settings className="w-3 h-3" /> Add Key
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Input column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-[#151619] rounded-2xl border border-white/10 p-6 flex flex-col flex-1">
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-3">Your Prompt</label>
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Paste your prompt here... e.g. 'a woman standing in a forest'"
              maxLength={MAX_PROMPT_LENGTH}
              className="flex-1 w-full bg-[#2A2B2F] border border-white/5 rounded-xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/50 transition-colors resize-none min-h-[220px] custom-scrollbar"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[10px] text-gray-600 font-mono">{inputPrompt.length} / {MAX_PROMPT_LENGTH} chars</p>
              <button
                onClick={handleAnalyze}
                disabled={loading || !inputPrompt.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono font-bold transition-all ${
                  loading || !inputPrompt.trim()
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-[#FF6B00] hover:bg-[#FF8533] text-white active:scale-95 shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                }`}
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                  : <><Sparkles className="w-4 h-4" /> Analyze &amp; Optimize</>
                }
              </button>
            </div>
          </div>
        </div>

        {/* Results column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-300">{error}</p>
                {error.includes('API key') && (
                  <button onClick={onOpenSettings} className="mt-2 text-[10px] font-mono text-[#FF6B00] hover:text-[#FF8533] flex items-center gap-1">
                    <Settings className="w-3 h-3" /> Open Settings
                  </button>
                )}
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="flex-1 bg-[#151619] rounded-2xl border border-white/5 flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
              <Sparkles className="w-10 h-10 text-gray-700 mb-4" />
              <p className="text-gray-600 text-sm font-mono">Results will appear here after analysis.</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 bg-[#151619] rounded-2xl border border-white/5 flex flex-col items-center justify-center p-12 min-h-[300px]">
              <Loader2 className="w-8 h-8 text-[#FF6B00] animate-spin mb-4" />
              <p className="text-gray-500 text-sm font-mono">Analyzing prompt...</p>
            </div>
          )}

          {result && (
            <>
              <div className="bg-[#151619] rounded-2xl border border-white/10 p-6">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-4">Feedback Analysis</label>
                <div className="space-y-2">
                  {result.feedback.map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${statusBorder(item.status)}`}>
                      <StatusIcon status={item.status} />
                      <div>
                        <p className="text-xs font-semibold text-white mb-0.5">{item.category}</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#151619] rounded-2xl border border-white/10 p-6">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-4">Optimized Prompt</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] to-[#F27D26] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
                  <div className="relative bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                    <p className="text-sm text-white leading-relaxed">{result.optimized_prompt}</p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => copyToClipboard(result.optimized_prompt)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono transition-all ${copied ? 'bg-green-500 text-white' : 'bg-[#FF6B00] hover:bg-[#FF8533] text-white active:scale-95'}`}
                      >
                        {copied ? <><Check className="w-3.5 h-3.5" /> COPIED</> : <><Copy className="w-3.5 h-3.5" /> COPY PROMPT</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
