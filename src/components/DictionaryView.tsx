import React, { useState } from 'react';
import { dictionary } from '../data/dictionary';
import { DictionaryEntry } from '../types';
import { Search, Zap, Cpu, CircuitBoard } from 'lucide-react';

export default function DictionaryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Python' | 'Raspberry Pi' | 'Electronics'>('All');

  const filteredEntries = dictionary.filter(entry => {
    const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: Array<'All' | 'Python' | 'Raspberry Pi' | 'Electronics'> = ['All', 'Python', 'Raspberry Pi', 'Electronics'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Python':
        return <Zap size={16} className="text-yellow-400" />;
      case 'Raspberry Pi':
        return <Cpu size={16} className="text-red-400" />;
      case 'Electronics':
        return <CircuitBoard size={16} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Python':
        return 'bg-yellow-900/20 text-yellow-300 border-yellow-700/30';
      case 'Raspberry Pi':
        return 'bg-red-900/20 text-red-300 border-red-700/30';
      case 'Electronics':
        return 'bg-blue-900/20 text-blue-300 border-blue-700/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Learning Dictionary</h1>
        <p className="text-slate-400 text-lg">
          A searchable reference for Python, Raspberry Pi, and Electronics vocabulary
        </p>
      </header>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 text-slate-100 pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors border ${
                selectedCategory === category
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-400">
        Found {filteredEntries.length} {filteredEntries.length === 1 ? 'term' : 'terms'}
      </div>

      {/* Dictionary Entries */}
      <div className="grid gap-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div
              key={entry.term}
              className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(entry.category)}
                  <h3 className="text-lg font-bold text-slate-100">{entry.term}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getCategoryColor(entry.category)}`}>
                  {entry.category}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed mb-4">
                {entry.definition}
              </p>

              {entry.example && (
                <div className="bg-slate-900/50 rounded p-4 border border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Example</p>
                  <p className="text-slate-300 font-mono text-sm">
                    {entry.example}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Search size={48} className="mb-4 text-slate-600" />
            <p className="text-lg font-medium">No terms found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
