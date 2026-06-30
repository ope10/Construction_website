import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let listKey = 0;

  const renderTextWithBold = (text: string) => {
    // Basic bold parser **text**
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-white font-semibold">{part}</strong>;
      }
      return part;
    });
  };

  const flushList = () => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${listKey++}`} className="list-disc pl-6 space-y-2 text-obsidian-300 text-xs sm:text-sm leading-relaxed mb-6">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      flushList();
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      renderedElements.push(
        <h1 key={i} className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-white mb-6 border-b border-white/5 pb-4 mt-8">
          {line.substring(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      renderedElements.push(
        <h2 key={i} className="font-display font-bold text-xl sm:text-2xl uppercase tracking-wider text-white mb-4 mt-8 border-l-2 border-gold-500 pl-3">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      renderedElements.push(
        <h3 key={i} className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-gold-400 mb-3 mt-6">
          {line.substring(4)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      const bulletContent = line.substring(2);
      currentListItems.push(
        <li key={i} className="pl-1">
          {renderTextWithBold(bulletContent)}
        </li>
      );
    } else {
      flushList();
      renderedElements.push(
        <p key={i} className="text-xs sm:text-sm text-obsidian-300 leading-relaxed mb-4">
          {renderTextWithBold(line)}
        </p>
      );
    }
  }

  // Flush any remaining list items at the end
  flushList();

  return <div className="max-w-4xl mx-auto py-6">{renderedElements}</div>;
};
