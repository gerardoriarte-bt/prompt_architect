import React, { useState, useEffect } from 'react';
import { X, Key, Eye, EyeOff, Check } from 'lucide-react';

const STORAGE_KEY = 'prompt_architect_api_key';

interface Props {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiKey(localStorage.getItem(STORAGE_KEY) || '');
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, apiKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#151619] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
              <Key className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Settings</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-[#2A2B2F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/50 pr-10 transition-colors font-mono"
              />
              <button
                onClick={() => setShowKey(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-gray-600 leading-relaxed">
              Your key is stored only in your browser's localStorage and never sent anywhere except OpenAI's API.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClear}
              disabled={!apiKey}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs font-mono text-gray-400 hover:text-white bg-[#2A2B2F] hover:bg-[#3A3B3F] border border-white/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              CLEAR
            </button>
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-[#FF6B00] hover:bg-[#FF8533] text-white'
              }`}
            >
              {saved ? <><Check className="w-3 h-3" /> SAVED</> : 'SAVE KEY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
