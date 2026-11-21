---
title: Container matte — icons rise out of, and lists stay inside, their own box
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "12:38–13:17 (magnifier from inside the search box), 18:51–21:27 (results matted to the box), 22:09–22:52 (icons spread from a null)"
tool_target: raea
tier: principle
use_when: "phone/app UI scenes where an element should emerge from a field, button or panel instead of fading in on top"
style_fit: Fits — reveal built from the scene's own UI object; slide ≥ 0.4 s eased, no pop.
---

## METADATA
09_UI_Motion | After Effects (source) → raea `overflow: hidden` / `clipPath` | raea

## CREATIVE_INTENT
The search box is three layers (rounded rectangle, "Search actions" label, magnifier). The magnifier "comes from inside
the rectangle": a track matte makes the box its mask, so the icon slides up from below the box edge and is invisible
outside it. The results dropdown (rounded rectangle with gradient fill + default bevel) has its option texts matted to it,
so "the text is outside the box" never happens while it slides; when the box leaves, items move left then down and the
box size shrinks to the centre — content and container disappear together. Icons spread out from a null whose scale
goes 0 → 177 %.

## STE_PROCEDURE
1. Build each UI widget as container + contents; make the container the mask of its contents.
2. To reveal an icon, start it just below the container's inner edge; slide it up into place (eased).
3. Slide lists/dropdowns inside their container; never let a child show outside it.
4. To exit, move the contents out (left, then down) while the container shrinks around them.
5. Group the widget and drive its entrance with one controller (scale + position choreography).

## AGENT_EXECUTION
raea: container `<div style={{ position: "relative", overflow: "hidden", borderRadius: 28 }}>`; child `<Animate enter={slide({ from: "bottom", distance: 64 })} at={word("cari")}>`. Shot row:
`| 3 | "cari nama kedai" | phone search UI, cam tilt down | magnifier rises out of the field on "cari"; results list slides down inside its card | this card |`.

### Worked example
Topic: finding a kedai's reviews before buying (generic app UI).
- BEFORE: icon and result rows fade in over the search bar; rows briefly overlap the bar.
- AFTER: the magnifier rises from inside the bar on "cari"; three result rows slide down inside their rounded card; on
  the next line the rows slide out left and the card closes to the centre.

### Check
- Is every child clipped by its own container during motion?
- Does each reveal start inside the container edge (not from mid-air)?
- Are slides ≥ 0.4 s and eased?

## NOTES
- Visual gaps: the bevel/gradient settings and icon positions are visual only.
- ⚠ The source's bevel-and-emboss is optional; keep it subtle or skip (flat UI is our default).
