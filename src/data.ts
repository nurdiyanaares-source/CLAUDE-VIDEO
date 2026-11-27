// ---------------------------------------------------------------
// Transkrip (dibetulkan secara manual daripada Whisper) — masa dalam saat
// ---------------------------------------------------------------
export type Line = { start: number; end: number; text: string };

export const TRANSCRIPT: Line[] = [
  { start: 2.1, end: 4.0, text: "Nama, Harul Anwar." },
  { start: 4.56, end: 5.95, text: "Nama makcik?" },
  { start: 5.98, end: 7.04, text: "Rohana." },
  { start: 7.84, end: 12.08, text: "Saya tanya juga, macam mana acik tahu kedai Hanizah Optometry ni?" },
  { start: 13.02, end: 15.04, text: "Oh, acik lalu, nampaklah kan." },
  { start: 15.04, end: 16.86, text: "Acik tengok, Melayu punya." },
  { start: 16.86, end: 20.0, text: "Sebab tu, baguslah orang Melayu tolong bangsa Melayu." },
  { start: 20.74, end: 24.2, text: "Acik sukalah kan, daripada kita tolong bangsa lain." },
  { start: 24.2, end: 29.4, text: "Macam mana servis, penerangan yang kita sampaikan" },
  { start: 29.4, end: 34.64, text: "daripada optometris yang cek mata?" },
  { start: 35.66, end: 37.64, text: "Penerangan daripada staf," },
  { start: 37.64, end: 39.5, text: "acik puas hati tak?" },
  { start: 39.76, end: 40.96, text: "Puas hati." },
  { start: 40.96, end: 44.44, text: "Acik pun Alhamdulillah, puas hati, layanan terbaik." },
  { start: 45.48, end: 46.14, text: "Alhamdulillah." },
  { start: 46.14, end: 48.96, text: "Saya tanya juga, cermin mata baru ni okay tak?" },
  { start: 50.32, end: 50.98, text: "Okay." },
  { start: 50.98, end: 53.54, text: "Alhamdulillah, acik pun okay." },
  { start: 53.54, end: 54.64, text: "Terbaik!" },
  { start: 54.64, end: 56.5, text: "Okay, nak tanya juga," },
  { start: 56.5, end: 60.0, text: "masa akan datang, akan suggest-kan dekat kawan-kawan, keluarga ke?" },
  { start: 60.06, end: 60.64, text: "Boleh." },
  { start: 60.64, end: 64.64, text: "Yes, memang. Dah cakap dengan anak dah." },
  { start: 66.16, end: 70.28, text: "Ada apa-apa tak acik nak sampaikan dekat Hanizah Optometry?" },
  { start: 71.0, end: 72.02, text: "Abang nak cakap apa?" },
  { start: 72.66, end: 74.46, text: "Cakap terima kasih ke apa ke?" },
  { start: 74.78, end: 75.96, text: "Terima kasih banyak-banyak!" },
  { start: 76.59, end: 78.92, text: "Acik pun terima kasih banyak-banyak." },
  { start: 78.92, end: 80.56, text: "Layan acik macam layan anak dengan mak." },
  { start: 80.56, end: 82.64, text: "Alhamdulillah, terbaik!" },
];

/** Perkataan yang diwarnakan kuning dalam caption */
export const KEYWORDS = [
  "hanizah", "optometry", "puas", "hati", "terbaik", "terima", "kasih",
  "alhamdulillah", "okay", "melayu", "optometris", "boleh", "anak", "mak",
];

// ---------------------------------------------------------------
// Motion graphics (callout) — masa dalam saat
// ---------------------------------------------------------------
export type Icon = "user" | "pin" | "heart" | "eye" | "check" | "glasses" | "share" | "chat" | "star";
export type Callout = {
  start: number; end: number; title: string; sub?: string; icon: Icon; stars?: boolean;
};

export const CALLOUTS: Callout[] = [
  { start: 2.2, end: 7.5, icon: "user", title: "HARUL ANWAR & ROHANA", sub: "Pelanggan Hanizah Optometry" },
  { start: 12.9, end: 16.8, icon: "pin", title: "KENAL DARI MANA?", sub: "Lalu & nampak kedai" },
  { start: 16.9, end: 24.2, icon: "heart", title: "SOKONG BISNES MELAYU", sub: "100% Bumiputera sejak 2000" },
  { start: 25.0, end: 35.0, icon: "eye", title: "SERVIS & PENERANGAN", sub: "Pemeriksaan mata oleh optometris" },
  { start: 39.7, end: 45.4, icon: "check", title: "PUAS HATI!", sub: "Layanan terbaik", stars: true },
  { start: 46.1, end: 54.6, icon: "glasses", title: "CERMIN MATA BARU", sub: "Okay & terbaik!" },
  { start: 56.5, end: 64.6, icon: "share", title: "AKAN CADANGKAN", sub: "Kepada keluarga & kawan-kawan" },
  { start: 66.1, end: 70.4, icon: "chat", title: "PESANAN UNTUK KAMI?" },
  { start: 74.7, end: 82.9, icon: "heart", title: "TERIMA KASIH!", sub: "Layan macam anak sendiri" },
];

/** Saat untuk "punch-in" zoom kecil pada video */
export const PUNCH_INS = [39.76, 53.54, 74.78, 80.56];

// ---------------------------------------------------------------
// SFX — masa dalam saat (video utama)
// ---------------------------------------------------------------
export type Sfx = { at: number; file: string; volume?: number };
export const SFX: Sfx[] = [
  { at: 0.0, file: "whoosh.wav", volume: 0.45 },
  { at: 0.25, file: "pop.wav", volume: 0.4 },
  ...CALLOUTS.map((c) => ({ at: c.start - 0.1, file: "whoosh.wav", volume: 0.35 })),
  { at: 39.85, file: "ding.wav", volume: 0.4 },
  ...[0, 1, 2, 3, 4].map((i) => ({ at: 40.1 + i * 0.09, file: "pop.wav", volume: 0.3 })),
  { at: 53.6, file: "sparkle.wav", volume: 0.35 },
  { at: 74.85, file: "sparkle.wav", volume: 0.35 },
  { at: 80.6, file: "ding.wav", volume: 0.35 },
];

// ---------------------------------------------------------------
// Outro — cawangan & panel
// ---------------------------------------------------------------
export type Branch = { name: string; place: string; days: string; hours: string; note?: string };
export const BRANCHES: Branch[] = [
  { name: "TAMPIN", place: "Sebelah Public Bank", days: "Buka setiap hari", hours: "9.00 pg – 8.00 mlm" },
  { name: "KUALA PILAH", place: "Sebelah Kedai Emas Nurjannah", days: "Isnin – Sabtu", hours: "9.30 pg – 6.00 ptg" },
  { name: "BAHAU", place: "Berhampiran Billion Supermarket", days: "Tutup hari Rabu", hours: "10.30 pg – 7.00 mlm" },
  { name: "SENAWANG", place: "Dataran Senawang", days: "Buka setiap hari", hours: "10.00 pg – 9.00 mlm" },
  { name: "NILAI", place: "Berhampiran Pasar Malam Desa Cempaka", days: "Buka setiap hari", hours: "10.00 pg – 8.00 mlm" },
  { name: "GEMAS", place: "Sebelah Pejabat Pos", days: "Buka setiap hari", hours: "9.30 pg – 6.00 ptg" },
  { name: "ALOR GAJAH", place: "Sebelah Ayam Gepuk Pak Gembus", days: "Buka setiap hari", hours: "10.00 pg – 8.30 mlm" },
  { name: "SEMENYIH", place: "Taman Pelangi Semenyih", days: "Buka setiap hari", hours: "10.00 pg – 8.00 mlm" },
  { name: "SEREMBAN 2", place: "Ikon Seremban 2, sebelah Eco Shop", days: "Buka setiap hari", hours: "10.00 pg – 9.00 mlm" },
];

export const PANELS = [
  { name: "PMCare", color: "#D7263D" },
  { name: "Mednefits", color: "#1E7FD8" },
  { name: "MAIM Melaka", color: "#1E8A3E" },
];

export const WEBSITE = "www.hanizahoptometry.com";
