from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Document


class DocumentCreate(BaseModel):
    title: str
    content: str
    source: str | None = None


router = APIRouter(prefix="/documents", tags=["documents"])


@router.get("")
def list_documents(db: Session = Depends(get_db)):
    return db.query(Document).order_by(Document.id.desc()).all()


@router.post("")
def create_document(body: DocumentCreate, db: Session = Depends(get_db)):
    d = Document(title=body.title, content=body.content, source=body.source)
    db.add(d)
    db.commit()
    db.refresh(d)
    return d


@router.get("/{doc_id}")
def get_document(doc_id: int, db: Session = Depends(get_db)):
    d = db.get(Document, doc_id)
    if not d:
        raise HTTPException(status_code=404, detail="Document not found")
    return d


@router.delete("/{doc_id}")
def delete_document(doc_id: int, db: Session = Depends(get_db)):
    d = db.get(Document, doc_id)
    if not d:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(d)
    db.commit()
    return {"ok": True}
