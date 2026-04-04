// e:/panaversity/hackathon-0/frontend/lib/hackathons.ts

export interface Hackathon {
  id: number;
  title: string;
  category: string;
  tech: string[];
  description: string;
  status: "live" | "coming-soon" | "wip";
  url: string;
  imageUrl: string;
  points: string;
}

export const hackathons: Hackathon[] = [
  { 
    id: 0, 
    title: "Personal AI Employee — Building Autonomous FTEs", 
    category: "Phase 0",
    tech: ["Claude Code", "Obsidian"],
    description: "Build an autonomous Digital FTE that proactively manages your personal and business affairs 24/7 using Claude Code and Obsidian. Gmail, WhatsApp, bank transactions, and tasks — all on autopilot.",
    status: "live", 
    url: "https://github.com/Hassaanfisky/hassaanfisky-panaversity-portfolio", 
    imageUrl: "/blueprint-footer.png",
    points: "1600 points" 
  },
  { 
    id: 1, 
    title: "Physical AI & Humanoid Robotics Textbook",
    category: "Phase I",
    tech: ["Docusaurus", "FastAPI", "OpenAI Agents SDK", "Qdrant", "RAG"],
    description: "Create an AI-native textbook with Docusaurus and build an embedded RAG chatbot using OpenAI Agents SDK, FastAPI, and Qdrant for interactive, personalised learning.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H1_URL || "https://panaversity-h1-robotics.vercel.app", 
    imageUrl: "/h1-thumb.png",
    points: "1200 + 300 bonus" 
  },
  { 
    id: 2, 
    title: "The Evolution of Todo — Spec-Driven Development",
    category: "Phase II",
    tech: ["Next.js", "Supabase", "Kafka", "Dapr", "Kubernetes"],
    description: "Master spec-driven development through a 5-phase journey: console app → full-stack web → AI chatbot → local Kubernetes → cloud deployment with Kafka and Dapr.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H2_URL || "https://evolution-of-todo.vercel.app", 
    imageUrl: "/h2-thumb.png",
    points: "1000 + 600 bonus" 
  },
  { 
    id: 3, 
    title: "Reusable Intelligence & Cloud-Native Mastery",
    category: "Phase III",
    tech: ["MCP", "Agent Skills", "Claude Code", "Goose"],
    description: "Build agentic infrastructure with MCP Code Execution and Agent Skills. Create a LearnFlow platform using Claude Code and Goose — the Skills are the product.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H3_URL || "https://hassaanfisky-panaversity-learnflow.vercel.app", 
    imageUrl: "/h2-thumb.png",
    points: "1000 + 400 bonus" 
  },
  { 
    id: 4, 
    title: "Course Companion FTE — Digital Tutor at Scale",
    category: "Phase IV",
    tech: ["Agent Factory", "Next.js", "AI Tutors", "Groq"],
    description: "Build a Digital FTE educational tutor with dual-frontend architecture (ChatGPT App + standalone Web App). A 24/7 AI tutor at 99% cost reduction using Agent Factory Architecture.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H4_URL || "https://hassaanfisky-aira-digital-fte.vercel.app/", 
    imageUrl: "/h4-thumb.png",
    points: "1000 + 500 bonus" 
  }
];

