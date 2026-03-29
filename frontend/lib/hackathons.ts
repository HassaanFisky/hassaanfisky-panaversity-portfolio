// e:/panaversity/hackathon-0/frontend/lib/hackathons.ts

export interface Hackathon {
  id: number;
  title: string;
  category: string;
  tech: string[];
  description: string;
  status: "live" | "coming-soon" | "wip";
  url: string;
  points: string;
}

export const hackathons: Hackathon[] = [
  { 
    id: 0, 
    title: "Portfolio Hub", 
    category: "Foundation",
    tech: ["Next.js 15","Supabase","Vercel","shadcn/ui"],
    description: "Central hub linking all Panaversity hackathon projects.",
    status: "live", 
    url: "https://hassaanfisky-portfolio.vercel.app", 
    points: "1000 + 500 bonus" 
  },
  { 
    id: 1, 
    title: "Physical AI & Robotics Textbook",
    category: "Education",
    tech: ["Next.js 15","FastAPI","Groq","Supabase pgvector"],
    description: "AI-native textbook with embedded RAG chatbot for interactive learning.",
    status: "live", 
    url: "https://panaversity-h1-robotics.vercel.app", 
    points: "100 + 200 bonus" 
  },
  { 
    id: 2, 
    title: "Evolution of Todo",
    category: "SaaS",
    tech: ["Next.js 15","FastAPI","Supabase","Kafka","Kubernetes","Dapr"],
    description: "5-phase journey from console app to cloud-native AI chatbot.",
    status: "live", 
    url: "https://hackathon-2-todo-iota.vercel.app", 
    points: "1000 + 600 bonus" 
  },
  { 
    id: 3, 
    title: "Reusable Intelligence + LearnFlow",
    category: "Developer Tools",
    tech: ["Agent Skills","MCP","Claude Code","Goose","Kubernetes","Dapr"],
    description: "Skills library with MCP code execution + AI Python tutoring platform.",
    status: "live", 
    url: "https://hassaanfisky-panaversity-learnflow.vercel.app", 
    points: "1000 + 400 bonus" 
  },
  { 
    id: 4, 
    title: "Course Companion FTE",
    category: "Digital Employee",
    tech: ["Next.js 15","Groq","FastAPI","Supabase","Agent Factory"],
    description: "24/7 AI educational tutor — Zero-Backend-LLM + Hybrid Intelligence.",
    status: "live", 
    url: "https://hassaanfisky-panaversity-companion.vercel.app", 
    points: "1000 + 500 bonus" 
  },
];
