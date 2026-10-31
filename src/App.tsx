import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, ChevronRight, Sprout } from "lucide-react";
import { curriculum } from "./data/curriculum";
import type { LabEntry, Project } from "./types";
import { navigationItems, type AppTab } from "./lib/navigation";
import { useProgress } from "./hooks/useProgress";
import { useTheme } from "./hooks/useTheme";
import Sidebar from "./components/Sidebar";
import LabNotebookModal from "./components/LabNotebookModal";
import LandingView from "./components/LandingView";

const ProjectView = lazy(() => import("./components/ProjectView"));
const ProgressTracker = lazy(() => import("./components/ProgressTracker"));
const LabNotebookView = lazy(() => import("./components/LabNotebookView"));
const DictionaryView = lazy(() => import("./components/DictionaryView"));
const PinoutView = lazy(() => import("./components/PinoutView"));

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [activeProjectId, setActiveProjectId] = useState(curriculum[0].id);
  const [projectToComplete, setProjectToComplete] = useState<Project | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);
  const { progress, storageWarning, startProject, completeProject } =
    useProgress();
  const { isDark, toggleTheme } = useTheme();
  const activeProject =
    curriculum.find((project) => project.id === activeProjectId) ??
    curriculum[0];
  const currentNavigation = navigationItems.find(
    (item) => item.id === activeTab,
  )!;

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab, activeProjectId]);

  // If a phone is rotated into the desktop layout, release the mobile overlay.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    // Restore focus only after React has removed inert from the workspace.
    if (menuWasOpen.current && !isMobileMenuOpen)
      menuButtonRef.current?.focus();
    menuWasOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  function closeMenu() {
    setIsMobileMenuOpen(false);
  }

  function navigate(tab: AppTab) {
    setActiveTab(tab);
    if (isMobileMenuOpen) closeMenu();
  }

  function openProject(projectId: string) {
    startProject(projectId);
    setActiveProjectId(projectId);
    navigate("curriculum");
  }

  async function saveLabEntry(entry: Omit<LabEntry, "id" | "date">) {
    if (!projectToComplete) return;
    await completeProject(projectToComplete, entry);
    setProjectToComplete(null);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={navigate}
        progress={progress}
        activeProjectId={activeProjectId}
        onSelectProject={openProject}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMenu}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((previous) => !previous)}
      />
      <div className="workspace" inert={isMobileMenuOpen}>
        <header className="workspace-header">
          <div className="flex items-center gap-3 min-w-0">
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="icon-button lg:hidden"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="workshop-sidebar"
            >
              <Menu size={21} />
            </button>
            <span className="header-brand hidden sm:inline">WORKSPACE</span>
            <ChevronRight size={14} className="muted hidden sm:block" />
            <span className="text-sm font-semibold truncate">
              {currentNavigation.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="header-note hidden md:flex">
              <Sprout size={15} /> A little curiosity goes a long way.
            </span>
            <button
              onClick={toggleTheme}
              className="theme-button"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
              <span className="hidden sm:inline">
                {isDark ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </header>
        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="workspace-main"
        >
          <div
            className={`page-container ${activeTab === "curriculum" ? "lesson-container" : ""}`}
          >
            {storageWarning && (
              <p role="status" className="storage-warning">
                Your browser cannot save progress. Keep this tab open; progress
                will be lost when you close or reload it.
              </p>
            )}
            <Suspense
              fallback={
                <p role="status" className="muted py-12">
                  Opening your workshop…
                </p>
              }
            >
              {activeTab === "home" && (
                <LandingView
                  progress={progress}
                  onSelectProject={openProject}
                  onNavigate={navigate}
                />
              )}
              {activeTab === "curriculum" && (
                <ProjectView
                  key={activeProject.id}
                  project={activeProject}
                  status={progress.projectStatuses[activeProject.id]}
                  isLocked={false}
                  onComplete={() => setProjectToComplete(activeProject)}
                />
              )}
              {activeTab === "progress" && (
                <ProgressTracker progress={progress} />
              )}
              {activeTab === "notebook" && (
                <LabNotebookView
                  entries={progress.labNotebook}
                  onStartProject={() => openProject(curriculum[0].id)}
                />
              )}
              {activeTab === "dictionary" && <DictionaryView />}
              {activeTab === "pinout" && <PinoutView />}
            </Suspense>
          </div>
        </main>
      </div>
      {projectToComplete && (
        <LabNotebookModal
          project={projectToComplete}
          onSave={saveLabEntry}
          onClose={() => setProjectToComplete(null)}
        />
      )}
    </div>
  );
}
