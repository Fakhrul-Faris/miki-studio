# MIKI — Character Lock
**Status:** locked v1 · 2026-07-21  
**Refs:** `miki_identity_ref.jpg` (identity) + Bob's Burgers / Rick & Morty / Pim / `raw/animationExample.mp4` (grammar)

---

## One-line

**Miki** — early-20s barista who looks deadpan until his phone destroys him; serves customers with the wrong kind of kindness.

---

## Identity anchors (from `1.jpg`)

These are **non-negotiable** — they make Miki Miki, not "generic cartoon barista."

| Feature | Lock |
|---------|------|
| **Ethnicity read** | East / Southeast Asian young man |
| **Hair** | Straight black, neck-length — **visible, no cap during cafe/work** |
| **Nose** | Small simple curve; **pink/salmon blush on bridge + tip** (signature) |
| **Freckles** | Light freckles on cheeks |
| **Brows** | Thick, straight, black — carry deadpan |
| **Skin** | Warm tan/beige, flat fill |
| **Vibe default** | Unimpressed side-eye; emotionally withholding until UI nukes him |

---

## Animation-style grammar (from show refs)

| Rule | Source | Apply |
|------|--------|-------|
| Uniform black outlines, medium-thin | Bob's Burgers, R&M | No tapered ink, no sketchy loose lines |
| Flat cel color, 0–1 shadow pass | All refs | Hard edge under chin only; no gradients |
| Eyes: white circles + dot pupils | R&M, Bob's | Pupils go **scribble/jagged** under stress (Pim + PROOF eye twitch) |
| Mouth: simple line closed; open = flat shape | Bob's, R&M | Manic smile = wide, too bright, not cute |
| No drawn nose (profile ok) OR tiny curve | Bob's vs 1.jpg | **Front 3/4:** pink nose blush reads; keep nose minimal |
| Limbs: noodle-simple | Bob's, R&M | Limited animation friendly — no muscle detail |
| Dialogue | animationExample | **Voiced** — no speech bubbles in final animation |
| Format | Miki Studio | **9:16 vertical** shorts |

---

## Silhouette & proportions

- Head slightly large vs body (Bob's Burgers ratio)
- Shoulders average — not heroic, not beanpole
- Hands simplified (4 fingers ok)
- **Readable at phone size** — face + phone toast must read in 9:16 MS

---

## Outfits (variants)

### A — Cafe / work (`PROOF_*` episodes) · **LOCKED**

Default for counter shorts.

| Piece | Spec |
|-------|------|
| Top | Off-white / cream short-sleeve tee (same family as `1.jpg` tee) |
| Apron | Dark brown waist apron (Bob's Burgers Tina energy) |
| Head | **No cap** — hair down, neck-length black |
| Bottom | Dark pants (counter shots rarely show) |
| **No** | Cap, button shirt, formal white uniform, name badge, lizard/mascot |

### B — Casual / street (`1.jpg` full lock)

For non-work episodes or cold opens later.

| Piece | Spec |
|-------|------|
| Top | Oversized cream/off-white tee |
| Layer | Red / hot-pink long-sleeve tied at waist |
| Head | Black backwards baseball cap |
| Bottom | Black pinstripe trousers |
| Bag | Dark navy tote (optional prop) |

---

## Expression sheet (minimum rig)

Build these as swap layers for limited animation — not redraw every frame.

| ID | Name | Use | Visual |
|----|------|-----|--------|
| E0 | **Deadpan** | Default, wiping counter | Half-lid eyes, dot pupils, flat mouth, side-eye ok |
| E1 | **Eye twitch** | Toast hits (P01–P02) | One brow tick; pupil scribbles on **his** phone beat only |
| E2 | **Manic service** | "On me", comps bill (P03) | Wide closed-eye smile OR too-bright open smile — wrong generosity |
| E3 | **Prop focus** | Handoffs (P04) | Neutral face; hands tell story |
| E4 | **Misaimed care** | "Stay strong" (P05) | Soft manic smile, dot pupils, hold 0.8s+ after line |
| E5 | **Held crack** | Alone button (P06) | E4 smile holding → micro droop optional; no sad violin face |

**Forbidden expressions:** anime sparkle eyes, chibi sweat drops, explainer face, winking at camera.

---

## Turnaround notes

| View | Notes |
|------|-------|
| **Front** | Freckles + pink nose visible; hair frames face |
| **3/4 (hero)** | Primary board angle — counter MS and MCU |
| **Profile** | Simple ear; nose as single bump; animationExample grammar |
| **Back** | Hair mass only; apron tie visible in cafe look |

---

## Sacred props (Miki-adjacent)

| Prop | Rule |
|------|------|
| **Miki's phone** | Face-up on charger whenever relevant; UI toasts in **English** |
| **Customer phone** | Clean — no cursed banners |
| **Charger cable** | Visible in handoff beats |
| Toast UI | Huge cards: **Babe ❤️** / **PayLater OVERDUE** — not ayang, not Malay |

---

## Palette (hex starting points)

| Swatch | Hex | Use |
|--------|-----|-----|
| Skin | `#D4A574` | Base (adjust to match 1.jpg) |
| Nose blush | `#E88878` | Signature |
| Hair | `#1A1A1A` | |
| Cream tee / shirt | `#F2EDE4` | Work + casual |
| Apron | `#3D2E28` | |
| Outline | `#0D0D0D` | All strokes |
| Eye white | `#FFFFFF` | |
| Pupil | `#0D0D0D` | Dot; scribble variant for stress |
| Cafe tile accent | `#4A6B5A` | Counter shorts (PROOF_03) |

---

## AI prompt block (reference only)

> Do **not** paste this into frame prompts. Frames get Miki from `miki_ref_clean.png` as an attached
> image (see `series-plan.md` §3). Use this block only to check a generated frame is on-model.

```text
Character lock MIKI: East/Southeast Asian young man, early 20s, straight black neck-length hair,
light cheek freckles, pink/salmon nose blush on bridge and tip, thick straight black eyebrows,
large white circle eyes with small black dot pupils (scribble pupils if stressed).
Style: flat 2D adult indie cartoon — uniform black medium-thin outlines, flat cel colors,
minimal hard shadow under chin only. Grammar: Bob's Burgers + Rick and Morty + Smiling Friends,
NOT anime, NOT manga, NOT 3D render, NOT soft airbrush, NOT purple neon.
Outfit CAFE (default): cream short-sleeve tee + dark brown waist apron, black hair down no cap.
Outfit CASUAL (rare): cream oversized tee, red sweater tied at waist, black backwards cap.
No lizard, no mascot on shoulder. No speech bubbles. No storyboard metadata bars. Vertical 9:16.
Reference identity: miki_identity_ref.jpg (MORAL SUPPORT) — face only; ignore lizard in ref.
```

---

## Locked decisions

| Decision | Call |
|----------|------|
| Lizard mascot | **Cut** — not in series |
| Cafe uniform | **Cream tee + dark brown apron** |
| Cap during work | **Off** — hair visible at counter |

---

## Next steps

1. ~~Produce `miki_turnaround.png` (3 views + E0–E5)~~ ✓  
2. ~~Regenerate `storyboards/PROOF_03_stay_strong/` under this lock~~ ✓  
3. Build limited-animation rig notes from expression sheet  
4. User taste-pass: cast lock + P01/P05/P06 must-holds
