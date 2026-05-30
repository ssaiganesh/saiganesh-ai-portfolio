'use client';

import { useMemo, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hello! Ask me about my Experience, AI systems, research, or portfolio projects.',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const visibleMessages = useMemo(() => messages.slice(-6), [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await response.json();
      const answer = data?.answer || 'I could not retrieve an answer right now.';

      setMessages((current: ChatMessage[]) => [...current, { role: 'assistant', text: answer }]);
    } catch (error) {
      setMessages((current: ChatMessage[]) => [
        ...current,
        { role: 'assistant', text: 'There was an error connecting to the chat API.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div className="flex w-full max-w-[360px] flex-col items-end gap-3">
        {open && (
          <div className="w-full overflow-hidden rounded-[30px] border border-cyan-400/20 bg-slate-950/95 text-slate-100 shadow-glow">
            <div className="flex items-center justify-between border-b border-cyan-400/10 bg-slate-900/95 px-4 py-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Sai AI Persona</p>
                <p className="text-xs text-slate-400">Ask anything about the portfolio.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/90 text-slate-200 transition hover:bg-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto p-4">
              {visibleMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-3xl p-4 ${
                    message.role === 'user'
                      ? 'bg-slate-900/90 text-cyan-100 self-end'
                      : 'bg-slate-800/90 text-slate-100'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {message.role === 'user' ? 'You' : 'Sai AI'}
                  </p>
                  <p className="mt-2 text-sm leading-6">{message.text}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 border-t border-cyan-400/10 bg-slate-950/95 px-4 py-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 rounded-2xl border border-slate-800/80 bg-slate-900/95 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Ask Sai about AI systems..."
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-cyan-400 px-4 text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Sending...' : <Send size={16} />}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-slate-900/95 px-5 py-3 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/10 transition hover:bg-slate-800"
        >
          <MessageCircle size={18} />
          <span>{open ? 'Close AI Chat' : 'Ask Sai AI'}</span>
        </button>
      </div>
    </div>
  );
}
