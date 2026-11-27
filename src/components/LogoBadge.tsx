import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SAFE } from "../brand";

/** Logo watermark di penjuru kiri atas, dalam safe zone */
export const LogoBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        position: "absolute",
        top: SAFE.top + 10,
        left: SAFE.left,
        padding: "14px 22px",
        background: "rgba(255,255,255,0.94)",
        borderRadius: 26,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        transform: `translateX(${interpolate(s, [0, 1], [-60, 0])}px) scale(${interpolate(s, [0, 1], [0.8, 1])})`,
        opacity: s,
        transformOrigin: "left center",
      }}
    >
      <Img src={staticFile("logo.png")} style={{ width: 330, display: "block" }} />
    </div>
  );
};
