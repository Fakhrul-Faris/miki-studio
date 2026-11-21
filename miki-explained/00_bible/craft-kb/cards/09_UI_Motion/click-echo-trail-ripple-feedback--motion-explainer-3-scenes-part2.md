---
title: Click/tap feedback — a trailing ripple rides behind the press point
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2.txt"
source_time: "41:41–44:50"
tool_target: raea
tier: principle
use_when: "a tap/click on a UI button needs to read clearly as an action, not just a scale-down"
style_fit: Fits — a short, bounded trail reads as deliberate feedback; keep it brief and single-colour so it doesn't become a flashy effect.
---

## METADATA
09_UI_Motion | After Effects (Echo effect on a shape's position keyframes) → raea: a short fading trail of copies behind the moving point | raea

## CREATIVE_INTENT
A click/tap circle is animated moving to the press position; an Echo effect is applied to its position keyframes so
several faded copies of the shape trail behind it as it moves, read with motion blur enabled for a "cleaner/realistic"
look. Scale keyframes (press down, settle back) are added on top, linked to the UI text being pressed.

## STE_PROCEDURE
1. Animate the press indicator (a dot/ring) moving to the target with an eased approach and a brief scale-down on contact.
2. Add a short trail of 2–4 fading copies behind its motion path (not a long smear).
3. Fade each trailed copy's opacity toward zero quickly (a few frames), so the trail reads as motion, not clutter.
4. Link the pressed UI element's own scale-down to the same contact frame.

## AGENT_EXECUTION
Shot-list field: Events → "tap ripple + 3-copy fade trail lands on 'confirm'".
raea: render 2–3 delayed, faded copies of the press indicator along its path:
```tsx
const steps = [0, 2, 4];                                   // frame offsets for trail copies
{steps.map((d) => {
  const tt = k(f - d, pressStart, 10, out);
  return <circle key={d} cx={lerp(startX, pressX, tt)} cy={lerp(startY, pressY, tt)}
    r={10} fill={C.accent} opacity={lerp(0.5, 0, d / 4)} />;
})}
```

### Worked example
Topic: tapping "confirm" on a kedai runcit's QR-payment screen (illustrative UI).
- BEFORE: the confirm button just scales down with no sense of a finger/cursor arriving.
- AFTER: a small accent dot slides in with a 3-copy fading trail, landing on the button exactly as it scales down on "confirm".

### Check
- Is the trail short (2–4 copies, fading within a few frames), not a long smear?
- Does the UI element's own press/scale-down land on the same frame as trail contact?
- Is the trail a single colour (the accent), not a rainbow effect?

## NOTES
- Visual gaps: exact Echo-effect frame spacing and opacity falloff are visual only, marked `~`.
- AE dropped: the Echo effect itself (post-process trail) — translated to explicit delayed/faded duplicate renders, which
  is the direct raea equivalent since there's no post-effect trail stack.
