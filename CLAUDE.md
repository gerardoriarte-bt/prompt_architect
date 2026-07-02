# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000 (0.0.0.0, HMR on)
npm run build      # Production build via Vite → dist/
npm run preview    # Serve the production build locally
npm run lint       # TypeScript type-check only (tsc --noEmit, no test suite)
npm run clean      # Delete dist/
```

Set `DISABLE_HMR=true` to disable hot module replacement in dev.

Environment variable required for the Prompt Optimizer's default/shared AI access: `OPENROUTER_API_KEY` (see `.env.example`). This is **server-side only** — read directly from `process.env` inside `api/analyze.ts` (a Vercel serverless function) and must never be added to `vite.config.ts`'s `define` block, or it gets bundled in plaintext into the client JS. Users can bypass the shared key by adding their own OpenRouter key in Settings (`localStorage`), in which case the browser calls OpenRouter directly.

## Architecture

Single-page React app (no routing). Two source files hold almost all logic:

- **`src/constants.ts`** — static data: `CATEGORIES`, `TEMPLATES`, `DEFAULT_NEGATIVE_PROMPT`. Every prompt option, its `id`, human `label`, raw prompt `value`, and optional `description` lives here. `isVideoOnly: true` on a category hides it when the mode is `'image'`.
- **`src/App.tsx`** — the entire UI and state. ~640 lines, no sub-components extracted to separate files.

### State model

| State | Purpose |
|---|---|
| `mode` | `'image'` \| `'video'` — gates video-only categories |
| `subject` | Free-text description written by the user |
| `selections` | `Record<categoryId, optionId>` — at most one selection per category |
| `customOptions` | `Record<categoryId, Option[]>` — user-defined options, merged with defaults at render |
| `savedPrompts` | History array capped at 10, persisted to `localStorage` |
| `negativePrompt` | Editable quality-filter string |

Prompt output is derived via `useMemo` from `subject`, `selections`, `mode`, and `customOptions`. Clicking a selected option again deselects it (toggle).

### Persistence

Two `localStorage` keys:
- `prompt_architect_saved` — saved prompt history
- `prompt_architect_custom_options` — user-added options per category

### Styling

Tailwind CSS v4 (JIT via `@tailwindcss/vite`, no `tailwind.config.js`). Theme tokens are defined inside `src/index.css`. Primary accent: `#FF6B00` orange. Custom scrollbar is injected via an inline `<style>` tag in the component.

### Extending categories or options

Add entries to `CATEGORIES` in `constants.ts`. Each `Option` needs a unique `id`, a short `label`, and a `value` (the actual prompt text that gets concatenated). Mark a category `isVideoOnly: true` to hide it in image mode.

### Deployment

Deployed to Vercel. `vercel.json` rewrites all routes to `index.html` for SPA behavior.
