"use client";
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'EchoChamber',
    subtitle: 'Multi-Agent RAG',
    description: 'A real-time knowledge system that aggregates meeting intelligence, agent collaboration, and semantic drift analysis for enterprise workflows.',
    accentClass: 'bg-cyan-500/15 text-cyan-200',
  },
  {
    title: 'Smart Task Hive',
    subtitle: 'ROS & LLM Fleet Control',
    description: 'A distributed orchestration platform that coordinates autonomous task agents and robotic process automation with AI-driven intent and path planning.',
    accentClass: 'bg-sky-500/10 text-sky-200',
  },
  {
    title: 'Marine Vision',
    subtitle: 'Sea-Pix-GAN',
    description: 'A computer vision pipeline for maritime safety that detects vessel states, anomalies, and environmental risk using multi-modal sensor fusion.',
    accentClass: 'bg-teal-500/10 text-teal-200',
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Flagship Projects</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">AI-native products designed for mission-critical environments.</h1>
        <p className="mt-4 max-w-2xl text-slate-300 leading-7">
          These projects spotlight my work in retrieval-augmented systems, autonomous orchestration, and visual intelligence.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-7 shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{project.subtitle}</p>
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${project.accentClass}`}>
                {project.subtitle}
              </span>
            </div>
            <p className="mt-6 text-slate-300 leading-7">{project.description}</p>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/80 text-cyan-300">AI</div>
              <p>Designed for intelligent automation and contextual reasoning.</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
