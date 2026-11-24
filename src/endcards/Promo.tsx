import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {FONT} from '../fonts';
import {BLUE, YELLOW} from '../Badge';
import {BrandBg, IconCal, NAVY, rise, Safe, useSpring} from './common';

export const PROMO_BEATS = {jom: 2, title: 8, team: 18, beach: 28, sub: 40, deadline: 56};

const Photo: React.FC<{src: string; w: number; h: number; rot: number; s: number; zoomFrom: number; pos?: string}> = ({
  src,
  w,
  h,
  rot,
  s,
  zoomFrom,
  pos = 'center',
}) => {
  const frame = useCurrentFrame();
  const kb = interpolate(frame, [zoomFrom, zoomFrom + 180], [1.12, 1.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        width: w,
        height: h,
        background: 'white',
        padding: 12,
        borderRadius: 22,
        boxShadow: '0 20px 44px rgba(15,42,120,0.35)',
        opacity: Math.min(1, Math.max(0, s)),
        transform: `rotate(${rot + (1 - s) * rot * 3}deg) scale(${0.6 + 0.4 * s})`,
      }}
    >
      <div style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: 14}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${kb})`}} />
      </div>
    </div>
  );
};

export const Promo: React.FC = () => {
  const frame = useCurrentFrame();
  const b = PROMO_BEATS;
  const jom = useSpring(b.jom, 200);
  const title = useSpring(b.title);
  const team = useSpring(b.team, 150);
  const beach = useSpring(b.beach, 150);
  const sub = useSpring(b.sub);
  const dl = useSpring(b.deadline, 220);
  const pulse = frame > b.deadline + 10 ? 1 + 0.04 * Math.sin((frame - b.deadline) / 3.5) : 1;

  return (
    <>
      <BrandBg />
      <Safe gap={24}>
        <div
          style={{
            ...rise(jom),
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 46,
            color: NAVY,
            background: YELLOW,
            padding: '8px 34px',
            borderRadius: 999,
            transform: `${rise(jom).transform} rotate(-2deg)`,
          }}
        >
          JOM DAPATKAN!
        </div>
        <div style={{...rise(title), fontFamily: FONT, fontWeight: 900, fontSize: 64, color: BLUE, textAlign: 'center', lineHeight: 1.02}}>
          PROMOSI MULTIFOKAL
          <br />
          <span style={{color: NAVY, background: 'linear-gradient(transparent 58%, #ffe11a 58%)', padding: '0 10px'}}>TUKAR WARNA</span>
        </div>

        <div style={{position: 'relative', width: 800, height: 620}}>
          <div style={{position: 'absolute', left: 10, top: 14}}>
            <Photo src="img/promo-team.jpg" w={580} h={435} rot={-4} s={team} zoomFrom={b.team} />
          </div>
          <div style={{position: 'absolute', right: 14, top: 170}}>
            <Photo src="img/promo-beach.jpg" w={310} h={414} rot={5} s={beach} zoomFrom={b.beach} pos="50% 45%" />
          </div>
        </div>

        <div style={{...rise(sub), fontFamily: FONT, fontWeight: 800, fontSize: 36, color: NAVY, textAlign: 'center', lineHeight: 1.25}}>
          di cawangan <span style={{color: BLUE}}>Hanizah Optometry</span>
          <br />
          yang terdekat dengan anda
        </div>

        <div
          style={{
            opacity: Math.min(1, Math.max(0, dl)),
            transform: `scale(${(0.5 + 0.5 * dl) * pulse}) rotate(${(1 - dl) * -8}deg)`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: '#e0212f',
            border: `5px solid ${YELLOW}`,
            padding: '14px 30px',
            borderRadius: 999,
            boxShadow: '0 14px 34px rgba(224,33,47,0.4)',
          }}
        >
          <IconCal c="white" s={38} />
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 35, color: 'white', whiteSpace: 'nowrap'}}>
            SEHINGGA <span style={{color: YELLOW}}>31 DISEMBER</span> SAHAJA!
          </div>
        </div>
      </Safe>
    </>
  );
};
