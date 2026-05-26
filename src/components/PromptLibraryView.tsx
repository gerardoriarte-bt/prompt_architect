import React, { useState, useMemo } from 'react';
import { LIBRARY_DATA, LibraryPrompt } from '../library-data';

type ToolFilter = 'Todos' | 'Claude' | 'ChatGPT' | 'Gemini';

const TOOL_STYLES: Record<string, { badge: string; chip: string }> = {
  Claude:  { badge: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',  chip: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
  ChatGPT: { badge: 'bg-green-500/15 text-green-400 border border-green-500/20',    chip: 'border-green-500/40 text-green-400 bg-green-500/10' },
  Gemini:  { badge: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',       chip: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
};

export default function PromptLibraryView() {
  const [activeRole, setActiveRole] = useState('Todos');
  const [activeTool, setActiveTool] = useState<ToolFilter>('Todos');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const roles = useMemo(() => ['Todos', ...LIBRARY_DATA.map(r => r.role)], []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return LIBRARY_DATA.map(roleData => {
      if (activeRole !== 'Todos' && roleData.role !== activeRole) return null;
      const prompts = roleData.prompts.filter((p: LibraryPrompt) => {
        const matchTool = activeTool === 'Todos' || p.tool === activeTool;
        const matchSearch = !q ||
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          roleData.role.toLowerCase().includes(q);
        return matchTool && matchSearch;
      });
      return prompts.length ? { role: roleData.role, prompts } : null;
    }).filter(Boolean) as { role: string; prompts: LibraryPrompt[] }[];
  }, [activeRole, activeTool, search]);

  const totalCount = filtered.reduce((acc, r) => acc + r.prompts.length, 0);

  function copyPrompt(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setToastVisible(true);
      setTimeout(() => setCopiedId(null), 2500);
      setTimeout(() => setToastVisible(false), 2000);
    });
  }

  return (
    <div className="flex-1 flex flex-col">

      {/* Hero */}
      <div className="px-6 py-10 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] tracking-[3px] uppercase text-[#FF6B00] mb-3">— Prompt Library · Modo Bestia</p>
          <h2 className="font-sans text-4xl font-bold leading-none mb-3">
            Prompts listos.<br />
            <span className="text-[#FF6B00]">Por rol.</span> Sin excusas.
          </h2>
          <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
            Copiá, ajustá y usá. Cada prompt está construido para tu tarea específica. No genéricos, no experimentales — probados.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-b border-white/5 flex flex-wrap items-center gap-4">
        <div className="max-w-[1400px] w-full mx-auto flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar prompts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1D1E22] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#FF6B00]/50 transition-colors"
            />
          </div>

          {/* Tool filters */}
          <div className="flex gap-2 flex-wrap">
            {(['Todos', 'Claude', 'ChatGPT', 'Gemini'] as ToolFilter[]).map(tool => {
              const isActive = activeTool === tool;
              const style = tool !== 'Todos' ? TOOL_STYLES[tool] : null;
              return (
                <button
                  key={tool}
                  onClick={() => setActiveTool(tool)}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase border transition-all ${
                    isActive
                      ? tool === 'Todos'
                        ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                        : style!.chip
                      : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-400'
                  }`}
                >
                  {tool}
                </button>
              );
            })}
          </div>

          <span className="ml-auto font-mono text-[10px] text-gray-500 tracking-widest whitespace-nowrap">
            {totalCount} prompt{totalCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Role tabs */}
      <div className="border-b border-white/5 overflow-x-auto scrollbar-none">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex min-w-max">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-5 py-3.5 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap border-b-2 transition-all ${
                  activeRole === role
                    ? 'text-[#FF6B00] border-[#FF6B00]'
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-semibold text-gray-400 mb-2">Sin resultados</p>
              <p className="text-sm">Probá con otros términos o cambiá el filtro.</p>
            </div>
          ) : (
            filtered.map(({ role, prompts }) => (
              <div key={role} className="mb-12">
                <div className="flex items-baseline gap-3 mb-5">
                  <h3 className="text-lg font-bold text-white">{role}</h3>
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest">
                    {prompts.length} prompt{prompts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {prompts.map((p, i) => {
                    const id = `${role}_${i}`;
                    const isCopied = copiedId === id;
                    return (
                      <div
                        key={id}
                        className="group bg-[#111113] border border-white/5 rounded-xl p-5 flex flex-col gap-3 hover:border-white/10 transition-all hover:-translate-y-px relative overflow-hidden"
                      >
                        {/* Hover accent line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Card top */}
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-white leading-snug flex-1">{p.title}</p>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${TOOL_STYLES[p.tool]?.badge ?? ''}`}>
                            {p.tool}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>

                        {/* Prompt preview */}
                        <div className="bg-[#0A0A0B] border border-white/5 rounded-lg p-3 font-mono text-[11px] text-gray-400 leading-relaxed relative overflow-hidden max-h-[100px]">
                          <span className="whitespace-pre-wrap">{p.prompt}</span>
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-gray-500">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Copy button */}
                        <button
                          onClick={() => copyPrompt(id, p.prompt)}
                          className={`mt-1 w-full flex items-center justify-center gap-2 py-2 rounded-lg border font-mono text-[10px] tracking-widest uppercase transition-all ${
                            isCopied
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00]/40 text-[#c8ff00]'
                              : 'border-white/10 text-gray-500 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] hover:bg-[#FF6B00]/5'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Copiado
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              Copiar prompt
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Toast */}
      <div className={`fixed bottom-8 right-8 z-50 bg-[#1D1E22] border border-[#c8ff00]/40 rounded-lg px-4 py-2.5 font-mono text-[11px] text-[#c8ff00] tracking-widest transition-all duration-300 pointer-events-none ${
        toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        ✓ Prompt copiado
      </div>

      <style>{`
        .scrollbar-none { scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
