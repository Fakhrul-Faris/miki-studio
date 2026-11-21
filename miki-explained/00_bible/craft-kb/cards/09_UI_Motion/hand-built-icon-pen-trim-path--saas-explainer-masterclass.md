---
title: Hand-built feature icon from pen tool + trim-path draw-on (not a static library glyph)
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "05:00–06:52 (stopwatch/loop/compass icon build + icon-swap via alt-drag), 45:16–50:07 (recreating a screenshot's icon set with the pen tool so each can be animated)"
tool_target: raea
tier: full
use_when: "a feature-list beat needs an icon that actually draws on or transforms, not a flat PNG dropped on screen"
style_fit: Fits — a drawn, animatable icon is consistent with "no generic defaults" and gives a real draw-on event instead of a pop/fade.
---

## METADATA
09_UI_Motion | After Effects (pen tool + Trim Paths, icon swap via alt-drag) → raea SVG path draw-on | raea

## CREATIVE_INTENT
Rather than importing a flat icon PNG, the source redraws each feature icon (stopwatch, loop, compass) as its own vector
path with the pen tool, so Trim Paths can animate it drawing on stroke-first. Once one icon/text/box group exists, the
whole group is duplicated and only the icon layer is replaced (hold Alt, drop the new icon on the old one — an
auto-replace) rather than rebuilding the layout each time, keeping every feature card visually identical except its icon.

## STE_PROCEDURE
1. Redraw the icon as a single open or closed vector path with the pen tool (not an imported flat glyph).
2. Animate it stroke-first: Trim Paths start/end keyed 0→100 % (or vice versa) over the word it illustrates.
3. Group the icon with its label and container once, as a reusable template.
4. For the next feature, duplicate the whole group and replace only the icon path inside it — keep label, container,
   animation untouched.
5. Keep every icon the same stroke weight and the same draw-on duration, so the set reads as one system.

## AGENT_EXECUTION
Shot-list row: `| 7 | "3 langkah je" | 3 feature chips | each icon draws on 0→100% over its own number word | this card`.
raea: one `<Icon>` component taking a `d` path prop so the container/label/animation code is shared and only the path
swaps per feature:
```tsx
function Icon({ d, start }: { d: string; start: number }) {
  const t = k(f, start, 14, out);
  return <path d={d} pathLength={100} strokeDasharray={100}
    strokeDashoffset={lerp(100, 0, t)} stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />;
}
```

### Worked example
Topic: a kedai runcit's 3-step QR setup (illustrative generic steps).
- BEFORE: three stock icon PNGs fade in together — no sense of sequence or system.
- AFTER: the "scan", "confirm", "done" icons each draw on stroke-first exactly on "satu", "dua", "tiga", sharing one
  stroke weight and one draw-on duration so the three feel like one built set.

### Check
- Is every icon a drawn vector path (not an imported flat glyph)?
- Does each icon draw stroke-first on its own named word?
- Do all icons in the set share stroke weight and draw-on duration?

## NOTES
- Visual gaps: exact path coordinates for each icon are visual only.
- AE dropped: alt-drag icon auto-replace (tool-click convenience, no transferable value beyond "share the template, swap
  only the icon path" — kept as the procedural point, the click mechanic itself dropped).
