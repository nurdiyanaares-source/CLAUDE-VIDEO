import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {FONT} from '../fonts';
import {BLUE, YELLOW} from '../Badge';
import {LENS_COLOURS} from './data';
import {BrandBg, NAVY, rise, Safe, useSpring} from './common';

export const LENS_POP_FRAMES = [24, 32, 40, 48];

export const UpgradeColours: React.FC = () => {
  const frame = useCurrentFrame();
  const h1 = useSpring(2, 200);
  const h2 = useSpring(8);
  const h3 = useSpring(14);
  const foot = useSpring(60);
  const lensS = LENS_POP_FRAMES.map((d) => useSpring(d, 220)); // eslint-disable-line react-hooks/rules-of-hooks

  return (
    <>
      <BrandBg />
      <Safe gap={22}>
        <div
          style={{
            ...rise(h1),
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 86,
            color: NAVY,
            background: YELLOW,
            padding: '6px 40px 10px',
            borderRadius: 24,
            transform: `${rise(h1).transform} rotate(-2deg)`,
            boxShadow: '0 12px 30px rgba(15,42,120,0.25)',
          }}
        >
          FREE UPGRADE
        </div>
        <div style={{...rise(h2), fontFamily: FONT, fontWeight: 900, fontSize: 64, color: BLUE, lineHeight: 1}}>KANTA AUTO GELAP</div>
        <div
          style={{
            ...rise(h3),
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 38,
            color: 'white',
            background: BLUE,
            padding: '10px 30px',
            borderRadius: 999,
          }}
        >
          4 warna pilihan
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 70, rowGap: 26, marginTop: 14}}>
          {LENS_COLOURS.map((l, i) => {
            const s = lensS[i];
            const bob = Math.sin((frame + i * 9) / 14) * 5;
            return (
              <div key={l.name} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, ...rise(s, 80)}}>
                <div
                  style={{
                    width: 290,
                    height: 290,
                    borderRadius: '50%',
                    background: 'white',
                    padding: 14,
                    boxShadow: '0 16px 36px rgba(15,42,120,0.25)',
                    transform: `translateY(${bob}px) rotate(${(1 - s) * -40}deg)`,
                  }}
                >
                  <Img src={staticFile(l.img)} style={{width: '100%', height: '100%'}} />
                </div>
                <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 36, color: NAVY}}>{l.name}</div>
              </div>
            );
          })}
        </div>

        <div style={{...rise(foot), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 6}}>
          <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 32, color: NAVY}}>Dengan pembelian kanta multifokal premium</div>
          <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 24, color: '#5b6b95'}}>*Tertakluk kepada terma &amp; syarat</div>
        </div>
      </Safe>
    </>
  );
};
