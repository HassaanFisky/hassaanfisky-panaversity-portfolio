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

/**
 * HASSAAN AI ARCHITECT — Project Portfolio
 * Humanized labels and professional project descriptions.
 */
export const hackathons: Hackathon[] = [
  { 
    id: 0, 
    title: "Portfolio Hub — Ecosystem Command Center", 
    category: "Phase I",
    tech: ["Next.js 15", "Unified Auth", "Fluid Animation"],
    description: "The primary entry point for the Panaversity ecosystem. This hub synchronizes five specialized modules into a single high-fidelity interface with real-time health monitoring and session persistence.",
    status: "live", 
    url: "https://panaversity-h0-portfolio.vercel.app/", 
    imageUrl: "/blueprint-footer.png",
    points: "1,600 Achievement Points" 
  },
  { 
    id: 1, 
    title: "Robotics Textbook — Interactive AI Mentor",
    category: "Phase II",
    tech: ["Docusaurus", "AI Search", "Technical Writing"],
    description: "A next-generation digital manual for future engineers. Features an integrated smart assistant that provides real-time clarifications on complex robotics hardware and software concepts.",
    status: "live", 
    url: "https://hackathon-1-robotics.vercel.app", 
    imageUrl: "/h1-thumb.png",
    points: "1,500 Achievement Points" 
  },
  { 
    id: 2, 
    title: "Productivity Stack — Scalable Cloud Systems",
    category: "Phase III",
    tech: ["FastAPI", "PostgreSQL", "Next.js"],
    description: "A production-grade task management system demonstrating professional backend architecture. Features JWT-hardened isolation, high-performance API endpoints, and real-time state synchronization.",
    status: "live", 
    url: "https://evolution-of-todo.vercel.app", 
    imageUrl: "/h2-thumb.png",
    points: "1,600 Achievement Points" 
  },
  { 
    id: 3, 
    title: "LearnFlow Platform — Agentic Blueprints",
    category: "Phase IV",
    tech: ["Flux Mode", "Cognitive Pressure", "Modular AI"],
    description: "A high-performance learning environment featuring the 'Flux Mode' interactive mechanics. Designed to build core AI skills through time-dilated quizzes, focus beams, and reality-glitch perception training.",
    status: "live", 
    url: "https://learnflow-platform-h3.vercel.app", 
    imageUrl: "/h3-thumb.png",
    points: "1,400 Achievement Points" 
  },
  { 
    id: 4, 
    title: "Project AIRA — Intelligent Digital FTE",
    category: "Phase V",
    tech: ["Autonomous CRM", "Agent Orchestration", "CRM"],
    description: "A state-of-the-art managed agent platform. ARIA operates as an autonomous Digital FTE, streamlining customer relations and managing complex operational workflows with zero human intervention.",
    status: "live", 
    url: "https://hassaanfisky-aira-digital-myyhjxjm9-hassaans-projects-444.vercel.app", 
    imageUrl: "/h4-thumb.png",
    points: "1,500 Achievement Points" 
  }
];
