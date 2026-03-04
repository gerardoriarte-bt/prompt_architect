import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Video, 
  Copy, 
  RotateCcw, 
  Check, 
  Info, 
  Layers, 
  Wind, 
  Sun, 
  Zap, 
  Box, 
  Sparkles,
  Wand2,
  Monitor,
  ChevronRight,
  ChevronDown,
  Trash2,
  Save,
  Download,
  History,
  Github,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { CATEGORIES, DEFAULT_NEGATIVE_PROMPT, TEMPLATES, type Category, type Option, type Template } from './constants';

interface SavedPrompt {
  id: string;
  positive: string;
  negative: string;
  timestamp: number;
}

export default function App() {
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [subject, setSubject] = useState('');
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [negativePrompt, setNegativePrompt] = useState(DEFAULT_NEGATIVE_PROMPT);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('framing');
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [customOptions, setCustomOptions] = useState<Record<string, Option[]>>({});

  useEffect(() => {
    const stored = localStorage.getItem('prompt_architect_saved');
    if (stored) {
      try {
        setSavedPrompts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse saved prompts', e);
      }
    }

    const storedCustom = localStorage.getItem('prompt_architect_custom_options');
    if (storedCustom) {
      try {
        setCustomOptions(JSON.parse(storedCustom));
      } catch (e) {
        console.error('Failed to parse custom options', e);
      }
    }
  }, []);

  const addCustomOption = (categoryId: string, label: string, value: string) => {
    const newOpt: Option = {
      id: `custom-${crypto.randomUUID()}`,
      label: label.trim(),
      value: value.trim()
    };

    const updated = {
      ...customOptions,
      [categoryId]: [...(customOptions[categoryId] || []), newOpt]
    };

    setCustomOptions(updated);
    localStorage.setItem('prompt_architect_custom_options', JSON.stringify(updated));
  };

  const deleteCustomOption = (categoryId: string, optionId: string) => {
    const updated = {
      ...customOptions,
      [categoryId]: (customOptions[categoryId] || []).filter(o => o.id !== optionId)
    };
    setCustomOptions(updated);
    localStorage.setItem('prompt_architect_custom_options', JSON.stringify(updated));
    
    // If deleted option was selected, clear selection
    if (selections[categoryId] === optionId) {
      setSelections(prev => ({ ...prev, [categoryId]: '' }));
    }
  };

  const savePrompt = () => {
    if (!generatedPrompt.trim()) return;
    
    const newPrompt: SavedPrompt = {
      id: crypto.randomUUID(),
      positive: generatedPrompt,
      negative: negativePrompt,
      timestamp: Date.now()
    };
    
    const updated = [newPrompt, ...savedPrompts].slice(0, 10); // Keep last 10
    setSavedPrompts(updated);
    localStorage.setItem('prompt_architect_saved', JSON.stringify(updated));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportToTxt = () => {
    if (!generatedPrompt.trim()) return;
    
    const content = `POSITIVE PROMPT:\n${generatedPrompt}\n\nNEGATIVE PROMPT:\n${negativePrompt}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const deleteSavedPrompt = (id: string) => {
    const updated = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updated);
    localStorage.setItem('prompt_architect_saved', JSON.stringify(updated));
  };

  const loadSavedPrompt = (p: SavedPrompt) => {
    // This is tricky because we don't know the subject vs selections from the string alone
    // For now, we'll just set the subject to the whole positive prompt and clear selections
    // to avoid inconsistency, or we could just allow copying them.
    // Let's just allow copying them from the history list.
    copyToClipboard(p.positive);
  };

  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === optionId ? '' : optionId
    }));
  };

  const reset = () => {
    setSubject('');
    setSelections({});
    setNegativePrompt(DEFAULT_NEGATIVE_PROMPT);
  };

  const loadTemplate = (template: Template) => {
    setSubject(template.subject);
    setSelections(template.selections);
    setExpandedCategory(null);
  };

  const generatedPrompt = useMemo(() => {
    const parts: string[] = [];
    if (subject.trim()) parts.push(subject.trim());

    CATEGORIES.forEach(cat => {
      if (cat.isVideoOnly && mode === 'image') return;
      const selectedId = selections[cat.id];
      if (selectedId) {
        const allOptions = [...cat.options, ...(customOptions[cat.id] || [])];
        const option = allOptions.find(o => o.id === selectedId);
        if (option) parts.push(option.value);
      }
    });

    return parts.join(', ');
  }, [subject, selections, mode]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'framing': return <Camera className="w-4 h-4" />;
      case 'aspect': return <Monitor className="w-4 h-4" />;
      case 'movement': return <Video className="w-4 h-4" />;
      case 'color': return <Layers className="w-4 h-4" />;
      case 'lighting': return <Sun className="w-4 h-4" />;
      case 'speed': return <Wind className="w-4 h-4" />;
      case 'environment': return <Box className="w-4 h-4" />;
      case 'effects': return <Wand2 className="w-4 h-4" />;
      case 'style': return <Sparkles className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-[100] bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <Zap className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter mt-1">powered by LoBueno</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 md:p-8 flex flex-col">
        {/* Hero Section Feel */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            Craft the perfect <span className="text-[#FF6B00]">Cinematic</span> vision.
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed mb-8">
            A professional-grade prompt engineering tool for AI image and video generation. 
            Select your parameters, define your subject, and let the architect build your vision.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest w-full md:w-auto mb-2 md:mb-0 md:mr-2 self-center">Quick Start Templates:</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => loadTemplate(t)}
                className="px-4 py-2 bg-[#151619] hover:bg-[#2A2B2F] border border-white/5 rounded-full text-[10px] font-mono text-gray-400 hover:text-[#FF6B00] transition-all"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full bg-[#151619] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 h-[800px] max-h-[80vh]">
          
          {/* Sidebar / Controls */}
          <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Engine Mode</span>
                <div className="flex bg-[#2A2B2F] rounded-full p-1 border border-white/5">
                  <button 
                    onClick={() => setMode('image')}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono transition-all ${mode === 'image' ? 'bg-[#FF6B00] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    IMAGE
                  </button>
                  <button 
                    onClick={() => setMode('video')}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono transition-all ${mode === 'video' ? 'bg-[#FF6B00] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    VIDEO
                  </button>
                </div>
              </div>
            </div>

          <div className="space-y-6">
            {/* Subject Input */}
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-2">01. Subject / Action</label>
              <textarea 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="A futuristic robot walking through a neon-lit Tokyo street..."
                className="w-full bg-[#2A2B2F] border border-white/5 rounded-xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/50 transition-colors resize-none h-24"
              />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">02. Cinematic Parameters</label>
                <button 
                  onClick={reset}
                  className="text-[10px] font-mono text-gray-500 hover:text-[#FF6B00] transition-colors flex items-center gap-1 uppercase tracking-wider"
                >
                  <RotateCcw className="w-3 h-3" /> Clear All
                </button>
              </div>
              {CATEGORIES.map((cat) => {
                if (cat.isVideoOnly && mode === 'image') return null;
                const isExpanded = expandedCategory === cat.id;
                const selectedOption = selections[cat.id];

                return (
                  <div key={cat.id} className="border border-white/5 rounded-xl overflow-hidden bg-[#1D1E22]">
                    <button 
                      onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selectedOption ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'bg-[#2A2B2F] text-gray-400'}`}>
                          {getCategoryIcon(cat.id)}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-medium text-white">{cat.name}</p>
                          <p className="text-[10px] text-gray-500 line-clamp-1">{cat.description}</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className=""
                        >
                          <div className="p-4 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {[...cat.options, ...(customOptions[cat.id] || [])].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => handleSelect(cat.id, opt.id)}
                                className={`relative group flex items-center justify-between p-3 rounded-lg text-xs transition-all border ${
                                  selectedOption === opt.id 
                                    ? 'bg-[#FF6B00]/10 border-[#FF6B00]/30 text-white' 
                                    : 'bg-[#2A2B2F]/50 border-white/5 text-gray-400 hover:border-white/20'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{opt.label}</span>
                                  {opt.id.startsWith('custom-') && (
                                    <span className="text-[8px] px-1 py-0.5 bg-white/5 rounded text-gray-500 uppercase">Custom</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {opt.id.startsWith('custom-') && (
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteCustomOption(cat.id, opt.id);
                                      }}
                                      className="p-1 text-gray-600 hover:text-[#FF6B00] transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  )}
                                  {selectedOption === opt.id && <Check className="w-3 h-3 text-[#FF6B00]" />}
                                </div>
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#151619] border border-white/20 rounded-lg text-[10px] text-gray-300 w-max max-w-[200px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 delay-300 z-[100] pointer-events-none shadow-2xl text-center">
                                  <p className="font-mono text-[#FF6B00] text-[8px] mb-1 uppercase tracking-widest">Prompt Value</p>
                                  {opt.value}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#151619]"></div>
                                </div>
                              </button>
                            ))}

                            {/* Add Custom Option Form */}
                            <CustomOptionForm onAdd={(label, value) => addCustomOption(cat.id, label, value)} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview / Output */}
        <div className="w-full md:w-1/2 p-8 bg-[#1D1E22] flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex-1 flex flex-col">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Positive Prompt</label>
                <div className="flex gap-2">
                  <button 
                    onClick={reset}
                    className="p-2 text-gray-500 hover:text-[#FF6B00] transition-colors"
                    title="Reset All"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] to-[#F27D26] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-[#151619] border border-white/10 rounded-2xl p-6 min-h-[180px] flex flex-col">
                  <p className={`text-sm leading-relaxed ${generatedPrompt ? 'text-white' : 'text-gray-600 italic'}`}>
                    {generatedPrompt || "Your prompt will appear here as you select options..."}
                  </p>
                  <div className="mt-auto pt-6 flex justify-end gap-3">
                    <button 
                      disabled={!generatedPrompt}
                      onClick={exportToTxt}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono transition-all ${
                        !generatedPrompt 
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                          : 'bg-[#2A2B2F] text-white hover:bg-[#3A3B3F] active:scale-95 border border-white/5'
                      }`}
                      title="Export as .txt"
                    >
                      <Download className="w-4 h-4" />
                      EXPORT
                    </button>
                    <button 
                      disabled={!generatedPrompt}
                      onClick={savePrompt}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono transition-all ${
                        !generatedPrompt 
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                          : saved 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-[#2A2B2F] text-white hover:bg-[#3A3B3F] active:scale-95 border border-white/5'
                      }`}
                    >
                      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved ? 'SAVED' : 'SAVE'}
                    </button>
                    <button 
                      disabled={!generatedPrompt}
                      onClick={() => copyToClipboard(generatedPrompt)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono transition-all ${
                        !generatedPrompt 
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                          : copied 
                            ? 'bg-green-500 text-white' 
                            : 'bg-[#FF6B00] text-white hover:bg-[#FF8533] active:scale-95'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'COPIED' : 'COPY PROMPT'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Negative Prompt</label>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setNegativePrompt('')}
                    className="text-[10px] font-mono text-gray-500 hover:text-[#FF6B00] transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                  <button 
                    onClick={() => setNegativePrompt(DEFAULT_NEGATIVE_PROMPT)}
                    className="text-[10px] font-mono text-gray-500 hover:text-[#FF6B00] transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Default
                  </button>
                </div>
              </div>
              <div className="bg-[#151619] border border-white/5 rounded-2xl p-6">
                <textarea 
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="w-full bg-transparent border-none text-sm text-gray-400 focus:outline-none resize-none h-24 custom-scrollbar"
                />
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => copyToClipboard(negativePrompt)}
                    className="text-[10px] font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> COPY NEGATIVE
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto p-6 bg-[#2A2B2F]/30 rounded-2xl border border-white/5">
              {savedPrompts.length > 0 ? (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="w-3 h-3 text-gray-500" />
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Saved History</label>
                  </div>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                    {savedPrompts.map((p) => (
                      <div key={p.id} className="group flex items-center justify-between gap-3 p-2 bg-[#151619] rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <p className="text-[10px] text-gray-400 truncate flex-1">{p.positive}</p>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => copyToClipboard(p.positive)}
                            className="p-1 text-gray-500 hover:text-white transition-colors"
                            title="Copy Positive"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => deleteSavedPrompt(p.id)}
                            className="p-1 text-gray-500 hover:text-[#FF6B00] transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-white font-medium mb-1">Architect's Tip</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    The AI processes terms in order of appearance. Start with your subject, then add framing, lighting, and style for the best results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0A0A0B] py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-[#FF6B00] rounded flex items-center justify-center">
                <Zap className="text-white w-4 h-4" />
              </div>
              <span className="text-white font-mono text-sm font-bold tracking-widest uppercase">Prompt Architect</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              The ultimate tool for cinematic prompt engineering. Built for creators who demand precision and quality in their AI-generated content.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">© 2026 Prompt Architect. All rights reserved.</p>
            <div className="flex gap-6 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

function CustomOptionForm({ onAdd }: { onAdd: (label: string, value: string) => void }) {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!label.trim() || !value.trim()) return;
    onAdd(label, value);
    setLabel('');
    setValue('');
  };

  return (
    <div className="mt-2 p-3 bg-[#151619]/50 rounded-lg border border-dashed border-white/10">
      <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-2">Add Custom Option</p>
      <div className="space-y-2">
        <input 
          type="text"
          placeholder="Label (e.g. Tim Burton Style)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full bg-[#2A2B2F] border border-white/5 rounded-md px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-[#FF6B00]/30"
        />
        <textarea 
          placeholder="Prompt Value (e.g. dark, whimsical, gothic...)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-[#2A2B2F] border border-white/5 rounded-md px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-[#FF6B00]/30 h-20 resize-none custom-scrollbar"
        />
        
        {/* Preview Section */}
        {(label || value) && (
          <div className="p-2 bg-[#0A0A0B] rounded border border-white/5">
            <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest mb-1">Live Preview</p>
            <div className="flex items-center justify-between p-2 bg-[#2A2B2F]/50 border border-white/5 rounded text-[10px]">
              <div className="flex items-center gap-2">
                <span className="text-white">{label || 'Untitled'}</span>
                <span className="text-[8px] px-1 py-0.5 bg-white/5 rounded text-gray-500 uppercase">Custom</span>
              </div>
              <Check className="w-3 h-3 text-[#FF6B00]" />
            </div>
            <p className="mt-1 text-[9px] text-gray-500 italic line-clamp-2 px-1">
              {value || 'No value defined...'}
            </p>
          </div>
        )}

        <button 
          onClick={handleSubmit}
          disabled={!label.trim() || !value.trim()}
          className={`w-full text-[10px] font-mono py-1.5 rounded-md transition-colors border ${
            !label.trim() || !value.trim()
              ? 'bg-gray-800/50 text-gray-600 border-white/5 cursor-not-allowed'
              : 'bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] border-[#FF6B00]/20'
          }`}
        >
          + ADD OPTION
        </button>
      </div>
    </div>
  );
}
