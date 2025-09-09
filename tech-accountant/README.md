# Tech Accountant AI

An AI-driven platform that assists technical accountants with research, policy implementation, financial reporting, system oversight, auditing support, and technical Q&A.

## Features
- Chat Q&A with citations from ingested documents
- Generate structured technical accounting reports (placeholder)
- Policies CRUD
- Documents CRUD
- Audit logs middleware and endpoint
- Standards search (seeded ASC examples)

## Stack
- FastAPI, Uvicorn
- SQLAlchemy (SQLite by default)
- In-memory vector search (embeddings + BM25)

## Setup
1. Create virtual environment and install deps:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Create database and tables:
```bash
python -c "from app.db.session import Base, engine; from app.models import models; Base.metadata.create_all(bind=engine); print('DB ready')"
```

3. Optional: set OpenAI key for embeddings (fallback used otherwise)
```bash
echo 'OPENAI_API_KEY=sk-...' >> .env
```

4. Run server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Endpoints
- GET `/api/health`
- POST `/api/chat` { question, user_id? }
- POST `/api/report` { topic, scope? }
- GET `/api/policies` | POST `/api/policies`
- GET `/api/documents` | POST `/api/documents`
- GET `/api/audit/logs`
- GET `/api/standards/search?q=...`
- POST `/api/admin/sync_vectors`

## Minimal UI
Open `http://localhost:8000/api/` for a simple chat page.

## Dev Smoke Test
```bash
PYTHONPATH=$(pwd) python - <<'PY'
from app.db.session import Base, engine, SessionLocal
from app.models.models import Document
Base.metadata.create_all(bind=engine)
sess = SessionLocal()
if not sess.query(Document).first():
    sess.add(Document(title='ASC 606 Overview', content='ASC 606 five-step model...', source='seed'))
    sess.commit()
sess.close()
from fastapi.testclient import TestClient
from app.main import app
with TestClient(app) as client:
    print('health:', client.get('/api/health').json())
    print('sync:', client.post('/api/admin/sync_vectors').json())
    print('chat:', client.post('/api/chat', json={'question':'How does ASC 606 handle variable consideration?'}).json())
PY
```