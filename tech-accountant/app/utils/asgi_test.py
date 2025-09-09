from fastapi.testclient import TestClient
from app.main import app


def smoke():
    with TestClient(app) as client:
        r = client.get("/api/health")
        assert r.status_code == 200
        r = client.post("/api/chat", json={"question": "How does ASC 606 handle variable consideration?"})
        assert r.status_code == 200
        return r.json()


if __name__ == "__main__":
    print(smoke())
