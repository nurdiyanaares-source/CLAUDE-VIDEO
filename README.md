# Promo Cermin Multifokal Tukar Warna — Hanizah Optometry (Remotion)

Video 9:16 (1080x1920, 30fps, ~83 s) untuk IG Reels & TikTok.

- `src/data.ts` — EDL (potongan), transkrip dengan masa perkataan, data cawangan
- `src/ARoll.tsx` — footage asal + header baru (tutup teks lama), kapsyen, motion graphics
- `src/Promo.tsx` — segmen promosi baru (gambar pelanggan, FREE UPGRADE, JIMAT RM700, 31 Dis 2026)
- `src/Outro.tsx` — 9 cawangan + panel + cara bayaran
- `scripts/make_audio.py` — jana muzik ceria + SFX (sintetik, bebas royalti)

## Sediakan media (tidak di-commit)
```
ffmpeg -i <video asal> -t 66 -c:v libx264 -crf 17 -pix_fmt yuv420p -r 30 -c:a aac public/source.mp4
ffmpeg -i public/source.mp4 -vn -af "highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,loudnorm=I=-15:TP=-1.5:LRA=9,aresample=48000" -ac 2 public/voice.wav
python3 scripts/make_audio.py public 83.0 63.73
```
## Render
```
npm install
npx remotion render Main out/promo-multifokal.mp4 --crf=18
```
