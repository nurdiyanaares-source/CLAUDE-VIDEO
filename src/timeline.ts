// All times in seconds, measured on the trimmed source (0 – 55.63s).
export const FPS = 30;
export const SOURCE_DURATION = 55.63; // cut right before "Berita baik ... bulan Ogos" (promo)
// End sequence (after the trimmed video), in seconds
export const END_SCENES = {colours: 5, branches: 8, panel: 5.5};
export const OUTRO_DURATION = END_SCENES.colours + END_SCENES.branches + END_SCENES.panel;
const E1 = SOURCE_DURATION;
const E2 = E1 + END_SCENES.colours;
const E3 = E2 + END_SCENES.branches;
export const END_STARTS = {colours: E1, branches: E2, panel: E3};

// TikTok + Instagram Reels combined safe zone on a 1080x1920 canvas.
// Top 220px (IG header / TikTok tabs), bottom 480px (caption, music, CTA),
// right 140px (like/comment/share rail), left 60px.
export const SAFE = {top: 220, bottom: 480, left: 60, right: 140};

type Sfx = {t: number; name: string; vol?: number};

const cuts = [7.33, 11.73, 16.17, 20.83, 23.17, 26.97, 31.88, 35.6, 42.13, 44.17, 45.67, 47.17];

export const SFX: Sfx[] = [
  // Hook graphics
  {t: 0.45, name: 'pop', vol: 0.5},
  {t: 0.95, name: 'pop', vol: 0.6},
  {t: 1.45, name: 'pop', vol: 0.5},
  {t: 5.35, name: 'cash', vol: 0.45}, // "jimat RM700"
  {t: 7.9, name: 'pop', vol: 0.5}, // "Nak pakai multifokal tapi takut pening"
  {t: 9.65, name: 'boom', vol: 0.35}, // punch-in "pening"
  {t: 13.0, name: 'pop', vol: 0.45}, // "!!!"
  {t: 15.05, name: 'boom', vol: 0.3}, // punch-in "takut"
  {t: 18.85, name: 'error', vol: 0.35}, // ✗ icon
  {t: 21.1, name: 'pop', vol: 0.55}, // NEW: 3 kunci keselesaan
  {t: 22.05, name: 'tick', vol: 0.6},
  {t: 23.62, name: 'tick', vol: 0.6},
  {t: 24.25, name: 'ding', vol: 0.4}, // ✓ icon
  {t: 25.0, name: 'tick', vol: 0.6},
  {t: 27.7, name: 'pop', vol: 0.55}, // NEW: Haniza Optometry badge
  {t: 29.68, name: 'tick', vol: 0.6},
  {t: 33.0, name: 'sparkle', vol: 0.4}, // NEW: alatan canggih badge
  {t: 39.55, name: 'ding', vol: 0.35}, // checklist item 1
  {t: 42.3, name: 'ding', vol: 0.35}, // checklist item 2
  {t: 49.1, name: 'pop', vol: 0.55}, // "Membantu anda"
  {t: 51.35, name: 'pop', vol: 0.55}, // "Penglihatan jauh & dekat"
  {t: 52.9, name: 'boom', vol: 0.25}, // punch-in "selesa"
  {t: 53.1, name: 'ding', vol: 0.45}, // ✓ Lebih selesa
  {t: 54.7, name: 'riser', vol: 0.3}, // into end cards
  // End card 1: free upgrade colours
  {t: E1, name: 'whoosh', vol: 0.6},
  {t: E1 + 0.07, name: 'boom', vol: 0.35},
  {t: E1 + 0.3, name: 'pop', vol: 0.5},
  {t: E1 + 0.5, name: 'pop', vol: 0.45},
  ...[24, 32, 40, 48].map((fr) => ({t: E1 + fr / FPS, name: 'pop', vol: 0.5})),
  {t: E1 + 2.0, name: 'sparkle', vol: 0.35},
  // End card 2: branches
  {t: E2 - 0.15, name: 'whoosh', vol: 0.5},
  {t: E2 + 0.1, name: 'pop', vol: 0.5},
  ...Array.from({length: 9}, (_, i) => ({t: E2 + (14 + i * 5) / FPS, name: 'tick', vol: 0.55})),
  // End card 3: panel, payment, CTA
  {t: E3 - 0.15, name: 'whoosh', vol: 0.5},
  {t: E3 + 0.1, name: 'sparkle', vol: 0.4},
  {t: E3 + 14 / FPS, name: 'pop', vol: 0.45},
  {t: E3 + 26 / FPS, name: 'pop', vol: 0.45},
  {t: E3 + 44 / FPS, name: 'ding', vol: 0.45},
  ...cuts.map((c) => ({t: c - 0.18, name: 'whoosh', vol: 0.35})),
];

// Punch-in zooms on emotional keywords: [start, end-of-shot]
export const ZOOMS: [number, number][] = [
  [9.62, 11.73],
  [15.05, 16.17],
  [52.88, SOURCE_DURATION],
];
