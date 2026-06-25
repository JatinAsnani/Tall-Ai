# TallAI Deployment Fixes for Antigravity

## Context
TallAI backend is deployed on Render at `https://tallai.onrender.com`.
Frontend is a Vite + React app that needs to be deployed on Vercel.
Backend is FastAPI + SQLite (via fallback in database.py).

---

## Change 1 — `backend/main.py`

**Problem:** CORS `allow_origins` is hardcoded to `http://localhost:5173`. Once the frontend is on Vercel, all API requests will be blocked by CORS.

**What to do:** Instead of hardcoding the origin, read it from an environment variable called `FRONTEND_URL`. Keep `http://localhost:5173` as a fallback so local dev still works. Both the env var value and the localhost fallback should be in the `allow_origins` list together.

Also add a `GET /` route that returns a simple JSON response (e.g. status ok, app name). Right now the root returns 404 which looks broken on Render.

---

## Change 2 — `backend/.env`

**Problem:** The `.env` file contains the real Gemini API key and the MySQL database URL with the actual password. This file is likely being committed to GitHub which is a security risk.

**What to do:**
- Change `DATABASE_URL` to use SQLite: `sqlite:///./tallai.db` (the database.py already has fallback logic for this, so it will work on Render without a MySQL server)
- Replace the real `GEMINI_API_KEY` value with a placeholder like `your_gemini_api_key_here`
- Add a new variable `FRONTEND_URL` with value `http://localhost:5173` (for local dev)

---

## Change 3 — `frontend/.env`

**Problem:** `VITE_API_BASE_URL` points to `http://localhost:8000`. The deployed frontend on Vercel needs to call the Render backend URL instead.

**What to do:** Keep the file as-is for local dev (`http://localhost:8000`). Vercel will use its own environment variable set in the dashboard — no file change needed here. Just make sure this file is in `.gitignore` so it doesn't override Vercel's env.

---

## Change 4 — `backend/.gitignore`

**Problem:** `.env`, `.venv/`, and `tallai.db` should not be in the repository.

**What to do:** Make sure the backend `.gitignore` includes: `.env`, `.venv/`, `__pycache__/`, `*.pyc`, and `tallai.db`. Create the file if it doesn't exist.

---

## Change 5 — `frontend/.gitignore`

**Problem:** `node_modules/`, `dist/`, and `.env` should not be in the repository.

**What to do:** Make sure the frontend `.gitignore` includes: `.env`, `node_modules/`, and `dist/`. Create the file if it doesn't exist.

---

## After pushing — Manual steps required (Antigravity cannot do these)

### On Render dashboard:
- Go to the TallAI service → Environment tab
- Add all the variables from `backend/.env` with their real values (not placeholders)
- The real `GEMINI_API_KEY` goes here, not in the file
- Add `FRONTEND_URL` = the Vercel URL once it's known (e.g. `https://tallai.vercel.app`)
- Make sure the Start Command is: `cd backend && uvicorn main:app --host 0.0.0.0 --port 10000`

### On Vercel dashboard:
- Create new project → import the same GitHub repo
- Set Root Directory to `frontend`
- Add environment variable: `VITE_API_BASE_URL` = `https://tallai.onrender.com`
- Deploy

---

## Summary table

| What | Where | Why |
|------|-------|-----|
| CORS origin from env var | `backend/main.py` | Hardcoded localhost blocks Vercel frontend |
| Add `GET /` route | `backend/main.py` | Root 404 looks broken on Render |
| Switch DB to SQLite | `backend/.env` | No MySQL server available on Render free tier |
| Remove real API key | `backend/.env` | Security — real key goes in Render env vars |
| Add `FRONTEND_URL` var | `backend/.env` | Needed for the CORS fix above |
| Add `.gitignore` entries | both frontend and backend | Prevent secrets and build artifacts in repo |
