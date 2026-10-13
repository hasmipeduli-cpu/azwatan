/**
 * Local Persistent Storage Service (IndexedDB)
 *
 * NOTE: This is a LOCAL, per-browser store — it is NOT Cloudflare R2 and
 * NOT a server. Files uploaded here are only available in the same
 * browser on the same device. Real multi-device publishing still needs
 * a backend/object storage (see PRD #41, #42).
 *
 * Follows PRD #44: unique object keys, e.g.
 *   audio/{songId}-{uniqueId}.mp3, covers/{songId}-{uniqueId}.webp
 *
 * IMPORTANT: callers must persist the storage *path* returned by
 * uploadFile (e.g. "audio/new-abc123.mp3"), never the temporary blob:
 * URL. Blob URLs die when the page/session ends. Use resolveStorageUrl
 * / useResolvedStorageUrl to turn a stored path back into a playable
 * or displayable URL at render/play time.
 */
import { useEffect, useState } from 'react';

const DB_NAME = 'AzwatanStorageDB';
const DB_VERSION = 1;
const STORE_NAME = 'files';

export const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB (PRD #30)
export const MAX_COVER_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB (PRD #30/#31)
export const ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'wav', 'mpeg', 'ogg', 'm4a'];

function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'path' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** True when a value is one of our IndexedDB storage paths, not a URL. */
export function isStoragePath(value) {
  return (
    typeof value === 'string' &&
    (value.startsWith('audio/') || value.startsWith('covers/'))
  );
}

/**
 * Generate a sanitized, unique storage path
 */
export function generateStoragePath(category, songId, filename) {
  const safeId = (songId || 'new').replace(/[^a-zA-Z0-9-_]/g, '');
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  const rawExt = filename.split('.').pop().toLowerCase();
  const ext = rawExt.replace(/[^a-z0-9]/g, '') || 'bin';
  return `${category}/${safeId}-${timestamp}-${random}.${ext}`;
}

/**
 * Store a file persistently in IndexedDB and report (simulated) progress.
 * Returns { path, url, size, type } — persist `path`, use `url` only
 * for the immediate in-session preview.
 */
export async function uploadFile(file, category, songId, onProgress) {
  const storagePath = generateStoragePath(category, songId, file.name);

  // Simulate progress while the file is written locally
  for (let p = 10; p <= 90; p += 20) {
    if (onProgress) onProgress(p);
    await new Promise((r) => setTimeout(r, 60));
  }

  // Save to IndexedDB
  const db = await getDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const item = {
      path: storagePath,
      name: file.name,
      type: file.type,
      size: file.size,
      blob: file,
      createdAt: new Date().toISOString(),
    };
    const req = store.put(item);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  if (onProgress) onProgress(100);

  // Create (and cache) an object URL for immediate playback/preview
  const objectUrl = URL.createObjectURL(file);
  objectUrlCache.set(storagePath, objectUrl);

  return {
    path: storagePath,
    url: objectUrl,
    size: file.size,
    type: file.type,
  };
}

// Cache of storage path -> live blob: URL for this session, so repeated
// resolves reuse one URL instead of leaking a new one every call.
const objectUrlCache = new Map();

/**
 * Resolve a stored path to a playable/displayable URL.
 * Static/external URLs ("/covers/...", "https://...", "blob:...", "data:")
 * are returned unchanged.
 */
export async function resolveStorageUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  if (!isStoragePath(pathOrUrl)) {
    return pathOrUrl;
  }

  if (objectUrlCache.has(pathOrUrl)) {
    return objectUrlCache.get(pathOrUrl);
  }

  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(pathOrUrl);
      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          const url = URL.createObjectURL(req.result.blob);
          objectUrlCache.set(pathOrUrl, url);
          resolve(url);
        } else {
          resolve(pathOrUrl);
        }
      };
      req.onerror = () => resolve(pathOrUrl);
    });
  } catch {
    return pathOrUrl;
  }
}

/**
 * React hook: resolve a storage path (or plain URL) to a displayable URL.
 * Static/external URLs resolve immediately; IndexedDB paths resolve
 * asynchronously and yield '' until ready (callers should fall back).
 */
export function useResolvedStorageUrl(pathOrUrl) {
  // Only IndexedDB paths need async resolution; plain URLs are
  // returned directly without any state.
  const [resolved, setResolved] = useState({ forPath: '', url: '' });

  useEffect(() => {
    if (!isStoragePath(pathOrUrl)) return undefined;
    let cancelled = false;
    resolveStorageUrl(pathOrUrl).then((url) => {
      if (!cancelled) setResolved({ forPath: pathOrUrl, url });
    });
    return () => {
      cancelled = true;
    };
  }, [pathOrUrl]);

  if (!pathOrUrl) return '';
  if (!isStoragePath(pathOrUrl)) return pathOrUrl;
  if (resolved.forPath === pathOrUrl) return resolved.url;
  return objectUrlCache.get(pathOrUrl) || '';
}

/**
 * Delete a stored file from IndexedDB (PRD #34/#62). Plain URLs and
 * static paths are ignored. Returns true when a record was removed.
 */
export async function deleteFile(pathOrUrl) {
  if (!isStoragePath(pathOrUrl)) return false;

  const cached = objectUrlCache.get(pathOrUrl);
  if (cached) {
    URL.revokeObjectURL(cached);
    objectUrlCache.delete(pathOrUrl);
  }

  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(pathOrUrl);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

/**
 * Extract audio duration (in seconds) automatically from an audio File or URL
 * Follows PRD #56 & #57
 */
export function extractAudioDuration(fileOrUrl) {
  return new Promise((resolve) => {
    const audio = new Audio();
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
    audio.preload = 'metadata';

    const cleanUp = () => {
      if (typeof fileOrUrl !== 'string') {
        URL.revokeObjectURL(url);
      }
    };

    audio.onloadedmetadata = () => {
      const duration = Math.round(audio.duration || 0);
      cleanUp();
      resolve(duration);
    };

    audio.onerror = () => {
      cleanUp();
      resolve(0); // Gracefully return 0 if duration couldn't be extracted
    };

    audio.src = url;
  });
}
