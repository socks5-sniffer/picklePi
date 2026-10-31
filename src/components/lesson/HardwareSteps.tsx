import { Key, useState } from "react";
import { Check, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { stepProgress } from "../../lib/learning";

// ── Hardware Step Accordion ──────────────────────────────────────────────────

interface HardwareStepItemProps {
  key?: Key;
  step: string;
  index: number;
  isOpen: boolean;
  isDone: boolean;
  onToggleOpen: () => void;
  onToggleDone: () => void;
}

function HardwareStepItem({
  step,
  index,
  isOpen,
  isDone,
  onToggleOpen,
  onToggleDone,
}: HardwareStepItemProps) {
  const panelId = `step-panel-${index}`;
  const toggleId = `step-toggle-${index}`;
  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors ${
        isDone
          ? "border-emerald-700/50 bg-emerald-900/10"
          : "border-slate-700 bg-slate-800/50"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Circular checkbox */}
        <button
          onClick={onToggleDone}
          aria-label={`${isDone ? "Mark incomplete" : "Mark done"}: step ${index + 1}`}
          aria-pressed={isDone}
          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isDone
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-500 hover:border-emerald-400 text-transparent"
          }`}
        >
          <Check size={12} />
        </button>

        {/* Step number + preview */}
        <button
          id={toggleId}
          className="flex-1 text-left min-w-0"
          onClick={onToggleOpen}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span
            className={`text-xs font-bold uppercase tracking-wider ${isDone ? "text-emerald-500" : "text-amber-400"}`}
          >
            Step {index + 1}
          </span>
          {!isOpen && (
            <p
              className={`text-sm mt-0.5 truncate ${isDone ? "line-through text-slate-500" : "text-slate-300"}`}
            >
              {step}
            </p>
          )}
        </button>

        {/* Expand chevron */}
        <button
          onClick={onToggleOpen}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${isOpen ? "Collapse" : "Expand"} step ${index + 1}`}
          className="shrink-0 ml-2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={toggleId}
          className="px-4 pb-4 pt-2 border-t border-slate-700/40"
        >
          <p
            className={`text-sm sm:text-base leading-relaxed ${isDone ? "text-slate-400" : "text-slate-200"}`}
          >
            {step}
          </p>
          <button
            onClick={onToggleDone}
            className={`mt-3 flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              isDone
                ? "bg-emerald-900/40 text-emerald-400 hover:bg-slate-700"
                : "bg-slate-700 text-slate-300 hover:bg-emerald-900/40 hover:text-emerald-400"
            }`}
          >
            {isDone ? (
              <>
                <Check size={12} /> Completed
              </>
            ) : (
              <>
                <CheckCircle2 size={12} /> Mark as done
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

interface HardwareStepsListProps {
  key?: Key;
  steps: string[];
}

export default function HardwareStepsList({ steps }: HardwareStepsListProps) {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([0]));
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());

  const toggleOpen = (i: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleDone = (i: number) => {
    setDoneSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
        // Auto-close the step when marking it done
        setOpenSteps((prev2) => {
          const next2 = new Set(prev2);
          next2.delete(i);
          return next2;
        });
      }
      return next;
    });
  };

  const { doneCount, total, allDone, widthClass } = stepProgress(
    doneSteps.size,
    steps.length,
  );

  return (
    <div className="space-y-3">
      {/* Progress tracker */}
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-slate-400">
          {doneCount} of {total} steps completed
        </span>
        {allDone && (
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 size={14} /> All done!
          </span>
        )}
      </div>
      <div
        className="h-2 bg-slate-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Progress bar"
      >
        <div
          className={`h-full bg-emerald-500 rounded-full transition-all duration-500 ${widthClass}`}
        />
      </div>

      {/* Step items */}
      <div className="space-y-2 mt-4">
        {steps.map((step, i) => (
          <HardwareStepItem
            key={i}
            step={step}
            index={i}
            isOpen={openSteps.has(i)}
            isDone={doneSteps.has(i)}
            onToggleOpen={() => toggleOpen(i)}
            onToggleDone={() => toggleDone(i)}
          />
        ))}
      </div>
    </div>
  );
}
