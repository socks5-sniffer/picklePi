import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { Clock, AlertTriangle, CheckCircle2, Code2, Lightbulb, FlaskConical, Wrench, Award, Copy, Check, BookOpen, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import InteractiveText from './InteractiveText';
import { dictionary } from '../data/dictionary';

interface ProjectViewProps {
  project: Project;
  status: ProjectStatus;
  isLocked: boolean;
  onComplete: () => void;
}

export default function ProjectView({ project, status, isLocked, onComplete }: ProjectViewProps) {
  const [copied, setCopied] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20">
        <FlaskConical size={48} className="mb-4 text-slate-300" />
        <h2 className="text-2xl font-semibold mb-2">Level {project.level} Locked</h2>
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
  const hasPages = content.pages && content.pages.length > 0;
  const currentPage = hasPages ? content.pages[currentPageIndex] : null;
  const currentContent = currentPage ? currentPage.content : content;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentContent.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied — do not show false confirmation
    }
  };

  const handleNextPage = () => {
    if (hasPages && currentPageIndex < content.pages!.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (hasPages && currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGetHelp = () => {
    // Find troubleshooting page (last page with 'p1-troubleshooting' id)
    if (hasPages) {
      const troubleshootingPageIndex = content.pages!.findIndex(
        page => page.id.includes('troubleshooting')
      );
      if (troubleshootingPageIndex !== -1) {
        setCurrentPageIndex(troubleshootingPageIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-600 font-semibold tracking-wide uppercase text-sm">
          <span>Level {project.level}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
          <span>{project.levelName}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight">{project.title}</h1>
        
        {/* Page indicator for multi-page projects */}
        {hasPages && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>📄 Page {currentPageIndex + 1} of {content.pages!.length}: {currentPage!.title}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 shadow-sm">
            <Clock size={16} className="text-slate-400" />
            <span>{content.overview.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 shadow-sm">
            <span className="text-slate-400 font-medium">Difficulty:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= content.overview.difficulty ? 'bg-amber-400' : 'bg-slate-600'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Top Page Navigation */}
        {hasPages && content.pages && content.pages.length > 1 && (
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPageIndex === 0}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                currentPageIndex === 0
                  ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                  : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
              }`}
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {content.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPageIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentPageIndex ? 'bg-emerald-400' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  title={`Go to page ${index + 1}: ${content.pages![index].title}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === content.pages.length - 1}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                currentPageIndex === content.pages.length - 1
                  ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                  : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
              }`}
            >
              Next
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </header>

      {/* Overview */}
      {currentContent.overview.description && (
        <section className="bg-slate-800/50 rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-700">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-400" />
            Project Overview
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6 text-lg">
            <InteractiveText text={currentContent.overview.description} dictionary={dictionary} />
          </p>
          {currentContent.overview.concepts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Concepts Introduced</h3>
              <div className="flex flex-wrap gap-2">
                {currentContent.overview.concepts.map(concept => (
                  <span key={concept} className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-700">
                    <InteractiveText text={concept} dictionary={dictionary} />
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Hardware Setup */}
      {currentContent.hardwareSetup.steps.length > 0 && (
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
                      <li key={i}><InteractiveText text={warning} dictionary={dictionary} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-700">
            <ol className="space-y-4 list-decimal list-inside text-slate-300 marker:text-slate-500 marker:font-bold text-sm sm:text-base">
              {currentContent.hardwareSetup.steps.map((step, i) => (
                <li key={i} className="pl-2 leading-relaxed"><InteractiveText text={step} dictionary={dictionary} /></li>
              ))}
            </ol>
            {currentContent.hardwareSetup.explanation && (
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-sm text-slate-400 italic">
                  <span className="font-semibold not-italic text-slate-300">What's happening: </span>
                  <InteractiveText text={currentContent.hardwareSetup.explanation} dictionary={dictionary} />
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Code Section */}
      {currentContent.code && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <Code2 size={24} className="text-blue-500" />
            The Code
          </h2>
          
          <div className="relative group">
            <div className="absolute right-4 top-4 z-10">
              <button 
                onClick={handleCopyCode}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-[#1a1f2e] text-[#e2e8f0] p-4 sm:p-6 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed shadow-inner border border-slate-700 overflow-x-auto">
              <code className="whitespace-pre-wrap break-words">{currentContent.code}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Code Walkthrough */}
      {currentContent.codeWalkthrough.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <Code2 size={24} className="text-blue-500" />
            Code Walkthrough
          </h2>
          <div className="bg-slate-800/50 rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-700 space-y-6">
            <div className="space-y-6">
              {currentContent.codeWalkthrough.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="sm:w-1/3 shrink-0">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-blue-300 bg-blue-900/50 px-2 py-1 rounded border border-blue-700 inline-block">
                      <InteractiveText text={item.section} dictionary={dictionary} />
                    </span>
                  </div>
                  <div className="sm:w-2/3 text-slate-300 text-sm leading-relaxed">
                    <InteractiveText text={item.explanation} dictionary={dictionary} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Concept Deep Dive */}
      {(currentContent.conceptDeepDive.hardware || currentContent.conceptDeepDive.software || currentContent.conceptDeepDive.connection) && (
        <section className="bg-gradient-to-br from-slate-800 to-emerald-950 rounded-2xl p-4 sm:p-8 text-white shadow-lg border border-slate-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb size={24} className="text-amber-400" />
            Concept Deep Dive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {currentContent.conceptDeepDive.hardware && (
              <div className="space-y-3">
                <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">Hardware</h3>
                <p className="text-slate-300 text-sm leading-relaxed"><InteractiveText text={currentContent.conceptDeepDive.hardware} dictionary={dictionary} /></p>
              </div>
            )}
            {currentContent.conceptDeepDive.software && (
              <div className="space-y-3">
                <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">Software</h3>
                <p className="text-slate-300 text-sm leading-relaxed"><InteractiveText text={currentContent.conceptDeepDive.software} dictionary={dictionary} /></p>
              </div>
            )}
            {currentContent.conceptDeepDive.connection && (
              <div className="space-y-3">
                <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">Connection</h3>
                <p className="text-slate-300 text-sm leading-relaxed"><InteractiveText text={currentContent.conceptDeepDive.connection} dictionary={dictionary} /></p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experiment Mode */}
      {(currentContent.experimentMode.tweak || currentContent.experimentMode.logic || currentContent.experimentMode.creative) && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-4">
            <FlaskConical size={24} className="text-emerald-400" />
            Experiment Mode
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {currentContent.experimentMode.tweak && (
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-700 border-t-4 border-t-emerald-400">
                <h3 className="font-bold text-slate-100 mb-2">Small Tweak</h3>
                <p className="text-sm text-slate-400"><InteractiveText text={currentContent.experimentMode.tweak} dictionary={dictionary} /></p>
              </div>
            )}
            {currentContent.experimentMode.logic && (
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-700 border-t-4 border-t-blue-400">
                <h3 className="font-bold text-slate-100 mb-2">Logic Change</h3>
                <p className="text-sm text-slate-400"><InteractiveText text={currentContent.experimentMode.logic} dictionary={dictionary} /></p>
              </div>
            )}
            {currentContent.experimentMode.creative && (
              <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-700 border-t-4 border-t-purple-400">
                <h3 className="font-bold text-slate-100 mb-2">Creative Challenge</h3>
                <p className="text-sm text-slate-400"><InteractiveText text={currentContent.experimentMode.creative} dictionary={dictionary} /></p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Troubleshooting */}
      {currentContent.troubleshooting.length > 0 && (
        <section className="bg-slate-800/30 rounded-2xl p-4 sm:p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-rose-400" />
            Troubleshooting
          </h2>
          <div className="space-y-4">
            {currentContent.troubleshooting.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 bg-slate-800/50 rounded-xl shadow-sm border border-slate-700">
                <div className="sm:w-1/3 font-medium text-rose-400 text-sm">
                  <InteractiveText text={item.issue} dictionary={dictionary} />
                </div>
                <div className="sm:w-2/3 text-slate-400 text-sm">
                  <InteractiveText text={item.solution} dictionary={dictionary} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Page Navigation for multi-page projects */}
      {hasPages && content.pages && content.pages.length > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-700">
          <button
            onClick={handlePreviousPage}
            disabled={currentPageIndex === 0}
            className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              currentPageIndex === 0
                ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>
          
          <div className="flex items-center gap-1.5 sm:gap-2 order-first sm:order-none">
            {content.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPageIndex(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentPageIndex ? 'bg-emerald-400' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                title={`Go to page ${index + 1}: ${content.pages![index].title}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {currentPageIndex !== content.pages.length - 1 && (
              <button
                onClick={handleGetHelp}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium bg-slate-800/50 text-blue-400 hover:bg-slate-700/50 transition-colors border border-slate-700 text-sm"
                title="Get help or troubleshooting"
              >
                <HelpCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline text-sm">Help</span>
              </button>
            )}

            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === content.pages.length - 1}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                currentPageIndex === content.pages.length - 1
                  ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                  : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
              }`}
            >
              Next
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Completion Action - only show on last page */}
      {(!hasPages || currentPageIndex === content.pages!.length - 1) && (
        <div className="pt-8 flex justify-center">
          {status === 'Completed' ? (
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
