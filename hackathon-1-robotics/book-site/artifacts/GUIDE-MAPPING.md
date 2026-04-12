# Guide Strategy vs Repo Reality Mapping

## Textbook Creation

- **Guide**: "Module 1: Foundations" etc.
- **Repo**: `docs/module-01-foundations/`, `docs/module-02-hardware/`, etc.
- **Status**: FULLYY IMPLEMENTED (12 chapters).

## Chatbot Integration

- **Guide**: "Build-time indexer script" + "Client-side retrieval"
- **Repo**:
  - Indexer: `scripts/build-index.js` -> `static/chat-index.json`
  - UI: `src/pages/chat.jsx`
- **Status**: IMPLEMENTED.

## Deployment

- **Guide**: GitHub -> Vercel
- **Repo**: Vercel configuration via `package.json` scripts (`build`).
- **Status**: READY (Waiting for push).

## WhatsApp Bridge

- **Guide**: "Dynamic origin" share button.
- **Repo**: `src/pages/index.js` and `src/pages/chat.jsx` (using `window.location.origin`).
- **Status**: IMPLEMENTED.
