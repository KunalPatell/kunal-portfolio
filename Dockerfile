# ─────────────────────────────────────────────────────────────
# Stage 1 — build the Next.js frontend into a static export (/out)
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS frontend
WORKDIR /app/frontend

# Install deps first for better layer caching
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY frontend/ ./
RUN npm run build   # produces /app/frontend/out (output: "export")

# ─────────────────────────────────────────────────────────────
# Stage 2 — FastAPI runtime that serves the API + the static site
# ─────────────────────────────────────────────────────────────
FROM python:3.12-slim AS runtime

# Hugging Face Spaces convention: run as a non-root user with id 1000
RUN useradd -m -u 1000 user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PYTHONUNBUFFERED=1

WORKDIR $HOME/app

COPY --chown=user backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY --chown=user backend/ ./
# Drop the built frontend where main.py expects it (backend/static)
COPY --chown=user --from=frontend /app/frontend/out ./static

USER user

# Hugging Face Spaces routes traffic to port 7860
EXPOSE 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
