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
    tech: ["Next.js 15", "React 19", "Tailwind 4", "Framer Motion"],
    description: "The editorial gateway to the Panaversity autonomous ecosystem.",
    status: "live", 
    url: "https://panaversity-h0-portfolio.vercel.app", 
    points: "1000 + 500 bonus" 
  },
  { 
    id: 1, 
    title: "AI Robotics Textbook",
    category: "Education",
    tech: ["Next.js 15", "FastAPI", "Groq", "pgvector"],
    description: "Interactive AI-native textbook with integrated RAG chat and deep reasoning capabilities.",
    status: "live", 
    url: "https://panaversity-h1-robotics.vercel.app", 
    points: "100 + 200 bonus" 
  },
  { 
    id: 2, 
    title: "Smart Todo Engine",
    category: "SaaS",
    tech: ["Next.js 15", "Supabase", "Better-Auth", "Kafka", "Dapr"],
    description: "Multi-phase SaaS evolution from a local console to a cloud-native agentic task manager.",
    status: "live", 
    url: "https://evolution-of-todo.vercel.app", 
    points: "1000 + 600 bonus" 
  },
  { 
    id: 3, 
    title: "LearnFlow Platform",
    category: "Developer Tools",
    tech: ["Next.js 15", "MCP", "Skills Library", "Kubernetes"],
    description: "A high-fidelity skill library with MCP-enabled code execution and Python tutoring.",
    status: "live", 
    url: "https://panaversity-h3-learnflow-prod.vercel.app", 
    points: "1000 + 400 bonus" 
  },
  { 
    id: 4, 
    title: "Course Companion FTE",
    category: "Digital Employee",
    tech: ["Next.js 15", "React 19", "Agent Factory", "Groq"],
    description: "A world-class digital employee providing 24/7 high-fidelity educational support.",
    status: "live", 
    url: "https://panaversity-h4-companion.vercel.app", 
    points: "1000 + 500 bonus" 
  },
];
