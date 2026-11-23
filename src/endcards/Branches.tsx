import React from 'react';
import {FONT} from '../fonts';
import {BLUE, YELLOW} from '../Badge';
import {BRANCHES} from './data';
import {BrandBg, IconCal, IconClock, IconPin, NAVY, rise, Safe, useSpring} from './common';

export const CARD_POP_FRAMES = BRANCHES.map((_, i) => 14 + i * 5);

const Card: React.FC<{i: number}> = ({i}) => {
  const b = BRANCHES[i];
  const s = useSpring(CARD_POP_FRAMES[i], 210);
  return (
    <div
      style={{
        ...rise(s, 60),
        background: 'white',
        borderRadius: 22,
        border: `3px solid #c9d6f7`,
        boxShadow: '0 10px 24px rgba(15,42,120,0.16)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{background: `linear-gradient(90deg, ${NAVY}, ${BLUE})`, padding: '14px 14px 12px'}}>
        <div style={{fontFamily: FONT, fontWeight: 900, fontSize: 31, color: 'white', lineHeight: 1, whiteSpace: 'nowrap', letterSpacing: -0.3}}>{b.name}</div>
      </div>
      <div
        style={{
          margin: '10px 10px 0',
          background: YELLOW,
          borderRadius: 12,
          padding: '6px 10px',
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 23,
          color: NAVY,
          lineHeight: 1.15,
          minHeight: 58,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {b.spot}
      </div>
      <div style={{padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 12}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 8}}>
          <IconCal s={30} />
          <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 28, color: NAVY, lineHeight: 1.1}}>
            {b.days}
            {b.closed ? <div style={{color: '#e0212f', fontSize: 25}}>({b.closed})</div> : null}
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 8}}>
          <IconClock s={30} />
          <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 28, color: NAVY, lineHeight: 1.15}}>{b.hours.replace(' – ', ' –\n')
            .split('\n')
            .map((l) => (
              <div key={l}>{l}</div>
            ))}</div>
        </div>
      </div>
    </div>
  );
};

export const Branches: React.FC = () => {
  const head = useSpring(2, 200);
  return (
    <>
      <BrandBg />
      <Safe gap={30}>
        <div
          style={{
            ...rise(head),
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: `linear-gradient(90deg, ${NAVY}, ${BLUE})`,
            padding: '12px 36px 12px 18px',
            borderRadius: 999,
            boxShadow: '0 12px 28px rgba(15,42,120,0.3)',
          }}
        >
          <div style={{width: 70, height: 70, borderRadius: '50%', background: YELLOW, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconPin s={46} />
          </div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontStyle: 'italic', fontSize: 60, color: 'white'}}>Cawangan Kami (9)</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, width: '100%'}}>
          {BRANCHES.map((_, i) => (
            <Card key={i} i={i} />
          ))}
        </div>
      </Safe>
    </>
  );
};
