from fastapi import APIRouter
from .chat import router as chat_router
from .report import router as report_router
from .policies import router as policies_router
from .documents import router as documents_router
from .audit import router as audit_router
from .standards import router as standards_router
from .ui import router as ui_router
from app.services.ingestion_service import sync_vector_store
from app.db.session import SessionLocal

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "healthy"}

router.include_router(chat_router)
router.include_router(report_router)
router.include_router(policies_router)
router.include_router(documents_router)
router.include_router(audit_router)
router.include_router(standards_router)
router.include_router(ui_router)


@router.post("/admin/sync_vectors")
def admin_sync_vectors():
    db = SessionLocal()
    try:
        count = sync_vector_store(db)
        return {"indexed": count}
    finally:
        db.close()
