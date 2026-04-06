# System Architecture

```mermaid
graph TD
    subgraph Build Time
        A[Markdown Docs] -->|scripts/build-index.js| B(JSON Extractor)
        B -->|Chunks & Clean| C[static/chat-index.json]
        A -->|Docusaurus| D[Static HTML Assets]
    end

    subgraph Client Browser
        E[User] -->|Visits /chat| F[React App (chat.jsx)]
        F -->|Fetch| C
        F -->|Loads| G[Lunr.js In-Memory Index]
        E -->|Query| G
        G -->|Top k Matches| F
        F -->|Display Evidence| E
    end
```

## Zero-Key Design

- No database.
- No Vector DB (Qdrant/Pinecone).
- No API Keys (OpenAI/Anthropic).
- Search is 100% client-side using `lunr`.
- Content is shipped as a static JSON asset.
