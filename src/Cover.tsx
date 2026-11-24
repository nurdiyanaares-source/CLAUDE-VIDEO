import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {LensMorph} from './ARoll';
import {C, FontFaces, Icon} from './ui';

// Cover 1080x1920. Key content kept inside y 300–1620 so it survives the
// IG grid (4:5) and TikTok profile (3:4) centre crops.

const Bg: React.FC<{tint: number}> = ({tint}) => (
  <AbsoluteFill>
    <Img src={staticFile('cover_bg.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.12)', transformOrigin: '50% 40%'}} />
    <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(7,31,92,${tint}) 0%, rgba(7,31,92,0) 38%, rgba(7,31,92,0) 55%, rgba(7,31,92,0.85) 100%)`}} />
  </AbsoluteFill>
);

const Brand: React.FC<{top: number}> = ({top}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center'}}>
    <div style={{background: '#fff', borderRadius: 22, padding: '6px 18px', boxShadow: '0 10px 26px rgba(0,0,0,0.3)'}}>
      <Img src={staticFile('brand_logo.png')} style={{width: 300}} />
    </div>
  </div>
);

const Stroke: React.CSSProperties = {WebkitTextStroke: '14px #071F5C', paintOrder: 'stroke fill', textShadow: '0 10px 24px rgba(0,0,0,0.45)'};

export const CoverA: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Pop'}}>
    <FontFaces />
    <Bg tint={0.5} />
    {/* top hook panel (also hides the old burned-in title) */}
    <div style={{position: 'absolute', left: 30, right: 30, top: 296, height: 470, borderRadius: 46, background: `linear-gradient(135deg, ${C.navy}, ${C.blue} 60%, ${C.blue2})`, border: `6px solid ${C.yellow}`, boxShadow: '0 20px 50px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <div style={{background: C.yellow, color: C.navy, fontWeight: 800, fontSize: 38, letterSpacing: 3, padding: '6px 28px', borderRadius: 40}}>PEMAKAI MULTIFOKAL</div>
      <div style={{color: '#fff', fontWeight: 900, fontSize: 80, lineHeight: 1.05, textAlign: 'center'}}>DAH BERTAHUN PAKAI,</div>
      <div style={{color: C.yellow, fontWeight: 900, fontSize: 112, lineHeight: 0.98, textAlign: 'center'}}>MASIH TAK</div>
      <div style={{color: C.yellow, fontWeight: 900, fontSize: 112, lineHeight: 0.98, textAlign: 'center', display: 'flex', alignItems: 'center', gap: 18}}>
        SELESA? <Icon code="1f914" size={100} />
      </div>
    </div>
    {/* offer block */}
    <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
      <div style={{transform: 'rotate(-4deg)', display: 'flex', alignItems: 'center', gap: 16, background: C.red, color: '#fff', fontWeight: 900, fontSize: 96, padding: '6px 44px', borderRadius: 28, border: '7px solid #fff', boxShadow: '0 20px 44px rgba(0,0,0,0.45)'}}>
        <Icon code="1f381" size={104} /> FREE UPGRADE
      </div>
      <div style={{width: 900, background: C.yellow, color: C.navy, borderRadius: 34, padding: '16px 24px', textAlign: 'center', boxShadow: '0 20px 44px rgba(0,0,0,0.45)'}}>
        <div style={{fontWeight: 800, fontSize: 48, lineHeight: 1.1}}>Cermin Multifokal Tukar Warna</div>
        <div style={{fontWeight: 900, fontSize: 86, lineHeight: 1.05}}>JIMAT RM700</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, color: '#fff', fontWeight: 800, fontSize: 38, background: 'rgba(7,31,92,0.9)', border: `4px solid ${C.yellow}`, borderRadius: 50, padding: '8px 30px'}}>
        <Icon code="1f4c5" size={46} /> Hingga 31 Disember 2026
      </div>
    </div>
  </AbsoluteFill>
);

export const CoverB: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Pop'}}>
    <FontFaces />
    <Bg tint={0.75} />
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.navy} 0%, ${C.blue} 34%, rgba(11,58,158,0) 46%)`}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{background: C.yellow, color: C.navy, fontWeight: 800, fontSize: 40, letterSpacing: 3, padding: '6px 30px', borderRadius: 40}}>PROMOSI MULTIFOKAL</div>
      <div style={{color: '#fff', fontWeight: 900, fontSize: 150, lineHeight: 1.0, marginTop: 14, ...Stroke}}>FREE</div>
      <div style={{color: C.yellow, fontWeight: 900, fontSize: 150, lineHeight: 0.95, ...Stroke}}>UPGRADE!</div>
      <div style={{color: '#fff', fontWeight: 800, fontSize: 52, marginTop: 12, ...Stroke, WebkitTextStroke: '10px #071F5C'}}>Jernih ➜ Tukar Warna</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      <div style={{background: '#fff', borderRadius: 34, padding: '10px 26px', boxShadow: '0 20px 44px rgba(0,0,0,0.4)'}}>
        <LensMorph from={-100} size={400} />
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{width: 250, height: 250, borderRadius: 999, background: C.yellow, border: `8px solid ${C.navy}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.navy, transform: 'rotate(-8deg)', boxShadow: '0 18px 40px rgba(0,0,0,0.45)'}}>
          <div style={{fontWeight: 800, fontSize: 34, lineHeight: 1}}>JIMAT</div>
          <div style={{fontWeight: 900, fontSize: 60, lineHeight: 1.05}}>RM700</div>
        </div>
        <div style={{color: '#fff', fontWeight: 800, fontSize: 40, lineHeight: 1.25, ...Stroke, WebkitTextStroke: '9px #071F5C'}}>
          Hingga<br /><span style={{color: C.yellow, fontSize: 48}}>31 Dis 2026</span>
        </div>
      </div>
    </div>
    <Brand top={1650} />
  </AbsoluteFill>
);
