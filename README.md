# HOYA Free Upgrade — Remotion edit (Haniza Optometry)

Re-edit of `HOYA FREE UPGRADE.mov` (1080×1920, 30fps) for TikTok & Instagram Reels.

## What this edit does
- **Trim:** everything from *"Berita baik untuk anda sepanjang bulan Ogos…"* (55.6s, the August promo) to the end is removed, with a 120ms audio fade.
- **Transcript:** `transcript/transcript.ms.srt` (corrected Malay), raw Whisper output with word timings in `transcript/raw-whisper.json`.
- **Motion graphics (new):** only in spots where the original edit's top area is empty, so nothing overlaps the burned-in captions:
  - 21.1s "3 KUNCI KESELESAAN"
  - 27.7s "HANIZA OPTOMETRY" + "Pemeriksaan mata terperinci"
  - 33.0s "ALATAN CANGGIH" + "& terkini"
  - Punch-in zooms on *pening* (9.6s), *takut* (15.1s), *selesa* (52.9s)
  - 3s outro card (blurred freeze + brand + CTA)
- **SFX:** whoosh on every cut, pop on text pop-ins, ding on ✓, buzz on ✗, cash on "jimat RM700", riser/boom into outro. All synthesized by `scripts/make_sfx.py` (royalty-free).
- **Safe zone:** combined TikTok + IG Reels — top 220px, bottom 480px, right 140px, left 60px (`src/timeline.ts`). Toggle `showSafeZone` in Studio to see the guide.

## Rebuild
```bash
npm install
# put the original video at input/raw.mov (from Google Drive)
npm run prepare-source
npm run sfx
npm run studio   # preview
npm run render   # -> out/hoya-free-upgrade-edit.mp4
```
All timings live in `src/timeline.ts`.
