/**
 * Centralized portfolio content.
 * Edit this single file to update the entire site.
 */

export const profile = {
  name: "Kunal Patel",
  title: "AI Engineer | Data Scientist | Automation Developer",
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
    portfolio: "https://kunalpatel.dev",
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

export const skillGroups: { category: string; skills: string[] }[] = [
  {
    category: "LLM APIs & AI",
    skills: [
      "OpenAI API",
      "Claude API",
      "Gemini API",
      "LangChain",
      "LangGraph",
      "RAG Pipelines",
      "AI Agents",
      "Prompt Engineering",
      "Vector Embeddings",
    ],
  },
  {
    category: "Full-Stack",
    skills: ["Python", "FastAPI", "Flask", "Next.js", "React", "Streamlit", "REST APIs", "JSON"],
  },
  {
    category: "Databases & Cloud",
    skills: ["Supabase", "Firebase", "PostgreSQL", "SQL", "FAISS", "Vector DBs", "Hugging Face"],
  },
  {
    category: "AI/ML & Computer Vision",
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "OpenCV", "YOLO", "Model Training"],
  },
  {
    category: "Automation & Tools",
    skills: ["n8n", "Workflow Automation", "API Integrations", "Git/GitHub", "Cursor", "Postman", "Jupyter"],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
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
    title: "AI JD Matcher",
    category: "Document AI",
    description:
      "Full-stack AI tool that parses a resume and job description, runs semantic similarity scoring via LLM embeddings, and returns a match score with a skill-gap analysis and AI-generated recommendations.",
    features: ["JD Parsing", "Skill Gap Analysis", "Match Score", "AI Recommendations"],
    techStack: ["Python", "OpenAI API", "FastAPI", "Next.js", "Vector Embeddings"],
    status: "Live on Hugging Face",
    liveUrl: "https://kunalptl777-resume-jd-matcher.hf.space",
    githubUrl: "https://github.com/KunalPatell/resume-jd-matcher",
    image: "/projects/ai-jd-matcher.svg",
    imageAlt: "Abstract resume to job description AI matching tool",
    accent: "from-emerald-500/20 to-cyan-400/10",
  },
  {
    title: "RAG Document Assistant",
    category: "RAG / AI Agent",
    description:
      "Retrieval-Augmented Generation chatbot that ingests PDFs, builds a semantic vector index, and answers questions using LLM + document context — full FastAPI backend with a React chat UI.",
    features: ["PDF Ingestion", "Vector Search", "LLM Q&A", "Conversation History"],
    techStack: ["Python", "LangChain", "OpenAI API", "FAISS", "FastAPI", "Next.js"],
    status: "Live",
    liveUrl: "https://huggingface.co/spaces/Kunalptl777",
    image: "/projects/rag-assistant.svg",
    imageAlt: "Abstract RAG document assistant chatbot project cover",
    accent: "from-violet-500/20 to-indigo-400/10",
  },
  {
    title: "Rakshak AI",
    category: "AI Public Safety Platform",
    description:
      "AI-powered citizen assistance and smart policing platform designed for Ahmedabad Police — LLM chatbot, FIR generator, and voice assistant in a full-stack Next.js + FastAPI app.",
    features: ["AI Chatbot", "FIR Generator", "Voice Assistant", "Emergency Support"],
    techStack: ["LLMs", "FastAPI", "Next.js", "Speech AI"],
    status: "Live on Hugging Face",
    liveUrl: "https://huggingface.co/spaces/Kunalptl777/rakshak-ai",
    githubUrl: "https://github.com/KunalPatell/rakshak-ai",
    image: "/projects/rakshak-ai.svg",
    imageAlt: "Abstract public safety AI dashboard cover for Rakshak AI",
    accent: "from-blue-500/20 to-cyan-400/10",
  },
  {
    title: "LCB Face Matcher",
    category: "Computer Vision",
    description:
      "AI-assisted facial similarity matching system for investigation support workflows.",
    features: ["Face Matching", "Similarity Detection", "Computer Vision"],
    techStack: ["Python", "OpenCV", "Deep Learning", "Gradio"],
    status: "Live on Hugging Face",
    liveUrl: "https://huggingface.co/spaces/Kunalptl777/lcb-face-matcher",
    githubUrl: "https://github.com/KunalPatell/lcb-face-matcher",
    image: "/projects/lcb-face-matcher.svg",
    imageAlt: "Abstract computer vision face matching project cover",
    accent: "from-indigo-500/20 to-blue-400/10",
  },
  {
    title: "AI Price Comparator",
    category: "Data Intelligence",
    description: "Multi-source product intelligence and comparison system.",
    features: ["Product Search", "Comparison Engine", "Data Aggregation"],
    techStack: ["Python", "Web Scraping", "REST APIs", "Gradio"],
    status: "Live on Hugging Face",
    liveUrl: "https://huggingface.co/spaces/Kunalptl777/price-comparator",
    githubUrl: "https://github.com/KunalPatell/price-comparator",
    image: "/projects/ai-price-comparator.svg",
    imageAlt: "Abstract product intelligence and price comparison project cover",
    accent: "from-sky-500/20 to-emerald-400/10",
  },
  {
    title: "Bestseller Analytics Dashboard",
    category: "Business Intelligence",
    description:
      "Interactive analytics dashboard for bestseller product analysis and insights.",
    features: ["Data Visualization", "Analytics", "Dashboard Reporting"],
    techStack: ["Python", "Streamlit", "Pandas", "Plotly"],
    status: "Live on Hugging Face",
    liveUrl: "https://huggingface.co/spaces/Kunalptl777/bestseller-analytics",
    githubUrl: "https://github.com/KunalPatell/bestseller-analytics",
    image: "/projects/bestseller-analytics.svg",
    imageAlt: "Abstract business analytics dashboard project cover",
    accent: "from-violet-500/20 to-blue-400/10",
  },
  {
    title: "Face Mask Detection",
    category: "Computer Vision",
    description:
      "Real-time face mask detection system using deep learning and computer vision.",
    features: ["Live Detection", "Image Processing", "Deep Learning"],
    techStack: ["Python", "TensorFlow", "OpenCV", "CNN"],
    status: "Live on Hugging Face",
    liveUrl: "https://huggingface.co/spaces/Kunalptl777/mask-detection",
    githubUrl: "https://github.com/KunalPatell/mask-detection",
    image: "/projects/face-mask-detection.svg",
    imageAlt: "Abstract real-time computer vision detection project cover",
    accent: "from-cyan-500/20 to-teal-400/10",
  },
  {
    title: "AI Automation Agents",
    category: "Automation",
    description:
      "Collection of AI-powered workflow automation systems built using APIs, LLMs, and automation platforms.",
    features: ["Blog Automation", "E-commerce Automation", "AI Workflows"],
    techStack: ["n8n", "LangChain", "Python", "REST APIs"],
    image: "/projects/ai-automation-agents.svg",
    imageAlt: "Abstract AI workflow automation project cover",
    accent: "from-blue-500/20 to-indigo-400/10",
  },
  {
    title: "Workflow Automation Systems",
    category: "Automation",
    description:
      "Designed and built API-based automation workflows and pipelines for freelance clients.",
    features: ["Workflow Design", "Template Conversion", "API Integration"],
    techStack: ["n8n", "Make.com", "Activepieces", "JSON"],
    status: "Freelance",
    liveUrl: "https://www.pucho.ai",
    image: "/projects/ai-automation-agents.svg",
    imageAlt: "Abstract workflow automation project cover",
    accent: "from-amber-500/20 to-orange-400/10",
  },
  {
    title: "Face Attendance System",
    category: "Computer Vision",
    description:
      "Automated attendance system that recognizes faces in real time to mark presence, replacing manual roll-calls.",
    features: ["Face Recognition", "Real-time Marking", "OpenCV"],
    techStack: ["Python", "OpenCV", "face_recognition", "NumPy"],
    githubUrl: "https://github.com/KunalPatell/local-face-recognition",
    accent: "from-teal-500/20 to-cyan-400/10",
  },
  {
    title: "Chair Detection System",
    category: "Computer Vision",
    description:
      "Real-time occupancy monitoring that detects chairs and seating usage in a space using object detection.",
    features: ["Object Detection", "Occupancy Monitoring", "YOLO"],
    techStack: ["Python", "YOLO", "OpenCV", "Deep Learning"],
    githubUrl: "https://github.com/KunalPatell/local-face-recognition",
    accent: "from-emerald-500/20 to-teal-400/10",
  },
  {
    title: "Movie Recommender",
    category: "Machine Learning",
    description:
      "Content-based recommendation engine that suggests movies using similarity across metadata and tags.",
    features: ["Recommendation", "Similarity Search", "Content-Based"],
    techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    accent: "from-violet-500/20 to-indigo-400/10",
  },
  {
    title: "Email Spam Classifier",
    category: "NLP",
    description:
      "Text classification model that flags spam vs. legitimate email using NLP feature extraction.",
    features: ["Text Classification", "Spam Detection", "NLP"],
    techStack: ["Python", "Scikit-learn", "NLTK", "TF-IDF"],
    accent: "from-blue-500/20 to-sky-400/10",
  },
  {
    title: "WhatsApp Chat Analyzer",
    category: "Data Analytics",
    description:
      "Analyzes exported WhatsApp chats for activity trends, top contributors, word clouds, and emoji insights.",
    features: ["Chat Analytics", "Visualization", "Word Cloud"],
    techStack: ["Python", "Pandas", "Matplotlib", "Streamlit"],
    accent: "from-green-500/20 to-emerald-400/10",
  },
  {
    title: "Plant Disease Detection",
    category: "Computer Vision",
    description:
      "Deep learning classifier that identifies crop diseases from leaf images to support early intervention.",
    features: ["Image Classification", "Deep Learning", "CNN"],
    techStack: ["Python", "TensorFlow", "Keras", "CNN"],
    accent: "from-lime-500/20 to-green-400/10",
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
  "What LLM APIs has he worked with?",
  "Has he built any RAG applications?",
  "Can he build full-stack AI apps?",
  "Tell me about his AI projects.",
  "What is his experience?",
  "What technologies does he know?",
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
    role: "AI-ML Engineer Intern",
    company: "Capermint Technologies",
    period: "May 2026 - Present",
    highlights: [
      "Building full-stack AI micro-apps and intelligent features using LLM APIs (OpenAI, Gemini) integrated into mobile and web platforms.",
      "Developing end-to-end AI solutions: FastAPI backends, React/Next.js frontends, and automation workflows that enhance product performance and user engagement.",
      "Shipping working prototypes quickly using modern AI-assisted development tools (Cursor, GitHub Copilot)."
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Elite Workforces Services",
    period: "Feb 2026 - Apr 2026",
    highlights: [
      "Built document automation tools and AI-powered business workflows using Python, REST APIs, and LLM APIs, reducing manual effort by ~40%.",
      "Designed full-stack AI applications on the automationowl SaaS platform — from backend logic to frontend dashboards.",
      "Converted business requirements into working AI prototypes rapidly, iterating based on client feedback."
    ],
  },
  {
    role: "AI Automation Intern",
    company: "One Percent Media",
    period: "Jan 2026 - Feb 2026",
    highlights: [
      "Developed and tested AI automation pipelines using Python, n8n, and LLM APIs for content and operational workflows.",
      "Integrated AI services (OpenAI, Claude) into business processes, improving content generation speed and accuracy.",
      "Built performance analysis dashboards with data visualization and AI-generated insights."
    ],
  },
  {
    role: "Freelance - Automation Developer",
    company: "pucho.ai (Remote)",
    period: "Jan 2026 - Feb 2026",
    highlights: [
      "Designed and shipped API-based automation workflows on platforms similar to n8n, Make, Activepieces, and Zapier.",
      "Converted workflow templates into production-ready automation pipelines with JSON logic and REST API integrations.",
      "Debugged and optimized AI flow outputs, improving accuracy and edge-case handling."
    ],
  },
];
