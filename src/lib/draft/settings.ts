import { InAnimations } from '@/jianying/effects/animations';

export const videoRatios = [
  {value: 'auto'},
  {value: '16:9', width: 1920, height: 1080},
  {value: '9:16', width: 1080, height: 1920},
  {value: '4:3', width: 1920, height: 1440},
];
export const directions = ['scaleDown', 'scaleUp', 'leftToRight', 'rightToLeft', 'topToBottom', 'bottomToTop'];
export interface DraftSettings {
  videoRatio: string;
  keyframeSpeed: number;
  inKeyframeTypeCheckedList: string[];
  isClearKeyframes: boolean;
  isInAnimation: boolean;
  isClearAnimations: boolean;
  isRandomInAnimation: boolean;
  inAnimation: string;
  inAnimationSpeed: number;
  inAnimationCheckedList: string[];
}
export const defaultSettings: DraftSettings = {
  videoRatio: 'auto', keyframeSpeed: 3,
  inKeyframeTypeCheckedList: directions,
  isClearKeyframes: true, isInAnimation: true, isClearAnimations: true,
  isRandomInAnimation: true, inAnimation: '', inAnimationSpeed: 500,
  inAnimationCheckedList: Object.keys(InAnimations),
};

export function readSettings(): DraftSettings {
  const settings = {...defaultSettings};
  if (typeof window === 'undefined') return settings;
  // Keep every historical key. An invalid entry does not erase other preferences.
  for (const key of Object.keys(defaultSettings) as (keyof DraftSettings)[]) {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) continue;
      const fallback = defaultSettings[key];
      const value: unknown = Array.isArray(fallback) ? JSON.parse(stored) : typeof fallback === 'boolean' ? stored !== 'false' : typeof fallback === 'number' ? Number(stored) : stored;
      if (Array.isArray(fallback) ? Array.isArray(value) && value.every(v => typeof v === 'string') : typeof value === typeof fallback && (typeof value !== 'number' || Number.isFinite(value))) {
        Object.assign(settings, {[key]: value});
      }
    } catch { /* Ignore only the malformed entry; preserve it until the user edits. */ }
  }
  return settings;
}

export function toDraftOptions(settings: DraftSettings) {
  return {...settings, videoRatio: videoRatios.find(ratio => ratio.value === settings.videoRatio) ?? videoRatios[0]};
}

export function updateSettings(patch: Partial<DraftSettings>) {
  const next = {...readSettings(), ...patch};
  for (const [key, value] of Object.entries(patch)) {
    localStorage.setItem(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
  }
  localStorage.setItem('draftOptions', JSON.stringify(toDraftOptions(next)));
  window.dispatchEvent(new Event('draft-settings-change'));
}
