/**
 * chat.js - OpenRouter API Integration for Physical AI Textbook
 *
 * This server handler routes chat requests through OpenRouter
 * to provide AI-powered answers based on textbook content.
 *
 * API Response Shape: { answer: string, sources: string[] }
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// System prompt for the textbook assistant
const SYSTEM_PROMPT = `You are an AI textbook assistant for "Physical AI & Humanoid Robotics" textbook.

RULES:
1. Answer ONLY from the indexed textbook content about physical AI and humanoid robotics.
2. Include max 3 source citations in format: "Chapter X: Title — Section Name"
3. If unsure or topic not covered, reply: "I don't know from the textbook — do you want me to search wider sources?"
4. Keep all replies ≤120 words unless user asks for detail.
5. Offer "Read more in Chapter X" links when relevant.

TEXTBOOK CHAPTERS:
- Chapter 1: Introduction to Physical AI & Humanoid Robotics
- Chapter 2: Core Concepts & System Architecture  
- Chapter 3: Practical Implementation Guides
- Chapter 4: Real-World Examples & Case Studies
- Chapter 5: Resources, Tools & Appendix

COVERED TOPICS:
- Physical AI paradigm, embodied intelligence
- Humanoid robot history (WABOT, ASIMO, Atlas, Optimus)
- Sensor systems, actuators, control architectures
- Motion planning, balance control, manipulation
- ROS 2, simulation platforms, deployment strategies`;

/**
 * POST /api/chat
 * Body: { message: string, history?: array }
 * Response: { answer: string, sources: string[] }
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
        answer: "Please provide a valid question.",
        sources: [],
      });
    }

    if (!OPENROUTER_API_KEY) {
      // Fallback response when API key not configured
      return res.json({
        answer:
          "The AI assistant is not configured. Please add OPENROUTER_API_KEY to your .env file. In the meantime, check Chapter 1 for an introduction to Physical AI concepts!",
        sources: ["Chapter 1: Introduction — Getting Started"],
      });
    }

    // Prepare messages for OpenRouter
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6), // Keep last 6 messages for context
      { role: "user", content: message },
    ];

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://physical-ai-textbook.vercel.app",
        "X-Title": "Physical AI Textbook Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter error:", errorData);
      throw new Error("API request failed");
    }

    const data = await response.json();
    const assistantMessage =
      data.choices[0]?.message?.content ||
      "I apologize, I could not generate a response.";

    // Extract sources from response (simple parsing)
    const sourceMatches =
      assistantMessage.match(/Chapter \d+:.*?(?=\.|$)/gi) || [];
    const sources = sourceMatches.slice(0, 3);

    res.json({
      answer: assistantMessage,
      sources:
        sources.length > 0
          ? sources
          : ["Chapter 1: Introduction — Physical AI Overview"],
    });
  } catch (error) {
    console.error("Chat API error:", error.message);
    res.status(500).json({
      answer:
        "I'm having trouble connecting right now. Please try again in a moment.",
      sources: [],
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Physical AI Textbook Chat API",
    apiConfigured: !!OPENROUTER_API_KEY,
  });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`╔══════════════════════════════════════════════════╗`);
  console.log(`║   Physical AI Textbook - Chat API Server         ║`);
  console.log(`╚══════════════════════════════════════════════════╝`);
  console.log(`\n✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API Key configured: ${OPENROUTER_API_KEY ? "Yes" : "No"}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/chat   - Send chat messages`);
  console.log(`  GET  /api/health - Health check`);
});

module.exports = app;
