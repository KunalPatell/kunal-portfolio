/**
 * Centralized portfolio content.
 * Edit this single file to update the entire site.
 * Last Updated: 2026-07-21 (V7 Resume, Interactive Skills, Modals & Terminal)
 */

export const profile = {
  name: "Kunal Patel",
  title: "Data Scientist | AI/ML Engineer",
  subtitle:
    "Building full-stack AI apps end-to-end — LLM APIs (OpenAI, Claude, Gemini), RAG pipelines, document automation, and intelligent micro-apps that solve real business problems.",
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
        primary: "AI-ML Engineer Intern",
        secondary: "Capermint Technologies, Ahmedabad",
        meta: "May 2026 - Present",
        points: [
          "Contributing to AI-powered gaming solutions and interactive digital experiences for mobile and web platforms.",
          "Developing and integrating intelligent features, automation workflows, and data-driven solutions to enhance game performance and user engagement."
        ],
      },
      {
        primary: "AI Engineer Intern",
        secondary: "Elite Workforces Services, Ahmedabad",
        meta: "Feb 2026 - Apr 2026",
        points: [
          "Automated business processes using Python, APIs, and n8n, reducing manual effort by ~40%.",
          "Designed scalable automation systems on the SaaS platform (automationowl) for real-world use cases."
        ],
      },
      {
        primary: "AI Automation Intern",
        secondary: "One Percent Media, Ahmedabad",
        meta: "Jan 2026 - Feb 2026",
        points: [
          "Developed and tested automation workflows using Python, n8n, and AI tools.",
          "Integrated AI services into content and operational workflows.",
          "Assisted in performance analysis and dashboard insights."
        ],
      },
      {
        primary: "Freelance - Automation Developer",
        secondary: "pucho.ai (Remote)",
        meta: "Jan 2026 - Feb 2026",
        points: [
          "Designed automation workflows on a platform similar to n8n, Make, Activepieces, and Zapier.",
          "Converted workflow templates into functional automation pipelines.",
          "Built API-based automation systems using JSON and logic-based workflows."
        ],
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
    title: "Sevenseed",
    category: "AI Venture Studio",
    description:
      "AI-native venture studio that ideates, incubates, and launches market-leading AI SaaS startups in India. Built on a shared vector RAG + LLM backend — ships MVP in 2 weeks. 7 ventures incubated, ₹1.5Cr+ studio GMV, 100% AI-native.",
    features: ["Venture Ideation AI", "Shared RAG Backbone", "2-Week MVP Sprint", "Docker Deployments"],
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
      "Enterprise AI career intelligence platform for Gujarat IT/AIML job seekers — multi-agent LangGraph counselors, ATS optimizer, mock interview simulator, semantic job matching, and salary intelligence. Deployed live on Render.",
    features: ["Multi-Agent Graph", "Mock Interview Simulator", "ATS Optimizer", "Salary Intelligence"],
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
      "AI-powered workforce and business automation platform — autonomous agent workforce that handles HR onboarding, employee scheduling, payroll automation, and business process intelligence using multi-agent workflows.",
    features: ["Autonomous Agent Workforce", "HR Automation", "Payroll AI", "Business Process Intelligence"],
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
      "AI-powered digital university — personal AI tutor with adaptive learning, semantic course recommendations, automated assessments, placement matcher, and LLM-driven curriculum planning for modern learners.",
    features: ["Personal AI Tutor", "Adaptive Assessments", "Placement Matcher", "LLM Curriculum"],
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
      "AI-powered pharmacy and healthcare platform — OCR prescription reader, drug compatibility checker, AI refill tracker, medicine interaction alerts, and personalized health recommendation engine.",
    features: ["OCR Prescription Reader", "Drug Compatibility AI", "Refill Tracker", "Health Recommendations"],
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
      "AI-driven construction technology platform — computer vision site safety monitors, ML cost predictors, structural crack defect detectors, and project risk intelligence for construction firms.",
    features: ["Site Safety CV", "Cost Predictor", "Crack Detection AI", "Risk Intelligence"],
    techStack: ["Python", "YOLO", "OpenCV", "FastAPI", "TensorFlow", "Next.js"],
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
      "Non-profit AI platform that uses ML to identify community needs, semantically match beneficiaries to scholarship and welfare programs, detect funding anomalies, and generate transparent donor impact reports.",
    features: ["AI Needs Assessment", "Beneficiary Matching RAG", "Anomaly Detection", "Impact Reporting"],
    techStack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "MiniLM Embeddings", "Groq LLaMA 3.3"],
    status: "Live",
    liveUrl: "https://sevenseed.onrender.com/trust/",
    accent: "from-pink-500/20 to-rose-400/10",
    image: "/projects/rakshak-ai.svg",
    imageAlt: "AVP Charitable Trust AI social impact platform",
  },
  {
    title: "AVP Emart",
    category: "AI E-Commerce",
    description:
      "AI-powered smart shopping and price comparison platform — compares live prices across 4 major online stores, applies ML value-scoring, provides personalized deal recommendations and purchase timing predictions.",
    features: ["Live Price Comparison", "ML Value Scoring", "Deal Recommendations", "Purchase Timing AI"],
    techStack: ["Python", "Streamlit", "Web Scraping", "ML Models", "REST APIs"],
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
  { label: "Resume", href: "#resume" },
  { label: "Skills", href: "#skills" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Ask AI", href: "#ask-ai" },
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
      "Contributed to AI-powered gaming solutions and interactive digital experiences for mobile and web platforms.",
      "Developed and integrated intelligent features, automation workflows, and data-driven solutions to enhance game performance and user engagement."
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Elite Workforces Services, Ahmedabad",
    period: "Dec 2025 – May 2026",
    highlights: [
      "Automated business processes using Python, APIs, and n8n, reducing manual effort by ~40%.",
      "Integrated AI services into content and operational workflows.",
      "Assisted in performance analysis and dashboard insights."
    ],
  },
  {
    role: "AI Intern",
    company: "One Percent Media, Ahmedabad",
    period: "Oct 2025 – Dec 2025",
    highlights: [
      "Developed and tested automation workflows using Python, n8n, and AI tools.",
      "Integrated AI services into content and operational workflows.",
      "Assisted in performance analysis and dashboard insights."
    ],
  },
  {
    role: "AI Automation Engineer",
    company: "Sevenseed Technology",
    period: "May 2025 – Nov 2025",
    highlights: [
      "Designed automation workflows on a platform similar to n8n, Make, Activepieces, and Zapier.",
      "Converted workflow templates into functional automation pipelines.",
      "Built API-based automation systems using JSON and logic-based workflows."
    ],
  },
];
