import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {LensMorph} from './ARoll';
import {C, Icon, Pop, SAFE, usePop} from './ui';

const Rays: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, ${C.blue2} 0%, ${C.blue} 45%, ${C.navy} 100%)`}} />
      <div
        style={{
          position: 'absolute', left: -900, top: -500, width: 2880, height: 2880,
          background: `repeating-conic-gradient(from ${frame * 0.4}deg at 50% 50%, rgba(255,255,255,0.06) 0deg 8deg, transparent 8deg 18deg)`,
        }}
      />
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2px)', backgroundSize: '36px 36px', opacity: 0.5}} />
    </AbsoluteFill>
  );
};

const Polaroid: React.FC<{src: string; from: number; x: number; y: number; rot: number; w: number; h: number; out: number}> = ({src, from, x, y, rot, w, h, out}) => {
  const frame = useCurrentFrame();
  const p = usePop(from, 13);
  const o = interpolate(frame, [out, out + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
  if (frame < from) return null;
  const kb = 1 + (frame - from) * 0.0012;
  return (
    <div
      style={{
        position: 'absolute', left: x, top: y + (1 - p) * 700 + o * 1200,
        transform: `rotate(${rot * p}deg)`, background: '#fff', padding: '16px 16px 18px', borderRadius: 14,
        boxShadow: '0 24px 50px rgba(0,0,0,0.45)',
      }}
    >
      <div style={{width: w, height: h, overflow: 'hidden', borderRadius: 6}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb})`}} />
      </div>
    </div>
  );
};

export const Promo: React.FC = () => {
  const frame = useCurrentFrame();
  const BEAT2 = 120;
  const titleShrink = interpolate(frame, [BEAT2 - 6, BEAT2 + 6], [1, 0.82], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const sparkle = 0.5 + 0.5 * Math.sin(frame / 5);
  return (
    <AbsoluteFill>
      <Rays />

      {/* title */}
      <div style={{position: 'absolute', left: SAFE.left, width: SAFE.right - SAFE.left, top: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${titleShrink})`, transformOrigin: '50% 0%'}}>
        <Pop from={2} style={{position: 'relative'}}>
          <div style={{background: C.yellow, color: C.navy, fontFamily: 'Pop', fontWeight: 800, fontSize: 40, letterSpacing: 3, padding: '8px 34px', borderRadius: 40}}>PROMOSI ISTIMEWA</div>
        </Pop>
        <Pop from={8} style={{position: 'relative', marginTop: 18}} dir="up">
          <div style={{fontFamily: 'Pop', fontWeight: 900, fontSize: 80, color: '#fff', lineHeight: 1, textAlign: 'center'}}>CERMIN MULTIFOKAL</div>
        </Pop>
        <Pop from={14} style={{position: 'relative', marginTop: 8}}>
          <div style={{fontFamily: 'Pop', fontWeight: 900, fontSize: 118, color: C.yellow, lineHeight: 1.05, textAlign: 'center', textShadow: '0 10px 30px rgba(0,0,0,0.35)'}}>TUKAR WARNA</div>
        </Pop>
        <Pop from={20} style={{position: 'relative', marginTop: 4}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Pop', fontWeight: 800, fontStyle: 'italic', fontSize: 66, color: '#fff', letterSpacing: 10}}>
            <Icon code="2728" size={60} style={{opacity: sparkle}} /> PREMIUM <Icon code="2728" size={60} style={{opacity: 1 - sparkle}} />
          </div>
        </Pop>
      </div>

      {/* beat 1 : customer photos */}
      <Polaroid src="photo2.jpg" from={26} x={70} y={860} rot={-7} w={430} h={330} out={BEAT2 - 8} />
      <Polaroid src="photo3.jpg" from={34} x={540} y={830} rot={6} w={330} h={440} out={BEAT2 - 8} />
      <Polaroid src="photo1.jpg" from={42} x={250} y={1080} rot={-2} w={380} h={360} out={BEAT2 - 8} />

      {/* beat 2 : offer */}
      <Pop from={BEAT2 + 4} style={{left: 115, top: 720}} rotate={-5}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: C.red, color: '#fff', fontFamily: 'Pop', fontWeight: 900, fontSize: 78, padding: '6px 38px', borderRadius: 28, border: '7px solid #fff', boxShadow: '0 20px 44px rgba(0,0,0,0.45)'}}>
          <Icon code="1f381" size={86} /> FREE UPGRADE
        </div>
      </Pop>
      <Pop from={BEAT2 + 16} style={{left: 90, top: 880}} dir="up">
        <div style={{width: 820, background: '#fff', borderRadius: 36, padding: '18px 26px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 44px rgba(0,0,0,0.4)'}}>
          <LensMorph from={BEAT2 + 16} size={440} />
          <div style={{fontFamily: 'Pop', fontWeight: 800, fontSize: 44, color: C.navy, marginTop: 4}}>
            dari <span style={{color: '#5C6B85'}}>cermin jernih</span> ➜ <span style={{color: '#6A3FD0'}}>tukar warna</span>
          </div>
        </div>
      </Pop>
      <Pop from={BEAT2 + 52} style={{left: 90, top: 1200}}>
        <div style={{width: 820, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, fontFamily: 'Pop', color: C.navy, background: C.yellow, borderRadius: 34, padding: '10px 20px', boxShadow: '0 20px 44px rgba(0,0,0,0.4)'}}>
          <div style={{fontWeight: 800, fontSize: 44, lineHeight: 1.05, textAlign: 'right'}}>JIMAT<br />SEHINGGA</div>
          <div style={{fontWeight: 900, fontSize: 120, lineHeight: 1}}>
            RM{Math.round(interpolate(frame, [BEAT2 + 56, BEAT2 + 84], [0, 700], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}))}
          </div>
        </div>
      </Pop>
      <Pop from={BEAT2 + 96} style={{left: 90, top: 1390}} dir="up">
        <div style={{width: 820, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: 'Pop', fontWeight: 800, fontSize: 37, whiteSpace: 'nowrap', color: '#fff', background: 'rgba(7,31,92,0.85)', border: `4px solid ${C.yellow}`, borderRadius: 60, padding: '12px 20px'}}>
          <Icon code="1f4c5" size={50} /> Promosi sehingga&nbsp;<span style={{color: C.yellow}}>31 Disember 2026</span>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};
