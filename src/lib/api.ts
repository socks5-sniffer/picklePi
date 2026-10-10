import { isValidProgress, isValidLabEntry } from './progress';
import { UserProgress, LabEntry } from '../types';

// Placeholder until Firebase Auth is wired into the frontend: the backend
// rejects requests whose userId doesn't match the verified token's uid, so
// without a registered provider, progress stays local and makes no requests.
// Replace with the signed-in user's uid once auth is integrated.
const USER_ID = 'default';

type AuthTokenProvider = () => Promise<string | null>;

let getAuthToken: AuthTokenProvider | null = null;

/**
 * Register a function that returns the current Firebase ID token
 * (e.g. `setAuthTokenProvider(() => user.getIdToken())`). Once registered,
 * every API call carries an Authorization header.
 */
export function setAuthTokenProvider(provider: AuthTokenProvider): void {
  getAuthToken = provider;
}

async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const token = getAuthToken ? await getAuthToken() : null;
  return fetch(`/api${path}`, {
    ...options,
    signal: options?.signal ?? AbortSignal.timeout(5000),
    headers: {
      'Content-Type': 'application/json',
      // Forces a CORS preflight for cross-origin requests, blocking CSRF from other origins.
      'X-Requested-With': 'XMLHttpRequest',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
}

export async function fetchProgress(): Promise<UserProgress | null> {
  if (!getAuthToken) return null;
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
  if (!getAuthToken) return;
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
  if (!getAuthToken) return null;
  try {
    const res = await apiFetch(`/progress/${USER_ID}/notebook`, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return isValidLabEntry(data) ? data : null;
  } catch {
    return null;
  }
}

export async function deleteLabEntry(entryId: string): Promise<void> {
  if (!getAuthToken) return;
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
