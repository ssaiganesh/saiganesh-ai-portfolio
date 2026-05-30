"use client";

const articles = [
  {
    title: 'LLM Inference Scaling for Production Systems',
    summary: 'Strategies for cost-efficient GPU utilization, latency optimization, and reliability when deploying large language models at scale.',
    tag: 'Scaling',
  },
  {
    title: 'Autonomous Driving Architectures for Distributed Agents',
    summary: 'Designing modular control stacks with sensor fusion, planner hierarchy, and safety validation for autonomous fleet operations.',
    tag: 'Architecture',
  },
];

export default function ResearchPage() {
  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-slate-800/80 bg-slate-900/90 p-8 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Research Lab</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Upcoming articles and technical briefings.</h1>
        <p className="mt-4 max-w-2xl text-slate-300 leading-7">
          A focused catalog of research ideas on inference efficiency, autonomous systems, and modern AI infrastructure.
        </p>
      </div>

      <div className="grid gap-5">
        {articles.map((article) => (
          <article key={article.title} className="rounded-[28px] border border-slate-800/90 bg-slate-950/95 p-8 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/30">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">{article.title}</h2>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200">
                {article.tag}
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-slate-300 leading-7">{article.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
