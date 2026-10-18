'use client';
import {useMemo, useSyncExternalStore} from 'react';
import {defaultSettings, readSettings, updateSettings, type DraftSettings} from '@/lib/draft/settings';

const serverSnapshot = JSON.stringify(defaultSettings);
const getSnapshot = () => JSON.stringify(readSettings());
const getServerSnapshot = () => serverSnapshot;
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('draft-settings-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('draft-settings-change', callback);
  };
}
export function useDraftSettings() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const settings = useMemo(() => JSON.parse(snapshot) as DraftSettings, [snapshot]);
  return {settings, updateSettings};
}
