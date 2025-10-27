from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Policy


class PolicyCreate(BaseModel):
    name: str
    description: str | None = None
    text: str


router = APIRouter(prefix="/policies", tags=["policies"])


@router.get("")
def list_policies(db: Session = Depends(get_db)):
    return db.query(Policy).all()


@router.post("")
def create_policy(body: PolicyCreate, db: Session = Depends(get_db)):
    if db.query(Policy).filter(Policy.name == body.name).first():
        raise HTTPException(status_code=400, detail="Policy with this name already exists")
    p = Policy(name=body.name, description=body.description, text=body.text)
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


@router.get("/{policy_id}")
def get_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.get(Policy, policy_id)
    if not p:
        raise HTTPException(status_code=404, detail="Policy not found")
    return p


@router.delete("/{policy_id}")
def delete_policy(policy_id: int, db: Session = Depends(get_db)):
    p = db.get(Policy, policy_id)
    if not p:
        raise HTTPException(status_code=404, detail="Policy not found")
    db.delete(p)
    db.commit()
    return {"ok": True}
