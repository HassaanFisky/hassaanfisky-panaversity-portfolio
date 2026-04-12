# Physical AI & Humanoid Robotics Textbook + Grounded Chatbot

**A Hackathon Submission by HassaanFisky**

## Overview

This is a comprehensive, open-source textbook designed to bridge the gap between AI and Robotics. It features a custom-built, **offline-first grounded chatbot** that answers questions using only the textbook content—no API keys required.

## Key Features

- **4 Interactive Modules**: Covers Foundations, Hardware, Software/Control, and Deployment.
- **Zero-Key Chatbot**: Uses `lunr.js` and a build-time indexer script to provide cited, grounded answers locally in the browser.
- **WhatsApp Bridge**: Dynamic sharing of deep links and the live demo.
- **Vercel Optimized**: Fully static generation for high-performance deployment.

## How to Run Locally

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Build the Chat Index**

    ```bash
    npm run build-index
    ```

    _(This parses the `docs/` folder and creates `static/chat-index.json`)_

3.  **Start the Server**
    ```bash
    npm run start
    ```

## Proof of Work

Detailed artifacts generated during the development process can be found in the `/artifacts` directory:

- [Architecture Diagram](artifacts/ARCHITECTURE.md)
- [Guide vs Reality Mapping](artifacts/GUIDE-MAPPING.md)
- [Build Verification](artifacts/BUILD-VERIFY.md)

## Deployment

This project is configured for Vercel. Pushing to `main` triggers a build using `npm run build`.

---

_Built with Docusaurus, React, and Lunr.js._
