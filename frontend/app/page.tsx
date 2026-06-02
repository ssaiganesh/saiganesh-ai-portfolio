"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { label: '5+ Years Experience', value: 'Automation, AI, & Data Engineering' },
  { label: 'NUS M.Tech AI', value: 'Specialized in Agentic Architectures' },
  { label: 'Core Competency', value: 'Test-Driven AI & Reliability Engineering' },
];

export default function HomePage() {
  return (
    <section id="home" className="space-y-10">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Software Engineer | AI & Automation</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Engineering reliable AI agents backed by rigorous enterprise automation.
            </h1>
            <p className="max-w-2xl text-slate-300 leading-8">
              I am Shankar Sai Ganesh. I combine a strong foundation in enterprise test automation and 
              API-driven quality engineering with advanced AI development. I build scalable, mission-critical 
              systems where LLM workflows meet industrial-grade reliability.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-200">
                Explore Projects
              </Link>
              <Link href="/research" className="inline-flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-200">
                Research Lab
              </Link>
               <Link href="/experience" className="inline-flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-200">
                My Experience
              </Link>             
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-800/90 bg-slate-950/80 p-6 shadow-xl">
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-900/95 p-6 text-slate-100 shadow-[0_30px_60px_-30px_rgba(14,165,233,0.35)]">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Expertise</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Automation Testing & Intelligent Systems.</h2>
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
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Professional Philosophy</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Reliability as a Feature.</h2>
          <p className="mt-5 text-slate-300 leading-8">
            My background in building enterprise API automation frameworks (Tosca, Newman, Golang/Python) 
            has shaped how I approach AI. I don't just build agents; I implement testing protocols that 
            ensure their outputs are accurate and resilient. From GIC data reconciliation systems to 
            complex LangGraph orchestrations, I ensure technology works as intended—every single time.
          </p>
        </div>
        <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Technical Arsenal</p>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4"><strong>Automation:</strong> API Testing (Postman/Newman), Tosca, Selenium, CI/CD pipelines.</li>
            <li className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4"><strong>AI Systems:</strong> Agentic AI (LangGraph), RAG, Model Routing & Evaluation.</li>
            <li className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4"><strong>Data Engineering:</strong> Python, SQL, Cloud-native pipelines & reconciliation.</li>
          </ul>
        </div>
      </section>
    </section>
  );
}