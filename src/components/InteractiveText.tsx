import React, { useState, useMemo } from 'react';
import { DictionaryEntry } from '../types';
import DefinitionModal from './DefinitionModal';

interface InteractiveTextProps {
  text: string;
  dictionary: DictionaryEntry[];
}

export default function InteractiveText({ text, dictionary }: InteractiveTextProps) {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  // Precompute a lowercase term → entry map so lookups are O(1) instead of O(n).
  const termMap = useMemo(() => {
    const map = new Map<string, DictionaryEntry>();
    for (const entry of dictionary) {
      map.set(entry.term.toLowerCase(), entry);
    }
    return map;
  }, [dictionary]);

  // Build the regex once per dictionary change rather than on every render.
  // The \b ensures we match whole words only.
  // The 'gi' flags make it global (find all) and case-insensitive.
  const regex = useMemo(() => {
    if (dictionary.length === 0) return null;
    const escaped = dictionary.map(entry => entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
  }, [dictionary]);

  if (!text) {
    return null;
  }

  const parts = regex ? text.split(regex) : [text];

  const handleTermClick = (term: string) => {
    const entry = termMap.get(term.toLowerCase());
    if (entry) {
      setSelectedEntry(entry);
    }
  };

  return (
    <>
      {parts.map((part, index) => {
        // When splitting with a capturing group, the matched terms will be at odd indices.
        const isTerm = index % 2 === 1;
        if (isTerm && part) {
          return (
            <button
              key={index}
              onClick={() => handleTermClick(part)}
              className="font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-900/30 hover:bg-cyan-900/50 px-1 py-0.5 rounded-md transition-colors cursor-pointer border-b-2 border-cyan-700/50 hover:border-cyan-600/50"
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
