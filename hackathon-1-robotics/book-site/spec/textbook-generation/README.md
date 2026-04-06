# spec/textbook-generation/README.md

## Textbook Content Generation & Maintenance

This folder contains specifications and configurations for the Physical AI Textbook content.

### Structure

```
docs/
├── module-01-foundations/   # Core concepts
├── module-02-hardware/      # Actuators, sensors, mechanics
├── module-03-software/      # ROS 2, control stacks
└── module-04-deployment/    # Real-world deployment
```

### Content Guidelines

1. **Each chapter should include**:

   - Introduction with hook
   - Technical theory with equations
   - Code examples (Python/C++)
   - Real-world case studies
   - Summary/key takeaways

2. **Images**:

   - Hero image at chapter start
   - Concept diagrams for complex topics
   - Real robot photos for case studies
   - Technical diagrams for algorithms

3. **Sources**:
   - Unsplash (free, high-quality photos)
   - Wikimedia Commons (technical diagrams)
   - Official press kits (Boston Dynamics, Tesla, Figure AI)

### Updating Content

1. Edit markdown files in `/docs/module-XX-name/`
2. Add images to `/static/img/chapters/`
3. Reference images with: `/img/chapters/image-name.jpg`
4. Run `npm run build` to verify

### Indexing for Chatbot

The backend `process.py` script indexes all chapter content for the RAG chatbot.
Run: `python backend/process.py` to regenerate the index.
