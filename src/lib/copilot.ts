export const DEFAULT_COPILOT_URL = 'http://localhost:9507';
export function normalizeCopilotUrl(value: string) {
  const url = new URL(value.trim());
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('Invalid server address');
  return url.href.replace(/\/$/, '');
}
export async function copilotFetch(base: string, path: string, init?: RequestInit) {
  const response = await fetch(`${base}${path}`, {...init, signal: init?.signal ? AbortSignal.any([init.signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000)});
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}
