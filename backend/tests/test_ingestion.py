import os
from pathlib import Path

import pytest

from ingest import create_embeddings, load_source_text, recursive_chunk, upsert_chunks


def test_ingestion_pipeline_can_load_and_chunk_text():
    path = Path(__file__).resolve().parent.parent / "data" / "sai_ganesh_cv.txt"
    raw_text = load_source_text(path)
    chunks = recursive_chunk(raw_text)

    assert chunks
    assert all(isinstance(chunk, str) for chunk in chunks)
    assert max(len(chunk) for chunk in chunks) <= 550


def test_ingestion_pipeline_can_embed_and_upsert():
    path = Path(__file__).resolve().parent.parent / "data" / "sai_ganesh_cv.txt"
    raw_text = load_source_text(path)
    chunks = recursive_chunk(raw_text)
    sample_chunk = chunks[0:1]

    embeddings = create_embeddings(sample_chunk)
    assert embeddings
    assert len(embeddings[0]) == 1536

    response = upsert_chunks(sample_chunk, embeddings, source="test_ingestion")
    assert getattr(response, "error", None) is None
    assert getattr(response, "data", None) is not None
