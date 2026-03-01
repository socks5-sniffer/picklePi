import React from 'react';
import { UserProgress } from '../types';
import { curriculum } from '../data/curriculum';
import { CheckCircle2, Circle, PlayCircle, Award } from 'lucide-react';

export default function ProgressTracker({ progress }: { progress: UserProgress }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Progress Tracker</h1>
        <p className="text-slate-500">Track your journey through the Raspberry Pi Electronics Lab.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Skills Learned</th>
                <th className="px-6 py-4">Badge Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {curriculum.map((project) => {
                const status = progress.projectStatuses[project.id];
                return (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                      Level {project.level}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {project.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {status === 'Completed' ? (
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        ) : status === 'In Progress' ? (
                          <PlayCircle size={16} className="text-amber-500" />
                        ) : (
                          <Circle size={16} className="text-slate-300" />
                        )}
                        <span className={`font-medium ${
                          status === 'Completed' ? 'text-emerald-700' : 
                          status === 'In Progress' ? 'text-amber-700' : 'text-slate-500'
                        }`}>
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.skillsLearned.map(skill => (
                          <span key={skill} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 font-medium ${
                        status === 'Completed' ? 'text-indigo-600' : 'text-slate-400 opacity-50'
                      }`}>
                        <Award size={16} className={status === 'Completed' ? 'text-amber-400' : 'text-slate-300'} />
                        {project.badgeEarned}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
