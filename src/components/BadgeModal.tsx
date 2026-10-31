import { useId } from "react";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import type { Project } from "../types";
import BadgeIcon from "./BadgeIcon";
import Dialog from "./Dialog";

interface BadgeModalProps {
  project: Project;
  earned: boolean;
  onClose: () => void;
}

export default function BadgeModal({
  project,
  earned,
  onClose,
}: BadgeModalProps) {
  const titleId = useId();
  return (
    <Dialog titleId={titleId} onClose={onClose}>
      <div className="flex justify-end p-4 pb-0">
        <button
          onClick={onClose}
          className="icon-button flex"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex flex-col items-center px-8 pb-6">
        <BadgeIcon
          level={project.level}
          name={project.badgeEarned}
          earned={earned}
          size={140}
        />
        <p className="flex items-center gap-2 mt-4 mb-2 text-emerald-400 text-sm">
          {earned ? (
            <>
              <CheckCircle2 size={15} /> You earned it!
            </>
          ) : (
            <>
              <Sparkles size={15} /> A discovery ahead
            </>
          )}
        </p>
        <h2
          id={titleId}
          className="text-2xl font-bold text-slate-100 text-center"
        >
          {project.badgeEarned}
        </h2>
        <p className="text-slate-400 text-sm mt-2 text-center">
          Level {project.level} · {project.title}
        </p>
      </div>
      <div className="px-8 pb-8">
        <h3 className="font-semibold text-slate-100 text-sm mb-3">
          Skills to celebrate
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.skillsLearned.map((skill) => (
            <span
              key={skill}
              className="bg-slate-900 border border-slate-700 rounded-lg py-1 px-3 text-sm text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
        {!earned && (
          <p className="text-slate-400 text-sm mt-5 leading-relaxed">
            Explore this project and save a notebook reflection to earn the
            badge. Take your time; every project is open when you are ready.
          </p>
        )}
      </div>
    </Dialog>
  );
}
