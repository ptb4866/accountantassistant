# Technical Accountant AI Suite

AI-driven full-stack application that assists technical accountants with research, policies, reporting, systems, audit, and advice.

## Stack
- Backend: Node.js, Express, TypeScript, Zod
- AI: OpenAI API (via `openai` SDK)
- Frontend: React (Vite + TS), Tailwind CSS

## Prerequisites
- Node 18+
- OpenAI API key

## Setup
```bash
# from repo root
npm run install:all
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# edit backend/.env and set OPENAI_API_KEY
```

## Development
```bash
# run backend and frontend together
npm run dev
# backend: http://localhost:4000/health
# frontend: http://localhost:5173
```

## Build
```bash
npm run build
```

## Endpoints
- POST `/api/research`
- POST `/api/policy`
- POST `/api/reporting`
- POST `/api/system`
- POST `/api/audit`
- POST `/api/advice`

Each returns `{ content: string }`.

## Notes
- Tailwind v4 is configured via PostCSS plugin `@tailwindcss/postcss`.
- Configure `VITE_API_URL` in `frontend/.env` to point to backend when deploying.