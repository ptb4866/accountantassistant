from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router as api_router
from .middleware.audit import AuditMiddleware
from .db.session import engine
from .db.session import Base

app = FastAPI(title="Tech Accountant AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AuditMiddleware)
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "ok"}


@app.on_event("startup")
def on_startup():
    # Tables should be created via migration/init step
    pass
