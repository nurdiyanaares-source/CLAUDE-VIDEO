import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {FONT} from './fonts';
import {SAFE} from './timeline';

export const BLUE = '#1b3f9c';
export const YELLOW = '#ffe11a';

// A pop-in badge placed inside the top of the TikTok/IG safe zone.
export const Badge: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  subtitleAt?: number; // frames after start
  durationInFrames: number;
}> = ({icon, title, subtitle, subtitleAt = 0, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 12, stiffness: 180}});
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const sub = spring({frame: frame - subtitleAt, fps, config: {damping: 14, stiffness: 200}});
  const shine = interpolate(frame, [6, 26], [-120, 220], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'absolute',
        top: SAFE.top + 50,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        opacity: exit,
        transform: `translateY(${(1 - exit) * -30}px)`,
      }}
    >
      <div
        style={{
          transform: `scale(${enter})`,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          maxWidth: 760,
          padding: '18px 34px 18px 20px',
          borderRadius: 999,
          background: 'white',
          border: `5px solid ${BLUE}`,
          boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 999,
            background: YELLOW,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transform: `rotate(${interpolate(enter, [0, 1], [-90, 0])}deg)`,
          }}
        >
          {icon}
        </div>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 46, color: BLUE, letterSpacing: 0.5, lineHeight: 1.05}}>
          {title}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${shine}%`,
            width: '30%',
            background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
      </div>
      {subtitle ? (
        <div
          style={{
            transform: `scale(${Math.max(0, sub)})`,
            opacity: Math.min(1, Math.max(0, sub)),
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 38,
            color: BLUE,
            background: YELLOW,
            padding: '10px 26px',
            borderRadius: 14,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const stroke = {fill: 'none', stroke: BLUE, strokeWidth: 3.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
export const PinIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24">
    <path {...stroke} d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
    <circle {...stroke} cx="12" cy="10" r="2.6" />
  </svg>
);
export const SparkIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24">
    <path {...stroke} d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path {...stroke} d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  </svg>
);
export const KeyIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24">
    <circle {...stroke} cx="8" cy="12" r="4" />
    <path {...stroke} d="M12 12h9M18 12v3M21 12v2" />
  </svg>
);
