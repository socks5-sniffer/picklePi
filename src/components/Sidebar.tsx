import React from 'react';
import { BookOpen, CheckCircle, Circle, PlayCircle, Award, LayoutDashboard, NotebookPen } from 'lucide-react';
import { curriculum } from '../data/curriculum';
import { UserProgress } from '../types';

interface SidebarProps {
  activeTab: 'curriculum' | 'progress' | 'notebook';
  setActiveTab: (tab: 'curriculum' | 'progress' | 'notebook') => void;
  progress: UserProgress;
  activeProjectId: string;
  onSelectProject: (id: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab, progress, activeProjectId, onSelectProject }: SidebarProps) {
  return (
    <div className="w-80 bg-slate-900 text-slate-300 h-full flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-emerald-400" />
          RPi Electronics Lab
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-6 space-y-1">
          <button 
            onClick={() => setActiveTab('progress')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'progress' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            <span className="font-medium">Progress Tracker</span>
          </button>
          <button 
            onClick={() => setActiveTab('notebook')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'notebook' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <NotebookPen size={18} />
            <span className="font-medium">Lab Notebook</span>
          </button>
        </div>

        <div className="px-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Curriculum
        </div>

        <div className="space-y-6 px-4">
          {Array.from(new Set(curriculum.map(p => p.level))).map(level => {
            const levelProjects = curriculum.filter(p => p.level === level);
            const levelName = levelProjects[0].levelName;
            
            return (
              <div key={level} className="space-y-2">
                <h3 className="text-sm font-medium text-slate-400 px-2">
                  Level {level}: {levelName}
                </h3>
                <div className="space-y-1">
                  {levelProjects.map(project => {
                    const status = progress.projectStatuses[project.id];
                    const isActive = activeTab === 'curriculum' && activeProjectId === project.id;
                    
                    return (
                      <button
                        key={project.id}
                        onClick={() => onSelectProject(project.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          isActive 
                            ? 'bg-slate-800 text-white shadow-sm' 
                            : 'hover:bg-slate-800/50'
                        }`}
                      >
                        {status === 'Completed' ? (
                          <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                        ) : status === 'In Progress' ? (
                          <PlayCircle size={16} className="text-amber-400 shrink-0" />
                        ) : (
                          <Circle size={16} className="text-slate-600 shrink-0" />
                        )}
                        <span className={`text-sm truncate ${isActive ? 'font-medium' : ''}`}>
                          {project.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {progress.badges.length > 0 && (
        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award size={14} />
            Earned Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map(badge => (
              <span key={badge} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
