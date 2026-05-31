import { UserProgress, LabEntry } from '../types';

const USER_ID = 'default';

function isValidProgress(data: unknown): data is UserProgress {
  return (
    typeof data === 'object' &&
    data !== null &&
    'projectStatuses' in data &&
    'badges' in data &&
    'labNotebook' in data &&
    Array.isArray((data as UserProgress).labNotebook)
  );
}

async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Forces a CORS preflight for cross-origin requests, blocking CSRF from other origins.
      'X-Requested-With': 'XMLHttpRequest',
      ...options?.headers,
    },
  });
}

export async function fetchProgress(): Promise<UserProgress | null> {
  try {
    const res = await apiFetch(`/progress/${USER_ID}`);
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return isValidProgress(data) ? data : null;
  } catch {
    return null;
  }
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  try {
    await apiFetch(`/progress/${USER_ID}`, {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  } catch {
    // backend unavailable — localStorage fallback handles persistence
  }
}

export async function createLabEntry(
  entry: Omit<LabEntry, 'id' | 'date'>
): Promise<LabEntry | null> {
  try {
    const res = await apiFetch(`/progress/${USER_ID}/notebook`, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function deleteLabEntry(entryId: string): Promise<void> {
  try {
    await apiFetch(`/progress/${USER_ID}/notebook/${encodeURIComponent(entryId)}`, {
      method: 'DELETE',
    });
  } catch {
    // backend unavailable
  }
}

export async function fetchCurriculum() {
  try {
    const res = await apiFetch('/curriculum');
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchDictionary() {
  try {
    const res = await apiFetch('/dictionary');
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
