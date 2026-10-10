import type { LabEntry, UserProgress } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function isValidLabEntry(value: unknown): value is LabEntry {
  return isRecord(value) &&
    ['id', 'projectId', 'whatWorked', 'whatDidnt', 'whatChanged', 'oneThingLearned', 'date']
      .every(key => typeof value[key] === 'string') &&
    Number.isFinite(Date.parse(value.date as string));
}

export function isValidProgress(value: unknown): value is UserProgress {
  return isRecord(value) && isRecord(value.projectStatuses) &&
    Object.values(value.projectStatuses).every(status =>
      status === 'Not Started' || status === 'In Progress' || status === 'Completed') &&
    Array.isArray(value.badges) && value.badges.every(badge => typeof badge === 'string') &&
    Array.isArray(value.labNotebook) && value.labNotebook.every(isValidLabEntry);
}
