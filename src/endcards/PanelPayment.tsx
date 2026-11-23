import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {FONT} from '../fonts';
import {BLUE, YELLOW} from '../Badge';
import {PANELS, PAYMENTS} from './data';
import {BrandBg, NAVY, rise, Safe, useSpring} from './common';

const LogoRow: React.FC<{label: string; logos: string[]; delay: number; accent: 'blue' | 'yellow'}> = ({label, logos, delay, accent}) => {
  const s = useSpring(delay);
  const logoS = logos.map((_, i) => useSpring(delay + 8 + i * 5, 230)); // eslint-disable-line react-hooks/rules-of-hooks
  return (
    <div
      style={{
        ...rise(s),
        width: '100%',
        background: 'white',
        borderRadius: 28,
        border: '3px solid #c9d6f7',
        boxShadow: '0 12px 28px rgba(15,42,120,0.16)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: accent === 'blue' ? `linear-gradient(90deg, ${NAVY}, ${BLUE})` : YELLOW,
          color: accent === 'blue' ? 'white' : NAVY,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 38,
          padding: '16px 24px',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '28px 10px'}}>
        {logos.map((l, i) => (
          <Img key={l} src={staticFile(l)} style={{height: 96, width: 'auto', transform: `scale(${logoS[i]})`}} />
        ))}
      </div>
    </div>
  );
};

export const PanelPayment: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = useSpring(2, 160);
  const cta = useSpring(44, 200);
  return (
    <>
      <BrandBg />
      <Safe gap={44}>
        <div
          style={{
            ...rise(logo),
            background: 'white',
            borderRadius: 30,
            padding: '16px 30px',
            boxShadow: '0 14px 34px rgba(15,42,120,0.2)',
          }}
        >
          <Img src={staticFile('img/logo.png')} style={{width: 700, height: 'auto', display: 'block'}} />
        </div>
        <LogoRow label="Panel Diterima di Hanizah Optometry" logos={PANELS} delay={14} accent="blue" />
        <LogoRow label="Pilihan Pembayaran Yang Fleksibel" logos={PAYMENTS} delay={26} accent="yellow" />
        <div
          style={{
            ...rise(cta),
            marginTop: 10,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 48,
            color: NAVY,
            background: YELLOW,
            padding: '22px 46px',
            borderRadius: 999,
            boxShadow: '0 12px 30px rgba(15,42,120,0.3)',
            transform: `${rise(cta).transform} scale(${1 + 0.035 * Math.sin(frame / 4)})`,
          }}
        >
          TEMPAH PEMERIKSAAN MATA
        </div>
      </Safe>
    </>
  );
};
