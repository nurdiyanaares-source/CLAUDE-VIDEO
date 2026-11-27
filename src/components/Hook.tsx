import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SAFE, SAFE_CX, fontFamily } from "../brand";

/** Tajuk pembuka (0–2.3s) supaya penonton berhenti scroll */
export const Hook: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 12 } });
  const b = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: SAFE.top + 190, left: SAFE_CX, transform: "translateX(-50%)", width: 840, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: out }}>
      <div style={{
        fontFamily, fontWeight: 900, fontSize: 58, color: COLORS.blueDark, background: COLORS.yellow,
        padding: "10px 34px", borderRadius: 20, transform: `scale(${a}) rotate(${interpolate(a, [0, 1], [-8, -2])}deg)`,
        boxShadow: "0 14px 30px rgba(0,0,0,0.35)", whiteSpace: "nowrap",
      }}>
        TESTIMONI PELANGGAN
      </div>
      <div style={{
        fontFamily, fontWeight: 800, fontSize: 44, color: COLORS.white, background: COLORS.blue,
        padding: "10px 28px", borderRadius: 16, opacity: b, transform: `translateY(${interpolate(b, [0, 1], [30, 0])}px)`,
        boxShadow: "0 10px 24px rgba(0,0,0,0.3)", whiteSpace: "nowrap",
      }}>
        Apa kata mereka?
      </div>
    </div>
  );
};
