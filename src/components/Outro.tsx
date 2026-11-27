import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SAFE, SAFE_CX, SAFE_W, fontFamily } from "../brand";
import { BRANCHES, PANELS, WEBSITE, type Branch } from "../data";
import { CalIcon, ClockIcon, IconSvg } from "./Icons";

export const OUTRO_FRAMES = 330;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const GRID_TOP = 532;
const CARD_H = 198;
const GAP = 12;
const CARD_W = (SAFE_W - GAP * 2) / 3;
const CARDS_IN = 78;
const PANEL_IN = 175;
const CTA_IN = 205;

const BranchCard: React.FC<{ b: Branch; i: number }> = ({ b, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - CARDS_IN - i * 4, fps, config: { damping: 14, stiffness: 170 } });
  const col = i % 3;
  const row = Math.floor(i / 3);
  return (
    <div style={{
      position: "absolute", left: SAFE.left + col * (CARD_W + GAP), top: GRID_TOP + row * (CARD_H + GAP),
      width: CARD_W, height: CARD_H, borderRadius: 20, overflow: "hidden", background: COLORS.white,
      border: `2px solid #C9D6EE`, boxShadow: "0 8px 20px rgba(23,73,160,0.16)",
      opacity: s, transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueDark})`, padding: "9px 12px", fontFamily, fontWeight: 900, fontSize: 28, color: COLORS.white, textAlign: "center", letterSpacing: 0.3 }}>
        {b.name}
      </div>
      <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ background: COLORS.yellow, borderRadius: 10, padding: "4px 8px", fontFamily, fontWeight: 700, fontSize: 17, lineHeight: 1.2, color: COLORS.ink, textAlign: "center", minHeight: 46, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {b.place}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily, fontWeight: 700, fontSize: 18, color: b.days.startsWith("Tutup") ? "#D7263D" : COLORS.ink }}>
          <CalIcon size={21} /> {b.days}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily, fontWeight: 800, fontSize: 18, color: COLORS.ink }}>
          <ClockIcon size={21} /> {b.hours}
        </div>
      </div>
    </div>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Iris reveal dari video ke outro
  const iris = interpolate(frame, [0, 16], [0, 1400], clamp);

  // Logo: besar di tengah, kemudian naik ke atas
  const logoIn = spring({ frame: frame - 6, fps, config: { damping: 11, stiffness: 120 } });
  const move = spring({ frame: frame - 58, fps, config: { damping: 16, stiffness: 110 } });
  const logoW = interpolate(move, [0, 1], [780, 400]) * interpolate(logoIn, [0, 1], [0.5, 1]);
  const logoCY = interpolate(move, [0, 1], [880, SAFE.top + 82]);
  const tagOp = spring({ frame: frame - 22, fps, config: { damping: 16 } }) * (1 - move);

  const title = spring({ frame: frame - 66, fps, config: { damping: 12 } });
  const panel = spring({ frame: frame - PANEL_IN, fps, config: { damping: 14 } });
  const cta = spring({ frame: frame - CTA_IN, fps, config: { damping: 12 } });
  const shine = interpolate((frame - CTA_IN) % 60, [0, 30], [-120, 120], clamp);

  return (
    <AbsoluteFill style={{ clipPath: `circle(${iris}px at 50% 46%)` }}>
      {/* Latar */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #EAF1FC 100%)" }} />
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", border: `70px solid ${COLORS.blue}`, left: -560, top: -520, transform: `rotate(${frame * 0.2}deg)` }} />
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", border: `22px solid ${COLORS.yellow}`, left: -470, top: -440 }} />
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", border: `70px solid ${COLORS.blue}`, right: -560, bottom: -560 }} />
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", border: `22px solid ${COLORS.yellow}`, right: -480, bottom: -470 }} />

      {/* Logo */}
      <Img src={staticFile("logo.png")} style={{
        position: "absolute", width: logoW, left: SAFE_CX - logoW / 2, top: logoCY - (logoW * 553) / 1831 / 2, opacity: logoIn,
      }} />
      <div style={{ position: "absolute", top: 1060, left: SAFE_CX, transform: `translateX(-50%) translateY(${(1 - tagOp) * 20}px)`, opacity: tagOp, textAlign: "center", width: 820 }}>
        <div style={{ fontFamily, fontWeight: 800, fontStyle: "italic", fontSize: 46, color: COLORS.blueDark }}>Your Professional Eye Care</div>
        <div style={{ fontFamily, fontWeight: 700, fontSize: 32, color: COLORS.blue, marginTop: 10, letterSpacing: 4 }}>SEJAK 2000</div>
      </div>

      {/* Tajuk cawangan */}
      <div style={{
        position: "absolute", top: SAFE.top + 182, left: SAFE_CX, transform: `translateX(-50%) scale(${title})`, opacity: title,
        display: "flex", alignItems: "center", gap: 14, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueDark})`,
        padding: "10px 34px 10px 12px", borderRadius: 999, whiteSpace: "nowrap", boxShadow: "0 10px 24px rgba(23,73,160,0.3)",
      }}>
        <div style={{ width: 62, height: 62, borderRadius: 999, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconSvg name="pin" size={38} color={COLORS.blueDark} stroke={2.6} />
        </div>
        <span style={{ fontFamily, fontWeight: 900, fontSize: 48, color: COLORS.white }}>9 CAWANGAN KAMI</span>
      </div>

      {BRANCHES.map((b, i) => <BranchCard key={b.name} b={b} i={i} />)}

      {/* Panel */}
      <div style={{
        position: "absolute", top: GRID_TOP + 3 * CARD_H + 2 * GAP + 16, left: SAFE.left, width: SAFE_W, height: 112,
        background: COLORS.white, borderRadius: 24, border: `3px solid ${COLORS.blue}`, boxShadow: "0 8px 20px rgba(23,73,160,0.18)",
        display: "flex", alignItems: "center", overflow: "hidden",
        opacity: panel, transform: `translateX(${interpolate(panel, [0, 1], [-200, 0])}px)`,
      }}>
        <div style={{ background: COLORS.blue, height: "100%", width: 250, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
          <IconSvg name="check" size={46} color={COLORS.yellow} stroke={2.6} />
          <div style={{ fontFamily, fontWeight: 900, fontSize: 26, color: COLORS.white, lineHeight: 1.1 }}>PANEL<br />DITERIMA</div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "space-around", alignItems: "center", padding: "0 10px" }}>
          {PANELS.map((p, i) => {
            const s = spring({ frame: frame - PANEL_IN - 6 - i * 5, fps, config: { damping: 9, stiffness: 220 } });
            return (
              <div key={p.name} style={{ fontFamily, fontWeight: 900, fontSize: p.name.length > 9 ? 28 : 34, color: p.color, transform: `scale(${s})`, whiteSpace: "nowrap" }}>
                {p.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: "absolute", top: GRID_TOP + 3 * CARD_H + 2 * GAP + 142, left: SAFE.left, width: SAFE_W, height: 112,
        background: COLORS.yellow, borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
        opacity: cta, transform: `scale(${interpolate(cta, [0, 1], [0.7, 1])})`,
      }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 80, left: `${50 + shine / 2.4}%`, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)", transform: "skewX(-20deg)" }} />
        <div style={{ fontFamily, fontWeight: 800, fontSize: 28, color: COLORS.blueDark }}>Jom ke cawangan berdekatan!</div>
        <div style={{ fontFamily, fontWeight: 900, fontSize: 40, color: COLORS.blueDark }}>{WEBSITE}</div>
      </div>

      {/* SFX outro */}
      <Sequence from={0}><Audio src={staticFile("sfx/swoosh.wav")} volume={0.5} /></Sequence>
      <Sequence from={8}><Audio src={staticFile("sfx/impact.wav")} volume={0.5} /></Sequence>
      <Sequence from={14}><Audio src={staticFile("sfx/sparkle.wav")} volume={0.3} /></Sequence>
      <Sequence from={58}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} /></Sequence>
      {BRANCHES.map((_, i) => (
        <Sequence key={i} from={CARDS_IN + i * 4}><Audio src={staticFile("sfx/click.wav")} volume={0.25} /></Sequence>
      ))}
      <Sequence from={PANEL_IN}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} /></Sequence>
      {PANELS.map((_, i) => (
        <Sequence key={i} from={PANEL_IN + 6 + i * 5}><Audio src={staticFile("sfx/pop.wav")} volume={0.3} /></Sequence>
      ))}
      <Sequence from={CTA_IN}><Audio src={staticFile("sfx/ding.wav")} volume={0.4} /></Sequence>
    </AbsoluteFill>
  );
};
