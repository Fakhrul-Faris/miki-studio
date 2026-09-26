---
name: brand-profiles
description: Encodes brand visual decision systems as executable profiles written in Directive Voice. Each profile overrides palette, texture, edit rhythm, camera energy, and emotional register. Activate when brand is named. Triggers on Nike style, OnCloud style, Grab style, brand ad, sportswear commercial, Southeast Asia ad, Wieden+Kennedy, Just Do It, Run On Clouds, Grab superapp, brand film.
---

# Brand Directing Profiles

## Core Principle

Brands are not moods. They are decision systems: rules about what the camera does, what the palette refuses to do, the edit rhythm, the emotional register. This skill encodes those systems as executable rules written in Directive Voice.

A branded video that reads as generic (generic "sporty" or "tech") is a video that didn't load the brand profile. When you load a profile, the profile overrides generic art direction defaults for palette, texture, edit rhythm, camera energy, and emotional register.

## How to Use

1. Identify the brand (Nike, OnCloud, Grab, or a new one).
2. Load the matching profile from `references/brand-profiles.md`.
3. Copy the **Call Sheet Block** from the profile.
4. Inject the Call Sheet Block into your prompt assembly, after the art direction bible.
5. Run the brand-specific quality gate.

## Brand Mode Rule

When active, a brand profile:
- Overrides palette, texture, edit rhythm, camera energy, emotional register.
- Does NOT override era/place/weather unless the profile explicitly states so.
- Does NOT override character age, condition, or specific location unless the profile explicitly states so.
- Is combined with directive-voice, script-direction, hero-frame-production, and animation-direction.

**The Call Sheet Block is verbatim text you copy-paste into your prompt assembly.** It is the operational summary of the profile's decision system.

## Profile Index

| User says | Load | Brand Intention |
|---|---|---|
| Nike, Just Do It, sportswear, athletic grit, Wieden+Kennedy, effort, training | NIKE | Shoot the start, not the win. Document effort and resilience. |
| On, OnCloud, On Running, Swiss performance, emotional running, precision | ONCLOUD | Shoot the feeling of fast. Technical. Restrained. Breath as rhythm. |
| Grab, superapp, Southeast Asia, everyday hero, ASEAN, humor, practical | GRAB | The joke has to land before the brand does. Warmth. Specificity. |

## Profile Structure

Each profile contains these sections, all written in Directive Voice:

- **The Brief** — The core philosophy in one sentence.
- **Camera** — How the camera behaves. Not what it sees, but how it moves.
- **Lens** — Focal lengths and apertures. What is excluded by framing choice.
- **Light** — Light sources, quality, motivation, fill policy.
- **Art Dept** — Production design philosophy. What does and doesn't exist in the frame.
- **Wardrobe** — Fabric, fit, condition, grooming.
- **Edit** — Cut rhythm, pacing, where cuts land.
- **Grade** — Palette logic, grain, saturation, color protection.
- **Type** — Typographic voice (if text is present).
- **Call Sheet Block** — The operational summary. Copy-paste this into your prompt.
- **Refusals** — What is explicitly NOT happening.
- **Quality Gate** — Checklist to verify the profile is honored.

## Loading a Profile

When you name a brand in your brief, add this line to your prompt assembly:

```
BRAND MODE: [BRAND NAME]
[Copy the entire Call Sheet Block from the profile]
```

Example:

```
BRAND MODE: NIKE

Handheld, unsteady. Long for crowd, wide for isolation. Hard available light, 
no fill, faces half-black. Worn wardrobe, owned props, wet ground. Cut on 
movement, cut early. Crushed blacks, one accent color maximum (volt, crimson, 
or royal). Grain. Type is a character. Kinetic, bold, custom. Enters and exits 
on beats. Nothing polished.
```

## The Three Profiles

See `references/brand-profiles.md` for the complete profiles: NIKE, ONCLOUD, GRAB.

Each profile is written in full Directive Voice and ready to inject into any video brief.

## Quality Gate: Brand Specificity

- [ ] Brand profile loaded and Call Sheet Block copied.
- [ ] Camera behavior matches profile (handheld vs stabilized, etc.).
- [ ] Palette follows profile restrictions (not every color, one accent, no generic beauty).
- [ ] Edit rhythm matches profile (cut-early vs slow-hold).
- [ ] Emotional register matches profile (grit vs calm, humor vs earnest).
- [ ] Wardrobe and props reflect profile's design philosophy (worn vs technical, etc.).
- [ ] Lighting philosophy honored (hard vs soft, fill policy, available vs designed).
- [ ] No generic "sporty" or "tech" language. Every choice is specific to this brand.
- [ ] Video reads as the brand's decision system, not a mood.

---

## Adding New Profiles

To create a profile for a new brand, use this template and write it entirely in Directive Voice:

```
### [BRAND NAME]

**The Brief:** [One sentence. The core philosophy.]

**Camera:** [How does the camera move? Is it handheld, stabilized, static, flying?]

**Lens:** [What focal lengths? What do you see and what do you exclude?]

**Light:** [Motivated or artificial? Hard or soft? Available or designed? Fill policy?]

**Art Dept:** [What exists in the frame? What is forbidden? What is the design philosophy?]

**Wardrobe:** [Fabric, fit, condition. What does the character wear and why?]

**Edit:** [Cut rhythm. Where do cuts land? Are transitions smooth or jarring?]

**Grade:** [Palette logic. Grain. Saturation. What color is the accent? What is protected?]

**Type:** [If text appears, what is its voice? Bold or subtle? Serif or sans? Animated or static?]

**Call Sheet Block:** [Condensed operational summary, 3–5 sentences. Copy-paste this into prompts.]

**Refusals:** [What is NOT happening. What is explicitly forbidden.]

**Quality Gate:** (adapted from the shared gate)
```

Write with the same specificity and force as the three existing profiles. No vague advice. Every line must be actionable.

---

**The brand profiles are not styles to admire. They are systems to follow.**
