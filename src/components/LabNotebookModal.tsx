import React, { useState } from 'react';
import { Project, LabEntry } from '../types';
import { X, Award, NotebookPen } from 'lucide-react';

interface LabNotebookModalProps {
  project: Project;
  onSave: (entry: Omit<LabEntry, 'id' | 'date'>) => void;
  onClose: () => void;
}

export default function LabNotebookModal({ project, onSave, onClose }: LabNotebookModalProps) {
  const [formData, setFormData] = useState({
    whatWorked: '',
    whatDidnt: '',
    whatChanged: '',
    oneThingLearned: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      projectId: project.id,
      ...formData
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2 font-semibold text-sm tracking-wider uppercase">
              <Award size={18} />
              Badge Unlocked: {project.badgeEarned}
            </div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <NotebookPen className="text-emerald-400" />
              Lab Notebook Entry
            </h2>
            <p className="text-slate-400 mt-1 text-sm">Record your findings for '{project.title}'</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-slate-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">What worked?</label>
              <textarea 
                name="whatWorked"
                required
                value={formData.whatWorked}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none h-24 text-slate-700 text-sm"
                placeholder="The LED blinked successfully when I ran the script..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">What didn't?</label>
              <textarea 
                name="whatDidnt"
                required
                value={formData.whatDidnt}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none h-24 text-slate-700 text-sm"
                placeholder="I got an error at first because I forgot sudo..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">What did you change?</label>
              <textarea 
                name="whatChanged"
                required
                value={formData.whatChanged}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none h-24 text-slate-700 text-sm"
                placeholder="I changed the sleep time to 0.1 seconds to make it blink faster..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">One thing you learned</label>
              <textarea 
                name="oneThingLearned"
                required
                value={formData.oneThingLearned}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none h-24 text-slate-700 text-sm"
                placeholder="I learned that the resistor is necessary to protect the LED..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all transform hover:scale-105"
            >
              Save Entry & Complete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
