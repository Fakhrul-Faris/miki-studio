---
title: Radial carousel driven by a single Z-rotation value — four items pre-placed at 90°, one key cycles them
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt"
source_time: "30:40–33:11, 35:48–37:17 (label sync)"
tool_target: raea
tier: full
use_when: "cycling through 3–5 short keywords/features around a central hub (a benefits list, a feature carousel) without a scroll/swipe UI"
style_fit: "Fits UI-heavy scenes needing a feature-cycling beat; keep each label's dwell long enough to read at phone speed, one accent only on the active dot."
---

## METADATA
09_UI_Motion | After Effects (4 duplicated shapes placed by rotation property links, one Z-rotation key cycles them) → raea: items placed by angle, one rotation drives the cycle | raea

## CREATIVE_INTENT
Four small "orbit" shapes are duplicated from one original and placed by linking each duplicate's rotation to 90°, 180°,
270° off the first — so they land perfectly evenly spaced with no manual positioning. All four (plus their parent
circle) are then parented to one controller whose Z-rotation is keyed through a full cycle (one key per "stop," eased
in-out); because the four items are fixed at their 90° offsets, rotating the whole group cycles which item sits in the
"active" (e.g. top or centre-facing) slot. Each keyword label is linked to track this same rotation and faded in/out as
its item passes through the active slot, so the label swap is driven by the same single value as the physical motion.

## STE_PROCEDURE
1. Place the first item; duplicate it N−1 times and set each duplicate's own rotation offset (360°/N apart) rather than manually positioning each one.
2. Parent all items (and the backing shape, if any) to one controller.
3. Key the controller's rotation in steps, one per item, eased in-out at each stop.
4. Fade out at the frame each item is itself. Label each item's text, fading it in as that item nears the active slot and out as it leaves — timed off the same rotation value, not a separate clock.
5. Keep the per-stop dwell long enough for the label to actually be read.

## AGENT_EXECUTION
raea: place N items by `angle = i * (360/N)`, parent to one rotating group, derive label opacity from the same angle:
```tsx
const stop = interpolate(f, stops, stops.map((_, i) => i), { ...CL, easing: inOut }); // which stop we're at (fractional during travel)
const activeIdx = Math.round(stop);
items.map((item, i) => {
  const angle = i * (360 / items.length) - stop * (360 / items.length);
  const isActive = i === activeIdx;
  return <Orb key={i} angleDeg={angle} labelOpacity={isActive ? inSettle(f, stop, activeIdx) : 0} />;
});
```
Shot row: `| 11 | "projek, maklum balas, fail, komunikasi" | macro hub with 4 orbiting dots | dots rotate one stop per word; label fades in as each dot reaches centre | this card |`.

### Worked example
Topic: four reasons a pasar malam stall uses a simple ledger app — "jualan, kos, untung, stok" (illustrative keywords).
- BEFORE: four static labels appear one after another with independent fade-ins.
- AFTER: four dots are placed once at 90° apart around a hub; one rotation value steps the group through four stops,
  and each keyword fades in exactly as its dot reaches the active slot — one authored value drives both the motion and
  the four label swaps.

### Check
- Are the N items placed by angular offset, not individually hand-positioned?
- Does one rotation value drive both the physical cycling and every label's fade?
- Does each stop dwell long enough to read the word on a phone?
- Is only one accent colour used on the active item/label?

## NOTES
- raea check (2026-11-21): `<Orb>` in the code above is a stand-in for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: the exact per-stop duration beyond "ease this nicely... start the rotation already earlier" is visual
  only; set dwell by the spoken word's length.
- AE dropped: pick-whip rotation links on duplicated shapes to achieve even spacing — translated to a computed angular
  offset, which is simpler in code than replicating the link chain.
