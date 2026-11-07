// Captions — the EX15 caption panel in raea (user 2026-11-05: "its perfect already so stick with it"), with the user's
// 2026-11-07 fixes: lines are CENTRED (each on its own width; never justified, words never move once placed), and the
// dark panel grows outward from the centre WITH the words — its edges follow each word's own fade-in, so it can't lag.
// Each word fades in and rises 10 px on its spoken frame. Durations are in seconds (fps-independent).
// Data: tools/raea/caps_from_timeline.py (word widths measured in Inter Display Medium 46 px).
//   <Captions blocks={caps} frame={useCurrentFrame()} fps={60} />
import { Easing, interpolate } from "raea";

export type CapBlock = { in: number; out: number; words: { w: string; f: number; width: number }[] };
const W = 1080, SIZE = 46, MAXW = 820, BOTTOM = 1430, PADX = 30, PADY = 20;
const LINE_H = Math.round(SIZE * 1.34), SP = SIZE * 0.27, INK = "#EDE7DC", PANEL = "rgba(14,14,16,0.82)";
const ease = Easing.bezier(0.33, 0, 0.2, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const WORD_IN = 0.23, FADE_OUT = 0.13, PANEL_IN = 0.17;          // seconds

function layout(b: CapBlock) {
  const lines: number[][] = [[]], lw = [0];
  b.words.forEach((wd, i) => {
    let n = lines.length - 1, add = (lines[n].length ? SP : 0) + wd.width;
    if (lines[n].length && lw[n] + add > MAXW) { lines.push([]); lw.push(0); n++; add = wd.width; }
    lines[n].push(i); lw[n] += add;
  });
  const bh = lines.length * LINE_H + 2 * PADY - (LINE_H - SIZE * 1.12), top = BOTTOM - bh;
  const pos: { x: number; y: number; r: number }[] = [];
  lines.forEach((ln, r) => {
    let x = W / 2 - lw[r] / 2;                                     // centred on the line's own width
    ln.forEach((i) => { pos[i] = { x, y: top + PADY + r * LINE_H, r }; x += b.words[i].width + SP; });
  });
  return { top, pos, rows: lines.length };
}

export function Captions({ blocks, frame, fps = 30 }: { blocks: CapBlock[]; frame: number; fps?: number }) {
  const b = blocks.find((c) => frame >= c.in && frame < c.out);
  if (!b) return null;
  const { top, pos } = layout(b);
  const s = (sec: number) => Math.max(1, Math.round(sec * fps));
  const appear = (i: number) => interpolate(frame, [b.words[i].f, b.words[i].f + s(WORD_IN)], [0, 1], { ...clamp, easing: ease });
  // the panel: centred; its half-width reaches each word as that word appears, its height each row as its first word does
  let half = 0, rowsShown = 0;
  b.words.forEach((wd, i) => {
    const t = frame >= wd.f ? appear(i) : 0;
    if (t <= 0) return;
    const reach = Math.max(Math.abs(pos[i].x - W / 2), Math.abs(pos[i].x + wd.width - W / 2));
    half = Math.max(half, reach * Math.min(1, 0.6 + 0.4 * t));      // grows with the word, never behind it
    rowsShown = Math.max(rowsShown, pos[i].r + Math.min(1, 0.5 + t));
  });
  const first = b.words[0].width * 0.6;                            // the panel opens to the first word even before it lands
  half = Math.max(half, first / 2);
  const pw = 2 * (half + PADX), ph = Math.max(1, rowsShown) * LINE_H + 2 * PADY - (LINE_H - SIZE * 1.12);
  const fadeOut = interpolate(frame, [b.out - s(FADE_OUT), b.out], [1, 0], clamp);
  const panelIn = interpolate(frame, [b.in, b.in + s(PANEL_IN)], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: W / 2 - pw / 2, top, width: pw, height: ph, borderRadius: 18, background: PANEL, opacity: panelIn * fadeOut }} />
      {b.words.map((wd, i) => frame >= wd.f && (
        <div key={`${b.in}-${i}`} style={{
          position: "absolute", left: pos[i].x, top: pos[i].y + 10 * (1 - appear(i)),
          fontFamily: "Inter Display", fontWeight: 500, fontSize: SIZE, lineHeight: `${SIZE}px`, color: INK, whiteSpace: "nowrap",
          opacity: appear(i) * fadeOut,
        }}>{wd.w}</div>
      ))}
    </div>
  );
}
