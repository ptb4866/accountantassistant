from __future__ import annotations

from typing import List
import numpy as np
from app.core.config import settings

try:
    from openai import OpenAI  # type: ignore
    _has_openai = True
except Exception:
    OpenAI = None  # type: ignore
    _has_openai = False


def _normalize(vec: np.ndarray) -> np.ndarray:
    norm = np.linalg.norm(vec)
    if norm == 0:
        return vec
    return vec / norm


def embed_texts(texts: List[str]) -> np.ndarray:
    if _has_openai and settings.openai_api_key:
        client = OpenAI(api_key=settings.openai_api_key)
        # Use a small, inexpensive embedding model; can be swapped later
        resp = client.embeddings.create(model="text-embedding-3-small", input=texts)
        vectors = [np.array(d.embedding, dtype=np.float32) for d in resp.data]
        return np.vstack([_normalize(v) for v in vectors])
    # Fallback: simple hashing-based bag-of-words embedding (deterministic, low quality)
    dim = 384
    mat = np.zeros((len(texts), dim), dtype=np.float32)
    for i, text in enumerate(texts):
        for token in text.lower().split():
            idx = hash(token) % dim
            mat[i, idx] += 1.0
        mat[i] = _normalize(mat[i])
    return mat
