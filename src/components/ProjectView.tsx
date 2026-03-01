import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { Clock, AlertTriangle, CheckCircle2, Code2, Lightbulb, FlaskConical, Wrench, Award, Copy, Check, BookOpen } from 'lucide-react';

interface ProjectViewProps {
  project: Project;
  status: ProjectStatus;
  isLocked: boolean;
  onComplete: () => void;
}

export default function ProjectView({ project, status, isLocked, onComplete }: ProjectViewProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(content.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{project.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Clock size={16} className="text-slate-400" />
            <span>{content.overview.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="text-slate-400 font-medium">Difficulty:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= content.overview.difficulty ? 'bg-amber-400' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-500" />
          Project Overview
        </h2>
        <p className="text-slate-700 leading-relaxed mb-6 text-lg">
          {content.overview.description}
        </p>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Concepts Introduced</h3>
          <div className="flex flex-wrap gap-2">
            {content.overview.concepts.map(concept => (
              <span key={concept} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Setup */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-4">
          <Wrench size={24} className="text-amber-500" />
          Hardware Setup
        </h2>
        
        {content.hardwareSetup.warnings.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <div className="flex gap-3">
              <AlertTriangle className="text-amber-600 shrink-0" />
              <div className="space-y-2">
                <h3 className="text-amber-800 font-bold">Safety Warnings</h3>
                <ul className="list-disc list-inside text-amber-700 space-y-1 text-sm">
                  {content.hardwareSetup.warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <ol className="space-y-4 list-decimal list-inside text-slate-700 marker:text-slate-400 marker:font-bold">
            {content.hardwareSetup.steps.map((step, i) => (
              <li key={i} className="pl-2 leading-relaxed">{step}</li>
            ))}
          </ol>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-600 italic">
              <span className="font-semibold not-italic text-slate-700">What's happening: </span>
              {content.hardwareSetup.explanation}
            </p>
          </div>
        </div>
      </section>

      {/* Code Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-4">
          <Code2 size={24} className="text-blue-500" />
          The Code
        </h2>
        
        <div className="relative group">
          <div className="absolute right-4 top-4">
            <button 
              onClick={handleCopyCode}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors flex items-center gap-2 text-sm font-medium"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-[#0d1117] text-[#c9d1d9] p-6 rounded-2xl overflow-x-auto text-sm font-mono leading-relaxed shadow-inner border border-slate-800">
            <code>{content.code}</code>
          </pre>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Code Walkthrough</h3>
          <div className="space-y-6">
            {content.codeWalkthrough.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1/3 shrink-0">
                  <span className="font-mono text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                    {item.section}
                  </span>
                </div>
                <div className="w-2/3 text-slate-700 text-sm leading-relaxed">
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Deep Dive */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lightbulb size={24} className="text-amber-400" />
          Concept Deep Dive
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">Hardware</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{content.conceptDeepDive.hardware}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">Software</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{content.conceptDeepDive.software}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-indigo-300 font-semibold uppercase tracking-wider text-sm">Connection</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{content.conceptDeepDive.connection}</p>
          </div>
        </div>
      </section>

      {/* Experiment Mode */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-4">
          <FlaskConical size={24} className="text-emerald-500" />
          Experiment Mode
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-400">
            <h3 className="font-bold text-slate-900 mb-2">Small Tweak</h3>
            <p className="text-sm text-slate-600">{content.experimentMode.tweak}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-blue-400">
            <h3 className="font-bold text-slate-900 mb-2">Logic Change</h3>
            <p className="text-sm text-slate-600">{content.experimentMode.logic}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-purple-400">
            <h3 className="font-bold text-slate-900 mb-2">Creative Challenge</h3>
            <p className="text-sm text-slate-600">{content.experimentMode.creative}</p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <AlertTriangle size={20} className="text-rose-500" />
          Troubleshooting
        </h2>
        <div className="space-y-4">
          {content.troubleshooting.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="sm:w-1/3 font-medium text-rose-700 text-sm">
                {item.issue}
              </div>
              <div className="sm:w-2/3 text-slate-600 text-sm">
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completion Action */}
      <div className="pt-8 flex justify-center">
        {status === 'Completed' ? (
          <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-200 font-bold text-lg">
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
    </div>
  );
}
