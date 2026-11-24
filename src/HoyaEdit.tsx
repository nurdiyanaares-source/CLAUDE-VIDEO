import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import './fonts';
import {Badge, KeyIcon, PinIcon, SparkIcon} from './Badge';
import {Branches} from './endcards/Branches';
import {SceneShell} from './endcards/common';
import {PanelPayment} from './endcards/PanelPayment';
import {Promo} from './endcards/Promo';
import {UpgradeColours} from './endcards/UpgradeColours';
import {SafeZoneGuide} from './SafeZoneGuide';
import {END_SCENES, END_STARTS, FPS, MUSIC, OUTRO_DURATION, SFX, SOURCE_DURATION, ZOOMS} from './timeline';

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
            title="HANIZAH OPTOMETRY"
            subtitle="Pemeriksaan mata terperinci"
            subtitleAt={f(29.68) - f(27.7)}
            durationInFrames={f(31.85) - f(27.7)}
          />
        </Sequence>
        <Sequence from={f(33.0)} durationInFrames={f(35.55) - f(33.0)}>
          <Badge icon={<SparkIcon />} title="ALATAN CANGGIH" subtitle="& terkini" subtitleAt={f(34.7) - f(33.0)} durationInFrames={f(35.55) - f(33.0)} />
        </Sequence>
      </Sequence>

      {/* End cards: free-upgrade colours -> promo -> 9 branches -> panel & payment + CTA */}
      {(
        [
          ['colours', <UpgradeColours key="c" />],
          ['promo', <Promo key="pr" />],
          ['branches', <Branches key="b" />],
          ['panel', <PanelPayment key="p" />],
        ] as const
      ).map(([k, el]) => {
        const from = f(END_STARTS[k]);
        const dur = f(END_STARTS[k] + END_SCENES[k]) - from;
        return (
          <Sequence key={k} from={from} durationInFrames={dur}>
            <SceneShell durationInFrames={k === 'panel' ? dur + 30 : dur}>{el}</SceneShell>
          </Sequence>
        );
      })}

      <Audio
        src={staticFile('music/bgm.wav')}
        volume={(fr) => {
          const total = f(SOURCE_DURATION + OUTRO_DURATION);
          const swell = interpolate(fr, [f(MUSIC.swellStart), f(MUSIC.swellEnd)], [MUSIC.underSpeech, MUSIC.endCards], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.quad),
          });
          const out = interpolate(fr, [total - f(MUSIC.fadeOut), total - 1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const fadeIn = interpolate(fr, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
          return swell * out * fadeIn;
        }}
      />

      {SFX.map((s, i) => (
        <Sequence key={i} from={f(s.t)} durationInFrames={f(1.5)}>
          <Audio src={staticFile(`sfx/${s.name}.wav`)} volume={s.vol ?? 0.5} />
        </Sequence>
      ))}

      {showSafeZone ? <SafeZoneGuide /> : null}
    </AbsoluteFill>
  );
};
