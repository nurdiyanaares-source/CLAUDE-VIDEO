import React from 'react';
import {Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {
  navy: '#071F5C',
  blue: '#0B3A9E',
  blue2: '#1C5FE6',
  sky: '#E8F0FF',
  yellow: '#FFD21F',
  white: '#FFFFFF',
  ink: '#0E1A33',
  red: '#E5312B',
  green: '#1FB35A',
};

// IG Reels / TikTok safe zone (1080x1920): keep important content inside this box
export const SAFE = {top: 250, bottom: 1500, left: 60, right: 940};
export const SAFE_CX = (SAFE.left + SAFE.right) / 2; // 500

export const FontFaces: React.FC = () => (
  <style>{`
    @font-face{font-family:'Pop';font-weight:500;src:url(${staticFile('fonts/poppins-latin-500-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Pop';font-weight:700;src:url(${staticFile('fonts/poppins-latin-700-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Pop';font-weight:800;src:url(${staticFile('fonts/poppins-latin-800-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Pop';font-weight:900;src:url(${staticFile('fonts/poppins-latin-900-normal.woff2')}) format('woff2');}
    @font-face{font-family:'Pop';font-weight:800;font-style:italic;src:url(${staticFile('fonts/poppins-latin-800-italic.woff2')}) format('woff2');}
  `}</style>
);

export const usePop = (from: number, damping = 11) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - from, fps, config: {damping, stiffness: 170, mass: 0.7}});
};

/** element visible between from..to with pop-in and quick shrink-out */
export const Pop: React.FC<{
  from: number;
  to?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
  rotate?: number;
  dir?: 'scale' | 'up' | 'left' | 'right';
}> = ({from, to = 1e9, style, children, rotate = 0, dir = 'scale'}) => {
  const frame = useCurrentFrame();
  const p = usePop(from);
  if (frame < from || frame > to + 6) return null;
  const out = interpolate(frame, [to, to + 6], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
  const s = dir === 'scale' ? p * out : out;
  let tx = 0, ty = 0;
  if (dir === 'up') ty = (1 - p) * 120;
  if (dir === 'left') tx = (1 - p) * -500;
  if (dir === 'right') tx = (1 - p) * 500;
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${tx}px, ${ty}px) scale(${Math.max(s, 0)}) rotate(${rotate * (2 - p)}deg)`,
        opacity: Math.min(1, p * 2) * out,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Icon: React.FC<{code: string; size: number; style?: React.CSSProperties}> = ({code, size, style}) => (
  <Img src={staticFile(`icons/${code}.svg`)} style={{width: size, height: size, ...style}} />
);

/** rounded pill with icon + text */
export const Chip: React.FC<{
  icon?: string;
  text: React.ReactNode;
  bg?: string;
  color?: string;
  size?: number;
  border?: string;
}> = ({icon, text, bg = C.white, color = C.navy, size = 46, border}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.3,
      background: bg,
      color,
      fontFamily: 'Pop',
      fontWeight: 800,
      fontSize: size,
      padding: `${size * 0.28}px ${size * 0.55}px`,
      borderRadius: size,
      boxShadow: '0 14px 34px rgba(0,0,0,0.30)',
      border: border ?? 'none',
      whiteSpace: 'nowrap',
      lineHeight: 1.1,
    }}
  >
    {icon ? <Icon code={icon} size={size * 1.25} /> : null}
    <span>{text}</span>
  </div>
);

export const Y: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: C.yellow}}>{children}</span>;
export const B: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: C.blue2}}>{children}</span>;
