'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  locale?: string;
}

export function MarkdownContent({ content, locale = 'es' }: MarkdownContentProps) {
  function resolveHref(href: string | undefined): string | undefined {
    if (!href) return href;
    // Rewrite bare internal paths like /contacto → /es/contacto
    if (href.startsWith('/') && !href.match(/^\/(es|en)\//)) {
      return `/${locale}${href}`;
    }
    return href;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-purple-500 pl-4 my-6 bg-purple-50 dark:bg-purple-950/20 py-3 pr-3 rounded-r-lg text-gray-600 dark:text-gray-400 italic text-sm">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm text-left border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 font-semibold border border-gray-200 dark:border-white/10">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">{children}</td>
        ),
        tr: ({ children }) => (
          <tr className="even:bg-gray-50 dark:even:bg-white/2">{children}</tr>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 dark:bg-white/5 rounded-lg p-4 overflow-x-auto my-4 text-sm">{children}</pre>
        ),
        hr: () => <hr className="border-gray-200 dark:border-white/10 my-8" />,
        a: ({ href, children }) => {
          const resolved = resolveHref(href);
          const isExternal = resolved?.startsWith('http');
          return (
            <a
              href={resolved}
              className="text-purple-600 dark:text-purple-400 hover:underline"
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
