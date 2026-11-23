import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BLUE, YELLOW} from '../Badge';
import {SAFE} from '../timeline';

export const NAVY = '#0f2a78';

export const useSpring = (delay: number, stiffness = 170) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 14, stiffness}});
};

export const rise = (s: number, dist = 50): React.CSSProperties => ({
  opacity: Math.min(1, Math.max(0, s)),
  transform: `translateY(${(1 - s) * dist}px) scale(${0.9 + 0.1 * s})`,
});

// Light brand background with blue & yellow swooshes (decoration sits mostly in the unsafe margins).
export const BrandBg: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 12;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#ffffff 0%,#eef3ff 55%,#e3ebff 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', width: 1400, height: 520, left: -520, top: -330 + drift, borderRadius: '50%', background: BLUE, transform: 'rotate(-18deg)'}} />
      <div style={{position: 'absolute', width: 1400, height: 120, left: -560, top: 150 + drift, borderRadius: '50%', background: YELLOW, transform: 'rotate(-18deg)'}} />
      <div style={{position: 'absolute', width: 1500, height: 560, right: -620, bottom: -380 - drift, borderRadius: '50%', background: BLUE, transform: 'rotate(-14deg)'}} />
      <div style={{position: 'absolute', width: 1500, height: 110, right: -640, bottom: 150 - drift, borderRadius: '50%', background: YELLOW, transform: 'rotate(-14deg)'}} />
    </AbsoluteFill>
  );
};

// Content area = TikTok/IG safe zone.
export const Safe: React.FC<{children: React.ReactNode; gap?: number; justify?: React.CSSProperties['justifyContent']}> = ({
  children,
  gap = 28,
  justify = 'center',
}) => (
  <div
    style={{
      position: 'absolute',
      top: SAFE.top,
      bottom: SAFE.bottom,
      left: SAFE.left,
      right: SAFE.right,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: justify,
      gap,
    }}
  >
    {children}
  </div>
);

// Wipe-in / wipe-out wrapper for each end scene.
export const SceneShell: React.FC<{children: React.ReactNode; durationInFrames: number; first?: boolean}> = ({
  children,
  durationInFrames,
  first,
}) => {
  const frame = useCurrentFrame();
  const inP = first ? 1 : interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const outP = interpolate(frame, [durationInFrames - 7, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: inP, transform: `translateX(${outP * -120}px)`, filter: `blur(${outP * 10}px)`}}>
      {children}
    </AbsoluteFill>
  );
};

export const IconCal = ({c = BLUE, s = 30}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" style={{flexShrink: 0}}>
    <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke={c} strokeWidth="2.4" />
    <path d="M3 10h18M8 3v4M16 3v4" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const IconClock = ({c = BLUE, s = 30}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" style={{flexShrink: 0}}>
    <circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="2.4" />
    <path d="M12 7v5l3 2" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const IconPin = ({c = NAVY, s = 52}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" style={{flexShrink: 0}}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill={c} />
    <circle cx="12" cy="10" r="2.8" fill={YELLOW} />
  </svg>
);
