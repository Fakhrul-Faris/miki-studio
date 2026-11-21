---
title: Rebuild a screenshotted app UI as separate animatable layers (not one flat screen-record)
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Create Apple Style UI Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "03:05–09:22"
tool_target: raea
tier: full
use_when: "an app/website screen needs to be shown changing state, zoomed into, or have one element move independently — never when a flat screenshot/recording would do"
style_fit: Fits directly — our UI-heavy episodes (~80% interface scenes) are built in code already, so this card is the bridge: recreate the real screen as components, don't paste a screenshot.
---

## METADATA
09_UI_Motion | After Effects + Photoshop (mask + generative-fill cleanup, import as layered PSD) → raea: the screen built as real components from the start | raea

## CREATIVE_INTENT
Instead of animating a flat screenshot, the source imports a screenshot into Photoshop and manually separates it: masks
out one UI section at a time (lasso/quick-select), uses generative fill to patch what's removed from the background so
no cut-out "hole" shows, converts pieces to smart objects, and cleans mask edges (feather, then Select & Mask smoothing)
so cut edges don't look pixelated. The result imports into After Effects as a layered PSD where each UI piece — an icon,
a card, a status dot — is its own layer that can move, fade or scale independently.

## STE_PROCEDURE
1. Before animating, decide which UI elements must move independently (icon, label, status, card edge).
2. Mask each one out of the flat screenshot separately; patch the hole left behind so the background stays clean.
3. Feather and smooth every cut mask edge so it doesn't read pixelated at the animation's scale.
4. Group/convert each piece so it behaves as one movable object.
5. Reassemble the pieces at their original screen position before animating anything.

## AGENT_EXECUTION
In raea this whole Photoshop-cleanup step is replaced at the source: build the screen as real UI components (divs,
icons, text nodes) from the app's actual design, not from a photographed screenshot at all — each piece is already
independently animatable because it's real markup, not a masked image fragment.
Shot-list row: `| 9 | "tekan confirm" | phone screen, confirm button | button scales 96%→100% + colour flips on "confirm" | this card`.
```tsx
<div style={{ position: "absolute", ...cardPos }}>
  <StatusDot color={lerpColor("#999", C.accent, tStatus)} />
  <Button label="Confirm" scale={lerp(0.96, 1, tPress)} bg={lerpColor("#eee", C.accent, tPress)} />
</div>
```

### Worked example
Topic: a kedai runcit's QR-payment app confirming a sale (illustrative screen).
- BEFORE: a screen-recording plays while the agent/editor narrates over it — nothing can be isolated or re-timed.
- AFTER: the confirm button, the status dot and the amount are each their own component; the button presses exactly on
  "tekan", the status dot flips to accent exactly on "confirm" — both independently timed to the voice.

### Check
- Is every UI piece that moves a real, separately controllable element (not a cropped image fragment)?
- Does each piece's timing land on its own named word?
- If the source is a real app's screen, is it rebuilt faithfully in code rather than photographed and cut up?

## NOTES
- raea check (2026-11-21): `<Button>`, `<StatusDot>` in the code above are stand-ins for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: the exact Photoshop generative-fill results are tool-specific and not needed once the screen is built as
  real components in raea from the start.
- AE/Photoshop dropped entirely: mask+lasso+generative-fill+Select&Mask cleanup — not needed when the UI is authored as
  code rather than recovered from a screenshot.

## ADDENDUM — How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass
Source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt" (15:49–17:55, 17:55–19:06).
- Confirms the same screenshot-separation workflow (a real app/website screenshot cut into individually masked
  sections, anchor points reset to centre, pre-composed) and adds the entrance choreography: once every section is
  its own layer, give all layers the same slide-up-from-below + eased position keyframe, then stagger each layer's
  start time a few frames apart (a "motion offset" tool) so the rebuilt screen assembles top-to-bottom (or whatever
  order reads best) instead of popping in as one block.
- Values from this source: all separated sections share one slide-up position graph (eased); per-layer stagger is
  applied afterward via a motion-offset/stagger tool, exact frame-offset shown on screen only (not spoken).
- For raea: apply the same per-layer stagger idiom as `masters/01_Animation_Motion/drag-overlap-chain.md`
  (`<Stagger each={...}>` / delayed `interpolate`) to the rebuilt UI sections' entrance.
