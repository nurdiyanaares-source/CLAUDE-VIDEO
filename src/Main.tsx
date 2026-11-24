import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {ARoll} from './ARoll';
import {A_END, AROLL_END, B_LEN, B_SRC_START, OUTRO_LEN, OUTRO_START, PROMO_LEN, PROMO_START, sf} from './data';
import {Outro} from './Outro';
import {Promo} from './Promo';
import {FontFaces} from './ui';

type Sfx = [number, 'pop' | 'whoosh' | 'ding' | 'click' | 'cash' | 'boom' | 'sparkle' | 'swipe', number];
const P = PROMO_START, O = OUTRO_START;
const SFX: Sfx[] = [
  [0, 'boom', 0.5], [6, 'pop', 0.45], [18, 'sparkle', 0.4], [124, 'swipe', 0.25],
  // header swaps
  [sf(10.92), 'whoosh', 0.35], [sf(28.16), 'whoosh', 0.35], [sf(52.92), 'whoosh', 0.35],
  // hook chips
  [sf(4.98), 'pop', 0.4], [sf(5.56), 'pop', 0.4], [sf(7.14), 'pop', 0.4], [sf(7.58), 'pop', 0.4], [sf(10.1), 'pop', 0.45],
  [sf(15.02), 'swipe', 0.3], [sf(15.78), 'swipe', 0.3], [sf(17.0), 'boom', 0.35],
  [sf(21.26), 'pop', 0.4],
  [sf(23.5), 'click', 0.45], [sf(25.0), 'click', 0.45], [sf(27.0), 'click', 0.45],
  [sf(28.62), 'sparkle', 0.4],
  [sf(31.0), 'swipe', 0.3], [sf(33.92), 'pop', 0.4],
  [sf(37.4), 'swipe', 0.3], [sf(40.26), 'swipe', 0.3], [sf(41.82), 'pop', 0.4],
  [sf(48.34), 'pop', 0.4], [sf(48.9), 'pop', 0.4], [sf(49.56), 'pop', 0.35], [sf(51.24), 'pop', 0.35],
  [sf(52.92), 'ding', 0.4], [sf(53.0), 'sparkle', 0.35],
  [sf(57.66), 'swipe', 0.3], [sf(60.3), 'boom', 0.45], [sf(61.0), 'sparkle', 0.35],
  [sf(62.44), 'whoosh', 0.45], [sf(62.44) + 2, 'boom', 0.4], [sf(62.44) + 16, 'cash', 0.45],
  // promo
  [P, 'whoosh', 0.5], [P + 2, 'boom', 0.45], [P + 8, 'pop', 0.35], [P + 14, 'pop', 0.4], [P + 20, 'sparkle', 0.35],
  [P + 26, 'swipe', 0.35], [P + 34, 'swipe', 0.35], [P + 42, 'swipe', 0.35],
  [P + 112, 'whoosh', 0.4], [P + 124, 'boom', 0.5], [P + 136, 'sparkle', 0.4], [P + 172, 'pop', 0.4], [P + 176, 'cash', 0.45], [P + 216, 'ding', 0.4],
  // outro
  [O, 'whoosh', 0.5], [O + 6, 'pop', 0.35],
  ...Array.from({length: 9}, (_, i) => [O + 14 + i * 4, 'click', 0.3] as Sfx),
  [O + 60, 'pop', 0.35], [O + 157, 'whoosh', 0.45], [O + 165, 'swipe', 0.3], [O + 183, 'swipe', 0.3], [O + 207, 'ding', 0.4],
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <FontFaces />
    <Sequence durationInFrames={AROLL_END}><ARoll /></Sequence>
    <Sequence from={PROMO_START} durationInFrames={PROMO_LEN}><Promo /></Sequence>
    <Sequence from={OUTRO_START} durationInFrames={OUTRO_LEN}><Outro /></Sequence>

    {/* voice (with "sepanjang Oktober ini" removed) */}
    <Sequence durationInFrames={A_END}><Audio src={staticFile('voice.wav')} /></Sequence>
    <Sequence from={A_END} durationInFrames={B_LEN}>
      <Audio src={staticFile('voice.wav')} trimBefore={B_SRC_START} volume={(f) => interpolate(f, [B_LEN - 8, B_LEN], [1, 0], {extrapolateLeft: 'clamp'})} />
    </Sequence>

    {/* music: low under the voice, swells once talking stops */}
    <Audio
      src={staticFile('music.wav')}
      volume={(f) =>
        f < AROLL_END - 4
          ? interpolate(f, [0, 10], [0.35, 0.13], {extrapolateRight: 'clamp'})
          : interpolate(f, [AROLL_END - 4, AROLL_END + 14], [0.13, 0.9], {extrapolateRight: 'clamp'})
      }
    />

    {SFX.map(([f, name, vol], i) => (
      <Sequence key={i} from={f} durationInFrames={45}>
        <Audio src={staticFile(`sfx_${name}.wav`)} volume={vol} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
