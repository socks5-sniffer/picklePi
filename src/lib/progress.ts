import type { LabEntry, UserProgress } from "../types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function isValidLabEntry(value: unknown): value is LabEntry {
  return (
    isRecord(value) &&
    [
      "id",
      "projectId",
      "whatWorked",
      "whatDidnt",
      "whatChanged",
      "oneThingLearned",
      "date",
    ].every((key) => typeof value[key] === "string") &&
    Number.isFinite(Date.parse(value.date as string))
  );
}

export function isValidProgress(value: unknown): value is UserProgress {
  return (
    isRecord(value) &&
    isRecord(value.projectStatuses) &&
    Object.values(value.projectStatuses).every(
      (status) =>
        status === "Not Started" ||
        status === "In Progress" ||
        status === "Completed",
    ) &&
    Array.isArray(value.badges) &&
    value.badges.every((badge) => typeof badge === "string") &&
    Array.isArray(value.labNotebook) &&
    value.labNotebook.every(isValidLabEntry)
  );
}

/** Combine saved work without downgrading a completed project or losing a reflection. */
export function mergeProgress(
  local: UserProgress,
  remote: UserProgress,
): UserProgress {
  const projectStatuses = { ...remote.projectStatuses };
  const rank = { "Not Started": 0, "In Progress": 1, Completed: 2 };
  for (const [id, status] of Object.entries(local.projectStatuses)) {
    if (!projectStatuses[id] || rank[status] > rank[projectStatuses[id]])
      projectStatuses[id] = status;
  }
  const entries = new Map(
    [...local.labNotebook, ...remote.labNotebook].map((entry) => [
      entry.id,
      entry,
    ]),
  );
  return {
    projectStatuses,
    badges: [...new Set([...local.badges, ...remote.badges])],
    labNotebook: [...entries.values()].sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date),
    ),
  };
}
