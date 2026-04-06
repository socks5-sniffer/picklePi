import React, { useEffect } from 'react';
import { X, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { Project } from '../types';
import BadgeIcon from './BadgeIcon';

interface BadgeModalProps {
  project: Project;
  earned: boolean;
  onClose: () => void;
}

export default function BadgeModal({ project, earned, onClose }: BadgeModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex justify-end p-4 pb-0">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Badge display */}
        <div className="flex flex-col items-center px-8 pb-2 pt-2">
          <div className={earned ? 'drop-shadow-[0_0_18px_rgba(134,239,172,0.4)]' : ''}>
            <BadgeIcon
              level={project.level}
              name={project.badgeEarned}
              earned={earned}
              size={160}
            />
          </div>

          {/* Badge name */}
          <div className="mt-4 text-center">
            {earned ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-1">
                <CheckCircle2 size={13} />
                Earned
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">
                <Lock size={13} />
                Locked
              </div>
            )}

            <h2 className={`text-2xl font-bold ${earned ? 'text-slate-100' : 'text-slate-500'}`}>
              {earned ? project.badgeEarned : '???'}
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Level {project.level} &mdash; {project.levelName}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 my-4 border-t border-slate-700" />

        {/* Body */}
        <div className="px-8 pb-8 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project</p>
            <p className="text-slate-200 font-medium">{project.title}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Skills</p>
            {earned ? (
              <div className="flex flex-wrap gap-1.5">
                {project.skillsLearned.map(skill => (
                  <span
                    key={skill}
                    className="bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {project.skillsLearned.map(skill => (
                  <span
                    key={skill}
                    className="bg-slate-700/50 text-slate-500 border border-slate-600/50 px-2.5 py-0.5 rounded-full text-xs font-medium blur-[2px] select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!earned && (
            <div className="bg-slate-700/40 border border-slate-600 rounded-xl p-3 flex items-start gap-2.5">
              <Sparkles size={15} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-slate-300 text-sm">
                Complete <span className="font-semibold text-slate-100">{project.title}</span> to unlock this badge and reveal your skills.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
