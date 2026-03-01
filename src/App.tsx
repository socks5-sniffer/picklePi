import React, { useState, useEffect } from 'react';
import { curriculum } from './data/curriculum';
import { Project, UserProgress, LabEntry } from './types';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import ProgressTracker from './components/ProgressTracker';
import LabNotebookModal from './components/LabNotebookModal';
import LabNotebookView from './components/LabNotebookView';

const INITIAL_PROGRESS: UserProgress = {
  projectStatuses: curriculum.reduce((acc, p) => ({ ...acc, [p.id]: 'Not Started' }), {}),
  badges: [],
  labNotebook: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'progress' | 'notebook'>('curriculum');
  const [activeProjectId, setActiveProjectId] = useState<string>(curriculum[0].id);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('rpi-lab-progress');
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [projectToComplete, setProjectToComplete] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem('rpi-lab-progress', JSON.stringify(progress));
  }, [progress]);

  const activeProject = curriculum.find(p => p.id === activeProjectId) || curriculum[0];

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
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        progress={progress}
        activeProjectId={activeProjectId}
        onSelectProject={handleStartProject}
      />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'curriculum' && (
            <ProjectView 
              project={activeProject} 
              status={progress.projectStatuses[activeProject.id]}
              onComplete={() => handleCompleteProjectClick(activeProject)}
            />
          )}
          {activeTab === 'progress' && (
            <ProgressTracker progress={progress} />
          )}
          {activeTab === 'notebook' && (
            <LabNotebookView entries={progress.labNotebook} />
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
