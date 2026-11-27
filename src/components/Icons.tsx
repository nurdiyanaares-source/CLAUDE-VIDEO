import React from "react";
import type { Icon } from "../data";

const P: Record<Icon, React.ReactNode> = {
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>),
  pin: (<><path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" /><circle cx="12" cy="10" r="2.6" /></>),
  heart: <path d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21z" />,
  eye: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3.2" /></>),
  check: (<><circle cx="12" cy="12" r="10" /><path d="M7 12.5l3.2 3.2L17 9" /></>),
  glasses: (<><circle cx="6.5" cy="14" r="4" /><circle cx="17.5" cy="14" r="4" /><path d="M10.5 14c1-1 2-1 3 0M2.5 13l1.5-6h2M21.5 13L20 7h-2" /></>),
  share: (<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" /></>),
  chat: <path d="M4 5h16v11H9l-5 4V5z" />,
  star: <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />,
};

export const IconSvg: React.FC<{ name: Icon; size?: number; color?: string; fill?: string; stroke?: number }> = ({
  name, size = 48, color = "#fff", fill = "none", stroke = 2.2,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round">
    {P[name]}
  </svg>
);

export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = "#1749A0" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
    <circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3.2 2" />
  </svg>
);

export const CalIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = "#1749A0" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
    <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
