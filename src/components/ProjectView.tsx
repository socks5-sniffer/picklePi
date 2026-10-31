import { Key, ReactNode, useEffect, useId, useRef, useState } from "react";
import { Project, ProjectStatus } from "../types";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Code2,
  Lightbulb,
  FlaskConical,
  Wrench,
  Award,
  Copy,
  Check,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import InteractiveText from "./InteractiveText";
import { dictionary } from "../data/dictionary";
import HardwareStepsList from "./lesson/HardwareSteps";
import {
  availableSections,
  clampPageIndex,
  getLessonPage,
} from "../lib/learning";

interface ProjectViewProps {
  project: Project;
  status: ProjectStatus;
  isLocked: boolean;
  onComplete: () => void;
}

interface PageNavProps {
  pages: Array<{ title: string }>;
  currentPageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onHelp?: () => void;
  position: "top" | "bottom";
}

function PageNav({
  pages,
  currentPageIndex,
  onPrevious,
  onNext,
  onGoTo,
  onHelp,
  position,
}: PageNavProps) {
  const isTop = position === "top";
  return (
    <nav
      aria-label={`${isTop ? "Top" : "Bottom"} lesson page navigation`}
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isTop ? "pb-4 border-b" : "pt-8 border-t"} border-slate-700`}
    >
      <button
        onClick={onPrevious}
        aria-label="Previous page"
        disabled={currentPageIndex === 0}
        className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
          currentPageIndex === 0
            ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-500"
            : "bg-slate-800 text-emerald-400 hover:bg-slate-700"
        }`}
      >
        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 order-first sm:order-none">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`min-w-10 h-10 px-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
              index === currentPageIndex
                ? "bg-emerald-400 text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            aria-label={`Page ${index + 1}: ${page.title}`}
            aria-current={index === currentPageIndex ? "page" : undefined}
            title={`Go to page ${index + 1}: ${page.title}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {onHelp && currentPageIndex !== pages.length - 1 && (
          <button
            onClick={onHelp}
            aria-label="Get help or troubleshooting"
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium bg-slate-800/50 text-blue-400 hover:bg-slate-700/50 transition-colors border border-slate-700 text-sm"
            title="Get help or troubleshooting"
          >
            <HelpCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline text-sm">Help</span>
          </button>
        )}

        <button
          onClick={onNext}
          disabled={currentPageIndex === pages.length - 1}
          className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            currentPageIndex === pages.length - 1
              ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-500"
              : "bg-slate-800 text-emerald-400 hover:bg-slate-700"
          }`}
        >
          Next
          <ChevronRight size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </nav>
  );
}

// ── Collapsible item (code walkthrough + troubleshooting) ─────────────────────

interface CollapsibleItemProps {
  key?: Key;
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

function CollapsibleItem({
  header,
  children,
  defaultOpen = false,
  accentColor = "text-slate-300",
}: CollapsibleItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-700/30 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={`font-medium text-sm sm:text-base ${accentColor}`}>
          {header}
        </span>
        {open ? (
          <ChevronUp size={16} className="shrink-0 text-slate-500" />
        ) : (
          <ChevronDown size={16} className="shrink-0 text-slate-500" />
        )}
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          className="px-4 pb-4 pt-2 border-t border-slate-700/40 text-sm sm:text-base text-slate-300 leading-relaxed"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProjectView({
  project,
  status,
  isLocked,
  onComplete,
}: ProjectViewProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyRequest = useRef(0);

  useEffect(() => {
    setCurrentPageIndex(0);
  }, [project.id]);

  useEffect(() => {
    copyRequest.current += 1;
    setCopied(false);
    setCopyError(false);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    return () => {
      copyRequest.current += 1;
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, [project.id, currentPageIndex]);

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20">
        <FlaskConical size={48} className="mb-4 text-slate-300" />
        <h2 className="text-2xl font-semibold mb-2">
          Level {project.level} Locked
        </h2>
        <p>Complete previous levels to unlock this project.</p>
      </div>
    );
  }

  if (!project.content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20">
        <FlaskConical size={48} className="mb-4 text-slate-300" />
        <h2 className="text-2xl font-semibold mb-2">Content Coming Soon</h2>
        <p>This project is unlocked, but the content is still being written.</p>
      </div>
    );
  }

  const { content } = project;
  const pages = content.pages ?? [];
  const hasPages = pages.length > 0;
  const currentPage = pages[currentPageIndex] ?? null;
  const currentContent = getLessonPage(content, currentPageIndex);
  const sections = availableSections(currentContent);

  const handleCopyCode = async () => {
    setCopied(false);
    setCopyError(false);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    const request = ++copyRequest.current;
    try {
      await navigator.clipboard.writeText(currentContent.code);
      if (request !== copyRequest.current) return;
      setCopyError(false);
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      if (request !== copyRequest.current) return;
      setCopied(false);
      setCopyError(true);
    }
  };

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    topRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleNextPage = () => {
    if (hasPages && currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(clampPageIndex(currentPageIndex + 1, pages.length));
      scrollToTop();
    }
  };

  const handlePreviousPage = () => {
    if (hasPages && currentPageIndex > 0) {
      setCurrentPageIndex(clampPageIndex(currentPageIndex - 1, pages.length));
      scrollToTop();
    }
  };

  const handleGetHelp = () => {
    // Find the first page whose id includes 'troubleshooting'
    if (hasPages) {
      const troubleshootingPageIndex = pages.findIndex((page) =>
        page.id.includes("troubleshooting"),
      );
      if (troubleshootingPageIndex !== -1) {
        setCurrentPageIndex(troubleshootingPageIndex);
        scrollToTop();
      }
    }
  };

  return (
    <div
      ref={topRef}
      className="space-y-12 pb-20 animate-in fade-in duration-500"
    >
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-600 font-semibold tracking-wide uppercase text-sm">
          <span>Level {project.level}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
          <span>{project.levelName}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          {project.title}
        </h1>

        {/* Page indicator for multi-page projects */}
        {hasPages && currentPage && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>
              <span aria-hidden="true">📄</span> Page {currentPageIndex + 1} of{" "}
              {pages.length}: {currentPage.title}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 shadow-sm">
            <Clock size={16} className="text-slate-400" />
            <span>{content.overview.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 shadow-sm">
            <span className="text-slate-400 font-medium">Difficulty:</span>
            <div
              className="flex gap-1"
              role="img"
              aria-label={`${content.overview.difficulty} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= content.overview.difficulty ? "bg-amber-400" : "bg-slate-600"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Top Page Navigation for multi-page projects */}
      {hasPages && pages.length > 1 && (
        <PageNav
          pages={pages}
          currentPageIndex={currentPageIndex}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          onGoTo={(index) => {
            setCurrentPageIndex(index);
            scrollToTop();
          }}
          position="top"
        />
      )}

      {currentPageIndex === 0 && (
        <aside
          className="rounded-2xl border border-emerald-700/60 bg-emerald-950/30 p-5 sm:p-6"
          aria-label="How to use this lesson"
        >
          <h2 className="font-bold text-emerald-200 text-lg">
            Your learning path
          </h2>
          <p className="mt-2 text-slate-300 leading-relaxed">
            Start with the overview, then follow the steps at your own pace. Use
            the code and walkthrough when you need them. If something does not
            work, check Troubleshooting; experimenting is part of learning.
          </p>
          <p className="mt-2 text-sm text-slate-300">
            <strong>Read here, run on your Pi:</strong> This page is your guide.
            Run the project code on your Raspberry Pi.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            New to a word? Select a highlighted term to explore its meaning. The
            deep dive and challenges are there when you are ready for more.
          </p>
        </aside>
      )}

      {/* Overview */}
      {currentContent.overview.description && (
        <section className="bg-slate-800/50 rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-700">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-400" />
            Quick explanation
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6 text-lg">
            <InteractiveText
              text={currentContent.overview.description}
              dictionary={dictionary}
            />
          </p>
          {currentContent.overview.concepts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Concepts Introduced
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentContent.overview.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-700"
                  >
                    <InteractiveText text={concept} dictionary={dictionary} />
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Hardware Setup */}
      {sections.hardware && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <Wrench size={24} className="text-amber-500" />
            Hardware Setup
          </h2>

          {currentContent.hardwareSetup.warnings.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-600 shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-amber-800 font-bold">Safety Warnings</h3>
                  <ul className="list-disc list-inside text-amber-700 space-y-1 text-sm">
                    {currentContent.hardwareSetup.warnings.map((warning, i) => (
                      <li key={i}>
                        <InteractiveText
                          text={warning}
                          dictionary={dictionary}
                          variant="light"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-700">
            {currentContent.hardwareSetup.steps.length > 0 && (
              <HardwareStepsList
                key={`${project.id}-${currentPageIndex}`}
                steps={currentContent.hardwareSetup.steps}
              />
            )}
            {currentContent.hardwareSetup.explanation && (
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-sm text-slate-400 italic">
                  <span className="font-semibold not-italic text-slate-300">
                    What's happening:{" "}
                  </span>
                  <InteractiveText
                    text={currentContent.hardwareSetup.explanation}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Code Section */}
      {sections.code && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <Code2 size={24} className="text-blue-500" />
            The Code
          </h2>

          <p
            role="status"
            aria-live="polite"
            className="text-sm text-amber-300"
          >
            {copyError
              ? "Clipboard access is unavailable. Select the code below and copy it manually."
              : copied
                ? "Code copied to clipboard."
                : ""}
          </p>
          <div className="relative group">
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={handleCopyCode}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-[#1a1f2e] text-[#e2e8f0] p-4 sm:p-6 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed shadow-inner border border-slate-700 overflow-x-auto">
              <code className="whitespace-pre-wrap break-words">
                {currentContent.code}
              </code>
            </pre>
          </div>
        </section>
      )}

      {/* Code Walkthrough */}
      {sections.walkthrough && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <Code2 size={24} className="text-blue-500" />
            Code Walkthrough
          </h2>
          <p className="text-slate-400">
            Curious how the code works? Open each part for an explanation.
          </p>
          <div className="space-y-2">
            {currentContent.codeWalkthrough.map((item, i) => (
              <CollapsibleItem
                key={`${project.id}-${currentPageIndex}-${i}-${item.section}`}
                header={
                  <span className="font-mono text-xs sm:text-sm font-semibold text-blue-300 bg-blue-900/50 px-2 py-1 rounded border border-blue-700">
                    {item.section}
                  </span>
                }
              >
                <InteractiveText
                  text={item.explanation}
                  dictionary={dictionary}
                />
              </CollapsibleItem>
            ))}
          </div>
        </section>
      )}

      {/* Concept Deep Dive */}
      {sections.deepDive && (
        <section className="bg-gradient-to-br from-slate-800 to-emerald-950 rounded-2xl p-4 sm:p-8 text-white shadow-lg border border-slate-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb size={24} className="text-amber-400" />
            Concept Deep Dive
          </h2>
          <p className="text-slate-300 mb-6">
            Want to understand more? Explore the ideas behind this project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {currentContent.conceptDeepDive.hardware && (
              <div className="space-y-3">
                <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">
                  Hardware
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <InteractiveText
                    text={currentContent.conceptDeepDive.hardware}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
            {currentContent.conceptDeepDive.software && (
              <div className="space-y-3">
                <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">
                  Software
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <InteractiveText
                    text={currentContent.conceptDeepDive.software}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
            {currentContent.conceptDeepDive.connection && (
              <div className="space-y-3">
                <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">
                  Connection
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <InteractiveText
                    text={currentContent.conceptDeepDive.connection}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experiment Mode */}
      {sections.experiments && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <FlaskConical size={24} className="text-emerald-400" />
            Experiment Mode
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {currentContent.experimentMode.tweak && (
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-700 border-t-4 border-t-emerald-400">
                <h3 className="font-bold text-slate-100 mb-2">Small Tweak</h3>
                <p className="text-sm text-slate-400">
                  <InteractiveText
                    text={currentContent.experimentMode.tweak}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
            {currentContent.experimentMode.logic && (
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-700 border-t-4 border-t-blue-400">
                <h3 className="font-bold text-slate-100 mb-2">Logic Change</h3>
                <p className="text-sm text-slate-400">
                  <InteractiveText
                    text={currentContent.experimentMode.logic}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
            {currentContent.experimentMode.creative && (
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-700 border-t-4 border-t-purple-400">
                <h3 className="font-bold text-slate-100 mb-2">
                  Creative Challenge
                </h3>
                <p className="text-sm text-slate-400">
                  <InteractiveText
                    text={currentContent.experimentMode.creative}
                    dictionary={dictionary}
                  />
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Troubleshooting */}
      {sections.troubleshooting && (
        <section className="bg-slate-800/30 rounded-2xl p-4 sm:p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
            <AlertTriangle size={20} className="text-rose-400" />
            Troubleshooting
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Click a problem to reveal the solution.
          </p>
          <div className="space-y-2">
            {currentContent.troubleshooting.map((item, i) => (
              <CollapsibleItem
                key={`${project.id}-${currentPageIndex}-${i}-${item.issue}`}
                header={
                  <InteractiveText text={item.issue} dictionary={dictionary} />
                }
                accentColor="text-rose-400"
              >
                <InteractiveText text={item.solution} dictionary={dictionary} />
              </CollapsibleItem>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Page Navigation for multi-page projects */}
      {hasPages && pages.length > 1 && (
        <PageNav
          pages={pages}
          currentPageIndex={currentPageIndex}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          onGoTo={(index) => {
            setCurrentPageIndex(index);
            scrollToTop();
          }}
          onHelp={handleGetHelp}
          position="bottom"
        />
      )}

      {/* Completion Action - only show on last page */}
      {(!hasPages || currentPageIndex === pages.length - 1) && (
        <div className="pt-8 flex justify-center">
          {status === "Completed" ? (
            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-900/30 px-6 py-4 rounded-2xl border border-emerald-700 font-bold text-lg">
              <CheckCircle2 size={28} />
              Project Completed & Badge Earned!
            </div>
          ) : (
            <button
              onClick={onComplete}
              className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Award size={24} className="text-amber-400" />
              Complete Project & Claim Badge
            </button>
          )}
        </div>
      )}
    </div>
  );
}
