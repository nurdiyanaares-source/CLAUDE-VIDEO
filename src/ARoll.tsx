import React, {useMemo} from 'react';
import {AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, random, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {A_END, AROLL_END, B_LEN, B_SRC_START, buildChunks, KEYWORDS, sf} from './data';
import {C, Chip, Icon, Pop, SAFE, SAFE_CX, usePop, Y} from './ui';

export const OFFER_BROLL = sf(62.44);

// ---------------------------------------------------------------- video + punch zoom
const ZOOMS: [number, number][] = [
  [0, 1.0], [sf(4.32), 1.06], [sf(10.92), 1.0], [sf(18.22), 1.07], [sf(22.32), 1.0],
  [sf(28.16), 1.06], [sf(35.36), 1.0], [sf(43.94), 1.05], [sf(52.92), 1.09],
  [A_END, 1.0], [sf(60.3), 1.08],
];
const zoomAt = (f: number) => {
  let z = 1, prev = 1, at = 0;
  for (const [k, v] of ZOOMS) if (f >= k) { prev = z; z = v; at = k; }
  return interpolate(f, [at, at + 6], [prev, z], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
};

const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const z = zoomAt(frame);
  return (
    <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: '540px 435px'}}>
      <Sequence durationInFrames={A_END}>
        <OffthreadVideo src={staticFile('source.mp4')} muted />
      </Sequence>
      <Sequence from={A_END} durationInFrames={B_LEN}>
        <OffthreadVideo src={staticFile('source.mp4')} muted trimBefore={B_SRC_START} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- header (covers the old burned-in title)
const HEADS: {from: number; tag: string; title: React.ReactNode}[] = [
  {from: 0, tag: 'PEMAKAI MULTIFOKAL', title: <>Dah bertahun pakai, tapi <Y>masih belum selesa?</Y></>},
  {from: sf(10.92), tag: 'TIP PENTING', title: <>Selesa <Y>bukan</Y> bergantung pada cermin sahaja</>},
  {from: sf(28.16), tag: 'HANIZAH OPTOMETRY', title: <>Pemeriksaan <Y>terperinci</Y> & ukuran <Y>tepat</Y></>},
  {from: sf(52.92), tag: 'PROMOSI HINGGA 31 DIS 2026', title: <><Y>FREE UPGRADE</Y> ke cermin multifokal tukar warna</>},
];

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= OFFER_BROLL + 8) return null;
  const idx = HEADS.reduce((a, h, i) => (frame >= h.from ? i : a), 0);
  const h = HEADS[idx];
  const t = frame - h.from;
  const inP = interpolate(t, [0, 9], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6))});
  const plateIn = interpolate(frame, [0, 8], [0.85, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
  const shine = ((frame % 120) / 120) * 1600 - 300;
  return (
    <div
      style={{
        position: 'absolute', left: 24, top: 232, width: 1032, height: 408,
        borderRadius: 44, overflow: 'hidden', transform: `scale(${plateIn})`,
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.blue} 55%, ${C.blue2} 100%)`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)', border: `5px solid ${C.yellow}`,
      }}
    >
      {/* decorative */}
      <div style={{position: 'absolute', right: -80, top: -120, width: 360, height: 360, borderRadius: 999, background: 'rgba(255,255,255,0.07)'}} />
      <div style={{position: 'absolute', left: -60, bottom: -140, width: 300, height: 300, borderRadius: 999, background: 'rgba(255,210,31,0.10)'}} />
      <div style={{position: 'absolute', top: 0, bottom: 0, left: shine, width: 120, transform: 'skewX(-20deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)'}} />
      <div style={{position: 'absolute', inset: 0, padding: '46px 70px 0 70px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22, transform: `translateY(${(1 - inP) * 40}px)`, opacity: Math.min(1, inP * 1.5)}}>
        <div style={{background: C.yellow, color: C.navy, fontFamily: 'Pop', fontWeight: 800, fontSize: 34, letterSpacing: 2, padding: '8px 26px', borderRadius: 40}}>
          {h.tag}
        </div>
        <div style={{color: C.white, fontFamily: 'Pop', fontWeight: 800, fontSize: 64, lineHeight: 1.14, width: 820, textShadow: '0 4px 14px rgba(0,0,0,0.3)'}}>
          {h.title}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- captions
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const chunks = useMemo(buildChunks, []);
  const ch = chunks.find((c) => frame >= c.from && frame < c.to);
  if (!ch) return null;
  if ((frame >= sf(23.3) && frame < sf(28.0)) || frame >= OFFER_BROLL) return null;
  const p = interpolate(frame - ch.from, [0, 5], [0.7, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
  return (
    <div style={{position: 'absolute', left: SAFE.left, width: SAFE.right - SAFE.left, top: 1300, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: `scale(${p})`, textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 22px'}}>
        {ch.words.map((w, i) => {
          const clean = w.w.replace(/[,.?!]/g, '').toUpperCase();
          const active = frame >= w.f;
          const key = KEYWORDS.has(clean);
          return (
            <span
              key={i}
              style={{
                fontFamily: 'Pop', fontWeight: 900, fontSize: 76, lineHeight: 1.12,
                color: key ? C.yellow : C.white,
                opacity: active ? 1 : 0.55,
                WebkitTextStroke: '12px #071F5C', paintOrder: 'stroke fill',
                textShadow: '0 8px 18px rgba(0,0,0,0.45)',
                display: 'inline-block',
                transform: `scale(${active && frame - w.f < 4 ? 1.12 : 1})`,
              }}
            >
              {clean.replace('RM700', 'RM700!')}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- motion graphics
const Card: React.FC<{children: React.ReactNode; w?: number; style?: React.CSSProperties}> = ({children, w, style}) => (
  <div style={{background: 'rgba(255,255,255,0.96)', borderRadius: 36, padding: '26px 34px', width: w, boxShadow: '0 18px 44px rgba(0,0,0,0.35)', fontFamily: 'Pop', color: C.navy, ...style}}>
    {children}
  </div>
);

const Confetti: React.FC<{from: number; dur?: number}> = ({from, dur = 45}) => {
  const frame = useCurrentFrame();
  const t = frame - from;
  if (t < 0 || t > dur) return null;
  const cols = [C.yellow, '#FF5A7A', '#3FE0B0', '#FFFFFF', C.blue2];
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {new Array(46).fill(0).map((_, i) => {
        const ang = random(`a${i}${from}`) * Math.PI * 2;
        const sp = 14 + random(`s${i}${from}`) * 22;
        const x = SAFE_CX + Math.cos(ang) * sp * t;
        const y = 1000 + Math.sin(ang) * sp * t + 0.9 * t * t;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 18, height: 30, background: cols[i % cols.length], borderRadius: 4, transform: `rotate(${t * 20 + i * 40}deg)`, opacity: interpolate(t, [dur - 12, dur], [1, 0], {extrapolateLeft: 'clamp'})}} />;
      })}
    </AbsoluteFill>
  );
};

/** clear lens -> photochromic (tukar warna) lens animation */
export const LensMorph: React.FC<{from: number; size?: number}> = ({from, size = 520}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - from, [12, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const tint = `rgba(${Math.round(255 - 180 * t)},${Math.round(255 - 205 * t)},${Math.round(255 - 140 * t)},${0.25 + 0.6 * t})`;
  const sunY = interpolate(t, [0, 1], [70, 8]);
  return (
    <svg width={size} height={size * 0.46} viewBox="0 0 520 240">
      <circle cx={470} cy={sunY + 20} r={26} fill={C.yellow} opacity={t} />
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k * 250},0)`}>
          <rect x={20} y={60} width={210} height={150} rx={60} fill={tint} stroke={C.navy} strokeWidth={14} />
          <path d={`M60 95 Q 90 80 120 92`} stroke="rgba(255,255,255,0.8)" strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M230 120 Q 260 95 290 120" stroke={C.navy} strokeWidth={14} fill="none" />
    </svg>
  );
};

const Counter: React.FC<{from: number; to: number; dur?: number}> = ({from, to, dur = 24}) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame - from, [0, dur], [0, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}));
  return <>RM{v}</>;
};

const Graphics: React.FC = () => {
  const L = SAFE.left;
  return (
    <>
      {/* hook: problem chips */}
      <Pop from={sf(4.98)} to={sf(10.0)} style={{left: L + 10, top: 970}} rotate={-4}><Chip icon="1f4bb" text="Komputer" /></Pop>
      <Pop from={sf(5.56)} to={sf(10.0)} style={{left: 520, top: 1000}} rotate={4}><Chip icon="1f91d" text="Meeting" /></Pop>
      <Pop from={sf(7.14)} to={sf(10.0)} style={{left: L + 40, top: 1120}} rotate={3}><Chip icon="1f4f1" text="Phone" /></Pop>
      <Pop from={sf(7.58)} to={sf(10.0)} style={{left: 480, top: 1150}} rotate={-3}><Chip icon="1f4c4" text="Dokumen" /></Pop>
      <Pop from={sf(10.1)} to={sf(10.9)} style={{left: 230, top: 1060}}><Chip icon="1f440" text="Tengok JAUH?" bg={C.yellow} size={60} /></Pop>

      {/* quality */}
      <Pop from={sf(15.02)} to={sf(18.1)} style={{left: L + 10, top: 940}} dir="left"><Chip icon="2b50" text="Kualiti" /></Pop>
      <Pop from={sf(15.78)} to={sf(18.1)} style={{left: 450, top: 940}} dir="right"><Chip icon="1f60a" text="Keselesaan" /></Pop>
      <Pop from={sf(17.0)} to={sf(18.1)} style={{left: 230, top: 1080}} rotate={-8}>
        <div style={{fontFamily: 'Pop', fontWeight: 900, fontSize: 70, color: C.red, border: `8px solid ${C.red}`, borderRadius: 20, padding: '4px 26px', background: 'rgba(255,255,255,0.92)'}}>SANGAT PENTING!</div>
      </Pop>

      {/* not only lens */}
      <Pop from={sf(21.26)} to={sf(22.3)} style={{left: 200, top: 960}}>
        <Card style={{display: 'flex', alignItems: 'center', gap: 22, fontWeight: 800, fontSize: 52}}>
          <Icon code="1f453" size={86} /> Cermin sahaja? <Icon code="274c" size={64} />
        </Card>
      </Pop>

      {/* brand */}
      <Pop from={sf(28.62)} to={sf(30.6)} style={{left: 150, top: 940}}>
        <Card style={{padding: '18px 26px'}}><Img src={staticFile('brand_logo.png')} style={{width: 560}} /></Card>
      </Pop>
      <Pop from={sf(31.0)} to={sf(35.2)} style={{left: L + 10, top: 930}} dir="left"><Chip icon="1f50d" text={<>Pemeriksaan <span style={{color: C.blue2}}>terperinci</span></>} /></Pop>
      <Pop from={sf(33.92)} to={sf(35.2)} style={{left: 300, top: 1070}} dir="right"><Chip icon="2728" text="Peralatan TERKINI" bg={C.yellow} /></Pop>

      {/* measurement + frame */}
      <Pop from={sf(37.4)} to={sf(43.8)} style={{left: L + 10, top: 880}} dir="left"><Chip icon="1f4cf" text="Ukuran khas multifokal" /></Pop>
      <Pop from={sf(40.26)} to={sf(43.8)} style={{left: L + 80, top: 1010}} dir="right"><Chip icon="1f453" text="Bantu pilih bingkai" /></Pop>
      <Pop from={sf(41.82)} to={sf(43.8)} style={{left: 200, top: 1140}} rotate={-5}><Chip icon="1f457" text="Bukan sekadar fesyen" bg={C.yellow} size={44} /></Pop>

      {/* far & near */}
      <Pop from={sf(48.34)} to={sf(52.7)} style={{left: L + 10, top: 900}} dir="left"><Chip icon="1f440" text="JAUH" bg={C.yellow} size={56} /></Pop>
      <Pop from={sf(48.9)} to={sf(52.7)} style={{left: 520, top: 900}} dir="right"><Chip icon="1f4c4" text="DEKAT" bg={C.yellow} size={56} /></Pop>
      <Pop from={sf(49.56)} to={sf(52.7)} style={{left: 190, top: 1040}}><Chip icon="1f60a" text="Lebih selesa" /></Pop>
      <Pop from={sf(51.24)} to={sf(52.7)} style={{left: 110, top: 1160}}><Chip icon="2705" text="Mudah sesuaikan diri" size={42} /></Pop>

      {/* good news */}
      <Pop from={sf(52.92)} to={sf(54.4)} style={{left: 130, top: 930}} rotate={-6}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, background: C.yellow, color: C.navy, fontFamily: 'Pop', fontWeight: 900, fontSize: 92, padding: '14px 44px', borderRadius: 30, boxShadow: '0 18px 44px rgba(0,0,0,0.4)'}}>
          <Icon code="1f4e3" size={100} /> BERITA BAIK!
        </div>
      </Pop>
      <Confetti from={sf(53.0)} />

      {/* offer */}
      <Pop from={sf(57.66)} to={sf(60.2)} style={{left: L + 10, top: 960}} dir="left"><Chip icon="1f453" text={<>Multifokal <span style={{color: C.blue2}}>PREMIUM</span></>} size={54} /></Pop>
      <Pop from={sf(60.3)} to={OFFER_BROLL} style={{left: 110, top: 840}} rotate={-6}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.red, color: '#fff', fontFamily: 'Pop', fontWeight: 900, fontSize: 84, padding: '8px 40px', borderRadius: 26, border: '6px solid #fff', boxShadow: '0 18px 44px rgba(0,0,0,0.4)'}}>
          <Icon code="1f381" size={92} /> FREE UPGRADE
        </div>
      </Pop>
      <Pop from={sf(61.0)} to={OFFER_BROLL} style={{left: 70, top: 990}}>
        <Card style={{padding: '12px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <LensMorph from={sf(61.0)} size={460} />
          <div style={{fontWeight: 800, fontSize: 34, marginTop: -6}}>Jernih ➜ <span style={{color: '#6A3FD0'}}>Tukar Warna</span></div>
        </Card>
      </Pop>
    </>
  );
};

// Full-screen offer B-roll over "jimat sehingga RM700" (also hides the old burned-in "JIMAT RM700" text)
const OfferBroll: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < OFFER_BROLL) return null;
  const t = frame - OFFER_BROLL;
  const wipe = interpolate(t, [0, 7], [0, 100], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{clipPath: `circle(${wipe * 1.2}% at 50% 55%)`}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, ${C.blue2} 0%, ${C.blue} 45%, ${C.navy} 100%)`}} />
      <div style={{position: 'absolute', left: -900, top: -500, width: 2880, height: 2880, background: `repeating-conic-gradient(from ${frame * 0.4}deg at 50% 50%, rgba(255,255,255,0.06) 0deg 8deg, transparent 8deg 18deg)`}} />
      <Pop from={OFFER_BROLL + 2} style={{left: 115, top: 420}} rotate={-5}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: C.red, color: '#fff', fontFamily: 'Pop', fontWeight: 900, fontSize: 78, padding: '6px 38px', borderRadius: 28, border: '7px solid #fff', boxShadow: '0 20px 44px rgba(0,0,0,0.45)'}}>
          <Icon code="1f381" size={86} /> FREE UPGRADE
        </div>
      </Pop>
      <Pop from={OFFER_BROLL + 6} style={{left: 90, top: 600}} dir="up">
        <div style={{width: 820, background: '#fff', borderRadius: 36, padding: '16px 26px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 44px rgba(0,0,0,0.4)'}}>
          <LensMorph from={OFFER_BROLL - 10} size={460} />
          <div style={{fontFamily: 'Pop', fontWeight: 800, fontSize: 42, color: C.navy}}>Jernih ➜ <span style={{color: '#6A3FD0'}}>Tukar Warna</span></div>
        </div>
      </Pop>
      <Pop from={OFFER_BROLL + 12} style={{left: 90, top: 970}}>
        <div style={{width: 820, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Pop', color: C.navy, background: C.yellow, borderRadius: 40, padding: '20px 20px 26px', boxShadow: '0 20px 44px rgba(0,0,0,0.4)'}}>
          <div style={{fontWeight: 800, fontSize: 60, lineHeight: 1.05}}>JIMAT SEHINGGA</div>
          <div style={{fontWeight: 900, fontSize: 200, lineHeight: 1}}><Counter from={OFFER_BROLL + 14} to={700} dur={30} /></div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

export const ARoll: React.FC = () => (
  <AbsoluteFill>
    <Footage />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)'}} />
    <Header />
    <Graphics />
    <OfferBroll />
    <Captions />
  </AbsoluteFill>
);
