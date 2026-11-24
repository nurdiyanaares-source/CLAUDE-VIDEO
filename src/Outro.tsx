import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {BRANCHES} from './data';
import {C, Icon, Pop, SAFE, usePop} from './ui';

const PAGE2 = 165;

const Bg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #F4F8FF 0%, #E3ECFF 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -200, top: -260, width: 900, height: 500, borderRadius: '50%', background: C.blue, transform: `rotate(${-14 + Math.sin(frame / 40) * 2}deg)`}} />
      <div style={{position: 'absolute', left: -160, top: -230, width: 900, height: 470, borderRadius: '50%', border: `14px solid ${C.yellow}`, transform: `rotate(${-14 + Math.sin(frame / 40) * 2}deg)`}} />
      <div style={{position: 'absolute', right: -260, bottom: -300, width: 900, height: 520, borderRadius: '50%', background: C.blue, transform: `rotate(${-12 + Math.cos(frame / 40) * 2}deg)`}} />
      <div style={{position: 'absolute', right: -230, bottom: -270, width: 900, height: 500, borderRadius: '50%', border: `12px solid ${C.yellow}`, transform: `rotate(${-12 + Math.cos(frame / 40) * 2}deg)`}} />
    </AbsoluteFill>
  );
};

const Logo: React.FC<{from: number; top: number}> = ({from, top}) => (
  <Pop from={from} style={{left: 0, width: 1000, top, display: 'flex', justifyContent: 'center'}}>
    <div style={{background: '#fff', borderRadius: 28, padding: '10px 24px', boxShadow: '0 12px 30px rgba(7,31,92,0.18)'}}>
      <Img src={staticFile('brand_logo.png')} style={{width: 400}} />
    </div>
  </Pop>
);

const BranchCard: React.FC<{b: (typeof BRANCHES)[number]; from: number}> = ({b, from}) => {
  const p = usePop(from, 12);
  return (
    <div style={{width: 280, height: 238, background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 10px 24px rgba(7,31,92,0.18)', border: `3px solid ${C.blue}`, transform: `scale(${p})`, opacity: Math.min(1, p * 2), fontFamily: 'Pop', display: 'flex', flexDirection: 'column'}}>
      <div style={{background: C.blue, color: '#fff', fontWeight: 800, fontSize: 30, padding: '6px 14px', lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: 8}}>
        <Icon code="1f4cd" size={30} />{b.name}
      </div>
      <div style={{background: C.yellow, color: C.navy, fontWeight: 700, fontSize: 19, padding: '4px 14px', lineHeight: 1.2, minHeight: 50, display: 'flex', alignItems: 'center'}}>{b.note}</div>
      <div style={{padding: '8px 14px', color: C.ink, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{fontWeight: 700, fontSize: 21, color: b.days.includes('Rabu') ? C.red : C.blue}}>{b.days}</div>
        <div style={{fontWeight: 800, fontSize: 25, lineHeight: 1.2}}>{b.hours}</div>
      </div>
    </div>
  );
};

const Page1: React.FC = () => (
  <AbsoluteFill>
    <Logo from={0} top={262} />
    <Pop from={6} style={{left: 0, width: 1000, top: 420, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.blue, color: '#fff', fontFamily: 'Pop', fontWeight: 900, fontSize: 56, padding: '8px 40px 8px 24px', borderRadius: 60, boxShadow: '0 12px 30px rgba(7,31,92,0.3)'}}>
        <Icon code="1f4cd" size={64} /> 9 CAWANGAN KAMI
      </div>
    </Pop>
    <div style={{position: 'absolute', left: SAFE.left, top: 540, width: SAFE.right - SAFE.left, display: 'grid', gridTemplateColumns: 'repeat(3, 280px)', gap: 20, justifyContent: 'center'}}>
      {BRANCHES.map((b, i) => <BranchCard key={b.name} b={b} from={14 + i * 4} />)}
    </div>
    <Pop from={60} style={{left: 0, width: 1000, top: 1335, display: 'flex', justifyContent: 'center'}}>
      <div style={{fontFamily: 'Pop', fontWeight: 800, fontSize: 40, color: C.navy, background: C.yellow, padding: '12px 36px', borderRadius: 50}}>Datang ke cawangan berhampiran!</div>
    </Pop>
  </AbsoluteFill>
);

const LogoRow: React.FC<{from: number; top: number; label: string; icon: string; img: string; labelBg: string; labelColor: string}> = ({from, top, label, icon, img, labelBg, labelColor}) => (
  <>
    <Pop from={from} style={{left: SAFE.left + 20, top}} dir="left">
      <div style={{display: 'flex', alignItems: 'center', gap: 14, background: labelBg, color: labelColor, fontFamily: 'Pop', fontWeight: 900, fontSize: 44, padding: '8px 30px 8px 18px', borderRadius: 50, boxShadow: '0 10px 24px rgba(7,31,92,0.25)'}}>
        <Icon code={icon} size={56} /> {label}
      </div>
    </Pop>
    <Pop from={from + 8} style={{left: SAFE.left + 20, top: top + 100}} dir="up">
      <div style={{width: 840, background: '#fff', borderRadius: 30, padding: '18px 20px', display: 'flex', justifyContent: 'center', boxShadow: '0 14px 30px rgba(7,31,92,0.18)', border: `3px solid ${C.blue}`}}>
        <Img src={staticFile(img)} style={{width: 790}} />
      </div>
    </Pop>
  </>
);

const Page2: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.03 * Math.sin(frame / 4);
  return (
    <AbsoluteFill>
      <Logo from={0} top={262} />
      <LogoRow from={8} top={440} label="PANEL DITERIMA" icon="2705" img="panel_logos.png" labelBg={C.blue} labelColor="#fff" />
      <LogoRow from={26} top={760} label="BAYARAN FLEKSIBEL" icon="1f4b3" img="pay_logos.png" labelBg={C.yellow} labelColor={C.navy} />
      <Pop from={50} style={{left: SAFE.left + 20, top: 1110}}>
        <div style={{width: 840, transform: `scale(${pulse})`, background: `linear-gradient(135deg, ${C.navy}, ${C.blue2})`, borderRadius: 34, padding: '22px 26px', color: '#fff', fontFamily: 'Pop', textAlign: 'center', border: `5px solid ${C.yellow}`, boxShadow: '0 18px 40px rgba(7,31,92,0.35)'}}>
          <div style={{fontWeight: 800, fontSize: 40, lineHeight: 1.2}}>Multifokal Tukar Warna Premium</div>
          <div style={{fontWeight: 900, fontSize: 54, color: C.yellow, lineHeight: 1.2}}>FREE UPGRADE • JIMAT RM700</div>
          <div style={{fontWeight: 700, fontSize: 32, marginTop: 6}}>Sah sehingga 31 Disember 2026</div>
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [PAGE2 - 8, PAGE2 + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Bg />
      {frame < PAGE2 + 4 ? (
        <AbsoluteFill style={{transform: `translateX(${-slide * 1080}px)`}}><Page1 /></AbsoluteFill>
      ) : null}
      {frame >= PAGE2 - 8 ? (
        <AbsoluteFill style={{transform: `translateX(${(1 - slide) * 1080}px)`}}>
          <OffsetFrame offset={PAGE2}><Page2 /></OffsetFrame>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// small helper so Page2's animations start when it slides in
const OffsetFrame: React.FC<{offset: number; children: React.ReactNode}> = ({offset, children}) => (
  <Sequence from={offset - 8} layout="none">{children}</Sequence>
);
