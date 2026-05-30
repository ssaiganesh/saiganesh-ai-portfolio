"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { label: '5+ Years Experience', value: 'AI Systems, RAG, ML Ops' },
  { label: 'NUS M.Tech AI Systems', value: 'Deep learning & distributed systems' },
  { label: 'Specialties', value: 'RAG, LangGraph, Computer Vision' },
];

export default function HomePage() {
  return (
    <section id="home" className="space-y-10">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">AI-First Engineer</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              I build resilient AI systems for real-world autonomy, intelligent search, and mission-critical decision support.
            </h1>
            <p className="max-w-2xl text-slate-300 leading-8">
              I am Shankar Sai Ganesh, an AI Systems Architect specializing in retrieval-augmented generation,
              scalable model orchestration, and computer vision workflows for enterprise-grade products.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex items-center rounded-2xl bg-cyan-400/15 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/25">
                Explore Projects
              </Link>
              <Link href="/research" className="inline-flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-200">
                Research Lab
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-800/90 bg-slate-950/80 p-6 shadow-xl">
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-900/95 p-6 text-slate-100 shadow-[0_30px_60px_-30px_rgba(14,165,233,0.35)]">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Featured stack</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Engineered for scalable inference, secure APIs, and adaptive agents.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <motion.article
                    key={item.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="rounded-3xl border border-slate-800/80 bg-slate-900/95 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
                    <p className="mt-4 text-sm font-semibold text-slate-100 leading-6">{item.value}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="experience" className="grid gap-6 lg:grid-cols-[1fr_0.8fr] items-start">
        <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Professional Profile</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Delivering production-ready AI systems at the intersection of research and product.</h2>
          <p className="mt-5 text-slate-300 leading-8">
            I design and deploy end-to-end systems that combine LLM-driven knowledge discovery, multi-agent orchestration, and visual intelligence.
            My work is built to scale across enterprise operations, autonomous workflows, and human-in-the-loop decision systems.
          </p>
        </div>
        <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">What I do</p>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4">RAG & vector retrieval systems for domain-specific knowledge graphs.</li>
            <li className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4">Multi-agent orchestration and semantic automation with LangGraph patterns.</li>
            <li className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4">Computer vision pipelines for marine safety, operations, and predictive analytics.</li>
          </ul>
        </div>
      </section>
    </section>
  );
}
