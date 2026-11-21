---
title: Follow-through and secondary animation — let a state change ripple into connected elements
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Motion Design Principles.txt"
source_time: "07:29–08:30"
tier: principle
tool_target: raea
use_when: "an object's main state change (open/slice/multiply/become-a-chart) lands, and nothing else in frame reacts"
style_fit: "⚠ adapted — source describes bounce/snap-back follow-through (forbidden by house no-bounce rule); keep only the 'connected elements react' and 'environment responds' principle, as a single eased settle, never a bounce."
---

## METADATA
01_Animation_Motion | After Effects (tool-agnostic animation principle) | raea secondary motion on state-change events

## CREATIVE_INTENT
Follow-through: the energy released by a main action doesn't just disappear — it has to go somewhere (the thing that
got hit reacts, something slides into place from the impact). Secondary animation: the final flourish that enhances
the main action by asking what else in the scene the main action would affect, or how the environment around an
element responds to it — a head moving offset to an arm swing, a ball rotating as it flies. Neither replaces the main
action; both are smaller motions layered on top of it.

## STE_PROCEDURE
1. Before finishing a state-change event, name what else in the frame is physically connected to it.
2. Give that connected element one small, eased reaction tied to the main event's timing (not before it, slightly after).
3. Ask what the surrounding environment would do because of the main action (a shadow shifts, a reflection moves) and animate that too, subtly.
4. Keep every reaction a single eased settle — never a bounce, snap-back or overshoot beyond the house's 3–5 % cap.

## AGENT_EXECUTION
raea: trigger secondary motion from the same event frame as the main state change, offset by a few frames and eased
to a single settle (no spring, no bounce).
```tsx
const mainStart = 40;                                                  // frame the hero's state change begins
const secondaryStart = mainStart + 6;                                  // follows slightly after, not simultaneous
<Mesh3d ...>{/* hero: opens/slices/multiplies at mainStart */}</Mesh3d>
<RectLight transform={Transform.fromXyz(..., interpolate(f, [secondaryStart, secondaryStart + 18], [y0, y1],
  { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }), ...)} />  {/* shadow/light shifts in response, single eased settle */}
```

### Worked example
Topic: a vending machine's price counter flips up when the price rises (illustrative numbers).
BEFORE: the counter flips; nothing else in frame changes.
AFTER: the counter flips at f40 (main action); the coin slot's small indicator light dims slightly starting f46,
easing to its new state by f64 (secondary animation — connected element reacts, single eased settle, no bounce).

### Check
- Was at least one connected element or environmental cue given a reaction to the main state change?
- Does that reaction start slightly after the main action, not simultaneously or before it?
- Is the reaction a single eased settle, with no bounce/snap-back and no overshoot beyond ~3–5 %?

## NOTES
- Visual gaps: the dodgeball example's exact offset/timing values are shown on a timeline, not stated numerically.
- Rule conflicts: the source's own "snap-back" follow-through variant and squash/stretch under "anticipation" are
  dropped — house rule forbids bounce and springs; keep only connected-element and environment-response secondary
  motion, resolved as one eased settle.
