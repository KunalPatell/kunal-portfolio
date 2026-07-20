"""
Knowledge base about Kunal Patel + a lightweight offline retrieval engine.

This powers the "Ask Kunal AI" assistant. When an LLM API key is configured,
KNOWLEDGE_BASE is used as grounding context. When no key is present, the
keyword retriever below answers from these same facts so the assistant still
works on a fresh Hugging Face Space with zero secrets.
"""
from __future__ import annotations

import re

PROFILE = {
    "name": "Kunal Patel",
    "title": "AI Engineer | Data Scientist | Automation Developer",
    "education": "MSc in Artificial Intelligence & Machine Learning (SPU) & BCA (DDU)",
    "location": "Ahmedabad, India",
    "email": "websitekunal@gmail.com",
    "linkedin": "https://www.linkedin.com/in/kunalpatell/",
    "huggingface": "https://huggingface.co/Kunalptl777",
    "github": "https://github.com/KunalPatell",
}

# Each entry: keywords that route to it + the answer text.
KB_ENTRIES: list[dict] = [
    {
        "keywords": ["who", "about", "yourself", "kunal", "introduce", "background", "summary"],
        "answer": (
            "Kunal Patel is an AI Engineer, Data Scientist, and Automation Developer with "
            "an MSc in AI & Machine Learning. He builds production-grade AI applications and "
            "intelligent automation — spanning LLM apps, computer vision, NLP, and end-to-end "
            "workflow automation. He's based in Ahmedabad, India."
        ),
    },
    {
        "keywords": ["project", "projects", "built", "build", "portfolio", "work", "demo"],
        "answer": (
            "Kunal has built several AI projects:\n"
            "• Rakshak AI — an AI public-safety platform for Ahmedabad Police (live on Hugging Face).\n"
            "• LCB Face Matcher — facial similarity matching for investigation support (live on Hugging Face).\n"
            "• AI Price Comparator — multi-source product comparison engine (live on Hugging Face).\n"
            "• Bestseller Analytics Dashboard — interactive product analytics (live on Hugging Face).\n"
            "• Face Mask Detection — real-time detection with deep learning (live on Hugging Face).\n"
            "• AI Automation Agents — blog/e-commerce workflow automation with LLMs and n8n.\n"
            "• Workflow Automation Systems — freelance workflow design and API-based automation pipelines (built on n8n, Make, Activepieces).\n"
            "• Computer Vision projects — Face Attendance System (OpenCV face recognition) and Chair Detection System (real-time occupancy with YOLO).\n"
            "• ML & NLP projects — Movie Recommender, Email Spam Classifier, WhatsApp Chat Analyzer, and Plant Disease Detection.\n"
            "His live demos are on Hugging Face: https://huggingface.co/Kunalptl777"
        ),
    },
    {
        "keywords": ["startups", "companies", "ventures", "sevenseed", "avpu", "university", "pharmacy", "construction", "emart", "trust", "group"],
        "answer": (
            "Kunal is the AI engineer behind the Sevenseed AI Venture Studio portfolio. "
            "Under the Sevenseed umbrella, he has developed landing portals and AI backends for 7 ventures:\n"
            "• Sevenseed (AI Venture Studio) — The parent studio validating and launching AI ventures.\n"
            "• Comonk Technology (AI Career Intelligence) — Live platform offering multi-agent career advice and mock interviews.\n"
            "• Alpaben Vipulbhai Patel University (AVPU) — AI-native education portal with personal AI tutors and adaptive learning.\n"
            "• Decode Forest Pharmacy — AI pharmacy prototype featuring prescription OCR reading and safety verification.\n"
            "• Breakdown Factor Construction — AI construction platform offering site safety monitoring and cost forecasting.\n"
            "• AVP Charitable Trust — AI-driven needs matching and transparent impact reporting.\n"
            "• AVP Emart — AI e-commerce price comparison (linking to price-com streamlit demo).\n"
            "You can explore all startup landing pages live on this website under the /startups/ path."
        ),
    },
    {
        "keywords": ["tech", "technology", "technologies", "stack", "skill", "skills", "language", "tools", "know"],
        "answer": (
            "Kunal's toolkit:\n"
            "• AI/ML: Machine Learning, Deep Learning, NLP, LLM Applications, Prompt Engineering, Regression, Classification, Model Evaluation.\n"
            "• Programming: Python, R, SQL, REST APIs, FastAPI, JSON, Web Scraping, Data Pipelines.\n"
            "• Automation: n8n, LangChain, Workflow Automation, API Integrations, Process Optimization.\n"
            "• Tools: Git/GitHub, Postman, Jupyter Notebook, Google Colab, Cloud, Data Visualization, Streamlit, Hugging Face."
        ),
    },
    {
        "keywords": ["experience", "intern", "internship", "job", "worked", "company", "career"],
        "answer": (
            "Kunal's work experience includes:\n"
            "• AI-ML Engineer at Capermint Technology, Ahmedabad (May 2026 – Present) — contributing to AI-powered gaming solutions and interactive digital experiences for mobile and web platforms, developing intelligent features and automation workflows.\n"
            "• AI Engineer Intern at Elite Workforces Services, Ahmedabad (Dec 2025 – May 2026) — automated business processes via Python, APIs, and n8n, reducing manual effort by ~40%, integrating AI services into operational workflows.\n"
            "• AI Intern at One Percent Media, Ahmedabad (Oct 2025 – Dec 2025) — developed and tested automation workflows using Python, n8n, and AI tools, integrating AI services into operational workflows.\n"
            "• AI Automation Engineer at Sevenseed Technology (May 2025 – Nov 2025) — designed automation workflows on platforms similar to n8n/Make/Activepieces, converting templates into functional JSON logic pipelines."
        ),
    },
    {
        "keywords": ["education", "degree", "study", "studied", "university", "msc", "bca", "qualification"],
        "answer": (
            "Kunal holds:\n"
            "• Master of Science (MSc) in Artificial Intelligence & Machine Learning from Sardar Patel University (SPU), Anand, Gujarat (Aug 2024 – Apr 2026).\n"
            "• Bachelor of Computer Applications (BCA) from Dharmsinh Desai University (DDU), Nadiad, Gujarat (Jun 2020 – Apr 2023)."
        ),
    },
    {
        "keywords": ["computer vision", "cv", "face", "image", "detection", "opencv"],
        "answer": (
            "In computer vision, Kunal built the LCB Face Matcher (facial similarity for "
            "investigations) and a real-time Face Mask Detection system using deep learning — "
            "both live on Hugging Face."
        ),
    },
    {
        "keywords": ["automation", "agent", "agents", "n8n", "langchain", "workflow"],
        "answer": (
            "Kunal builds AI automation agents and workflow pipelines using LLMs, LangChain, n8n, "
            "and API integrations — including blog automation and e-commerce automation systems."
        ),
    },
    {
        "keywords": ["rakshak", "police", "safety", "fir", "emergency"],
        "answer": (
            "Rakshak AI is an AI-powered citizen assistance and smart policing platform designed "
            "for Ahmedabad Police. It includes an AI chatbot, FIR generator, voice assistant, and "
            "emergency support. It is live on Hugging Face: "
            "https://huggingface.co/spaces/Kunalptl777/rakshak-ai"
        ),
    },
    {
        "keywords": ["pucho", "pucho.ai", "freelance", "workflow", "workforce"],
        "answer": (
            "Kunal built Workflow Automation Systems as a freelance developer for pucho.ai. "
            "He designed and converted automation templates into functional pipelines, and built "
            "API-based automation systems using JSON and logic-based workflows."
        ),
    },
    {
        "keywords": ["contact", "email", "reach", "hire", "linkedin", "connect", "github"],
        "answer": (
            f"You can reach Kunal at {PROFILE['email']}, connect on LinkedIn "
            f"({PROFILE['linkedin']}), see his code on GitHub ({PROFILE['github']}), "
            f"or his live demos on Hugging Face ({PROFILE['huggingface']})."
        ),
    },
]

# Full text block used as grounding context for an LLM.
KNOWLEDGE_BASE = "\n\n".join(
    [
        f"Name: {PROFILE['name']}",
        f"Title: {PROFILE['title']}",
        f"Education: {PROFILE['education']}",
        f"Location: {PROFILE['location']}",
        f"Email: {PROFILE['email']}",
        f"LinkedIn: {PROFILE['linkedin']}",
        f"GitHub: {PROFILE['github']}",
        f"Hugging Face: {PROFILE['huggingface']}",
        *[e["answer"] for e in KB_ENTRIES],
    ]
)

SYSTEM_PROMPT = (
    "You are 'Kunal AI', a friendly assistant embedded in Kunal Patel's portfolio website. "
    "Answer questions about Kunal using ONLY the provided context. Be concise, warm, and "
    "professional. If something isn't in the context, say you don't have that detail and "
    "suggest contacting Kunal directly. Speak about Kunal in the third person.\n\n"
    f"CONTEXT:\n{KNOWLEDGE_BASE}"
)

_WORD_RE = re.compile(r"[a-z0-9]+")


def _tokens(text: str) -> set[str]:
    return set(_WORD_RE.findall(text.lower()))


def offline_answer(message: str) -> str:
    """Keyword-scored retrieval over KB_ENTRIES. Always returns something useful."""
    msg = message.lower()
    msg_tokens = _tokens(message)

    best, best_score = None, 0
    for entry in KB_ENTRIES:
        score = 0
        for kw in entry["keywords"]:
            if " " in kw:
                if kw in msg:
                    score += 3
            elif kw in msg_tokens:
                score += 1
        if score > best_score:
            best, best_score = entry, score

    if best is None or best_score == 0:
        return (
            "I'm Kunal's portfolio assistant. I can tell you about his projects, skills, "
            "experience, education, or how to get in touch. What would you like to know? "
            "You can also reach Kunal directly at " + PROFILE["email"] + "."
        )
    return best["answer"]
