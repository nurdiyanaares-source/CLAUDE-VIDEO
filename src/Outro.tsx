import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from './fonts';
import {BLUE, YELLOW} from './Badge';
import {SAFE} from './timeline';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, height} = useVideoConfig();
  const blur = interpolate(frame, [0, 12], [0, 22], {extrapolateRight: 'clamp'});
  const dim = interpolate(frame, [0, 12], [0, 0.72], {extrapolateRight: 'clamp'});
  const s = (d: number) => spring({frame: frame - d, fps, config: {damping: 13, stiffness: 160}});
  const line = (d: number): React.CSSProperties => ({
    opacity: Math.min(1, s(d)),
    transform: `translateY(${(1 - s(d)) * 60}px)`,
  });
  const safeCenter = SAFE.top + (height - SAFE.top - SAFE.bottom) / 2;

  return (
    <AbsoluteFill>
      <Img
        src={staticFile('lastframe.jpg')}
        style={{width: '100%', height: '100%', objectFit: 'cover', filter: `blur(${blur}px)`, transform: 'scale(1.12)'}}
      />
      <AbsoluteFill style={{background: `rgba(16,36,96,${dim})`}} />
      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: safeCenter,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 26,
          fontFamily: FONT,
        }}
      >
        <div style={{...line(6), fontWeight: 800, fontSize: 40, color: YELLOW, letterSpacing: 6}}>MULTIFOKAL YANG SELESA</div>
        <div style={{...line(10), fontWeight: 900, fontSize: 92, color: 'white', lineHeight: 1, textShadow: '0 8px 30px rgba(0,0,0,0.4)'}}>
          HANIZA
          <br />
          OPTOMETRY
        </div>
        <div style={{...line(16), width: interpolate(s(16), [0, 1], [0, 420]), height: 8, borderRadius: 8, background: YELLOW}} />
        <div style={{...line(22), fontWeight: 700, fontSize: 40, color: 'white', lineHeight: 1.3, maxWidth: 820}}>
          Bermula dengan pemeriksaan mata
          <br />
          yang terperinci &amp; ukuran yang tepat
        </div>
        <div
          style={{
            ...line(32),
            marginTop: 20,
            fontWeight: 900,
            fontSize: 42,
            color: BLUE,
            background: YELLOW,
            padding: '20px 44px',
            borderRadius: 999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
            transform: `${line(32).transform} scale(${1 + 0.03 * Math.sin(frame / 4)})`,
          }}
        >
          TEMPAH PEMERIKSAAN MATA
        </div>
      </div>
    </AbsoluteFill>
  );
};
