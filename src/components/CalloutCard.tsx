import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SAFE, SAFE_CX, fontFamily } from "../brand";
import type { Callout } from "../data";
import { IconSvg } from "./Icons";

/** Kad motion graphic — dipaparkan dalam Sequence, frame 0 = masa mula */
export const CalloutCard: React.FC<{ c: Callout; durationInFrames: number }> = ({ c, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inS = spring({ frame, fps, config: { damping: 13, stiffness: 160 } });
  const outS = interpolate(frame, [durationInFrames - 10, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const iconS = spring({ frame: frame - 6, fps, config: { damping: 8, stiffness: 200 } });
  const subS = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  const float = Math.sin(frame / 18) * 4;

  return (
    <div
      style={{
        position: "absolute",
        top: SAFE.top + 175,
        left: SAFE_CX,
        transform: `translateX(-50%) translateY(${interpolate(inS, [0, 1], [-40, 0]) + float - outS * 30}px) scale(${interpolate(inS, [0, 1], [0.6, 1]) * (1 - outS * 0.15)})`,
        opacity: inS * (1 - outS),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: 820,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueDark})`,
          padding: "16px 34px 16px 18px",
          borderRadius: 999,
          border: `4px solid ${COLORS.yellow}`,
          boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            width: 74, height: 74, borderRadius: 999, background: COLORS.yellow,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `scale(${iconS}) rotate(${interpolate(iconS, [0, 1], [-90, 0])}deg)`,
          }}
        >
          <IconSvg name={c.icon} size={44} color={COLORS.blueDark} stroke={2.6} />
        </div>
        <div style={{ fontFamily, fontWeight: 900, fontSize: 50, color: COLORS.white, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
          {c.title}
        </div>
      </div>

      {c.stars && (
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const s = spring({ frame: frame - 12 - i * 3, fps, config: { damping: 8, stiffness: 240 } });
            return (
              <div key={i} style={{ transform: `scale(${s}) rotate(${interpolate(s, [0, 1], [-120, 0])}deg)`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
                <IconSvg name="star" size={62} color="#E0A800" fill={COLORS.yellow} stroke={1.2} />
              </div>
            );
          })}
        </div>
      )}

      {c.sub && (
        <div
          style={{
            fontFamily, fontWeight: 700, fontSize: 36, color: COLORS.blueDark,
            background: "rgba(255,255,255,0.96)", padding: "10px 26px", borderRadius: 18,
            boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
            transform: `translateY(${interpolate(subS, [0, 1], [-16, 0])}px)`, opacity: subS,
          }}
        >
          {c.sub}
        </div>
      )}
    </div>
  );
};
