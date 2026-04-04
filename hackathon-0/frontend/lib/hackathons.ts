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
    title: "Portfolio Hub", 
    category: "Foundation",
    tech: ["Next.js 15", "React 19", "Tailwind 4", "Framer Motion"],
    description: "The editorial gateway to the Panaversity autonomous ecosystem.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://panaversity-h0-portfolio.vercel.app", 
    imageUrl: "/blueprint-footer.png",
    points: "1000 + 500 bonus" 
  },
  { 
    id: 1, 
    title: "Physical AI Robotics Textbook",
    category: "Education",
    tech: ["Docusaurus", "FastAPI", "Gemini", "Qdrant", "RAG"],
    description: "Autonomous AI-native textbook and RAG chatbot for Physical AI and Robotics curriculum.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H1_URL || "https://panaversity-h1-robotics.vercel.app", 
    imageUrl: "/h1-thumb.png",
    points: "1200 + 300 bonus" 
  },
  { 
    id: 2, 
    title: "Evolution of To-Do",
    category: "SaaS",
    tech: ["Next.js 15", "Supabase", "Better-Auth", "Kafka", "Dapr"],
    description: "Multi-phase SaaS evolution from a local console to a cloud-native agentic task manager.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H2_URL || "https://evolution-of-todo.vercel.app", 
    imageUrl: "/h2-thumb.png",
    points: "1000 + 600 bonus" 
  },
  { 
    id: 3, 
    title: "LearnFlow Platform",
    category: "Developer Tools",
    tech: ["Next.js 15", "MCP", "Skills Library", "Kubernetes"],
    description: "A high-fidelity skill library with MCP-enabled code execution and Python tutoring.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H3_URL || "https://hassaanfisky-panaversity-learnflow-x01rnwy17.vercel.app", 
    imageUrl: "/h2-thumb.png",
    points: "1000 + 400 bonus" 
  },
  { 
    id: 4, 
    title: "Course Companion",
    category: "Digital Employee",
    tech: ["Next.js 15", "React 19", "Agent Factory", "Groq"],
    description: "A world-class digital employee providing 24/7 high-fidelity educational support.",
    status: "live", 
    url: process.env.NEXT_PUBLIC_H4_URL || "https://hassaanfisky-aira-digital-fte.vercel.app/", 
    imageUrl: "/h4-thumb.png",
    points: "1000 + 500 bonus" 
  }
];
