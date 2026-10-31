import { useEffect, useState } from "react";
import { curriculum } from "../data/curriculum";
import type { LabEntry, Project, UserProgress } from "../types";
import { createLabEntry, fetchProgress, saveProgress } from "../lib/api";
import { isValidProgress, mergeProgress } from "../lib/progress";

const STORAGE_KEY = "rpi-lab-progress";

function initialProgress(): UserProgress {
  return {
    projectStatuses: Object.fromEntries(
      curriculum.map((project) => [project.id, "Not Started"]),
    ),
    badges: [],
    labNotebook: [],
  };
}

function withCurrentProjects(saved: UserProgress): UserProgress {
  return {
    ...saved,
    projectStatuses: {
      ...initialProgress().projectStatuses,
      ...saved.projectStatuses,
    },
  };
}

function readProgress(): UserProgress {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "null",
    );
    return isValidProgress(saved)
      ? withCurrentProjects(saved)
      : initialProgress();
  } catch {
    return initialProgress();
  }
}

/** Keep persistence outside the app layout so learning and navigation stay easy to follow. */
export function useProgress() {
  const [progress, setProgress] = useState(readProgress);
  const [storageWarning, setStorageWarning] = useState(false);
  const [hasLoadedRemote, setHasLoadedRemote] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchProgress().then((saved) => {
      if (cancelled) return;
      // Merge with the latest state, including work done while this request was pending.
      if (saved)
        setProgress((previous) =>
          mergeProgress(previous, withCurrentProjects(saved)),
        );
      setHasLoadedRemote(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true);
    }
    // Don't send the initial browser snapshot before the backend has loaded.
    if (hasLoadedRemote) void saveProgress(progress);
  }, [progress, hasLoadedRemote]);

  function startProject(projectId: string) {
    if (!curriculum.some((project) => project.id === projectId)) return;
    setProgress((previous) =>
      previous.projectStatuses[projectId] !== "Not Started"
        ? previous
        : {
            ...previous,
            projectStatuses: {
              ...previous.projectStatuses,
              [projectId]: "In Progress",
            },
          },
    );
  }

  async function completeProject(
    project: Project,
    entry: Omit<LabEntry, "id" | "date">,
  ) {
    const savedEntry = await createLabEntry(entry);
    const newEntry = savedEntry ?? {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setProgress((previous) => ({
      ...previous,
      projectStatuses: {
        ...previous.projectStatuses,
        [project.id]: "Completed",
      },
      badges: previous.badges.includes(project.badgeEarned)
        ? previous.badges
        : [...previous.badges, project.badgeEarned],
      labNotebook: [...previous.labNotebook, newEntry],
    }));
  }

  return { progress, storageWarning, startProject, completeProject };
}
