export const FPS = 30;

// ---- Edit decision list (source frames @30fps) ----
// Part A : source 0 -> 1633   ("Dah bertahun..." -> "Berita baik untuk anda")
// cut    : source 1633 -> 1664 ("sepanjang Oktober ini" — tarikh lama dibuang)
// Part B : source 1664 -> 1943 ("dengan pembelian ... jimat sehingga RM700")
// dibuang: source 1943 -> end  ("Khas untuk 30 orang terawal..." + outro lama)
export const A_END = 1633;
export const B_SRC_START = 1664;
export const B_SRC_END = 1943;
export const B_LEN = B_SRC_END - B_SRC_START; // 279
export const AROLL_END = A_END + B_LEN; // 1912
export const PROMO_LEN = 270; // 9 s
export const OUTRO_LEN = 300; // 10 s
export const PROMO_START = AROLL_END;
export const OUTRO_START = PROMO_START + PROMO_LEN;
export const TOTAL = OUTRO_START + OUTRO_LEN; // 2482

const CUT_S = (B_SRC_START - A_END) / FPS;
/** source seconds -> composition frame */
export const sf = (t: number) => Math.round((t < A_END / FPS ? t : t - CUT_S) * FPS);

// ---- Transcript (Whisper large-v3 + medium, disemak manual) ----
// [word, start(s, source), end(s, source)]
type W = [string, number, number];
export const WORDS: W[] = [
  ['Dah', 0.0, 0.48], ['bertahun', 0.48, 0.9], ['pakai', 0.9, 1.1], ['multifokal,', 1.1, 1.84],
  ['tapi', 1.88, 2.38], ['masih', 2.38, 2.66], ['belum', 2.66, 2.86], ['jumpa', 2.86, 3.3],
  ['yang', 3.3, 3.38], ['betul-betul', 3.38, 3.74], ['selesa?', 3.74, 4.12],
  ['Kerja', 4.32, 4.6], ['depan', 4.6, 4.98], ['komputer,', 4.98, 5.38], ['meeting,', 5.56, 5.78],
  ['tengok', 6.14, 7.14], ['phone,', 7.14, 7.38], ['dokumen,', 7.58, 8.36],
  ['lepas', 8.6, 9.28], ['tu', 9.28, 9.56], ['nak', 9.56, 9.82], ['tengok', 9.82, 10.1],
  ['jauh', 10.1, 10.4], ['pula?', 10.4, 10.64],
  ['Kalau', 10.92, 11.24], ['cermin', 11.24, 11.82], ['multifokal', 11.82, 12.44],
  ['adalah', 12.44, 12.76], ['sebahagian', 12.76, 13.54], ['dari', 13.54, 13.72],
  ['rutin', 13.72, 14.12], ['harian', 14.12, 14.44], ['anda,', 14.44, 14.74],
  ['kualiti', 15.02, 15.42], ['dan', 15.42, 15.78], ['keselesaan', 15.78, 16.58],
  ['cermin', 16.58, 17.0], ['sangat', 17.0, 17.48], ['penting.', 17.48, 18.14],
  ['Tapi,', 18.22, 18.52], ['keselesaan', 18.7, 19.58], ['multifokal', 19.58, 20.28],
  ['bukan', 20.28, 20.6], ['terletak', 20.6, 21.08], ['pada', 21.08, 21.26],
  ['cermin', 21.26, 21.72], ['sahaja.', 21.72, 22.16],
  ['Ia', 22.32, 22.72], ['bergantung', 22.72, 23.34], ['kepada', 23.34, 23.54],
  ['pemeriksaan', 23.54, 24.48], ['mata,', 24.48, 24.72], ['ukuran', 24.92, 25.24],
  ['yang', 25.24, 25.48], ['tepat', 25.48, 25.92], ['dan', 25.92, 26.14],
  ['pemilihan', 26.14, 26.78], ['bingkai', 26.78, 27.24], ['yang', 27.24, 27.46], ['sesuai.', 27.46, 28.16],
  ['Di', 28.16, 28.62], ['Hanizah', 28.62, 29.08], ['Optometry,', 29.08, 29.64],
  ['kami', 29.78, 30.16], ['melakukan', 30.16, 30.8], ['pemeriksaan', 30.8, 31.7],
  ['mata', 31.7, 31.92], ['secara', 31.92, 32.46], ['terperinci', 32.46, 33.18],
  ['menggunakan', 33.18, 33.92], ['peralatan', 33.92, 34.46], ['terkini.', 34.46, 35.18],
  ['Kami', 35.36, 36.04], ['juga', 36.04, 36.24], ['mengambil', 36.24, 37.4],
  ['ukuran', 37.4, 37.88], ['khas', 37.88, 38.3], ['untuk', 38.3, 38.74],
  ['pemakai', 38.74, 39.28], ['multifokal', 39.28, 40.04], ['dan', 40.04, 40.26],
  ['membantu', 40.26, 40.88], ['memilih', 40.88, 41.34], ['bingkai,', 41.34, 41.8],
  ['bukan', 41.82, 42.36], ['sekadar', 42.36, 42.94], ['untuk', 42.94, 43.22], ['fesyen.', 43.22, 43.7],
  ['Matlamat', 43.94, 44.84], ['kami', 44.84, 45.04], ['adalah', 45.04, 45.58],
  ['membantu', 45.58, 46.32], ['anda', 46.32, 46.56], ['mendapatkan', 46.56, 47.54],
  ['penglihatan', 47.54, 48.34], ['jauh', 48.34, 48.74], ['dan', 48.74, 48.9],
  ['dekat', 48.9, 49.26], ['dengan', 49.26, 49.56], ['lebih', 49.56, 49.82], ['selesa,', 49.82, 50.28],
  ['serta', 50.42, 50.92], ['lebih', 50.92, 51.24], ['mudah', 51.24, 51.72],
  ['menyesuaikan', 51.72, 52.26], ['diri.', 52.26, 52.74],
  ['Berita', 52.92, 53.4], ['baik', 53.4, 53.68], ['untuk', 53.68, 54.0], ['anda!', 54.0, 54.43],
  // --- selepas potongan ---
  ['Dengan', 55.86, 56.28], ['pembelian', 56.28, 57.02], ['cermin', 57.02, 57.66],
  ['multifokal', 57.66, 58.48], ['premium,', 58.48, 59.1],
  ['kami', 59.32, 59.56], ['nak', 59.56, 59.74], ['bagi', 59.74, 60.3],
  ['free', 60.3, 60.5], ['upgrade', 60.5, 60.96], ['cermin', 60.96, 61.66],
  ['auto', 61.66, 62.04], ['gelap,', 62.04, 62.44], ['jimat', 62.44, 62.86],
  ['sehingga', 62.86, 63.5], ['RM700!', 63.5, 64.48],
];

export const KEYWORDS = new Set([
  'MULTIFOKAL', 'SELESA', 'KOMPUTER', 'MEETING', 'PHONE', 'DOKUMEN', 'JAUH', 'KUALITI',
  'KESELESAAN', 'PENTING', 'PEMERIKSAAN', 'UKURAN', 'TEPAT', 'BINGKAI', 'SESUAI', 'HANIZAH',
  'OPTOMETRY', 'TERPERINCI', 'TERKINI', 'KHAS', 'FESYEN', 'DEKAT', 'MUDAH', 'BERITA', 'BAIK',
  'PREMIUM', 'FREE', 'UPGRADE', 'AUTO', 'GELAP', 'JIMAT', 'RM700', 'BUKAN', 'SAHAJA',
]);

export type Chunk = {from: number; to: number; words: {w: string; f: number}[]};

/** Group words into 2–3 word caption chunks (<= 18 chars), break on punctuation/pauses. */
export const buildChunks = (): Chunk[] => {
  const chunks: Chunk[] = [];
  let cur: {w: string; s: number; e: number}[] = [];
  const flush = () => {
    if (!cur.length) return;
    chunks.push({
      from: sf(cur[0].s),
      to: sf(cur[cur.length - 1].e),
      words: cur.map((c) => ({w: c.w, f: sf(c.s)})),
    });
    cur = [];
  };
  WORDS.forEach(([w, s, e], i) => {
    const len = cur.map((c) => c.w).join(' ').length + w.length + 1;
    if (cur.length && (len > 18 || cur.length >= 3)) flush();
    cur.push({w, s, e});
    const next = WORDS[i + 1];
    const punct = /[,.?!]$/.test(w);
    if (punct || !next || next[1] - e > 0.25) flush();
  });
  // extend each chunk until the next starts (max +0.5s) so captions don't flicker
  for (let i = 0; i < chunks.length; i++) {
    const nextFrom = chunks[i + 1]?.from ?? chunks[i].to + 15;
    chunks[i].to = Math.min(nextFrom, chunks[i].to + 15);
  }
  return chunks;
};

export const BRANCHES = [
  {name: 'TAMPIN', note: 'sebelah Public Bank', days: 'Setiap hari', hours: '9.00 pagi – 8.00 malam'},
  {name: 'KUALA PILAH', note: 'sebelah kedai emas Nurjannah', days: 'Isnin – Sabtu', hours: '9.30 pagi – 6.00 petang'},
  {name: 'BAHAU', note: 'berdekatan pasaraya Bilion', days: 'Setiap hari (Rabu tutup)', hours: '10.30 pagi – 7.00 malam'},
  {name: 'SENAWANG', note: 'Dataran Senawang', days: 'Setiap hari', hours: '10.00 pagi – 9.00 malam'},
  {name: 'NILAI', note: 'Tapak pasar malam Desa Cempaka', days: 'Setiap hari', hours: '10.00 pagi – 8.00 malam'},
  {name: 'GEMAS', note: 'sebelah pejabat pos', days: 'Setiap hari', hours: '9.30 pagi – 6.00 petang'},
  {name: 'ALOR GAJAH', note: 'sebelah Ayam Gepuk Pak Gembus', days: 'Setiap hari', hours: '10.00 pagi – 8.30 malam'},
  {name: 'SEMENYIH', note: 'Taman Pelangi Semenyih', days: 'Setiap hari', hours: '10.00 pagi – 8.00 malam'},
  {name: 'SEREMBAN 2', note: 'Ikon Seremban 2, sebaris Eco Shop & DIY', days: 'Setiap hari', hours: '10.00 pagi – 9.00 malam'},
];
