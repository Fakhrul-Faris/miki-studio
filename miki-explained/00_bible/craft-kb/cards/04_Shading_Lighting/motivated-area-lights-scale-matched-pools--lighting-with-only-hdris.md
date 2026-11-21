---
title: Motivated area lights over an HDRI/sun, scaled to the space (small pools, not one giant light)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Lighting With Only HDRIs? You're Doing it Wrong!.txt"
source_time: "00:00–04:25"
tool_target: raea
tier: full
use_when: "an exterior/establishing beat looks flat with only an Environment + DirectionalLight, or a large set needs believable scale without one oversized light"
style_fit: "Extends masters/04_Shading_Lighting/sun-side-or-behind.md (HDRI is baked/infinite-distance, can't be pulled close or localized) and fake-bounce-lights.md (local fills) with a new scale rule: match light-pool size to space size. In Style D's macro studio shots the top key stays the one light; this applies to any exterior/establishing cutaway."
---

## METADATA
04_Shading_Lighting | Cinema 4D/Octane (HDRI + Sun + Area lights) | raea Environment/DirectionalLight + RectLight/SpotLight

## CREATIVE_INTENT
An HDRI (or sky texture) is a baked, infinite-distance light source — you can only rotate it, never move it closer to
one object or pull it away from another, so complex scenes read flat even with a strong "sun" in the HDRI. The fix is
to treat the HDRI/sun as the base exposure and layer color-matched area lights on top, each motivated by something
visible in frame (a neon sign, a window, a practical lamp) so they read as extensions of the existing light rather
than new sources. A second, separate rule from the same source: the SIZE of a light pool must match the SIZE of the
space — tiny pools of light for small spaces, many small pools for a huge space, never one giant light trying to
cover everything (a huge single light reads fake; "tens of thousands of lights" is how a space reads as genuinely
huge).

## STE_PROCEDURE
1. Set the HDRI/sky/sun first as the base exposure and base shadow direction (see sun-side-or-behind.md) — judge it
   alone before adding anything.
2. If the result is flat (soft shadows, no contrast) even with a visible sun in the HDRI, add one area light that
   fills shadow detail on the hero surface, color-matched to the HDRI/sun's temperature so it isn't noticed as a
   second source.
3. Add one additional area light as a deliberate highlight on a specific surface the story needs seen (a sign, an
   edge), still color-matched.
4. For a scene with named practical sources (neon signs, shop windows, lamps), light each one as its own small area
   light placed AT that source, not as one wash over the whole set.
5. Scale each light pool to the object/space it serves: a small area light for a small alley pocket, not a big light
   trying to cover the whole street; for a genuinely huge space, duplicate many small pools rather than scaling one
   light up.
6. Keep background-only lights (volumetrics, interiors glimpsed through windows, balcony warmth) subtle — bright
   enough to read, not so bright they pull the eye off the hero in the foreground.
7. Check: toggle the HDRI/sky alone first, then with the added area lights, and confirm the scene reads as one
   coherent light (not "flat, then suddenly lit from everywhere").

## AGENT_EXECUTION
**Frame brief → Decision:** "establishing shot: Environment/sky is the base; + 1 color-matched fill on [named
surface]; + 1 color-matched highlight on [named sign/edge]; pool sizes scaled to each pocket of the set, not one
light for the whole street."

raea:
```tsx
<Environment src={staticFile("overcast_2k.hdr")} intensity={0.8} background />
<DirectionalLight transform={Transform.fromXyz(-6, 5, 0).lookingAt([0, 0, 0])} illuminance={6000} shadow_maps_enabled soft_shadow_size={0.5} />
{/* motivated fill, color-matched to the directional light above, NOT a bare white add */}
<RectLight name="shadowFill" transform={Transform.fromXyz(1.2, 1.4, -0.6).lookingAt([0, 0.3, 0])}
  width={0.8} height={0.8} intensity={30000} color="#fde8c8" />
{/* a small pool per practical source — repeat per shop sign, never one big light over the street */}
{signs.map((s) => (
  <PointLight key={s.id} transform={Transform.fromXyz(...s.pos)} color={s.neonColor} intensity={15000} range={1.2} />
))}
```

### Worked example
Topic: "Kenapa lorong belakang gerai makan nampak lebih 'hidup' waktu malam?" (illustrative — a night back-alley
establishing shot for a food-stall episode).
BEFORE: `| 2 | "lorong belakang" | Environment (night HDRI) + one big DirectionalLight over the whole alley | — | — |`
— flat, no sense of scale, every stall lit identically.
AFTER: `| 2 | "lorong belakang" | night Environment stays the base; one small warm RectLight motivated by each stall's
own signboard, sized to that stall's pocket (not the whole alley); one cool-tinted PointLight at the one working
streetlamp | signboards light up one at a time as camera passes, 0.4 s fade each | motivated-area-lights-scale-matched-pools--lighting-with-only-hdris |`

### Check
- Is every added light motivated by something visible in frame (not a bare "fill" with no apparent source)?
- Is each light's color roughly matched to the base HDRI/sun's temperature?
- Is light-pool SIZE scaled to the space it serves (small pockets = small lights; a big space gets many small
  lights, never one oversized light)?
- Did you judge the HDRI/sun alone first before layering anything on top?

## NOTES
- Visual gaps: exact power/size values are shown on screen only (software: Cinema 4D/Octane); treat as `~` and tune
  on a raea still.
- Overlaps already covered in set 1, not duplicated here: light linking by object → masters/04_Shading_Lighting/light-linking.md;
  sun/HDRI side-or-behind placement → masters/04_Shading_Lighting/sun-side-or-behind.md.
- The source's "avoid front/on-camera-axis lighting" rule is addressed as an addendum to sun-side-or-behind.md
  (`_cards2/addenda/sun-side-or-behind--lighting-with-only-hdris.md`), not repeated here.
- Rule conflicts: none; this is exterior/establishing craft — Style D's macro studio top-key stays unchanged.
