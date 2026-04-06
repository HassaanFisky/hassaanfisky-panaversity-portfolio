# Prompt: Review Site Status

**Goal**: Review the current state of the Physical AI Textbook website and identify improvement areas.

**Context**:

- Project: Docusaurus-based Textbook
- Focus: "Hackathon Winner" quality UI, Accessibility, Performance
- Tech Stack: React, CSS Modules, customized Docusaurus

**Instructions**:

1. Analyze the provided file structure and key components (`src/pages/index.js`, `src/components/ChatWidget.jsx`, `custom.css`).
2. Identify any:
   - Hardcoded strings that should be config
   - Accessibility violations (missing aria labels, contrast)
   - Performance bottlenecks (large assets, heavy loops)
   - Inconsistencies in design (glassmorphism vs flat)
3. Output a structured "Audit Report" with 3 sections: Critical, Recommended, Optional.

**Files to Check**:

- `src/pages/index.js`
- `docusaurus.config.js`
- `src/css/custom.css`
