# Shankar Sai Ganesh | Agentic AI Portfolio

Welcome to the source code for my interactive, AI-driven personal portfolio. This project goes beyond a static resume by integrating a production-grade **Retrieval-Augmented Generation (RAG) agent** directly into the frontend, allowing visitors to chat with a dual-persona AI representing my professional experience and Master's research.

## 🏗️ Architecture & Tech Stack

This repository is structured as a monorepo containing a separate React frontend and Python backend, deployed continuously via **GitHub Actions**.

### Frontend (Next.js)

* **Framework:** Next.js (App Router) & React
* **Styling:** Tailwind CSS & Framer Motion (for interactive "AI-First" animations)
* **Hosting:** Vercel (Edge Deployment)
* **Key Features:** Interactive Terminal Chatbot, custom Canvas-based Transformer Attention Matrix visualizations.

### Backend (FastAPI & LangGraph)

* **Framework:** FastAPI (Python)
* **Agent Orchestration:** LangGraph (StateGraph conditional routing)
* **LLM & Embeddings:** OpenAI (`gpt-4o-mini`, `text-embedding-3-small`)
* **Rate Limiting:** SlowAPI (to protect API routing)
* **Hosting:** Render

### Database (Supabase)

* **Engine:** PostgreSQL with the `pgvector` extension.
* **Mechanism:** Stores 1536-dimensional vector embeddings of my CV and M.Tech projects.
* **Retrieval:** Custom RPC SQL functions execute Cosine Similarity math directly in the database engine for ultra-low latency context retrieval.

## 🧠 The Dual-Persona RAG Agent

The core feature of this architecture is a LangGraph routing node that dynamically evaluates user prompts and switches between two distinct conversational personas:

1. **The Professional Assistant:** Triggered for queries regarding my enterprise experience (e.g., GIC, SeaMoney, AvePoint). It responds concisely, focusing on business value, software architectures, and automated pipelines.
2. **The Peer-Level AI Researcher:** Triggered for queries regarding my NUS M.Tech (AI Systems) coursework (e.g., EchoChamber, Marine Vision, Smart Task Hive). It adopts a deeply analytical tone to discuss LangGraph states, ROS frameworks, and Generative Adversarial Networks.

## 🚀 CI/CD Pipeline

This project implements Continuous Integration and Continuous Deployment (CI/CD) using **GitHub Actions**.

* Pushing to the `backend/` directory triggers an automated environment build and deployment webhook to Render.
* Pushing to the `frontend/` directory triggers the Vercel CLI to securely build and publish the Next.js artifacts.

---

*Architected by Shankar Sai Ganesh | NUS M.Tech Artificial Intelligence Systems*
