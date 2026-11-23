import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import './fonts';
import {Badge, KeyIcon, PinIcon, SparkIcon} from './Badge';
import {Outro} from './Outro';
import {SafeZoneGuide} from './SafeZoneGuide';
import {FPS, SFX, SOURCE_DURATION, ZOOMS} from './timeline';

const f = (s: number) => Math.round(s * FPS);

const useZoom = () => {
  const frame = useCurrentFrame();
  for (const [a, b] of ZOOMS) {
    if (frame >= f(a) && frame < f(b)) {
      const p = interpolate(frame, [f(a), f(a) + 6], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
      const drift = interpolate(frame, [f(a), f(b)], [0, 0.012]);
      return 1 + 0.045 * p + drift;
    }
  }
  return 1;
};

export const HoyaEdit: React.FC<{showSafeZone: boolean}> = ({showSafeZone}) => {
  const scale = useZoom();
  const srcFrames = f(SOURCE_DURATION);
  return (
    <AbsoluteFill style={{background: 'black'}}>
      <Sequence durationInFrames={srcFrames}>
        <AbsoluteFill style={{transform: `scale(${scale})`}}>
          <OffthreadVideo src={staticFile('source.mp4')} />
        </AbsoluteFill>

        {/* New motion graphics — only where the original edit has empty space at the top */}
        <Sequence from={f(21.1)} durationInFrames={f(23.17) - f(21.1)}>
          <Badge icon={<KeyIcon />} title="3 KUNCI KESELESAAN" durationInFrames={f(23.17) - f(21.1)} />
        </Sequence>
        <Sequence from={f(27.7)} durationInFrames={f(31.85) - f(27.7)}>
          <Badge
            icon={<PinIcon />}
            title="HANIZA OPTOMETRY"
            subtitle="Pemeriksaan mata terperinci"
            subtitleAt={f(29.68) - f(27.7)}
            durationInFrames={f(31.85) - f(27.7)}
          />
        </Sequence>
        <Sequence from={f(33.0)} durationInFrames={f(35.55) - f(33.0)}>
          <Badge icon={<SparkIcon />} title="ALATAN CANGGIH" subtitle="& terkini" subtitleAt={f(34.7) - f(33.0)} durationInFrames={f(35.55) - f(33.0)} />
        </Sequence>
      </Sequence>

      <Sequence from={srcFrames}>
        <Outro />
      </Sequence>

      {SFX.map((s, i) => (
        <Sequence key={i} from={f(s.t)} durationInFrames={f(1.5)}>
          <Audio src={staticFile(`sfx/${s.name}.wav`)} volume={s.vol ?? 0.5} />
        </Sequence>
      ))}

      {showSafeZone ? <SafeZoneGuide /> : null}
    </AbsoluteFill>
  );
};
