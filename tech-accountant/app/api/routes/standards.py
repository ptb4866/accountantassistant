from fastapi import APIRouter
from rank_bm25 import BM25Okapi


ASC_SECTIONS = {
    "ASC 606": "Revenue from Contracts with Customers: five-step model...",
    "ASC 842": "Leases: recognition of right-of-use asset and lease liability...",
    "ASC 718": "Compensation—Stock Compensation: grant-date fair value...",
}

TOKENS = [text.lower().split() for text in ASC_SECTIONS.values()]
BM25 = BM25Okapi(TOKENS)
NAMES = list(ASC_SECTIONS.keys())
TEXTS = list(ASC_SECTIONS.values())

router = APIRouter(prefix="/standards", tags=["standards"])


@router.get("/search")
def search(q: str, k: int = 3):
    scores = BM25.get_scores(q.lower().split())
    idxs = sorted(range(len(scores)), key=lambda i: -scores[i])[:k]
    return [
        {"name": NAMES[i], "excerpt": TEXTS[i], "score": float(scores[i])}
        for i in idxs
    ]
