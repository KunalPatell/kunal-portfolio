---
title: Kunal Patel Portfolio
emoji: 🤖
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
license: mit
short_description: AI Engineer portfolio with an Ask Kunal AI assistant
---

# Kunal Patel — AI Engineer Portfolio

A modern, premium, AI-focused portfolio: animated hero, projects, an
**Ask Kunal AI** assistant, and a working contact form.

- **Frontend:** Next.js 15 · TypeScript · TailwindCSS · Framer Motion (static export)
- **Backend:** FastAPI (serves the static site **and** the API in one container)
- **Deploy:** single Docker image → runs anywhere, **one-click on Hugging Face Spaces**

The whole site is one container: FastAPI serves the exported Next.js frontend
and exposes `/api/*`. No separate services to manage.

---

## 🚀 Deploy to Hugging Face Spaces (easiest path)

1. Create a new Space → **SDK: Docker** → **Blank**.
2. Push this repository to the Space (the included `Dockerfile` and the
   `README.md` front matter above are all it needs):
   ```bash
   git init
   git add .
   git commit -m "Kunal Patel portfolio"
   git remote add origin https://huggingface.co/spaces/<your-username>/<space-name>
   git push origin main
   ```
3. The Space builds the Dockerfile and serves on port **7860**. Done. ✅

**Optional — smarter AI replies:** add a repo secret in the Space settings:
- `GEMINI_API_KEY` (recommended) or `OPENAI_API_KEY`

Without a key the assistant still works using a built-in knowledge base, so
the Space is fully functional on first deploy.

---

## 🧑‍💻 Local development

You can run it either as one container (like production) or as a split dev setup.

### Option A — one container (matches production)
```bash
docker build -t kunal-portfolio .
docker run -p 7860:7860 kunal-portfolio
# open http://localhost:7860
```

### Option B — split dev (hot reload)
Requires **Node 18+** and **Python 3.10+**.

```bash
# Terminal 1 — backend
cd backend
python -m venv .venv && . .venv/Scripts/activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 2 — frontend
cd frontend
npm install
cp .env.local.example .env.local      # sets NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
# open http://localhost:3000
```

---

## ✏️ Editing content

Almost all site content lives in one file:
**[`frontend/src/lib/data.ts`](frontend/src/lib/data.ts)** — profile, about,
skills, experience, projects, certifications, nav links.

The assistant's knowledge lives in
**[`backend/app/knowledge.py`](backend/app/knowledge.py)** — keep it in sync
with `data.ts` so the AI answers stay accurate.

### Still to personalize (search for `TODO`)
- `frontend/src/lib/data.ts`: GitHub URL, final portfolio domain, university/year, specific certifications
- Add your resume PDF at `frontend/public/resume.pdf`, then set `resumeAvailable: true` in `frontend/src/lib/data.ts`
- The contact form opens a ready-to-send email in v1. The backend `/api/contact` route is still available for a future email provider integration.

---

## 📁 Structure
```
Portfolio/
├── Dockerfile            # builds frontend + runs backend (port 7860)
├── README.md             # this file (+ HF Space config)
├── frontend/             # Next.js 15 app (static export)
│   └── src/lib/data.ts   # ← edit your content here
└── backend/              # FastAPI: /api/assistant/chat, /api/contact, serves static
    └── app/knowledge.py  # ← assistant knowledge base
```

## 🔌 API
| Method | Endpoint               | Purpose                         |
|--------|------------------------|---------------------------------|
| POST   | `/api/assistant/chat`  | Ask Kunal AI                    |
| POST   | `/api/contact`         | Contact form submission         |
| GET    | `/api/health`          | Health + active AI provider     |
| GET    | `/docs`                | Swagger UI                      |
