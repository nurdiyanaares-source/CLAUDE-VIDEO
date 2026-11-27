import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SAFE, fontFamily } from "../brand";
import { KEYWORDS, TRANSCRIPT } from "../data";

type Word = { text: string; start: number; end: number; key: boolean };
type Page = { start: number; end: number; words: Word[] };

const MAX_CHARS = 20;

/** Pecah setiap ayat kepada perkataan (masa ikut panjang huruf) dan kumpul jadi "page" pendek */
function buildPages(): Page[] {
  const pages: Page[] = [];
  for (const line of TRANSCRIPT) {
    const tokens = line.text.split(/\s+/).filter(Boolean);
    const weights = tokens.map((t) => t.length + 2);
    const total = weights.reduce((a, b) => a + b, 0);
    let t = line.start;
    const words: Word[] = tokens.map((tok, i) => {
      const d = ((line.end - line.start) * weights[i]) / total;
      const w = {
        text: tok, start: t, end: t + d,
        key: KEYWORDS.includes(tok.toLowerCase().replace(/[^a-z-]/g, "").replace(/-.*/, "")),
      };
      t += d;
      return w;
    });
    let cur: Word[] = [];
    let chars = 0;
    const flush = () => {
      if (cur.length) pages.push({ start: cur[0].start, end: cur[cur.length - 1].end, words: cur });
      cur = []; chars = 0;
    };
    for (const w of words) {
      if (chars + w.text.length > MAX_CHARS * 2 || (cur.length >= 5)) flush();
      cur.push(w); chars += w.text.length + 1;
      if (/[.,?!]$/.test(w.text) && chars > 14) flush();
    }
    flush();
  }
  // panjangkan sedikit page supaya tak berkelip antara ayat
  for (let i = 0; i < pages.length; i++) {
    const next = pages[i + 1]?.start ?? Infinity;
    pages[i].end = Math.min(pages[i].end + 0.35, next);
  }
  return pages;
}

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pages = useMemo(buildPages, []);
  const page = pages.find((p) => t >= p.start && t < p.end);
  if (!page) return null;

  const enter = spring({ frame: frame - Math.round(page.start * fps), fps, config: { damping: 15, stiffness: 180 } });

  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.left,
        right: SAFE.right,
        bottom: SAFE.bottom + 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 16px",
          maxWidth: 820,
          transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          opacity: enter,
        }}
      >
        {page.words.map((w, i) => {
          const active = t >= w.start && t < w.end + 0.05;
          const spoken = t >= w.start;
          const pop = spring({ frame: frame - Math.round(w.start * fps), fps, config: { damping: 10, stiffness: 260 } });
          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontWeight: 900,
                fontSize: 66,
                lineHeight: 1.15,
                textTransform: "uppercase",
                letterSpacing: -0.5,
                padding: "2px 12px",
                borderRadius: 14,
                color: active ? COLORS.blueDark : w.key ? COLORS.yellow : COLORS.white,
                background: active ? COLORS.yellow : "transparent",
                opacity: spoken ? 1 : 0.55,
                transform: `scale(${active ? interpolate(pop, [0, 1], [0.9, 1.08]) : 1})`,
                WebkitTextStroke: active ? "0px" : "3px rgba(0,0,0,0.85)",
                paintOrder: "stroke fill",
                textShadow: active ? "none" : "0 5px 14px rgba(0,0,0,0.6)",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
