import { UserProgress, LabEntry } from '../types';
import { getIdToken } from './firebase';

const USER_ID = 'default';

async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const token = await getIdToken();
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(`/api${path}`, {
    ...options,
    headers,
  });
}

export async function fetchProgress(): Promise<UserProgress | null> {
  try {
    const res = await apiFetch(`/progress/${USER_ID}`);
    if (!res.ok) return null;
    return res.json();
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
    await apiFetch(`/progress/${USER_ID}/notebook/${entryId}`, {
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
