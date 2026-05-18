'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  name: string;
  defaultValue?: string;
  error?: string;
}

export function MarkdownEditor({ name, defaultValue = '', error }: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <div>
      <div className="flex gap-1 mb-2">
        <TabBtn active={tab === 'write'} onClick={() => setTab('write')}>Escribir</TabBtn>
        <TabBtn active={tab === 'preview'} onClick={() => setTab('preview')}>Vista previa</TabBtn>
      </div>

      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={16}
        placeholder="Escribí el contenido en Markdown..."
        className={`w-full px-4 py-2.5 rounded-lg bg-[#0a0a0c] border text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors text-sm font-mono resize-y ${
          error ? 'border-red-500/50' : 'border-white/10'
        } ${tab === 'preview' ? 'hidden' : ''}`}
      />

      {tab === 'preview' && (
        <div className="min-h-64 px-4 py-3 rounded-lg bg-[#0a0a0c] border border-white/10 prose prose-invert prose-sm max-w-none">
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 text-sm italic">Nada para previsualizar...</p>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded transition-colors ${
        active ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white bg-white/5'
      }`}
    >
      {children}
    </button>
  );
}
