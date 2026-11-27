import { loadFont } from "@remotion/google-fonts/Montserrat";

export const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const COLORS = {
  blue: "#1749A0",
  blueDark: "#0E2F6B",
  yellow: "#FFD21F",
  white: "#FFFFFF",
  ink: "#0B1B3A",
};

/**
 * Safe zone gabungan TikTok + Instagram Reels (1080x1920).
 * Atas: bar "Following / For You" & ikon kamera Reels.
 * Bawah: caption, nama akaun, muzik & butang.
 * Kanan: butang like / komen / share.
 */
export const SAFE = { top: 250, bottom: 480, left: 70, right: 160 };
export const SAFE_W = W - SAFE.left - SAFE.right; // 850
export const SAFE_CX = SAFE.left + SAFE_W / 2; // pusat mendatar kawasan selamat

export const sec = (s: number) => Math.round(s * FPS);
