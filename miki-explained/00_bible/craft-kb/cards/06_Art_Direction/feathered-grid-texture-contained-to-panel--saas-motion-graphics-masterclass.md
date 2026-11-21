---
title: Subtle grid texture contained to a UI panel, double-feathered so it fades top and bottom
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt"
source_time: "33:40–35:00"
tool_target: raea
tier: principle
use_when: "a flat UI panel (notes app, list, doc) needs quiet depth/texture behind its content without reading as noise"
style_fit: Fits — one quiet texture layer, never competes with the accent or the text; keep opacity low (source lands on 40%).
---

## METADATA
06_Art_Direction | After Effects (Grid effect, double rectangle mask, track matte) → raea tiled SVG pattern + clip | raea

## CREATIVE_INTENT
A plain gray grid (the Grid effect, line spacing ~100 px) is precomposed, then masked by two feathered rectangles set
to Subtract at top and bottom (feather ~500, reduced for more control) so the grid fades out at the panel's edges
instead of cutting hard. The precomp is then contained to the host shape via a track matte so it never spills outside
the panel, and its opacity is dialled down until it's "almost not visible" (tried 20%, settled on 40% as "a cool
effect" — present, but a background detail, never competing with foreground content).

## STE_PROCEDURE
1. Build the grid pattern at low contrast (light gray lines) in its own precomp.
2. Mask it top and bottom with two feathered rectangles set to Subtract, so the grid fades rather than hard-cuts.
3. Track-matte (alpha) the grid precomp to the host panel shape so it's contained inside the panel only.
4. Set its opacity low (~40%) — present on close inspection, invisible at a glance.
5. Never let the grid touch or outline foreground text/icons; it stays strictly behind them.

## AGENT_EXECUTION
raea: a repeating SVG `<pattern>` (or a tiled `backgroundImage` gradient grid) inside the panel's own `clipPath`/
`overflow: hidden`, with a CSS `mask-image` linear-gradient (transparent → black → transparent) standing in for the
feathered top/bottom cut, opacity ~0.3–0.4.
```tsx
<div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: panelRadius }}>
  <div style={{ position: "absolute", inset: -40, opacity: 0.35,
    backgroundImage: "linear-gradient(#2a2a2a 1px, transparent 1px), linear-gradient(90deg, #2a2a2a 1px, transparent 1px)",
    backgroundSize: "100px 100px",
    maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }} />
</div>
```

### Worked example
Topic: a "senarai belanja" (spending list) UI panel in a budgeting how-to.
- BEFORE: the list panel is flat solid gray with no depth.
- AFTER: a faint 100 px grid sits behind the list at 35% opacity, fading out at the panel's top and bottom edges,
  never touching the list text.

### Check
- Does the grid fade at the panel's edges (no hard cut)?
- Is it contained strictly inside the host shape (no spill)?
- Is it low enough opacity to read as texture, not pattern?

## NOTES
- Visual gaps: exact Grid effect line-width/color and the final feather pixel values are on-screen settings — not
  recoverable beyond the spoken anchors (feather ~500, opacity 40%).
- AE dropped: Grid effect, double rectangle Subtract mask, track matte toggle; translated to a CSS pattern + mask-image.
