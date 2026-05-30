# Sai Ganesh AI Portfolio Frontend

This repository includes a Next.js frontend for the `saiganesh-ai-portfolio` site.

## Features
- Dark mode-first portfolio UI with a sleek AI-first aesthetic
- Sticky navigation and modern hero section
- Bento-box stats and project cards with Framer Motion hover effects
- Floating terminal-style chatbot widget connected to `http://127.0.0.1:8000/api/chat`

## Install Dependencies

```bash
cd /Users/ms/Desktop/saiganesh-ai-portfolio
npm install
```

## Run Locally

```bash
npm run dev
```

The app will run at `http://localhost:3000` by default.

## Backend Requirement

The floating AI chatbot communicates with the local FastAPI backend at:

```text
http://127.0.0.1:8000/api/chat
```

Make sure your backend is running before using the chat widget.
