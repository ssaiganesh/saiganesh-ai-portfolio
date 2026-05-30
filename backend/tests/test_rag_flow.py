from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_rag_chat_endpoint_returns_answer():
    response = client.post("/api/chat", json={"message": "What did Sai Ganesh do at GIC?"})
    assert response.status_code == 200

    data = response.json()
    assert "answer" in data
    assert isinstance(data["answer"], str)
    assert data["answer"].strip()
    assert isinstance(data.get("source_documents", []), list)
