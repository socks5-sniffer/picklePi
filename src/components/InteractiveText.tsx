import React, { useState, useMemo } from 'react';
import { DictionaryEntry } from '../types';
import DefinitionModal from './DefinitionModal';

interface InteractiveTextProps {
  text: string;
  dictionary: DictionaryEntry[];
}

export default function InteractiveText({ text, dictionary }: InteractiveTextProps) {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  // Build a case-insensitive term→entry lookup map and a regex once per dictionary change.
  const { termMap, regex } = useMemo(() => {
    const map = new Map<string, DictionaryEntry>();
    const escapedTerms: string[] = [];

    dictionary.forEach(entry => {
      map.set(entry.term.toLowerCase(), entry);
      escapedTerms.push(entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    });

    if (map.size === 0) {
      return { termMap: map, regex: null };
    }

    // The \\b ensures we match whole words only.
    // The 'gi' flags make it global (find all) and case-insensitive.
    return { termMap: map, regex: new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi') };
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
              type="button"
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
