---
title: Ambient light (directionless fill) vs reflective light (tinted bounce from a named surface)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/How COLORS Completely Change Your LIGHTING!.txt"
source_time: "09:21–10:28"
tool_target: raea
tier: full
use_when: "briefing fill light for a shadow side that still looks flat or disconnected from the dark room around it"
style_fit: "Fits Style D's one soft top light + dark room: ambient lifts every shadow evenly (no new colour), reflective fill ties the hero to one specific surface in the room and is allowed to carry a tint."
---

## METADATA
06_Art_Direction | general (digital painting, tool-agnostic) | raea `<AmbientLight>` vs a tinted bounce light

## CREATIVE_INTENT
Ambient light is the general, directionless light that fills shadows so they don't go flat black — it has no single
source and no particular direction, it just lifts the darker values. Reflective light looks similar (it also lightens
shadows) but comes from one specific surface, has a visible direction, and usually carries that surface's colour as a
tint. Confusing the two makes a fill look vague; naming which one you're adding makes the shadow read as "connected to
this room" instead of just "less dark."

## STE_PROCEDURE
1. Before adding shadow fill, decide: does this need to feel like "the whole room is a bit lit" (ambient) or "bounced
   off that one surface" (reflective)?
2. For ambient: raise the fill evenly, no direction, no strong tint.
3. For reflective: name the surface (the floor, a wall, the prop itself), aim the fill from its direction, and tint it
   with that surface's colour.
4. Keep both subtle — neither should rival the one top key light or carry the brand accent.
5. Use reflective fill when the room's own material should visibly touch the hero (e.g. a warm floor kissing the
   underside of the object); use ambient when the dark room just needs its blacks to hold detail.

## AGENT_EXECUTION
raea: ambient = `<AmbientLight brightness={...} />` (uniform, no direction, no tint beyond a neutral grey/white);
reflective = a dim, directional `<RectLight>` or `<PointLight>` placed at the named surface, coloured to match it.
```tsx
<AmbientLight brightness={15} />                                                        {/* even shadow lift, no tint */}
<RectLight name="floorBounce" color="#5a3a22" transform={Transform.fromXyz(0, -0.05, 0).lookingAt([0, 0.3, 0])}
  width={1.2} height={1.2} intensity={6000} range={2.4} />                               {/* reflective: tinted, from the floor, up */}
```

### Worked example
Topic: a warung's gas stove, close-up on the burner (illustrative).
BEFORE: a single low-power fill light, undirected, slightly blue — reads as generic CG fill.
AFTER: Decision — "reflective, from the stainless counter below" → a dim warm-grey RectLight aimed up from where the
counter would be, plus a small neutral AmbientLight just to keep the top of the burner's shadow side off pure black.

### Check
- Did the frame brief name which kind of fill this is (ambient or reflective) and why?
- If reflective, is there a named real surface it bounces from, and does its tint match that surface?
- Does the fill stay subtle enough that the top key and the accent are still the only things that win attention?

## NOTES
- Visual gaps: the source demonstrates this in 2D painting (a soft low-opacity brush vs. a directional tinted brush
  stroke); no numeric light values given.
- Rule conflicts: none — both stay inside "one soft top light + dark room"; this only adds vocabulary for naming
  what kind of secondary fill a shot needs instead of guessing.
