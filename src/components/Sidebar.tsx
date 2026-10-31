import { useEffect, useRef } from "react";
import {
  CircuitBoard,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Sprout,
} from "lucide-react";
import { curriculum } from "../data/curriculum";
import type { UserProgress } from "../types";
import { navigationItems, type AppTab } from "../lib/navigation";

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  progress: UserProgress;
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  progress,
  activeProjectId,
  onSelectProject,
  isMobileMenuOpen,
  onCloseMobileMenu,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onCloseMobileMenu);
  closeRef.current = onCloseMobileMenu;
  const completed = curriculum.filter(
    (project) => progress.projectStatuses[project.id] === "Completed",
  ).length;
  const percent = Math.round((completed / curriculum.length) * 100);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const sidebar = sidebarRef.current;
    sidebar
      ?.querySelector<HTMLButtonElement>('[aria-label="Close menu"]')
      ?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab" || !sidebar) return;
      const buttons = [
        ...sidebar.querySelectorAll<HTMLButtonElement>("button"),
      ].filter((button) => button.getClientRects().length > 0);
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="sidebar-backdrop lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}
      <aside
        id="workshop-sidebar"
        ref={sidebarRef}
        aria-label="Workshop navigation"
        className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""} ${isMobileMenuOpen ? "sidebar-open" : ""}`}
      >
        <div className="sidebar-brand">
          <button
            onClick={() => setActiveTab("home")}
            className="brand-link"
            aria-label="picklePi home"
            title="picklePi home"
          >
            <span className="brand-icon">
              <CircuitBoard size={23} />
            </span>
            <span className="sidebar-label">
              <span className="brand-name">
                pickle<span>Pi</span>
              </span>
              <span className="brand-caption">THE MAKER WORKSHOP</span>
            </span>
          </button>
          <button
            className="icon-button lg:hidden"
            aria-label="Close menu"
            onClick={onCloseMobileMenu}
          >
            <X size={20} />
          </button>
          <button
            className="collapse-button hidden lg:flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>
        <div className="sidebar-scroll">
          <p className="nav-label sidebar-label">MAKE YOURSELF AT HOME</p>
          <nav className="primary-nav" aria-label="Main">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-label={label}
                title={isCollapsed ? label : undefined}
                aria-current={activeTab === id ? "page" : undefined}
                className={`nav-button ${activeTab === id ? "nav-active" : ""}`}
              >
                <Icon size={18} />
                <span className="sidebar-label">{label}</span>
                {id === "curriculum" && (
                  <span className="nav-count sidebar-label">
                    {curriculum.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="build-path sidebar-label">
            <div className="flex justify-between items-center mb-4">
              <p className="nav-label">YOUR BUILD PATH</p>
              <span className="path-open">All open</span>
            </div>
            <nav aria-label="Projects">
              {curriculum.map((project) => {
                const status = progress.projectStatuses[project.id];
                return (
                  <button
                    key={project.id}
                    aria-label={project.title}
                    aria-current={
                      activeTab === "curriculum" &&
                      activeProjectId === project.id
                        ? "page"
                        : undefined
                    }
                    className={`path-project ${status === "Completed" ? "path-complete" : ""}`}
                    onClick={() => onSelectProject(project.id)}
                  >
                    <span className="path-number">
                      {status === "Completed" ? (
                        <Check size={13} />
                      ) : (
                        String(project.level).padStart(2, "0")
                      )}
                    </span>
                    <span className="truncate">{project.title}</span>
                    {status === "In Progress" && (
                      <span
                        className="in-progress-dot"
                        aria-label="In progress"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-label">
            <div className="flex justify-between text-xs mb-3">
              <span>Your growing skills</span>
              <strong>
                {completed}/{curriculum.length}
              </strong>
            </div>
            <div
              className="workshop-progress"
              role="progressbar"
              aria-label="Projects completed"
              aria-valuenow={completed}
              aria-valuemin={0}
              aria-valuemax={curriculum.length}
            >
              <span style={{ width: `${percent}%` }} />
            </div>
            <p className="flex items-center gap-2 mt-3">
              <Sprout size={14} /> Small steps. Real discoveries.
            </p>
          </div>
          <Sprout size={20} className="collapsed-sprout" />
        </div>
      </aside>
    </>
  );
}
