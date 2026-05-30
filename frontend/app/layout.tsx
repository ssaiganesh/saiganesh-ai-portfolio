import type { Metadata } from 'next';
import Link from 'next/link';
import '../styles/globals.css';
import { AIChatbot } from '../components/AIChatbot';

export const metadata: Metadata = {
  title: 'Sai Ganesh | AI Systems Architect',
  description: 'AI-first portfolio for Sai Ganesh, engineered for RAG, computer vision, and modern research systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.1),_transparent_22%),linear-gradient(180deg,#030712_0%,#08111f_100%)]">
          <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
            <div className="container flex items-center justify-between gap-6 py-5">
              <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Sai Ganesh
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
                <Link href="/" className="transition hover:text-cyan-200">Home</Link>
                <Link href="/projects" className="transition hover:text-cyan-200">Projects</Link>
                <Link href="/research" className="transition hover:text-cyan-200">Research Lab</Link>
                <Link href="/experience" className="transition hover:text-cyan-200">Experience</Link>
              </nav>
            </div>
          </header>

          <main className="container py-10 md:py-16">
            {children}
          </main>

          <AIChatbot />
        </div>
      </body>
    </html>
  );
}
