import {staticFile} from 'remotion';

export const FONT = 'Montserrat, sans-serif';

// Register via CSS @font-face (no network), served locally from public/fonts.
if (typeof document !== 'undefined' && !document.getElementById('mont-fonts')) {
  const style = document.createElement('style');
  style.id = 'mont-fonts';
  style.textContent = [700, 800, 900]
    .map(
      (w) =>
        `@font-face{font-family:'Montserrat';font-weight:${w};font-display:block;src:url('${staticFile(
          `fonts/montserrat-latin-${w}-normal.woff2`,
        )}') format('woff2');}`,
    )
    .join('\n');
  document.head.appendChild(style);
  // Text first appears at ~21s, long after these local fonts have loaded.
  void document.fonts.load('900 40px Montserrat');
}
