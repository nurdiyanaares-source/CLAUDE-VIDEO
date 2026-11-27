import React from "react";
import { AbsoluteFill } from "remotion";
import { SAFE } from "../brand";

/** Panduan visual safe zone (hidupkan prop showSafeZone dalam Studio sahaja) */
export const SafeZoneGuide: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, borderTop: `${SAFE.top}px solid rgba(255,0,0,0.25)`, borderBottom: `${SAFE.bottom}px solid rgba(255,0,0,0.25)`, borderLeft: `${SAFE.left}px solid rgba(255,0,0,0.25)`, borderRight: `${SAFE.right}px solid rgba(255,0,0,0.25)` }} />
  </AbsoluteFill>
);
