import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SAFE} from './timeline';

// Preview-only overlay (toggle `showSafeZone` in Studio). Red = covered by TikTok/IG UI.
export const SafeZoneGuide: React.FC = () => {
  const red = 'rgba(255,0,0,0.28)';
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: SAFE.top, background: red}} />
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: SAFE.bottom, background: red}} />
      <div style={{position: 'absolute', top: SAFE.top, bottom: SAFE.bottom, right: 0, width: SAFE.right, background: red}} />
      <div style={{position: 'absolute', top: SAFE.top, bottom: SAFE.bottom, left: 0, width: SAFE.left, background: red}} />
      <div style={{position: 'absolute', top: SAFE.top, bottom: SAFE.bottom, left: SAFE.left, right: SAFE.right, border: '4px dashed lime'}} />
    </AbsoluteFill>
  );
};
