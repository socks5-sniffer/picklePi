import React from 'react';
import { LabEntry } from '../types';
import { curriculum } from '../data/curriculum';
import { NotebookPen, Calendar, FlaskConical, AlertCircle, RefreshCw, Lightbulb, Award } from 'lucide-react';

export default function LabNotebookView({ entries }: { entries: LabEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20 animate-in fade-in duration-500">
        <NotebookPen size={48} className="mb-4 text-slate-300" />
        <h2 className="text-2xl font-semibold mb-2">Lab Notebook Empty</h2>
        <p>Complete projects to unlock notebook entries.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
          <NotebookPen className="text-emerald-400" />
          Lab Notebook Summary
        </h1>
        <p className="text-slate-400">A record of your experiments, failures, and learnings.</p>
      </header>

      <div className="space-y-6">
        {entries.map(entry => {
          const project = curriculum.find(p => p.id === entry.projectId);
          const date = new Date(entry.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <div key={entry.id} className="bg-slate-800/50 rounded-2xl p-8 shadow-sm border border-slate-700">
              <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{project?.title || 'Unknown Project'}</h2>
                  <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">Level {project?.level}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {date}</span>
                  </div>
                </div>
                {project && (
                  <div className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold border border-emerald-700 shadow-sm flex items-center gap-2">
                    <Award size={16} className="text-amber-500" />
                    {project.badgeEarned}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <FlaskConical size={16} className="text-emerald-400" />
                    What worked?
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-700/50 p-4 rounded-xl border border-slate-600 min-h-[5rem]">
                    {entry.whatWorked}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <AlertCircle size={16} className="text-rose-400" />
                    What didn't?
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-700/50 p-4 rounded-xl border border-slate-600 min-h-[5rem]">
                    {entry.whatDidnt}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <RefreshCw size={16} className="text-blue-400" />
                    What did you change?
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-700/50 p-4 rounded-xl border border-slate-600 min-h-[5rem]">
                    {entry.whatChanged}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-400" />
                    One thing you learned
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-700/50 p-4 rounded-xl border border-slate-600 min-h-[5rem]">
                    {entry.oneThingLearned}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
