import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {BRANCHES} from './data';
import {FontFaces} from './ui';

// A4 portrait designed at 1240x1754 (150 dpi); render with --scale=2 for 2480x3508 (300 dpi).
const NAVY = '#0A2A78';
const BLUE = '#1747B8';
const ROYAL = '#2563EB';
const GOLD1 = '#FFE27A';
const GOLD2 = '#F5B800';
const GOLD3 = '#D99A00';
const INK = '#13224A';
const gold = `linear-gradient(180deg, ${GOLD1} 0%, ${GOLD2} 55%, ${GOLD3} 100%)`;

const f = (p: string) => staticFile(`poster/${p}`);

const Fonts: React.FC = () => (
  <style>{`
    @font-face{font-family:'Serif';font-weight:700;src:url(${staticFile('fonts/playfair-display-latin-700-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Serif';font-weight:800;src:url(${staticFile('fonts/playfair-display-latin-800-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Serif';font-weight:900;src:url(${staticFile('fonts/playfair-display-latin-900-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Serif';font-weight:800;font-style:italic;src:url(${staticFile('fonts/playfair-display-latin-800-italic.woff2')}) format('woff2');}
    @font-face{font-family:'Script';font-weight:400;src:url(${staticFile('fonts/great-vibes-latin-400-normal.woff2')}) format('woff2');}
  `}</style>
);

/** gold gradient text */
const Gold: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span style={{background: gold, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 3px 2px rgba(120,80,0,0.25))', ...style}}>{children}</span>
);

// ---- thin line icons (premium look)
const ico = {
  gift: 'M4 11h16v9H4zM2 7h20v4H2zM12 7v13M12 7c-2-4-6-4-6-1.5S10 7 12 7zm0 0c2-4 6-4 6-1.5S14 7 12 7z',
  shield: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zM8 12l3 3 5-6',
  card: 'M2 5h20v14H2zM2 9h20M6 15h4',
  cal: 'M3 5h18v16H3zM3 9h18M8 3v4M16 3v4M7 13h3M14 13h3M7 17h3',
  pin: 'M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  eye: 'M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  star: 'M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z',
};
const Line: React.FC<{d: string; size: number; color?: string; w?: number}> = ({d, size, color = '#fff', w = 1.7}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const IcoBadge: React.FC<{d: string; size?: number}> = ({d, size = 64}) => (
  <div style={{width: size, height: size, borderRadius: 999, background: `linear-gradient(145deg, ${BLUE}, ${NAVY})`, border: `3px solid ${GOLD2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(10,42,120,0.3)', flexShrink: 0}}>
    <Line d={d} size={size * 0.5} color={GOLD1} />
  </div>
);
const Num: React.FC<{n: number}> = ({n}) => (
  <div style={{width: 64, height: 64, borderRadius: 999, background: NAVY, color: '#fff', fontFamily: 'Serif', fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${GOLD2}`, flexShrink: 0}}>{n}</div>
);

const Background: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #FFFFFF 0%, #F3F7FF 40%, #E6EEFF 100%)', overflow: 'hidden'}}>
    {/* soft light rays */}
    <div style={{position: 'absolute', left: -300, top: -400, width: 1800, height: 1800, background: 'repeating-conic-gradient(from 200deg at 30% 20%, rgba(255,255,255,0.7) 0deg 6deg, transparent 6deg 16deg)', opacity: 0.5}} />
    {/* bokeh */}
    {[[90, 200, 260, ROYAL, 0.12], [1150, 330, 300, GOLD2, 0.16], [1180, 1040, 240, ROYAL, 0.1], [40, 1180, 200, GOLD2, 0.14], [620, 40, 180, GOLD2, 0.1]].map(([x, y, r, c, o], i) => (
      <div key={i} style={{position: 'absolute', left: (x as number) - (r as number) / 2, top: (y as number) - (r as number) / 2, width: r as number, height: r as number, borderRadius: 999, background: c as string, opacity: o as number, filter: 'blur(40px)'}} />
    ))}
    {/* gold flourish curves */}
    <svg width={1240} height={1754} style={{position: 'absolute', inset: 0}}>
      <path d="M-20 300 C 200 120, 380 90, 560 60" stroke={GOLD2} strokeWidth={3} fill="none" opacity={0.7} />
      <path d="M-20 330 C 180 170, 360 130, 520 110" stroke={GOLD2} strokeWidth={1.5} fill="none" opacity={0.5} />
      <path d="M1260 120 C 1100 160, 980 230, 900 330" stroke={GOLD2} strokeWidth={3} fill="none" opacity={0.7} />
      <path d="M1260 1250 C 1120 1200, 1030 1220, 940 1290" stroke={GOLD2} strokeWidth={2} fill="none" opacity={0.5} />
      {/* sparkles */}
      {[[300, 250, 16], [960, 210, 12], [1110, 560, 14], [130, 640, 12]].map(([x, y, s], i) => (
        <path key={i} d={`M${x} ${y - s} Q ${x} ${y} ${x + s} ${y} Q ${x} ${y} ${x} ${y + s} Q ${x} ${y} ${x - s} ${y} Q ${x} ${y} ${x} ${y - s}Z`} fill={GOLD2} />
      ))}
    </svg>
  </AbsoluteFill>
);

/** ragged brush-stroke banner */
const Brush: React.FC<{w: number; h: number; children: React.ReactNode; style?: React.CSSProperties}> = ({w, h, children, style}) => (
  <div style={{position: 'relative', width: w, height: h, ...style}}>
    <svg width={w} height={h} viewBox="0 0 600 120" preserveAspectRatio="none" style={{position: 'absolute', inset: 0}}>
      <path d="M18 22 L40 14 L120 18 L210 8 L330 14 L450 6 L560 14 L590 24 L584 46 L596 64 L582 86 L590 104 L540 112 L420 106 L300 116 L180 108 L70 114 L14 104 L22 82 L6 60 L20 40 Z" fill={NAVY} />
      <path d="M30 30 L580 26" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
      <path d="M26 96 L570 92" stroke="rgba(0,0,0,0.12)" strokeWidth={6} />
    </svg>
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
  </div>
);

const Photo: React.FC<{src: string; pos: string; label: string; sub: string; tint?: boolean}> = ({src, pos, label, sub, tint}) => (
  <div style={{position: 'relative', width: 500, height: 340, borderRadius: 30, overflow: 'hidden', border: `5px solid ${tint ? GOLD2 : '#fff'}`, boxShadow: '0 18px 40px rgba(10,42,120,0.28)'}}>
    <Img src={f(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: 'scale(1.35)', transformOrigin: pos}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 130, background: 'linear-gradient(180deg, rgba(10,42,120,0) 0%, rgba(10,42,120,0.92) 100%)'}} />
    <div style={{position: 'absolute', left: 22, bottom: 18, display: 'flex', alignItems: 'center', gap: 12}}>
      <Line d={tint ? ico.sun : ico.eye} size={40} color={tint ? GOLD1 : '#fff'} w={2} />
      <div style={{fontFamily: 'Pop'}}>
        <div style={{color: tint ? GOLD1 : '#fff', fontWeight: 800, fontSize: 30, lineHeight: 1.05}}>{label}</div>
        <div style={{color: 'rgba(255,255,255,0.9)', fontWeight: 500, fontSize: 18}}>{sub}</div>
      </div>
    </div>
  </div>
);

const LogoTile: React.FC<{src: string; w: number; h: number}> = ({src, w, h}) => (
  <div style={{width: w, height: h, background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #DCE5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(10,42,120,0.08)'}}>
    <Img src={f(src)} style={{maxWidth: '96%', maxHeight: '96%', objectFit: 'contain'}} />
  </div>
);

const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: 'rgba(255,255,255,0.92)', borderRadius: 28, border: `2px solid ${GOLD1}`, boxShadow: '0 14px 34px rgba(10,42,120,0.13)', padding: '22px 26px', ...style}}>
    {children}
  </div>
);

export const PosterA4: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Pop', color: INK}}>
    <FontFaces />
    <Fonts />
    <Background />

    {/* logo */}
    <div style={{position: 'absolute', top: 36, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
      <Img src={f('logo_mark.png')} style={{width: 380}} />
    </div>

    {/* headline */}
    <div style={{position: 'absolute', top: 172, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Brush w={580} h={106} style={{transform: 'rotate(-2.5deg)'}}>
        <span style={{fontFamily: 'Script', fontSize: 84, color: '#fff', marginTop: 6}}>Promosi Istimewa</span>
      </Brush>
      <div style={{fontFamily: 'Serif', fontWeight: 800, fontSize: 86, color: NAVY, lineHeight: 1.0, marginTop: 14, letterSpacing: -1}}>Multifokal Premium</div>
      <div style={{fontFamily: 'Serif', fontWeight: 900, fontSize: 132, lineHeight: 1.0, marginTop: 2, letterSpacing: -1}}>
        <Gold>Tukar Warna</Gold>
      </div>
      <svg width={520} height={30} viewBox="0 0 520 30" style={{marginTop: -6}}>
        <path d="M10 20 C 140 2, 380 2, 510 18" stroke={GOLD2} strokeWidth={5} fill="none" strokeLinecap="round" />
      </svg>
    </div>

    {/* hero: clear -> photochromic */}
    <div style={{position: 'absolute', top: 596, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50}}>
      <Photo src="clear.jpg" pos="45% 52%" label="Cermin Jernih" sub="sebelum upgrade" />
      <Photo src="tint.jpg" pos="50% 50%" label="Tukar Warna" sub="FREE upgrade premium" tint />
    </div>
    {/* arrow between photos */}
    <div style={{position: 'absolute', top: 726, left: 580, width: 80, height: 80, borderRadius: 999, background: gold, border: '5px solid #fff', boxShadow: '0 8px 20px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width={42} height={42} viewBox="0 0 24 24"><path d="M4 12h14M12 5l7 7-7 7" stroke={NAVY} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
    {/* FREE UPGRADE ribbon */}
    <div style={{position: 'absolute', top: 562, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: `linear-gradient(135deg, ${NAVY}, ${ROYAL})`, color: '#fff', fontWeight: 800, fontSize: 34, letterSpacing: 4, padding: '10px 40px', borderRadius: 50, border: `3px solid ${GOLD2}`, boxShadow: '0 10px 24px rgba(10,42,120,0.35)', display: 'flex', alignItems: 'center', gap: 14}}>
        <Line d={ico.gift} size={36} color={GOLD1} w={2} /> FREE UPGRADE
      </div>
    </div>
    {/* RM700 seal */}
    <div style={{position: 'absolute', top: 480, left: 985, width: 220, height: 220, borderRadius: 999, background: gold, border: `6px solid #fff`, boxShadow: '0 16px 36px rgba(120,80,0,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-8deg)', outline: `3px dashed ${NAVY}`, outlineOffset: -18}}>
      <div style={{fontWeight: 800, fontSize: 26, color: NAVY, letterSpacing: 2, lineHeight: 1}}>JIMAT</div>
      <div style={{fontWeight: 700, fontSize: 20, color: NAVY, lineHeight: 1.3}}>sehingga</div>
      <div style={{fontFamily: 'Serif', fontWeight: 900, fontSize: 54, color: NAVY, lineHeight: 1.0}}>RM700</div>
    </div>

    {/* feature cards */}
    <div style={{position: 'absolute', top: 966, left: 60, right: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26}}>
      <Card style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <Num n={1} /><IcoBadge d={ico.shield} />
          <div>
            <div style={{fontFamily: 'Serif', fontWeight: 800, fontSize: 36, color: NAVY, lineHeight: 1.05}}>Boleh Pay & Claim</div>
            <div style={{fontWeight: 500, fontSize: 18, color: '#4A5878'}}>Panel yang diterima:</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: 12}}>
          <LogoTile src="pmcare.png" w={128} h={128} />
          <LogoTile src="maim.png" w={128} h={128} />
          <LogoTile src="mednefits.png" w={212} h={128} />
        </div>
      </Card>
      <Card style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <Num n={2} /><IcoBadge d={ico.card} />
          <div>
            <div style={{fontFamily: 'Serif', fontWeight: 800, fontSize: 36, color: NAVY, lineHeight: 1.05}}>Bayaran Ansuran</div>
            <div style={{fontWeight: 500, fontSize: 18, color: '#4A5878'}}>Mudah & fleksibel</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          <LogoTile src="spaylater.png" w={114} h={62} />
          <LogoTile src="atome.png" w={114} h={62} />
          <LogoTile src="visa.png" w={114} h={62} />
          <LogoTile src="mastercard.png" w={114} h={62} />
        </div>
        <LogoTile src="instalment.png" w={486} h={92} />
      </Card>
    </div>

    {/* date ribbon */}
    <div style={{position: 'absolute', top: 1262, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, borderRadius: 60, padding: '12px 44px', border: `3px solid ${GOLD2}`, boxShadow: '0 10px 26px rgba(10,42,120,0.3)'}}>
        <Line d={ico.cal} size={42} color={GOLD1} w={2} />
        <span style={{color: '#fff', fontWeight: 700, fontSize: 32}}>Promosi sehingga</span>
        <span style={{fontFamily: 'Serif', fontWeight: 900, fontSize: 40}}><Gold>31 Disember 2026</Gold></span>
      </div>
    </div>

    {/* branches */}
    <div style={{position: 'absolute', top: 1356, left: 60, right: 60}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12}}>
        <div style={{height: 2, flex: 1, background: `linear-gradient(90deg, transparent, ${GOLD2})`}} />
        <Line d={ico.pin} size={34} color={BLUE} w={2.2} />
        <span style={{fontFamily: 'Serif', fontWeight: 800, fontSize: 34, color: NAVY}}>9 Cawangan Kami</span>
        <div style={{height: 2, flex: 1, background: `linear-gradient(270deg, transparent, ${GOLD2})`}} />
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
        {BRANCHES.map((b) => (
          <div key={b.name} style={{background: '#fff', borderRadius: 14, border: '1.5px solid #D6E1F7', padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 3px 8px rgba(10,42,120,0.06)'}}>
            <div style={{width: 10, alignSelf: 'stretch', borderRadius: 6, background: gold}} />
            <div style={{minWidth: 0}}>
              <div style={{fontWeight: 800, fontSize: 23, color: NAVY, lineHeight: 1.15}}>{b.name}</div>
              <div style={{fontWeight: 500, fontSize: 15.5, color: '#4A5878', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{b.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* footer */}
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 92, background: `linear-gradient(90deg, ${NAVY}, ${BLUE})`, borderTop: `4px solid ${GOLD2}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px'}}>
      <Img src={f('logo_word.png')} style={{height: 50, filter: 'brightness(0) invert(1)'}} />
      <div style={{display: 'flex', gap: 26, color: '#fff', fontWeight: 600, fontSize: 18}}>
        {[[ico.star, 'Premium'], [ico.eye, 'Selesa'], [ico.sun, 'Tukar Warna']].map(([d, t]) => (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 8}}><Line d={d} size={26} color={GOLD1} w={2} />{t}</div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);
