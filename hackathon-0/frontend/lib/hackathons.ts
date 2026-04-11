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
    title: "Personal AI Assistant — Building Autonomous Agents", 
    category: "Phase I",
    tech: ["AI Automation", "Productivity System"],
    description: "Creating a personal AI-driven workflow that manages daily operations and communications. This system acts as a proactive digital partner, handling tasks and business affairs automatically.",
    status: "live", 
    url: "https://panaversity-h0-portfolio.vercel.app/", 
    imageUrl: "/blueprint-footer.png",
    points: "1,600 Achievement Points" 
  },
  { 
    id: 1, 
    title: "AI & Robotics Educational Roadmap",
    category: "Phase II",
    tech: ["Interactive Learning", "AI Search", "Smart Documentation"],
    description: "A next-generation digital textbook designed for future robotics engineers. It features an integrated smart assistant that helps users learn through interactive dialogue and knowledge retrieval.",
    status: "live", 
    url: "https://hackathon-1-robotics.vercel.app", 
    imageUrl: "/h1-thumb.png",
    points: "1,500 Achievement Points" 
  },
  { 
    id: 2, 
    title: "Advanced Task Ecosystem — Modern Architecture",
    category: "Phase III",
    tech: ["Scalable Systems", "Cloud Deployment", "Database Architecture"],
    description: "A comprehensive journey from building basic applications to deploying complex, cloud-native systems. This project demonstrates high-performance message processing and resilient infrastructure.",
    status: "live", 
    url: "https://evolution-of-todo.vercel.app", 
    imageUrl: "/h2-thumb.png",
    points: "1,600 Achievement Points" 
  },
  { 
    id: 3, 
    title: "Reusable Intelligence — Learning Flow Platform",
    category: "Phase IV",
    tech: ["Agentic Infrastructure", "AI Capabilities", "System Skills"],
    description: "Building the core intelligence layer where AI agents can share capabilities and skills. The focus is on creating a modular system where skills are independent, reusable assets.",
    status: "live", 
    url: "https://learnflow-platform-h3.vercel.app", 
    imageUrl: "/h3-thumb.png",
    points: "1,400 Achievement Points" 
  },
  { 
    id: 4, 
    title: "Project AIRA — Intelligent AI Architect CRM",
    category: "Phase V",
    tech: ["AI Management", "Custom Agent Design", "Automated Tutors"],
    description: "A state-of-the-art AI management platform that provides 24/7 intelligent tutoring and support. It utilizes custom agent factories to deliver high-performance AI services at scale.",
    status: "live", 
    url: "https://hassaanfisky-aira-digital-fte.vercel.app", 
    imageUrl: "/h4-thumb.png",
    points: "1,500 Achievement Points" 
  }
];
