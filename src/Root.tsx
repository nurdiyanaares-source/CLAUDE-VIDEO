import React from "react";
import { Composition } from "remotion";
import { FPS, H, W } from "./brand";
import { TOTAL_FRAMES, Testimoni } from "./Testimoni";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Testimoni"
    component={Testimoni}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={W}
    height={H}
    defaultProps={{ showSafeZone: false }}
  />
);
