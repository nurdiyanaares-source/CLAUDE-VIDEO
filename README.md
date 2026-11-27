# Testimoni Pelanggan — Hanizah Optometry (Remotion)

Video testimoni 9:16 (1080x1920, 30fps) dengan caption berjalan, motion graphics, SFX dan outro cawangan & panel.

## Struktur
- `src/data.ts` — **edit di sini**: transkrip, callout motion graphics, masa SFX, senarai cawangan & panel
- `src/brand.ts` — warna, font, dan **safe zone TikTok + IG Reels** (atas 250px, bawah 480px, kiri 70px, kanan 160px)
- `src/components/` — Captions, CalloutCard, Hook, LogoBadge, Outro, SafeZoneGuide
- `scripts/make_sfx.py` — jana semula SFX (whoosh, pop, ding, sparkle, click, impact, swoosh)
- `transcript.srt` — transkrip penuh

## Guna
`public/source.mp4` tidak disimpan dalam git (terlalu besar). Letak video asal (H.264) di situ dahulu.

```bash
npm install
npm run studio   # preview; set prop showSafeZone=true untuk lihat safe zone
npm run render   # output: out/testimoni.mp4
```
