import React, { useState } from 'react';
import logo from './lobueno-logo.png';
import { Zap, Settings } from 'lucide-react';
import PromptArchitectView from './components/PromptArchitectView';
import PromptOptimizerView from './components/PromptOptimizerView';
import PromptLibraryView from './components/PromptLibraryView';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'architect' | 'optimizer' | 'library'>('architect');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans flex flex-col">
      <header className="sticky top-0 z-[100] bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center relative">
          <div className="absolute left-0 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <Zap className="text-white w-5 h-5" />
            </div>
            <h1 className="hidden md:block text-white font-mono text-xs font-bold tracking-widest uppercase">Prompt Architect</h1>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="LoBueno Logo" className="h-6 md:h-8 object-contain brightness-0 invert opacity-90" />
            <div className="flex bg-[#1D1E22] rounded-full p-0.5 border border-white/5">
              <button
                onClick={() => setCurrentView('architect')}
                className={`px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${currentView === 'architect' ? 'bg-[#FF6B00] text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
              >
                Architect
              </button>
              <button
                onClick={() => setCurrentView('optimizer')}
                className={`px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${currentView === 'optimizer' ? 'bg-[#FF6B00] text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
              >
                Optimizer
              </button>
              <button
                onClick={() => setCurrentView('library')}
                className={`px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${currentView === 'library' ? 'bg-[#FF6B00] text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
              >
                Library
              </button>
            </div>
          </div>

          <div className="absolute right-0 flex items-center gap-3">
            <button onClick={() => setShowSettings(true)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Settings">
              <Settings className="w-4 h-4" />
            </button>
            <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter hidden md:block">powered by LoBueno</p>
          </div>
        </div>
      </header>

      {currentView === 'architect' && <PromptArchitectView />}
      {currentView === 'optimizer' && <PromptOptimizerView onOpenSettings={() => setShowSettings(true)} />}
      {currentView === 'library' && <PromptLibraryView />}

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

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
