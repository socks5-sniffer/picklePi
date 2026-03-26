import React from 'react';
import { BookOpen, CheckCircle, Circle, PlayCircle, Award, LayoutDashboard, NotebookPen, Lock, X, BookMarked, Home, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { curriculum } from '../data/curriculum';
import { UserProgress } from '../types';

interface SidebarProps {
  activeTab: 'home' | 'curriculum' | 'progress' | 'notebook' | 'dictionary' | 'pinout';
  setActiveTab: (tab: 'home' | 'curriculum' | 'progress' | 'notebook' | 'dictionary' | 'pinout') => void;
  progress: UserProgress;
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  isProjectLocked: (id: string) => boolean;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, progress, activeProjectId, onSelectProject, isProjectLocked, isMobileMenuOpen, onCloseMobileMenu, isCollapsed, onToggleCollapse }: SidebarProps) {
  const handleTabChange = (tab: 'home' | 'curriculum' | 'progress' | 'notebook' | 'dictionary' | 'pinout') => {
    setActiveTab(tab);
    onCloseMobileMenu(); // Close menu when tab changes on mobile
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${isCollapsed ? 'w-16' : 'w-80'} bg-slate-900 text-slate-300 h-full flex flex-col border-r border-slate-800
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className={`p-6 border-b border-slate-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <h1 className={`text-xl font-bold text-white flex items-center gap-2 ${isCollapsed ? 'hidden lg:hidden' : ''}`}>
          <BookOpen className="text-emerald-400" />
          picklePi
        </h1>
        {isCollapsed && (
          <BookOpen className="text-emerald-400 hidden lg:block" size={24} />
        )}
        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobileMenu}
          className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        {/* Desktop Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex text-slate-400 hover:text-white transition-colors p-1"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className={`${isCollapsed ? 'px-2' : 'px-4'} mb-6 space-y-1`}>
          <button
            onClick={() => handleTabChange('home')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
            aria-label="Home"
            title={isCollapsed ? 'Home' : undefined}
          >
            <Home size={18} />
            {!isCollapsed && <span className="font-medium">Home</span>}
          </button>
          <button 
            onClick={() => handleTabChange('progress')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors ${activeTab === 'progress' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
            aria-label="Progress Tracker"
            title={isCollapsed ? 'Progress Tracker' : undefined}
          >
            <LayoutDashboard size={18} />
            {!isCollapsed && <span className="font-medium">Progress Tracker</span>}
          </button>
          <button 
            onClick={() => handleTabChange('notebook')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors ${activeTab === 'notebook' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
            aria-label="Lab Notebook"
            title={isCollapsed ? 'Lab Notebook' : undefined}
          >
            <NotebookPen size={18} />
            {!isCollapsed && <span className="font-medium">Lab Notebook</span>}
          </button>
          <button 
            onClick={() => handleTabChange('dictionary')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors ${activeTab === 'dictionary' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
            aria-label="Dictionary"
            title={isCollapsed ? 'Dictionary' : undefined}
          >
            <BookMarked size={18} />
            {!isCollapsed && <span className="font-medium">Dictionary</span>}
          </button>
          <button
            onClick={() => handleTabChange('pinout')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-colors ${activeTab === 'pinout' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
            aria-label="GPIO Pinout"
            title={isCollapsed ? 'GPIO Pinout' : undefined}
          >
            <Cpu size={18} />
            {!isCollapsed && <span className="font-medium">GPIO Pinout</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="px-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Curriculum
          </div>
        )}

        <div className={`space-y-6 ${isCollapsed ? 'px-2' : 'px-4'} ${isCollapsed ? 'hidden' : ''}`}>
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
                    const locked = isProjectLocked(project.id);
                    
                    return (
                      <button
                        key={project.id}
                        onClick={() => !locked && onSelectProject(project.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          isActive 
                            ? 'bg-slate-800 text-white shadow-sm' 
                            : locked
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-slate-800/50'
                        }`}
                      >
                        {locked ? (
                          <Lock size={16} className="text-slate-600 shrink-0" />
                        ) : status === 'Completed' ? (
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

      {progress.badges.length > 0 && !isCollapsed && (
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
      {progress.badges.length > 0 && isCollapsed && (
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-center">
          <Award size={18} className="text-emerald-400" />
        </div>
      )}
      </div>
    </>
  );
}
