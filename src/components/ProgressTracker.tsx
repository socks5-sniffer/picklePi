import React, { useState } from 'react';
import { UserProgress, Project } from '../types';
import { curriculum } from '../data/curriculum';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import BadgeIcon from './BadgeIcon';
import BadgeModal from './BadgeModal';

export default function ProgressTracker({ progress }: { progress: UserProgress }) {
  const [selectedBadge, setSelectedBadge] = useState<{ project: Project; earned: boolean } | null>(null);
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Progress Tracker</h1>
        <p className="text-slate-400">Track your journey through picklePi's electronics curriculum.</p>
      </header>

      <div className="bg-slate-800/50 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-slate-400 uppercase font-semibold text-xs tracking-wider border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Skills Learned</th>
                <th className="px-6 py-4">Badge Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {curriculum.map((project) => {
                const status = progress.projectStatuses[project.id];
                return (
                  <tr key={project.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">
                      Level {project.level}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-100">
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
                          status === 'Completed' ? 'text-emerald-400' : 
                          status === 'In Progress' ? 'text-amber-400' : 'text-slate-500'
                        }`}>
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.skillsLearned.map(skill => (
                          <span key={skill} className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs border border-slate-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="flex items-center gap-2.5 group cursor-pointer"
                        onClick={() => setSelectedBadge({ project, earned: status === 'Completed' })}
                        aria-label={`View badge: ${status === 'Completed' ? project.badgeEarned : 'Locked'}`}
                      >
                        <span className="transition-transform group-hover:scale-110 duration-150">
                          <BadgeIcon
                            level={project.level}
                            name={project.badgeEarned}
                            earned={status === 'Completed'}
                            size={44}
                          />
                        </span>
                        <span className={`font-medium text-sm ${
                          status === 'Completed'
                            ? 'text-indigo-300 group-hover:text-indigo-200'
                            : status === 'In Progress'
                            ? 'text-amber-400/60'
                            : 'text-slate-600'
                        } transition-colors`}>
                          {status === 'Completed' || status === 'In Progress'
                            ? project.badgeEarned
                            : '???'}
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBadge && (
        <BadgeModal
          project={selectedBadge.project}
          earned={selectedBadge.earned}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </div>
  );
}
