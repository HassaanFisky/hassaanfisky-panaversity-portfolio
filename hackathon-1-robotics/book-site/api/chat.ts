// Vercel Serverless Function for Chat API — HASSAAN AI ARCHITECT Upgrade
import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  // New format: full messages array sent by CompanionChat
  messages?: ChatMessage[];
  // Legacy format: single message + history
  message?: string;
  history?: ChatMessage[];
  context?: string;
  platform?: string;
  lang?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── ENABLE CORS ──────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as ChatRequestBody;

  // Support both new format ({ messages }) and legacy format ({ message, history })
  let conversationMessages: ChatMessage[] = [];
  if (body.messages && body.messages.length > 0) {
    conversationMessages = body.messages;
  } else if (body.message) {
    conversationMessages = [
      ...(body.history ?? []).slice(-6),
      { role: "user", content: body.message },
    ];
  } else {
    return res.status(400).json({
      error: "Message required",
      content: "Please provide a valid question for the Architect.",
      sources: [],
    });
  }

  // ── API KEYS ─────────────────────────────────────────────────────────────
  const GROQ_API_KEY = process.env.GROQ_API_KEY; 
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!GROQ_API_KEY && !OPENROUTER_API_KEY) {
    const msg = "The HASSAAN AI ARCHITECT assistant is not configured. Please add GROQ_API_KEY to your environment variables.";
    return res.json({
      content: msg,
      answer: msg,
      sources: ["System: Configuration Required"],
    });
  }

  // ── SYSTEM PROMPT ────────────────────────────────────────────────────────
  const SYSTEM_PROMPT = `You are a Senior Autonomous AI Architect for "Physical AI & Humanoid Robotics".
Your primary function is to serve the HASSAAN AI ARCHITECT ecosystem (H0-H4).

RULES:
1. Answer ONLY from textbook content or general robotics knowledge with a "Physical AI" perspective.
2. Tone: Professional, humanized, symbol-minimal (High-Fidelity Humanist).
3. Include max 3 source citations: "Chapter X: Title".
4. If unsure, suggest examining specific textbook modules.
5. Max length: 150 words.

ECOSYSTEM NODES:
- H0: Portfolio Hub (Registry)
- H1: Robotics Textbook (This site)
- H2: Evolution of Todo
- H3: LearnFlow Platform
- H4: Companion FTE (CRM/Support)`;

  try {
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationMessages.filter((m) => m.role !== "system").slice(-8),
    ];

    // Priority 1: Use Groq
    const API_URL = GROQ_API_KEY 
      ? "https://api.groq.com/openai/v1/chat/completions" 
      : "https://openrouter.ai/api/v1/chat/completions";
    
    const API_KEY = GROQ_API_KEY || OPENROUTER_API_KEY;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_API_KEY ? "llama3-8b-8192" : "openai/gpt-3.5-turbo",
        messages: messages,
        max_tokens: 500,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(errData)}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || "I apologize, the cognitive bridge failed.";

    // Simple source extraction
    const sourceMatches = answer.match(/Chapter \d+:.*?(?=\.|$)/gi) || [];
    const sources = sourceMatches.slice(0, 3);

    return res.json({
      content: answer,
      answer,
      sources: sources.length > 0 ? sources : ["Sync: Autonomous Knowledge Transfer"],
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    const errMsg = `Cognitive Synchronization Error: ${error.message}. Please verify the GROQ_API_KEY.`;
    return res.status(500).json({
      content: errMsg,
      answer: errMsg,
      sources: [],
    });
  }
}
