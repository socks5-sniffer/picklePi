import { useId } from "react";
import type { DictionaryEntry } from "../types";
import { X, BookOpenText } from "lucide-react";
import Dialog from "./Dialog";

interface DefinitionModalProps {
  entry: DictionaryEntry;
  onClose: () => void;
}

export default function DefinitionModal({
  entry,
  onClose,
}: DefinitionModalProps) {
  const titleId = useId();
  return (
    <Dialog titleId={titleId} onClose={onClose}>
      <header className="dialog-header">
        <div>
          <p className="eyebrow">{entry.category}</p>
          <h2 id={titleId} className="flex items-center gap-3">
            <BookOpenText size={24} className="text-emerald-400" />
            {entry.term}
          </h2>
        </div>
        <button
          className="icon-button flex"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </header>
      <div className="p-6 sm:p-8 text-slate-300 leading-relaxed">
        <p>{entry.definition}</p>
        {entry.example && (
          <div className="mt-6 border-t border-slate-700 pt-5">
            <h3 className="text-sm font-semibold text-slate-100 mb-2">
              See it in context
            </h3>
            <p className="bg-slate-900 rounded-lg border border-slate-700 p-4 text-sm">
              {entry.example}
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
}
