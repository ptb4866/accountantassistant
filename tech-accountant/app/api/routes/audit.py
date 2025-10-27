from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import AuditLog


router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("/logs")
def get_logs(limit: int = 100, db: Session = Depends(get_db)):
    return db.query(AuditLog).order_by(AuditLog.id.desc()).limit(limit).all()
