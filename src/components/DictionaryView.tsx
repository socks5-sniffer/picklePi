import React, { useState } from 'react';
import { dictionary } from '../data/dictionary';
import { DictionaryEntry } from '../types';
import { Search, Zap, Cpu, CircuitBoard } from 'lucide-react';

const sortedDictionary = [...dictionary].sort((a, b) =>
  a.term.localeCompare(b.term)
);

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function DictionaryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Python' | 'Raspberry Pi' | 'Electronics'>('All');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const categories: Array<'All' | 'Python' | 'Raspberry Pi' | 'Electronics'> = ['All', 'Python', 'Raspberry Pi', 'Electronics'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) setSelectedLetter(null);
  };

  const handleLetterClick = (letter: string) => {
    setSearchTerm('');
    setSelectedLetter(prev => (prev === letter ? null : letter));
  };

  // Letters that have at least one entry under the current category filter
  const availableLetters = new Set(
    sortedDictionary
      .filter(e => selectedCategory === 'All' || e.category === selectedCategory)
      .map(e => e.term[0].toUpperCase())
  );

  const filteredEntries = sortedDictionary.filter(entry => {
    const matchesSearch = searchTerm
      ? entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    const matchesLetter = !searchTerm && selectedLetter
      ? entry.term[0].toUpperCase() === selectedLetter
      : true;
    return matchesSearch && matchesCategory && matchesLetter;
  });

  // Group filtered entries by their starting letter
  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    const letter = entry.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {} as Record<string, DictionaryEntry[]>);

  const groupLetters = Object.keys(groupedEntries).sort();

  const getCategoryIcon = (category: string, size = 14) => {
    switch (category) {
      case 'Python':       return <Zap size={size} className="text-yellow-400" />;
      case 'Raspberry Pi': return <Cpu size={size} className="text-red-400" />;
      case 'Electronics':  return <CircuitBoard size={size} className="text-blue-400" />;
      default:             return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Python':       return 'bg-yellow-900/20 text-yellow-300 border-yellow-700/30';
      case 'Raspberry Pi': return 'bg-red-900/20 text-red-300 border-red-700/30';
      case 'Electronics':  return 'bg-blue-900/20 text-blue-300 border-blue-700/30';
      default:             return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-5 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Learning Dictionary</h1>
        <p className="text-slate-400 text-lg">
          A searchable reference for Python, Raspberry Pi, and Electronics vocabulary
        </p>
      </header>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search terms or definitions..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-slate-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Category tags */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium text-sm transition-colors border ${
              selectedCategory === category
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-300'
            }`}
          >
            {getCategoryIcon(category)}
            {category}
          </button>
        ))}
      </div>

      {/* A–Z letter navigation */}
      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
        <div className="flex flex-wrap gap-1">
          {ALPHABET.map(letter => {
            const isAvailable = availableLetters.has(letter);
            const isActive = selectedLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => isAvailable && handleLetterClick(letter)}
                disabled={!isAvailable}
                className={`w-8 h-8 rounded font-bold text-sm transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : isAvailable
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white'
                      : 'bg-transparent text-slate-600 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
          {selectedLetter && (
            <button
              onClick={() => setSelectedLetter(null)}
              className="ml-2 px-3 h-8 rounded text-xs font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-400">
        {searchTerm
          ? `${filteredEntries.length} ${filteredEntries.length === 1 ? 'result' : 'results'} for "${searchTerm}"`
          : selectedLetter
            ? `${filteredEntries.length} ${filteredEntries.length === 1 ? 'term' : 'terms'} starting with "${selectedLetter}"`
            : `${filteredEntries.length} ${filteredEntries.length === 1 ? 'term' : 'terms'}`}
      </p>

      {/* Grouped dictionary entries */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-8">
          {groupLetters.map(letter => (
            <section key={letter}>
              {/* Letter heading */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-bold text-2xl leading-none">{letter}</span>
                </div>
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-xs text-slate-500 font-medium">
                  {groupedEntries[letter].length} {groupedEntries[letter].length === 1 ? 'term' : 'terms'}
                </span>
              </div>

              {/* Entries for this letter */}
              <div className="grid gap-3 pl-2">
                {groupedEntries[letter].map(entry => (
                  <div
                    key={entry.term}
                    className="bg-slate-800/50 rounded-lg p-5 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(entry.category, 15)}
                        <h3 className="text-lg font-bold text-slate-100">{entry.term}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getCategoryColor(entry.category)}`}>
                        {entry.category}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed mb-3">
                      {entry.definition}
                    </p>

                    {entry.example && (
                      <div className="bg-slate-900/50 rounded p-3 border border-slate-700/50">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Example</p>
                        <p className="text-slate-300 font-mono text-sm">{entry.example}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Search size={48} className="mb-4 text-slate-600" />
          <p className="text-lg font-medium">No terms found</p>
          <p className="text-sm">Try adjusting your search, category, or letter</p>
        </div>
      )}
    </div>
  );
}
