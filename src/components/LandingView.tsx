import React from 'react';
import { curriculum } from '../data/curriculum';
import { UserProgress, ProjectStatus } from '../types';
import { Clock, Star, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';

interface LandingViewProps {
  progress: UserProgress;
  onSelectProject: (id: string) => void;
}

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={i <= level ? 'text-amber-400 fill-amber-400' : 'text-slate-600 fill-slate-600'}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    'Not Started': 'bg-slate-700/80 text-slate-400',
    'In Progress': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
    'Completed': 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function LandingView({ progress, onSelectProject }: LandingViewProps) {
  // Find index of current project: first 'In Progress', else first 'Not Started'
  const currentIdx = (() => {
    const ip = curriculum.findIndex(p => progress.projectStatuses[p.id] === 'In Progress');
    if (ip >= 0) return ip;
    const ns = curriculum.findIndex(p => progress.projectStatuses[p.id] === 'Not Started');
    return Math.max(ns, 0);
  })();

  const featured = curriculum.slice(currentIdx, currentIdx + 3);

  const completedCount = curriculum.filter(p => progress.projectStatuses[p.id] === 'Completed').length;
  const totalCount = curriculum.length;

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">🥒</span>
          <h1 className="text-3xl font-bold text-white tracking-tight">picklePi</h1>
        </div>
        <p className="text-slate-400 text-base max-w-xl">
          Your Raspberry Pi electronics curriculum — build real circuits, write real code, one project at a time.
        </p>

        {/* Progress summary */}
        <div className="mt-5 inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span className="text-slate-400">
            <span className="text-white font-semibold">{completedCount}</span>
            {' '}of{' '}
            <span className="text-white font-semibold">{totalCount}</span>
            {' '}projects completed
          </span>
        </div>
      </div>

      {/* Project Cards */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
          What's Next
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured.map((project, i) => {
            const status = progress.projectStatuses[project.id];
            const isCurrent = i === 0;
            const overview = project.content?.overview;

            return (
              <div
                key={project.id}
                className={`
                  relative flex flex-col rounded-2xl p-6 transition-all duration-200
                  hover:scale-[1.015] hover:shadow-xl cursor-pointer select-none
                  ${isCurrent
                    ? 'bg-gradient-to-br from-slate-800 to-slate-800/90 border-2 border-emerald-500/70 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/80'}
                `}
                onClick={() => onSelectProject(project.id)}
              >
                {/* Current badge */}
                {isCurrent && (
                  <div className="absolute -top-3.5 left-5">
                    <span className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md shadow-emerald-500/30">
                      <Zap size={10} className="fill-white" />
                      Current Project
                    </span>
                  </div>
                )}

                {/* Completed overlay indicator */}
                {status === 'Completed' && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 size={20} className="text-sky-400" />
                  </div>
                )}

                {/* Header */}
                <div className="mb-4 pr-6">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Level {project.level} · {project.levelName}
                  </p>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-xl font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {project.title}
                    </h3>
                    {status !== 'Completed' && <StatusBadge status={status} />}
                  </div>
                </div>

                {/* Description */}
                {overview?.description && (
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                    {overview.description}
                  </p>
                )}

                {/* Meta row */}
                <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
                  {overview?.difficulty != null && (
                    <DifficultyStars level={overview.difficulty} />
                  )}
                  {overview?.estimatedTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {overview.estimatedTime}
                    </span>
                  )}
                  {project.badgeEarned && (
                    <span className="flex items-center gap-1 text-amber-500/80">
                      🏅 {project.badgeEarned}
                    </span>
                  )}
                </div>

                {/* Skills */}
                {project.skillsLearned.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.skillsLearned.map(skill => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono bg-slate-900/60 text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <button
                  className={`
                    mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                    text-sm font-semibold transition-all duration-150
                    ${isCurrent
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white'}
                  `}
                  onClick={(e) => { e.stopPropagation(); onSelectProject(project.id); }}
                >
                  {status === 'Completed' ? 'Review' : status === 'In Progress' ? 'Continue' : 'Start'}
                  <ChevronRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
