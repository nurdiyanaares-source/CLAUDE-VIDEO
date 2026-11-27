import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { sec } from "./brand";
import { CALLOUTS, PUNCH_INS, SFX } from "./data";
import { Captions } from "./components/Captions";
import { CalloutCard } from "./components/CalloutCard";
import { Hook } from "./components/Hook";
import { LogoBadge } from "./components/LogoBadge";
import { OUTRO_FRAMES, Outro } from "./components/Outro";
import { SafeZoneGuide } from "./components/SafeZoneGuide";

export const OUTRO_START = sec(83.0);
const VIDEO_END = OUTRO_START + 18; // video bertindih sedikit dengan iris transition
export const TOTAL_FRAMES = OUTRO_START + OUTRO_FRAMES;

const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, VIDEO_END], [1.0, 1.05]);
  const punch = PUNCH_INS.reduce((acc, t) => {
    const f = frame - sec(t);
    if (f < 0 || f > 75) return acc;
    const up = spring({ frame: f, fps, config: { damping: 12, stiffness: 200 } });
    const down = interpolate(f, [45, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return acc + 0.06 * up * down;
  }, 0);
  const volume = (f: number) => interpolate(f, [VIDEO_END - 24, VIDEO_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ transform: `scale(${drift + punch})`, transformOrigin: "50% 42%" }}>
      <OffthreadVideo src={staticFile("source.mp4")} volume={volume} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

export const Testimoni: React.FC<{ showSafeZone: boolean }> = ({ showSafeZone }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={VIDEO_END}>
        <MainVideo />
        {/* gradien lembut supaya teks atas & bawah lebih jelas */}
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }} />
        <Captions />
        <Sequence durationInFrames={sec(2.3)}><Hook durationInFrames={sec(2.3)} /></Sequence>
        {CALLOUTS.map((c, i) => {
          const d = sec(c.end) - sec(c.start);
          return (
            <Sequence key={i} from={sec(c.start)} durationInFrames={d}>
              <CalloutCard c={c} durationInFrames={d} />
            </Sequence>
          );
        })}
        <LogoBadge />
        {SFX.map((s, i) => (
          <Sequence key={i} from={Math.max(0, sec(s.at))} durationInFrames={sec(1.5)}>
            <Audio src={staticFile(`sfx/${s.file}`)} volume={s.volume ?? 0.4} />
          </Sequence>
        ))}
      </Sequence>

      <Sequence from={OUTRO_START} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>

      {showSafeZone && <SafeZoneGuide />}
    </AbsoluteFill>
  );
};
