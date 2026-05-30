import os
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from supabase import Client, create_client

try:
    from openai import OpenAI
    OPENAI_CLIENT_CLASS = OpenAI
except ImportError:
    import openai as openai_legacy
    OPENAI_CLIENT_CLASS = None
    openai = openai_legacy

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
EMBEDDING_MODEL = "text-embedding-3-small"
CHAT_MODEL = "gpt-4o-mini"
TABLE_NAME = "portfolio_knowledge"

app = FastAPI(title="Sai Ganesh Portfolio RAG Agent")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://saiganesh-ai-portfolio.vercel.app"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.mount("/static", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")


@app.get("/", include_in_schema=False)
async def serve_frontend():
    return FileResponse(STATIC_DIR / "index.html")


def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise EnvironmentError("OPENAI_API_KEY is missing from the environment.")

    if OPENAI_CLIENT_CLASS:
        return OpenAI(api_key=api_key)

    import openai as legacy_openai

    legacy_openai.api_key = api_key
    return legacy_openai


def get_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_KEY")
    if not url or not key:
        raise EnvironmentError("SUPABASE_URL or SUPABASE_SERVICE_KEY is missing from the environment.")
    return create_client(url, key)


class ChatRequest(BaseModel):
    message: str


def create_embedding(text: str) -> List[float]:
    client = get_openai_client()
    try:
        if hasattr(client, "embeddings"):
            response = client.embeddings.create(model=EMBEDDING_MODEL, input=text, timeout=30)
        else:
            response = client.Embedding.create(model=EMBEDDING_MODEL, input=text, timeout=30)
    except Exception as error:
        raise RuntimeError(f"Failed to generate query embedding: {error}") from error

    data = getattr(response, "data", None) or response.get("data", None)
    if not data:
        raise RuntimeError("OpenAI returned no embedding data for the query.")

    item = data[0]
    if isinstance(item, dict):
        embedding = item.get("embedding")
    else:
        embedding = getattr(item, "embedding", None)

    if embedding is None:
        raise RuntimeError("OpenAI returned malformed embedding data for the query.")
    return embedding


def query_supabase(context_embedding: List[float]) -> List[Dict[str, Any]]:
    client = get_supabase_client()
    try:
        rpc_response = client.rpc(
            "match_portfolio_knowledge",
            {
                "query_embedding": context_embedding,
                "match_threshold": 0.15,
                "match_count": 6,
            },
        ).execute()
    except Exception as error:
        raise RuntimeError(f"Supabase RPC query failed: {error}") from error

    if getattr(rpc_response, "error", None):
        raise RuntimeError(f"Supabase RPC returned an error: {rpc_response.error}")

    return getattr(rpc_response, "data", None) or []


def format_context_chunks(rows: List[Dict[str, Any]]) -> str:
    if not rows:
        return ""

    formatted = []
    for row in rows:
        content = row.get("content") or row.get("content", "")
        similarity = row.get("similarity")
        metadata = row.get("metadata") or {}
        source = metadata.get("source") if isinstance(metadata, dict) else None
        prefix = f"[{source}] " if source else ""
        formatted.append(f"{prefix}{content}")

    return "\n\n".join(formatted)


def build_system_prompt(context: str) -> str:
    return (
        "You are an intelligent and technical assistant representing Shankar Sai Ganesh. "
        "Answer user questions using the portfolio knowledge provided and keep the response conversational, precise, and factual. "
        "If the precise answer is not available in the retrieved portfolio context, say so clearly and offer an alternative summary. "
        "The portfolio includes projects such as EchoChamber, Smart Task Hive, WingSpan, Marine Vision, NUS MTech AI Systems coursework, and senior technical experience. "
        "Here is the retrieved context: \n\n"
        f"{context}"
    )


def generate_response(user_message: str, context_rows: List[Dict[str, Any]]) -> str:
    client = get_openai_client()
    context_text = format_context_chunks(context_rows)
    system_prompt = build_system_prompt(context_text)

    messages = [
        {"role": "system", "content": system_prompt},
        {
            "role": "user",
            "content": (
                "Please answer the question with the highest confidence from the portfolio data. "
                f"User question: {user_message}"
            ),
        },
    ]

    try:
        if hasattr(client, "chat") and hasattr(client.chat, "completions"):
            response = client.chat.completions.create(
                model=CHAT_MODEL,
                messages=messages,
                temperature=0.2,
                max_tokens=700,
            )
            answer = response.choices[0].message.content
        else:
            response = client.ChatCompletion.create(
                model=CHAT_MODEL,
                messages=messages,
                temperature=0.2,
                max_tokens=700,
            )
            answer = response.choices[0].message.content
    except Exception as error:
        raise RuntimeError(f"OpenAI chat completion failed: {error}") from error

    return answer.strip()


@app.get("/api/health")
async def health_check() -> Dict[str, str]:
    return {"status": "ok", "service": "sai-ganesh-portfolio-rag"}


@app.post("/api/chat")
async def chat(request: ChatRequest) -> JSONResponse:
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="message field must not be empty")

    try:
        query_embedding = create_embedding(request.message)
        rows = query_supabase(query_embedding)
        if not rows:
            answer = (
                "I could not find matching portfolio context for that query. "
                "Please ask another question or provide more detail."
            )
            return JSONResponse(
                status_code=200,
                content={"answer": answer, "source_documents": [], "retrieved": False},
            )

        answer = generate_response(request.message, rows)
        return JSONResponse(
            status_code=200,
            content={"answer": answer, "source_documents": rows, "retrieved": True},
        )
    except EnvironmentError as env_err:
        raise HTTPException(status_code=500, detail=str(env_err))
    except Exception as err:
        import traceback           # <--- ADD THIS
        traceback.print_exc()      # <--- ADD THIS TO PRINT THE RED TEXT
        raise HTTPException(status_code=500, detail=str(err))
