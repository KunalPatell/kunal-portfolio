/**
 * Centralized portfolio content.
 * Edit this single file to update the entire site.
 * Last Updated: 2026-07-21 (V7 Resume, Interactive Skills, Modals & Terminal)
 */

export const profile = {
  name: "Kunal Patel",
  title: "AI Engineer & Automation Specialist",
  subtitle:
    "Building production AI applications end-to-end — multi-agent LLM systems (LangGraph, Groq LLaMA 3.3 70B, OpenAI, Gemini), RAG vector search pipelines, custom YOLOv8 computer vision models, and automated FastAPI backends.",
  email: "websitekunal@gmail.com",
  phone: "+91 84908 61586",
  location: "Ahmedabad, India",
  resumeUrl: "/resume.pdf",
  resumeAvailable: true,
  socials: {
    github: "https://github.com/KunalPatell",
    linkedin: "https://linkedin.com/in/kunalpatell",
    huggingface: "https://huggingface.co/Kunalptl777",
    portfolio: "https://kunal-portfolio-kunalpatells-projects.vercel.app",
  },
};

export const about = {
  headline: "AI Engineer who builds end-to-end, not just prompts.",
  paragraphs: [
    "I'm an AI Engineer with an MSc in Artificial Intelligence & Machine Learning, focused on shipping real, working AI products — not just experiments. I build full-stack AI applications using LLM APIs (OpenAI, Claude, Gemini), FastAPI backends, React/Next.js frontends, and Supabase/PostgreSQL databases.",
    "My projects span RAG-based document assistants, resume/JD matching engines, AI automation agents, computer vision systems, and interactive analytics dashboards — exactly the kind of end-to-end solutions digital agencies need to deliver value to clients.",
    "I'm comfortable across the entire stack: designing prompts, wiring LangChain/LangGraph agents, writing REST APIs, building frontend UIs, and deploying to production. I use modern AI-assisted tools (Cursor, GitHub Copilot) to ship prototypes fast and iterate with feedback."
  ],
  highlights: [
    { label: "Degree", value: "MSc AI & ML" },
    { label: "Stack", value: "Full-Stack AI" },
    { label: "APIs", value: "OpenAI · Claude · Gemini" },
  ],
};

export type ResumeSection = {
  title: string;
  items: { primary: string; secondary?: string; meta?: string; points?: string[] }[];
};

export const resume: ResumeSection[] = [
  {
    title: "Education",
    items: [
      {
        primary: "MSc - Artificial Intelligence & Machine Learning",
        secondary: "Sardar Patel University, Anand, Gujarat",
        meta: "Aug 2024 - Apr 2026",
        points: ["Focus on AI systems, deep learning, predictive analytics, and real-world AI applications."],
      },
      {
        primary: "Bachelor of Computer Applications (BCA)",
        secondary: "Dharmsinh Desai University, Nadiad, Gujarat",
        meta: "Jun 2020 - Apr 2023",
        points: ["Strong foundation in software development, databases, and backend technologies."],
      },
    ],
  },
  {
    title: "Experience",
    items: [
      {
        primary: "AI-ML Engineer",
        secondary: "Capermint Technologies, Ahmedabad",
        meta: "May 2026 - Present",
      },
      {
        primary: "AI Engineer",
        secondary: "Elite Workforces Services, Ahmedabad",
        meta: "Dec 2025 - May 2026",
      },
      {
        primary: "AI Engineer",
        secondary: "One Percent Media, Ahmedabad",
        meta: "May 2025 - Nov 2025",
      },
      {
        primary: "AI Automation Engineer",
        secondary: "Sevenseed Technology",
        meta: "Dec 2024 - May 2025",
      },
    ],
  },
  {
    title: "Certifications",
    items: [
      { primary: "AI / Machine Learning", secondary: "Specialization" },
      { primary: "Python & Data Science", secondary: "Certification" },
      { primary: "NLP & Cloud", secondary: "Foundations" },
    ],
  },
];

export type SkillItem = {
  name: string;
  level: number;
  experience: string;
  projectsBuilt: number;
};

export type SkillCategoryGroup = {
  category: string;
  skills: SkillItem[];
};

export const skillGroups: SkillCategoryGroup[] = [
  {
    category: "LLM APIs & AI",
    skills: [
      { name: "OpenAI API", level: 95, experience: "2+ Yrs", projectsBuilt: 9 },
      { name: "Claude API", level: 92, experience: "1.5 Yrs", projectsBuilt: 6 },
      { name: "Gemini API", level: 90, experience: "1+ Yr", projectsBuilt: 5 },
      { name: "LangChain", level: 92, experience: "2 Yrs", projectsBuilt: 8 },
      { name: "LangGraph", level: 88, experience: "1 Yr", projectsBuilt: 4 },
      { name: "RAG Pipelines", level: 94, experience: "2 Yrs", projectsBuilt: 7 },
      { name: "AI Agents", level: 90, experience: "1.5 Yrs", projectsBuilt: 6 },
      { name: "Prompt Engineering", level: 96, experience: "2+ Yrs", projectsBuilt: 12 },
      { name: "Vector Embeddings", level: 92, experience: "2 Yrs", projectsBuilt: 7 },
    ],
  },
  {
    category: "Full-Stack AI",
    skills: [
      { name: "Python", level: 96, experience: "3+ Yrs", projectsBuilt: 15 },
      { name: "FastAPI", level: 94, experience: "2 Yrs", projectsBuilt: 10 },
      { name: "Flask", level: 88, experience: "2 Yrs", projectsBuilt: 6 },
      { name: "Next.js", level: 90, experience: "2 Yrs", projectsBuilt: 8 },
      { name: "React", level: 90, experience: "2 Yrs", projectsBuilt: 8 },
      { name: "Streamlit", level: 92, experience: "2 Yrs", projectsBuilt: 5 },
      { name: "REST APIs", level: 95, experience: "3 Yrs", projectsBuilt: 14 },
      { name: "JSON & Data Pipelines", level: 96, experience: "3 Yrs", projectsBuilt: 15 },
    ],
  },
  {
    category: "Databases & Vector DBs",
    skills: [
      { name: "Supabase", level: 90, experience: "1.5 Yrs", projectsBuilt: 6 },
      { name: "Firebase", level: 86, experience: "1.5 Yrs", projectsBuilt: 4 },
      { name: "PostgreSQL", level: 88, experience: "2 Yrs", projectsBuilt: 7 },
      { name: "SQL", level: 90, experience: "3 Yrs", projectsBuilt: 10 },
      { name: "FAISS", level: 92, experience: "1.5 Yrs", projectsBuilt: 5 },
      { name: "Vector DBs (Chroma/FAISS)", level: 90, experience: "1.5 Yrs", projectsBuilt: 6 },
      { name: "Hugging Face", level: 92, experience: "2 Yrs", projectsBuilt: 8 },
    ],
  },
  {
    category: "AI/ML & Computer Vision",
    skills: [
      { name: "Machine Learning", level: 92, experience: "2.5 Yrs", projectsBuilt: 10 },
      { name: "Deep Learning", level: 88, experience: "2 Yrs", projectsBuilt: 6 },
      { name: "NLP", level: 90, experience: "2 Yrs", projectsBuilt: 7 },
      { name: "Computer Vision", level: 94, experience: "2 Yrs", projectsBuilt: 6 },
      { name: "TensorFlow / PyTorch", level: 86, experience: "2 Yrs", projectsBuilt: 5 },
      { name: "OpenCV", level: 94, experience: "2 Yrs", projectsBuilt: 6 },
      { name: "YOLO Face/Object AI", level: 90, experience: "1.5 Yrs", projectsBuilt: 4 },
      { name: "Model Training & Evaluation", level: 88, experience: "2 Yrs", projectsBuilt: 8 },
    ],
  },
  {
    category: "Automation & Tools",
    skills: [
      { name: "n8n Automation", level: 95, experience: "1.5 Yrs", projectsBuilt: 12 },
      { name: "Workflow Automation", level: 96, experience: "2 Yrs", projectsBuilt: 14 },
      { name: "API Integrations", level: 95, experience: "3 Yrs", projectsBuilt: 16 },
      { name: "Git / GitHub", level: 92, experience: "3 Yrs", projectsBuilt: 20 },
      { name: "Cursor & AI Coding", level: 98, experience: "2 Yrs", projectsBuilt: 18 },
      { name: "Postman", level: 92, experience: "3 Yrs", projectsBuilt: 12 },
      { name: "Jupyter", level: 94, experience: "3 Yrs", projectsBuilt: 15 },
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  architecture?: string[];
  challenges?: string[];
  features: string[];
  techStack: string[];
  status?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imageAlt?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Rakshak AI",
    category: "AI Public Safety & Vision Suite",
    description:
      "5-in-1 AI public safety platform combining automatic FIR generation with Bharatiya Nyaya Sanhita (BNS/IPC) legal code recommendations, multilingual AI chatbot, cybercrime scam analyzer, emergency SOS geolocation dispatch, and Computer Vision workstations for safety mask PPE compliance scanning, facial attendance verification, and YOLO chair/occupancy detection.",
    features: ["Automatic FIR (BNS/IPC)", "Multilingual AI Chatbot", "Cybercrime Scam Analyzer", "Emergency Geolocation Dispatch", "PPE & YOLO Vision Suite"],
    techStack: ["Python", "FastAPI", "BNS Legal RAG", "YOLOv8", "OpenCV", "Next.js"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/rakshak-ai/",
    accent: "from-red-500/20 to-amber-400/10",
    image: "/projects/rakshak-ai.svg",
    imageAlt: "Rakshak AI citizen assistant police copilot and vision security suite",
  },
  {
    title: "Sevenseed",
    category: "AI Venture Studio",
    description:
      "AI-native venture studio platform behind 7 startups in tech, edtech, health, construction, social impact, and e-commerce. Features a shared vector RAG + multi-agent backend, 2-week MVP sprint architecture, and full BYOK (Bring Your Own Key) zero-cost user model.",
    features: ["Venture Ideation AI", "Shared RAG Backbone", "Self API Key / BYOK Support", "2-Week MVP Sprint", "Docker Deployments"],
    techStack: ["Next.js", "FastAPI", "LangGraph", "ChromaDB", "Groq LLaMA 3.3", "Docker"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com",
    accent: "from-violet-500/20 to-emerald-400/10",
    image: "/projects/rag-assistant.svg",
    imageAlt: "Sevenseed AI venture studio platform",
  },
  {
    title: "Comonk Technology",
    category: "AI Career Platform",
    description:
      "Enterprise AI career guidance platform — multi-agent LangGraph counselors, ATS resume optimizer, mock interview simulator, semantic job matching, and salary intelligence with self-service API key integration.",
    features: ["Multi-Agent Graph", "Mock Interview Simulator", "Self API & Token Manager", "ATS Resume Optimizer"],
    techStack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "Groq API", "Next.js"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/comonk-ai/",
    image: "/projects/rag-assistant.svg",
    imageAlt: "Comonk AI career intelligence platform",
    accent: "from-purple-500/20 to-indigo-400/10",
  },
  {
    title: "Sevenforce",
    category: "AI Workforce Automation",
    description:
      "AI-powered workforce and business automation platform — autonomous agent workforce handling HR onboarding, employee scheduling, automated payroll, and process intelligence using multi-agent workflows.",
    features: ["Autonomous Agent Workforce", "HR Automation", "Payroll AI", "Business Process Intelligence", "BYOK Support"],
    techStack: ["Python", "FastAPI", "LangGraph", "n8n", "RAG Pipelines", "Next.js"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/sevenforce/",
    accent: "from-blue-500/20 to-cyan-400/10",
    image: "/projects/ai-automation-agents.svg",
    imageAlt: "Sevenforce AI workforce automation platform",
  },
  {
    title: "AVP University (AVPU)",
    category: "AI EdTech Platform",
    description:
      "AI digital university platform — personal AI tutor with adaptive learning, semantic course recommendations, placement matcher, automated assessments, and LLM-driven curriculum planning.",
    features: ["Personal AI Tutor", "Adaptive Assessments", "Placement Matcher", "LLM Curriculum", "Zero-Cost BYOK"],
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Next.js", "Groq API"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/avpu/",
    accent: "from-sky-500/20 to-blue-400/10",
    image: "/projects/bestseller-analytics.svg",
    imageAlt: "AVP University AI EdTech platform",
  },
  {
    title: "Decode Forest Pharmacy",
    category: "AI HealthTech",
    description:
      "Free AI healthcare and pharmacy guidance platform — 24/7 free health advice, emergency hospital & blood bank finder, OCR prescription scanner, drug compatibility checker, and refill tracking.",
    features: ["Free Health Advice AI", "Emergency Hospital Finder", "OCR Prescription Reader", "Drug Compatibility AI"],
    techStack: ["Python", "FastAPI", "OCR", "LLMs", "ChromaDB", "Next.js"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/pharmacy/",
    accent: "from-emerald-500/20 to-teal-400/10",
    image: "/projects/face-mask-detection.svg",
    imageAlt: "Decode Forest Pharmacy AI healthcare platform",
  },
  {
    title: "Breakdown Factor",
    category: "AI ConTech Platform",
    description:
      "AI construction technology platform — computer vision property damage detection (using custom YOLO best.pt model), ML cost estimation, structural defect analysis, and automated BOQ generation.",
    features: ["Property Damage CV (YOLO best.pt)", "Site Safety Monitors", "ML Cost Estimator", "BOQ Generator"],
    techStack: ["Python", "YOLOv8 (best.pt)", "OpenCV", "FastAPI", "TensorFlow", "Next.js"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/breakdown/",
    accent: "from-amber-500/20 to-orange-400/10",
    image: "/projects/lcb-face-matcher.svg",
    imageAlt: "Breakdown Factor AI construction technology platform",
  },
  {
    title: "AVP Charitable Trust",
    category: "AI Social Impact",
    description:
      "100% free non-profit AI platform — uses ML to identify community welfare needs, semantically match beneficiaries to scholarships, detect funding anomalies, and produce transparent donor impact reports.",
    features: ["100% Free Welfare Services", "AI Beneficiary Matching", "Anomaly Detection", "Impact Reporting"],
    techStack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "MiniLM Embeddings", "Groq LLaMA 3.3"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/trust/",
    accent: "from-pink-500/20 to-rose-400/10",
    image: "/projects/avp-charitable-trust.svg",
    imageAlt: "AVP Charitable Trust AI social impact platform",
  },
  {
    title: "AVP Emart",
    category: "AI E-Commerce",
    description:
      "AI smart shopping & price comparator platform — cross-references live prices across Amazon, Flipkart, Reliance Digital, and Snapdeal with ML value scoring, deal recommendations, and target price alerts.",
    features: ["4-Store Live Price Compare", "ML Value Scoring", "Price Drop Alerts", "Purchase Timing AI"],
    techStack: ["Python", "FastAPI", "Next.js", "Web Scraping", "ML Scoring", "SQLite"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/avp-emart/",
    image: "/projects/ai-price-comparator.svg",
    imageAlt: "AVP Emart AI price comparison e-commerce platform",
    accent: "from-orange-500/20 to-yellow-400/10",
  },
];


export const certifications: { title: string; tag: string }[] = [
  { title: "Artificial Intelligence", tag: "AI" },
  { title: "Machine Learning", tag: "ML" },
  { title: "Python Programming", tag: "Python" },
  { title: "Data Science", tag: "Data Science" },
  { title: "Cloud Fundamentals", tag: "Cloud" },
  { title: "Natural Language Processing", tag: "NLP" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aiSuggestions = [
  "What is Kunal's current role at Capermint Technology?",
  "Show Computer Vision & Face Intelligence projects",
  "How does Kunal build n8n & Python automation workflows?",
  "Download Kunal's latest V7 PDF Resume",
];

export function isPlaceholderUrl(url?: string) {
  if (!url) return true;
  return url === "https://github.com/" || url === "https://kunalpatel.dev";
}

export function resumeAction() {
  if (profile.resumeAvailable) {
    return {
      href: profile.resumeUrl,
      label: "Download Resume",
      external: true,
      note: "Full PDF resume.",
    };
  }

  return {
    href: `mailto:${profile.email}?subject=Resume%20request%20-%20Kunal%20Patel`,
    label: "Request Resume",
    external: false,
    note: "Email Kunal for the latest copy.",
  };
}

export const experiences = [
  {
    role: "AI-ML Engineer",
    company: "Capermint Technology, Ahmedabad",
    period: "May 2026 – Present",
    highlights: [
      "Architected real-time AI/ML game engines and dynamic NPC interaction behaviors, reducing model inference latency by 35% across mobile and web platforms.",
      "Engineered telemetry-driven data pipelines and automated user engagement scoring systems, increasing D1 user retention by 22%.",
      "Integrated high-throughput REST API microservices in FastAPI, seamlessly connecting ML inference endpoints with front-end game loops."
    ],
  },
  {
    role: "AI Engineer",
    company: "Elite Workforces Services, Ahmedabad",
    period: "Dec 2025 – May 2026",
    highlights: [
      "Spearheaded end-to-end enterprise process automation using Python, REST APIs, and n8n, automating 40%+ of manual processes and saving 120+ engineering hours/month.",
      "Integrated multi-provider LLM fallback gateways (OpenAI, Groq LLaMA) with automated failover handling and real-time execution analytics.",
      "Built custom performance analytics dashboards, translating raw workflow execution logs into actionable operational insights for client stakeholders."
    ],
  },
  {
    role: "AI Engineer",
    company: "One Percent Media, Ahmedabad",
    period: "May 2025 – Nov 2025",
    highlights: [
      "Designed high-throughput AI content automation pipelines using custom Python scripts and n8n webhooks, handling 5,000+ daily operational requests.",
      "Engineered automated OCR & NLP data extraction tools, reducing document processing turnaround time from hours to seconds with 98% accuracy."
    ],
  },
  {
    role: "AI Automation Engineer",
    company: "Sevenseed Technology, Ahmedabad",
    period: "Dec 2024 – May 2025",
    highlights: [
      "Engineered JSON API-driven automation engines compatible with n8n, Make, and Zapier, orchestrating micro-app workflows across 7+ SaaS platforms.",
      "Standardized workflow error-handling protocols and API webhooks, eliminating pipeline drop-offs and maintaining 99.8% background task reliability."
    ],
  },
];
