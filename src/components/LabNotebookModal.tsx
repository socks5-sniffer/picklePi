import { useId, useRef, useState, type FormEvent } from "react";
import { X, NotebookPen } from "lucide-react";
import type { Project, LabEntry } from "../types";
import Dialog from "./Dialog";

interface LabNotebookModalProps {
  project: Project;
  onSave: (entry: Omit<LabEntry, "id" | "date">) => Promise<void>;
  onClose: () => void;
}

const reflectionFields = [
  {
    name: "whatWorked",
    label: "What worked?",
    placeholder: "My LED lit up when I ran the code.",
    required: true,
  },
  {
    name: "whatDidnt",
    label: "What felt tricky? (optional)",
    placeholder: "Something didn’t work yet? That’s part of the process.",
    required: false,
  },
  {
    name: "whatChanged",
    label: "What did you try or change? (optional)",
    placeholder: "I tried a different color, or changed a number…",
    required: false,
  },
  {
    name: "oneThingLearned",
    label: "One thing you learned",
    placeholder: "One small discovery is plenty.",
    required: true,
  },
] as const;

export default function LabNotebookModal({
  project,
  onSave,
  onClose,
}: LabNotebookModalProps) {
  const titleId = useId();
  const [form, setForm] = useState({
    whatWorked: "",
    whatDidnt: "",
    whatChanged: "",
    oneThingLearned: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const submissionPending = useRef(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submissionPending.current) return;
    submissionPending.current = true;
    setSaving(true);
    setSaveError(false);
    try {
      await onSave({ projectId: project.id, ...form });
    } catch {
      setSaveError(true);
    } finally {
      submissionPending.current = false;
      setSaving(false);
    }
  }

  return (
    <Dialog titleId={titleId} onClose={onClose} dismissible={!saving}>
      <header className="dialog-header">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <NotebookPen size={15} /> KEEP YOUR DISCOVERY
          </p>
          <h2 id={titleId}>A moment for your notebook.</h2>
          <p>
            You explored {project.title}. Save a reflection to complete the
            project and earn your {project.badgeEarned} badge.
          </p>
        </div>
        <button
          type="button"
          className="icon-button flex"
          aria-label="Close notebook"
          onClick={onClose}
          disabled={saving}
        >
          <X size={20} />
        </button>
      </header>
      <form className="reflection-form" onSubmit={handleSubmit}>
        {reflectionFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={`${titleId}-${field.name}`}>{field.label}</label>
            <textarea
              id={`${titleId}-${field.name}`}
              name={field.name}
              required={field.required}
              maxLength={2000}
              value={form[field.name]}
              placeholder={field.placeholder}
              disabled={saving}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  [field.name]: event.target.value,
                }))
              }
            />
          </div>
        ))}
        {saveError && (
          <p role="alert" className="text-rose-400 text-sm mb-4">
            Your entry could not be saved. Your reflection is still here; please
            try again.
          </p>
        )}
        <div className="reflection-actions">
          <button
            type="button"
            className="button-secondary"
            onClick={onClose}
            disabled={saving}
          >
            Keep exploring
          </button>
          <button type="submit" className="button-primary" disabled={saving}>
            {saving ? "Saving…" : "Save Entry & Complete"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
