---
title: How you arrive at a detail changes its meaning (slow push = dread, sharp cut = shock)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/You're Framing Every Shot Wrong (It's Control, Not Composition).txt"
source_time: "13:06–13:39"
tool_target: shot-list
tier: full
use_when: "choosing how to arrive at an insert/reveal setup — a slow camera move in, or a straight cut"
style_fit: "⚠ adapted — 'sharp sudden cut' fits Style D's hard-cut-every-2–3s rhythm; a push-in must still obey the eased, capped-speed camera rule (no crash zoom)."
---

## METADATA
06_Art_Direction | general (editing/camera grammar) | shot-list (Setup and camera column)

## CREATIVE_INTENT
The exact same detail, framed the exact same way, means something different depending on how the camera gets there.
A slow, deliberate push into it reads as dread — the audience has time to feel it coming. A sharp, sudden cut straight
to it reads as shock — no warning, just impact. Same shot, same content, opposite feeling, purely from the arrival.

## STE_PROCEDURE
1. Before building a reveal/insert setup, decide the feeling it needs: dread (anticipated) or shock (sudden).
2. For dread: arrive by an eased, continuous camera push into the detail, slow enough that the audience sees it coming.
3. For shock: arrive by a straight hard cut, with no camera move leading into it.
4. Never mix the two in the same beat (a fast push that also hard-cuts undercuts both readings).

## AGENT_EXECUTION
Shot-list "Setup and camera": write "push-in (dread)" or "hard cut (shock)" explicitly, not just the destination
framing. raea: a push-in stays inside the house camera-speed cap (eased in-out, under ~40 m/s linear / ~130°/s
angular, no crash-zoom acceleration curve); a shock cut is simply the next setup's camera starting cold at the new
framing, no transition shot in between.
```tsx
{/* dread: slow eased push over ~1.2–1.8 s into the detail */}
<Camera3d transform={Transform.fromXyz(0, interpolate(f, [0, 44], [0.5, 0.08], { easing: Easing.inOut(Easing.cubic) }), -0.3).lookingAt([0, 0.02, 0])} />
{/* shock: no move at all — the setup simply starts here on the cut */}
```

### Worked example
Topic: a small business owner checks the bank app and sees an unexpected deduction (illustrative numbers).
BEFORE: a single medium shot of the phone, camera static, for both the lead-up and the reveal.
AFTER: shot-list — L04 "push-in (dread): camera eases slowly toward the balance line as the voice trails off";
L05 "hard cut (shock): straight to the deduction line in the accent, no move."

### Check
- Does the shot-list name which feeling (dread or shock) each reveal needs, before choosing push vs. cut?
- Does a chosen push-in stay eased and under the house speed cap — never a crash zoom?
- Is a chosen shock cut a true hard cut, with no camera move bridging into it?

## NOTES
- Visual gaps: none — stated directly and demonstrated as a single edited example.
- Rule conflicts: "sharp sudden cut" risks reading like the forbidden flashy-transition family — it does not, since it
  is a plain hard cut (no whip pan, crash zoom, glitch or wipe), which is already how Style D changes setups every
  2–3 s; only the push-in option must be checked against the eased/capped camera-speed rule.
