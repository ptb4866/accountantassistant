from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import QAInteraction
from app.services.vector_store import VECTOR_STORE


async def answer_question(db: Session, question: str, user_id: int | None):
    # Placeholder answer. Later, integrate RAG and LLM
    answer_text = (
        "This is a placeholder answer. The system will analyze GAAP/IFRS, your policies, and documents, "
        "and respond with citations and reasoning."
    )
    # Retrieve top documents for context
    top_docs = VECTOR_STORE.similarity_search(question, k=5)
    citations = [
        {"document_id": doc_id, "score": score, "snippet": text[:300]}
        for doc_id, text, score in top_docs
    ]

    interaction = QAInteraction(
        user_id=user_id,
        question=question,
        answer=answer_text,
        citations=citations or None,
        created_at=datetime.utcnow(),
    )
    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    return {"answer": answer_text, "interaction_id": interaction.id, "citations": citations}
