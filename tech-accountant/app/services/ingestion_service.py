from __future__ import annotations

from typing import List
from sqlalchemy.orm import Session
from app.models.models import Document
from app.services.vector_store import VECTOR_STORE


def sync_vector_store(db: Session) -> int:
    docs: List[Document] = db.query(Document).all()
    if not docs:
        return 0
    VECTOR_STORE.add([d.id for d in docs], [d.content for d in docs])
    return len(docs)
