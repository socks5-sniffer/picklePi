import React, { useState, useEffect } from 'react';
import { curriculum } from './data/curriculum';
import { Project, UserProgress, LabEntry } from './types';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import ProgressTracker from './components/ProgressTracker';
import LabNotebookModal from './components/LabNotebookModal';
import LabNotebookView from './components/LabNotebookView';
import DictionaryView from './components/DictionaryView';
import LandingView from './components/LandingView';
import PinoutView from './components/PinoutView';

const INITIAL_PROGRESS: UserProgress = {
  projectStatuses: curriculum.reduce((acc, p) => ({ ...acc, [p.id]: 'Not Started' }), {}),
  badges: [],
  labNotebook: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'curriculum' | 'progress' | 'notebook' | 'dictionary' | 'pinout'>('home');
  const [activeProjectId, setActiveProjectId] = useState<string>(curriculum[0].id);
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('rpi-lab-progress');
      return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [projectToComplete, setProjectToComplete] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem('rpi-lab-progress', JSON.stringify(progress));
  }, [progress]);

  const activeProject = curriculum.find(p => p.id === activeProjectId) || curriculum[0];

  const isProjectLocked = (projectId: string) => {
    // Override to leave all levels unlocked for now
    return false;
    
    /* 
    // Actual logic for when we want to lock levels:
    const project = curriculum.find(p => p.id === projectId);
    if (!project || project.level === 1) return false;
    
    // Check if ALL projects from the previous level are completed
    const previousLevelProjects = curriculum.filter(p => p.level === project.level - 1);
    const isPreviousLevelCompleted = previousLevelProjects.every(
      p => progress.projectStatuses[p.id] === 'Completed'
    );
    
    return !isPreviousLevelCompleted;
    */
  };

  const handleStartProject = (projectId: string) => {
    setProgress(prev => ({
      ...prev,
      projectStatuses: {
        ...prev.projectStatuses,
        [projectId]: prev.projectStatuses[projectId] === 'Not Started' ? 'In Progress' : prev.projectStatuses[projectId]
      }
    }));
    setActiveProjectId(projectId);
    setActiveTab('curriculum');
    setIsMobileMenuOpen(false); // Close mobile menu when selecting a project
  };

  const handleCompleteProjectClick = (project: Project) => {
    setProjectToComplete(project);
    setIsLabModalOpen(true);
  };

  const handleSaveLabEntry = (entry: Omit<LabEntry, 'id' | 'date'>) => {
    if (!projectToComplete) return;

    const newEntry: LabEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    setProgress(prev => {
      const newBadges = prev.badges.includes(projectToComplete.badgeEarned) 
        ? prev.badges 
        : [...prev.badges, projectToComplete.badgeEarned];

      return {
        ...prev,
        projectStatuses: {
          ...prev.projectStatuses,
          [projectToComplete.id]: 'Completed'
        },
        badges: newBadges,
        labNotebook: [...prev.labNotebook, newEntry]
      };
    });

    setIsLabModalOpen(false);
    setProjectToComplete(null);
  };

  return (
    <div className="flex h-screen bg-[#1e2530] text-slate-100 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        progress={progress}
        activeProjectId={activeProjectId}
        onSelectProject={handleStartProject}
        isProjectLocked={isProjectLocked}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 bg-slate-700 text-white p-3 rounded-lg shadow-lg hover:bg-slate-600 transition-colors border border-slate-600"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'home' && (
            <LandingView
              progress={progress}
              onSelectProject={(id) => {
                handleStartProject(id);
                setActiveTab('curriculum');
              }}
            />
          )}
          {activeTab === 'curriculum' && (
            <ProjectView 
              project={activeProject} 
              status={progress.projectStatuses[activeProject.id]}
              isLocked={isProjectLocked(activeProject.id)}
              onComplete={() => handleCompleteProjectClick(activeProject)}
            />
          )}
          {activeTab === 'progress' && (
            <ProgressTracker progress={progress} />
          )}
          {activeTab === 'notebook' && (
            <LabNotebookView entries={progress.labNotebook} />
          )}
          {activeTab === 'dictionary' && (
            <DictionaryView />
          )}
          {activeTab === 'pinout' && (
            <PinoutView />
          )}
        </div>
      </main>

      {isLabModalOpen && projectToComplete && (
        <LabNotebookModal 
          project={projectToComplete}
          onSave={handleSaveLabEntry}
          onClose={() => setIsLabModalOpen(false)}
        />
      )}
    </div>
  );
}
