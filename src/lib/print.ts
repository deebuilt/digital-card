import type { CardSize } from '@/types/card';

export const DPI = 300;
export const BLEED_IN = 0.125;
export const SAFE_IN = 0.125;

interface SizeBase {
  label: string;
  trimWIn: number;
  trimHIn: number;
  showGuides: boolean;
}

const SIZES: Record<CardSize, SizeBase> = {
  'us-business': { label: 'US Business (3.5×2 in)',  trimWIn: 3.5,   trimHIn: 2,     showGuides: true },
  'eu-business': { label: 'EU Business (85×55 mm)',  trimWIn: 3.346, trimHIn: 2.165, showGuides: true },
  'square':      { label: 'Square (2.5×2.5 in)',     trimWIn: 2.5,   trimHIn: 2.5,   showGuides: false },
  'handout-4x6': { label: 'Handout (4×6 in)',        trimWIn: 4,     trimHIn: 6,     showGuides: true },
  'handout-5x7': { label: 'Handout (5×7 in)',        trimWIn: 5,     trimHIn: 7,     showGuides: true },
};

export interface Dimensions {
  size: CardSize;
  trimWIn: number;
  trimHIn: number;
  bleedWIn: number;
  bleedHIn: number;
  safeWIn: number;
  safeHIn: number;
  trimWPx: number;
  trimHPx: number;
  aspectRatio: string;
  label: string;
  showGuides: boolean;
}

export const getDimensions = (size: CardSize): Dimensions => {
  const base = SIZES[size] ?? SIZES['us-business'];
  const trimWIn = base.trimWIn;
  const trimHIn = base.trimHIn;
  return {
    size,
    trimWIn,
    trimHIn,
    bleedWIn: trimWIn + 2 * BLEED_IN,
    bleedHIn: trimHIn + 2 * BLEED_IN,
    safeWIn: trimWIn - 2 * SAFE_IN,
    safeHIn: trimHIn - 2 * SAFE_IN,
    trimWPx: Math.round(trimWIn * DPI),
    trimHPx: Math.round(trimHIn * DPI),
    aspectRatio: `${trimWIn} / ${trimHIn}`,
    label: base.label,
    showGuides: base.showGuides,
  };
};

// Square stays in CardSize for forward compat but isn't shown in the picker.
// It'll come back in a future tier.
export const SIZE_OPTIONS: { value: CardSize; label: string }[] = [
  { value: 'us-business', label: 'US (3.5×2)' },
  { value: 'eu-business', label: 'EU (85×55)' },
];

export const HANDOUT_SIZE_OPTIONS: { value: CardSize; label: string }[] = [
  { value: 'handout-4x6', label: '4×6' },
  { value: 'handout-5x7', label: '5×7' },
];
