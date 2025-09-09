from __future__ import annotations

from typing import List, Tuple
import numpy as np
from rank_bm25 import BM25Okapi
from app.services.embedding_service import embed_texts


class InMemoryVectorStore:
    def __init__(self):
        self.texts: List[str] = []
        self.ids: List[int] = []
        self.embeddings: np.ndarray | None = None
        self.bm25: BM25Okapi | None = None

    def _ensure_bm25(self):
        if self.bm25 is None:
            tokenized_corpus = [t.lower().split() for t in self.texts]
            self.bm25 = BM25Okapi(tokenized_corpus)

    def add(self, ids: List[int], texts: List[str]) -> None:
        self.ids.extend(ids)
        self.texts.extend(texts)
        new_emb = embed_texts(texts)
        if self.embeddings is None:
            self.embeddings = new_emb
        else:
            self.embeddings = np.vstack([self.embeddings, new_emb])
        self.bm25 = None  # reset, will rebuild lazily

    def similarity_search(self, query: str, k: int = 5) -> List[Tuple[int, str, float]]:
        results: List[Tuple[int, str, float]] = []
        # Vector search if embeddings exist
        if self.embeddings is not None and len(self.texts) > 0:
            q_emb = embed_texts([query])[0]
            sims = (self.embeddings @ q_emb)
            idxs = np.argsort(-sims)[:k]
            for idx in idxs:
                results.append((self.ids[int(idx)], self.texts[int(idx)], float(sims[int(idx)])))
        # BM25 fallback/merge
        self._ensure_bm25()
        if self.bm25 is not None:
            scores = self.bm25.get_scores(query.lower().split())
            bm25_idxs = np.argsort(-scores)[:k]
            for idx in bm25_idxs:
                candidate = (self.ids[int(idx)], self.texts[int(idx)], float(scores[int(idx)]))
                results.append(candidate)
        # Deduplicate by id keeping best score
        best: dict[int, Tuple[int, str, float]] = {}
        for doc_id, text, score in results:
            if doc_id not in best or score > best[doc_id][2]:
                best[doc_id] = (doc_id, text, score)
        merged = sorted(best.values(), key=lambda x: -x[2])[:k]
        return merged


VECTOR_STORE = InMemoryVectorStore()
