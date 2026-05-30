import hashlib
import uuid
import os
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
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
SOURCE_FILE = BASE_DIR / "data" / "sai_ganesh_cv.txt"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
EMBEDDING_MODEL = "text-embedding-3-small"
TABLE_NAME = "portfolio_knowledge"


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
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
    if not supabase_url or not supabase_key:
        raise EnvironmentError("SUPABASE_URL or SUPABASE_SERVICE_KEY is missing from the environment.")
    return create_client(supabase_url, supabase_key)


def load_source_text(source_path: Optional[Path] = None) -> str:
    path = source_path or SOURCE_FILE
    if not path.exists():
        raise FileNotFoundError(f"Source file not found: {path}")

    if path.suffix.lower() == ".txt":
        return path.read_text(encoding="utf-8")

    if path.suffix.lower() == ".pdf":
        try:
            from pypdf import PdfReader
        except ImportError as error:
            raise ImportError("PyPDF2/PyPDF is required to read PDF files.") from error
        reader = PdfReader(str(path))
        return "\n".join(page.extract_text() or "" for page in reader.pages)

    raise ValueError("Unsupported source file type. Use .txt or .pdf")


def recursive_chunk(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> List[str]:
    text = " ".join(text.split())
    if not text:
        return []
    if len(text) <= chunk_size:
        return [text.strip()]

    split_index = text.rfind(" ", 0, chunk_size)
    if split_index <= 0:
        split_index = chunk_size
    chunk = text[:split_index].strip()
    next_start = max(split_index - overlap, 0)
    remainder = text[next_start:].strip()
    return [chunk] + recursive_chunk(remainder, chunk_size, overlap)


def build_stable_id(content: str) -> str:
    namespace = uuid.NAMESPACE_URL
    return str(uuid.uuid5(namespace, content))


def create_embeddings(texts: List[str]) -> List[List[float]]:
    if not texts:
        return []

    client = get_openai_client()
    try:
        if hasattr(client, "embeddings"):
            response = client.embeddings.create(model=EMBEDDING_MODEL, input=texts, timeout=30)
        else:
            response = client.Embedding.create(model=EMBEDDING_MODEL, input=texts, timeout=30)
    except Exception as error:
        raise RuntimeError(f"Failed to generate embeddings: {error}") from error

    data = getattr(response, "data", None) or response.get("data", None)
    if not data:
        raise RuntimeError("OpenAI returned no embedding data.")

    embeddings = []
    for item in data:
        if isinstance(item, dict):
            embeddings.append(item.get("embedding"))
        else:
            embeddings.append(getattr(item, "embedding", None))

    if any(embed is None for embed in embeddings):
        raise RuntimeError("OpenAI returned malformed embedding data.")
    return embeddings


def upsert_chunks(chunks: List[str], embeddings: List[List[float]], source: str = "sai_ganesh_cv.txt") -> Any:
    if len(chunks) != len(embeddings):
        raise ValueError("The number of chunks and embeddings must match.")

    supabase = get_supabase_client()
    records = []
    for index, (chunk, embedding) in enumerate(zip(chunks, embeddings), start=1):
        records.append(
            {
                "id": build_stable_id(chunk),
                "content": chunk,
                "metadata": {"source": source, "chunk_index": index},
                "embedding": embedding,
            }
        )

    response = supabase.table(TABLE_NAME).upsert(records, on_conflict="id").execute()
    error = getattr(response, "error", None)
    if error:
        raise RuntimeError(f"Supabase upsert failed: {error}")
    return response


def ingest(source_path: Optional[Path] = None) -> Dict[str, Any]:
    source_path = source_path or SOURCE_FILE
    raw_text = load_source_text(source_path)
    chunks = recursive_chunk(raw_text)
    if not chunks:
        raise RuntimeError("No content was extracted from the source file.")

    embeddings = create_embeddings(chunks)
    response = upsert_chunks(chunks, embeddings, source=source_path.name)
    return {
        "source_file": str(source_path),
        "chunk_count": len(chunks),
        "record_count": len(response.data or []),
        "supabase_status": getattr(response, "status_code", None),
    }


if __name__ == "__main__":
    result = ingest()
    print("Ingestion complete:")
    print(result)
