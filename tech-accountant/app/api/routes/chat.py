from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.chat_service import answer_question


class ChatRequest(BaseModel):
    question: str
    user_id: int | None = None


router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("")
async def chat(req: ChatRequest, db: Session = Depends(get_db)):
    if not req.question or not req.question.strip():
        raise HTTPException(status_code=400, detail="Question is required")
    result = await answer_question(db=db, question=req.question, user_id=req.user_id)
    return result
