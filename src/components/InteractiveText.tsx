import React, { useState } from 'react';
import { DictionaryEntry } from '../types';
import DefinitionModal from './DefinitionModal';

interface InteractiveTextProps {
  text: string;
  dictionary: DictionaryEntry[];
}

export default function InteractiveText({ text, dictionary }: InteractiveTextProps) {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  if (!text) {
    return null;
  }

  // Create a regex from the dictionary terms.
  // The \b ensures we match whole words only.
  // The 'gi' flags make it global (find all) and case-insensitive.
  const terms = dictionary.map(entry => entry.term.replace(/[.*+?^${}()|[\]\]/g, '\$&'));
  const regex = new RegExp(`\b(${terms.join('|')})\b`, 'gi');

  const parts = text.split(regex);

  const handleTermClick = (term: string) => {
    const entry = dictionary.find(e => e.term.toLowerCase() === term.toLowerCase());
    if (entry) {
      setSelectedEntry(entry);
    }
  };

  return (
    <>
      {parts.map((part, index) => {
        const isTerm = regex.test(part);
        if (isTerm) {
          // Reset regex state for next iteration of map
          regex.lastIndex = 0;
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
