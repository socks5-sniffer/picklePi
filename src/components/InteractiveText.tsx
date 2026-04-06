import React, { useMemo, useState } from 'react';
import { DictionaryEntry } from '../types';
import DefinitionModal from './DefinitionModal';

interface InteractiveTextProps {
  text: string;
  dictionary: DictionaryEntry[];
}

export default function InteractiveText({ text, dictionary }: InteractiveTextProps) {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  // Compiled once per dictionary reference — dictionary is a static module constant
  // so this memo runs exactly once for the lifetime of the app.
  const { regex, termMap } = useMemo(() => {
    if (!dictionary.length) return { regex: null, termMap: new Map<string, DictionaryEntry>() };
    const escapedTerms = dictionary
      .map(e => e.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .sort((a, b) => b.length - a.length); // longest first so compound terms match before subterms
    return {
      regex: new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi'),
      termMap: new Map(dictionary.map(e => [e.term.toLowerCase(), e])),
    };
  }, [dictionary]);

  if (!text) return null;

  const parts = regex ? text.split(regex) : [text];

  const handleTermClick = (term: string) => {
    const entry = termMap.get(term.toLowerCase());
    if (entry) setSelectedEntry(entry);
  };

  return (
    <>
      {parts.map((part, index) => {
        // split() with a capturing group puts matches at odd indices
        const isTerm = index % 2 === 1;
        if (isTerm && part) {
          return (
            <button
              type="button"
              key={index}
              onClick={() => handleTermClick(part)}
              className="font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-900/30 hover:bg-emerald-900/50 px-1 py-0.5 rounded-md transition-colors cursor-pointer border-b-2 border-emerald-700/50 hover:border-emerald-600/50"
            >
              {part}
            </button>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}

      {selectedEntry && (
        <DefinitionModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </>
  );
}
