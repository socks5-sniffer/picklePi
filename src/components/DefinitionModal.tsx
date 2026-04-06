import React, { useEffect, useId } from 'react';
import { DictionaryEntry } from '../types';
import { X, BookOpenText } from 'lucide-react';

interface DefinitionModalProps {
  entry: DictionaryEntry;
  onClose: () => void;
}

export default function DefinitionModal({ entry, onClose }: DefinitionModalProps) {
  const titleId = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-700" onClick={e => e.stopPropagation()}>
        <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
          <div>
            <h2 id={titleId} className="text-2xl font-bold flex items-center gap-3">
              <BookOpenText className="text-cyan-400" />
              {entry.term}
            </h2>
            <p className="text-slate-400 mt-1 text-sm font-semibold tracking-wider uppercase">{entry.category}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full -mr-2 -mt-2 hover:bg-slate-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-6 bg-slate-800 text-slate-300">
          <p className="text-base leading-relaxed">{entry.definition}</p>
          {entry.example && (
            <div className="mt-6 pt-4 border-t border-slate-700">
              <p className="text-sm font-bold text-slate-200 mb-2">Example:</p>
              <code className="block bg-slate-900/50 text-cyan-300 p-4 rounded-lg text-sm font-mono border border-slate-700">
                {entry.example}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
