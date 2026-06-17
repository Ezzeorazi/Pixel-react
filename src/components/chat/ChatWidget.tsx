'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  whatsapp?: string | null;
}

const STORAGE_KEY = 'pixi-chat-history';

// Anti-bot opcional con Cloudflare Turnstile. Si no hay site key, se omite.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

let turnstileScriptPromise: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;
  turnstileScriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('turnstile load failed'));
    document.head.appendChild(s);
  });
  return turnstileScriptPromise;
}

export function ChatWidget({ whatsapp }: ChatWidgetProps) {
  const t = useTranslations('chat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(!TURNSTILE_SITE_KEY);
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  // Restaurar historial de la sesión (solo al montar en el cliente).
  useEffect(() => {
    let saved: Message[] | null = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga inicial desde sessionStorage (no disponible en SSR)
    if (saved?.length) setMessages(saved);
  }, []);

  // Persistir + autoscroll.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Resolver el challenge anti-bot cuando el chat está abierto y aún sin verificar.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || verified || !open) return;
    let cancelled = false;
    let widgetId: string | undefined;
    loadTurnstile()
      .then(() => {
        if (cancelled || !turnstileRef.current || !window.turnstile) return;
        widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: async (token: string) => {
            try {
              const res = await fetch('/api/chat/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
              });
              if (res.ok && !cancelled) setVerified(true);
            } catch {
              /* ignore */
            }
          },
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          /* ignore */
        }
      }
    };
  }, [open, verified]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || !verified) return;
    setError(false);
    setInput('');

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setLoading(true);
    trackEvent('chat_message_sent');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-24), locale }),
      });
      const data = await res.json();
      // El pase venció: volver a pedir verificación anti-bot.
      if (res.status === 401 && data.needVerification) {
        setVerified(false);
        throw new Error('need-verification');
      }
      if (!res.ok || !data.message) throw new Error(data.error || 'error');
      setMessages((m) => [...m, { role: 'assistant', content: data.message }]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [input, loading, verified, messages, locale]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : null;

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() =>
          setOpen((v) => {
            if (!v) trackEvent('chat_open');
            return !v;
          })
        }
        aria-label={open ? t('close') : t('open')}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121215] shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{t('title')}</p>
              <p className="truncate text-xs text-green-400">{t('subtitle')}</p>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <Bubble role="assistant">{t('welcome')}</Bubble>
            )}
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            ))}
            {loading && (
              <div className="flex gap-1.5 px-1 py-2">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </div>
            )}
            {error && (
              <p className="text-center text-xs text-red-400">
                {t('error')}
                {waHref && (
                  <>
                    {' '}
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="underline">
                      {t('whatsappFallback')}
                    </a>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Verificación anti-bot (Turnstile). Solo si está configurado y sin pase. */}
          {TURNSTILE_SITE_KEY && !verified && (
            <div className="flex flex-col items-center gap-2 border-t border-white/10 px-4 py-3">
              <span className="text-xs text-gray-400">{t('verifying')}</span>
              <div ref={turnstileRef} />
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder={t('placeholder')}
                className="max-h-28 flex-1 resize-none rounded-xl border border-white/10 bg-[#0a0a0c] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim() || !verified}
                aria-label={t('send')}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-xs text-gray-500 hover:text-gray-300"
              >
                {t('preferHuman')}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${
          isUser
            ? 'rounded-br-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            : 'rounded-bl-sm bg-white/5 text-gray-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ delay = '0ms' }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
      style={{ animationDelay: delay }}
    />
  );
}
